import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Reserva } from '../../models/reserva';
import { ReservaApi } from '../../services/reserva-api';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-reservas-listado-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reservas-listado-page.html',
  styleUrl: './reservas-listado-page.css'
})
export class ReservasListadoPage implements OnInit {
  private reservaApi = inject(ReservaApi);
  private cdr = inject(ChangeDetectorRef);

  reservas: Reserva[] = [];

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.reservaApi.getReservas().subscribe({
      next: (datos) => {
        this.reservas = datos;
        this.cdr.detectChanges(); // Asegura que la vista se actualice con los nuevos datos
      },
      error: (error) => {
        console.error('Error al cargar las reservas', error);
        this.cdr.detectChanges(); // Asegura que la vista se actualice incluso si hay un error
      }
    });
  }
}