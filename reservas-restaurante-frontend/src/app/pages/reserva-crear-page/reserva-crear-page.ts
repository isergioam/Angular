import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MesaApi } from '../../services/mesa-api';
import { ReservaApi } from '../../services/reserva-api';
import { Mesa } from '../../models/mesa';
import { Reserva } from '../../models/reserva';

@Component({
  selector: 'app-reserva-crear-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reserva-crear-page.html',
  styleUrl: './reserva-crear-page.css'
})
export class ReservaCrearPage {
  private mesaApi = inject(MesaApi);
  private reservaApi = inject(ReservaApi);
  private router = inject(Router);

  mesasDisponibles: Mesa[] = [];
  mesaSeleccionadaId = 0;
  mensajeError = '';
  mensajeInfo = '';

  nuevaReserva: Reserva = {
    id: 0,
    nombreCliente: '',
    telefono: '',
    fechaReserva: '',
    horaReserva: '',
    numeroPersonas: 1,
    observaciones: '',
    mesa: {
      id: 0,
      numero: 0,
      capacidad: 0,
      ubicacion: '',
      activa: true
    }
  };

  buscarMesasDisponibles(): void {
    this.mensajeError = '';
    this.mensajeInfo = '';
    this.mesasDisponibles = [];
    this.mesaSeleccionadaId = 0;

    if (!this.nuevaReserva.fechaReserva || !this.nuevaReserva.horaReserva || this.nuevaReserva.numeroPersonas < 1) {
      this.mensajeInfo = 'Indica fecha, hora y número de personas para consultar la disponibilidad.';
      return;
    }

    this.mesaApi.getMesasDisponibles(
      this.nuevaReserva.fechaReserva,
      this.nuevaReserva.horaReserva,
      this.nuevaReserva.numeroPersonas
    ).subscribe({
      next: (datos) => {
        this.mesasDisponibles = datos;

        if (datos.length === 0) {
          this.mensajeInfo = 'No hay mesas disponibles para ese tramo horario y ese número de personas.';
        }
      },
      error: (error) => {
        console.error('Error al consultar disponibilidad', error);
        this.mensajeError = 'No se ha podido consultar la disponibilidad de mesas.';
      }
    });
  }

  guardarReserva(): void {
    this.mensajeError = '';

    const mesaSeleccionada = this.mesasDisponibles.find(mesa => mesa.id === this.mesaSeleccionadaId);
    if (!mesaSeleccionada) {
      this.mensajeError = 'Debes seleccionar una mesa disponible.';
      return;
    }

    this.nuevaReserva.mesa = mesaSeleccionada;

    this.reservaApi.crearReserva(this.nuevaReserva).subscribe({
      next: () => {
        this.router.navigate(['/reservas']);
      },
      error: (error) => {
        console.error('Error al guardar la reserva', error);
        this.mensajeError = 'No se ha podido guardar la reserva. Es posible que la mesa ya no esté disponible.';
      }
    });
  }
}