import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ReservaApi } from '../../services/reserva-api';
import { Reserva } from '../../models/reserva';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-reserva-crear-page',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './reserva-crear-page.html',
  styleUrl: './reserva-crear-page.css'
})
export class ReservaCrearPage {
  private reservaApi = inject(ReservaApi);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  nuevaReserva: Reserva = {
    nombreCliente: '',
    telefono: '',
    fechaReserva: '',
    horaReserva: '',
    numeroPersonas: 2,
    numeroMesa: 1,
    observaciones: ''
  };

  guardarReserva(): void {
    if (this.nuevaReserva.numeroPersonas < 2) {
      alert('El número mínimo de personas es 2');
      return;
    } else {
      this.reservaApi.crearReserva(this.nuevaReserva).subscribe({

        next: (reservaCreada) => {
          alert('Reserva creada correctamente');
          console.log('Reserva creada correctamente', reservaCreada);
          this.router.navigate(['/reservas']);
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error al crear la reserva', error);
          this.cdr.detectChanges();
        }
      });
    }
  }
}