import { Component, OnInit, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ReservaApi } from '../../services/reserva-api';
import { Reserva } from '../../models/reserva';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reserva-editar-page',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './reserva-editar-page.html',
  styleUrl: './reserva-editar-page.css'
})

export class ReservaEditarPage implements OnInit {
  private route = inject(ActivatedRoute);
  private reservaApi = inject(ReservaApi);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  reserva: Reserva | null = null;
  mensajeError = '';
  idReserva = 0;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.idReserva = Number(id);
      this.cargarReserva();
    }
  }

  cargarReserva(): void {
    this.reservaApi.getReservaPorId(this.idReserva).subscribe({
      next: (datos) => {
        this.reserva = datos;
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

    this.reservaApi.actualizarReserva(this.idReserva, this.reserva).subscribe({
      next: (reservaActualizada) => {
        alert('Reserva actualizada correctamente');
        console.log('Reserva actualizada correctamente', reservaActualizada);
        this.router.navigate(['/reservas']);
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.mensajeError = 'No se ha encontrado la reserva';
        console.error('Error al actualizar la reserva', error);
        this.cdr.detectChanges();
      },
    });
  }
}