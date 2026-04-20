import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReservaApi } from '../../services/reserva-api';
import { MesaApi } from '../../services/mesa-api';
import { Reserva } from '../../models/reserva';
import { Mesa } from '../../models/mesa';

@Component({
  selector: 'app-reserva-editar-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <section class="contenedor">
      <h1>Editar reserva</h1>

      @if (reserva) {
        <form (ngSubmit)="guardarCambios()">
          <div class="campo">
            <label for="nombreCliente">Nombre del cliente</label>
            <input
              type="text"
              id="nombreCliente"
              name="nombreCliente"
              [(ngModel)]="reserva.nombreCliente"
              required
            />
          </div>

          <div class="campo">
            <label for="telefono">Teléfono</label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              [(ngModel)]="reserva.telefono"
              required
            />
          </div>

          <div class="campo">
            <label for="fechaReserva">Fecha de la reserva</label>
            <input
              type="date"
              id="fechaReserva"
              name="fechaReserva"
              [(ngModel)]="reserva.fechaReserva"
              required
            />
          </div>

          <div class="campo">
            <label for="horaReserva">Hora de la reserva</label>
            <input
              type="time"
              id="horaReserva"
              name="horaReserva"
              [(ngModel)]="reserva.horaReserva"
              required
            />
          </div>

          <div class="campo">
            <label for="numeroPersonas">Número de personas</label>
            <input
              type="number"
              id="numeroPersonas"
              name="numeroPersonas"
              [(ngModel)]="reserva.numeroPersonas"
              required
              min="1"
            />
          </div>

          <div class="campo">
            <label for="mesa">Mesa</label>
            <select id="mesa" name="mesa" [(ngModel)]="mesaSeleccionadaId" required>
              <option [ngValue]="0">Selecciona una mesa</option>
              <option *ngFor="let mesa of mesas" [ngValue]="mesa.id">
                Mesa {{ mesa.numero }} · {{ mesa.capacidad }} personas · {{ mesa.ubicacion }}
              </option>
            </select>
          </div>

          <div class="campo">
            <label for="observaciones">Observaciones</label>
            <textarea
              id="observaciones"
              name="observaciones"
              [(ngModel)]="reserva.observaciones"
              rows="4"
            ></textarea>
          </div>

          <p class="mensaje-error" *ngIf="mensajeError">{{ mensajeError }}</p>

          <div class="acciones">
            <button type="submit">Guardar cambios</button>
            <a routerLink="/reservas">Cancelar</a>
          </div>
        </form>
      } @else {
        <p>Cargando reserva...</p>
      }
    </section>
  `,
  styles: [
    `
      .contenedor {
        max-width: 700px;
        margin: 0 auto;
        padding: 24px;
        font-family: Arial, sans-serif;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .campo {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      input,
      select,
      textarea {
        padding: 10px;
        border: 1px solid #cccccc;
        border-radius: 8px;
        font-size: 14px;
      }

      .acciones {
        display: flex;
        gap: 12px;
        align-items: center;
      }

      button,
      a {
        padding: 10px 14px;
        border-radius: 8px;
        text-decoration: none;
        border: 1px solid #333;
        background: white;
        color: #333;
        cursor: pointer;
      }

      .mensaje-error {
        color: #b42318;
        font-weight: 600;
      }
    `,
  ],
})
export class ReservaEditarPage implements OnInit {
  private route = inject(ActivatedRoute);
  private reservaApi = inject(ReservaApi);
  private mesaApi = inject(MesaApi);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  reserva: Reserva | null = null;
  mesas: Mesa[] = [];
  mesaSeleccionadaId = 0;
  mensajeError = '';
  idReserva = 0;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.idReserva = Number(id);
      this.cargarMesas();
      this.cargarReserva();
    }
  }

  cargarMesas(): void {
    this.mesaApi.getMesasActivas().subscribe({
      next: (datos) => {
        this.mesas = datos;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar las mesas', error);
        this.cdr.detectChanges();
      },
    });
  }

  cargarReserva(): void {
    this.reservaApi.getReservaPorId(this.idReserva).subscribe({
      next: (datos) => {
        this.reserva = datos;
        this.mesaSeleccionadaId = datos.mesa?.id ?? 0;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar la reserva', error);
        this.cdr.detectChanges();
      },
    });
  }

  guardarCambios(): void {
    this.mensajeError = '';

    if (!this.reserva) {
      return;
    }

    const mesaSeleccionada = this.mesas.find((mesa) => mesa.id === this.mesaSeleccionadaId);

    if (!mesaSeleccionada) {
      this.mensajeError = 'Debes seleccionar una mesa válida.';
      return;
    }

    this.reserva.mesa = mesaSeleccionada;

    this.reservaApi.actualizarReserva(this.idReserva, this.reserva).subscribe({
      next: (reservaActualizada) => {
        console.log('Reserva actualizada correctamente', reservaActualizada);
        this.router.navigate(['/reservas']);
      },
      error: (error) => {
        console.error('Error al actualizar la reserva', error);
        this.mensajeError =
          'No ha sido posible actualizar la reserva. La mesa podría estar ocupada en ese tramo horario.';
      },
    });
  }
}
