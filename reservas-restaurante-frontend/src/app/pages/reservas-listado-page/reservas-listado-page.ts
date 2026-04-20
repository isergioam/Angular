import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Reserva } from '../../models/reserva';
import { ReservaApi } from '../../services/reserva-api';

@Component({
  selector: 'app-reservas-listado-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="panel">
      <div class="cabecera-panel">
        <div>
          <h1>Listado de reservas</h1>
          <p>Consulta y gestión de reservas activas del restaurante.</p>
        </div>

        <a class="btn btn-primario" routerLink="/reservas/nueva">Nueva reserva</a>
      </div>

      <div class="tabla-wrapper" *ngIf="reservas.length > 0; else sinDatos">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Personas</th>
              <th>Mesa</th>
              <th>Ubicación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let reserva of reservas">
              <td>{{ reserva.id }}</td>
              <td>
                <strong>{{ reserva.nombreCliente }}</strong><br />
                <span class="secundario">{{ reserva.telefono }}</span>
              </td>
              <td>{{ reserva.fechaReserva }}</td>
              <td>{{ reserva.horaReserva }}</td>
              <td>{{ reserva.numeroPersonas }}</td>
              <td>Mesa {{ reserva.mesa.numero }}</td>
              <td>{{ reserva.mesa.ubicacion }}</td>
              <td class="acciones-tabla">
                <a [routerLink]="['/reservas/editar', reserva.id]">Editar</a>
                <a [routerLink]="['/reservas/borrar', reserva.id]">Borrar</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ng-template #sinDatos>
        <div class="estado-vacio">
          <p>No hay reservas registradas.</p>
        </div>
      </ng-template>
    </section>
  `,
  styles: [
    `
      .panel {
        background: white;
        border: 1px solid #d9e2f1;
        border-radius: 18px;
        padding: 24px;
        box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
      }

      .cabecera-panel {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        margin-bottom: 24px;
        flex-wrap: wrap;
      }

      h1 {
        margin: 0;
      }

      p {
        margin-top: 8px;
        color: #5b6474;
      }

      .btn {
        display: inline-block;
        padding: 12px 16px;
        border-radius: 10px;
        text-decoration: none;
        font-weight: 600;
      }

      .btn-primario {
        background: #1f3c88;
        color: white;
      }

      .tabla-wrapper {
        overflow-x: auto;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th,
      td {
        padding: 14px 12px;
        border-bottom: 1px solid #e6edf7;
        text-align: left;
        vertical-align: top;
      }

      th {
        background: #f7f9fd;
        color: #334155;
        font-size: 14px;
      }

      .secundario {
        color: #6b7280;
        font-size: 13px;
      }

      .acciones-tabla {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }

      .acciones-tabla a {
        text-decoration: none;
        color: #1f3c88;
        font-weight: 600;
      }

      .estado-vacio {
        padding: 28px;
        text-align: center;
        color: #667085;
        background: #f8fafc;
        border-radius: 14px;
      }
    `
  ]
})
export class ReservasListadoPage implements OnInit {
  private reservaApi = inject(ReservaApi);

  reservas: Reserva[] = [];

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.reservaApi.getReservas().subscribe({
      next: (datos) => {
        this.reservas = datos;
      },
      error: (error) => {
        console.error('Error al cargar las reservas', error);
      }
    });
  }
}