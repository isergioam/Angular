import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReservaApi } from '../../services/reserva-api';
import { Reserva } from '../../models/reserva';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-reserva-borrar-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reserva-borrar-page.html',
  styleUrl: './reserva-borrar-page.css'
})
export class ReservaBorrarPage implements OnInit {
  private route = inject(ActivatedRoute);
  private reservaApi = inject(ReservaApi);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  reserva: Reserva | null = null;
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
      }
    });
  }

  confirmarBorrado(): void {
    this.reservaApi.borrarReserva(this.idReserva).subscribe({
      next: (resultado) => {
        console.log('Resultado del borrado', resultado);
        this.router.navigate(['/reservas']);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al borrar la reserva', error);
        this.cdr.detectChanges();
      }
    });
  }
}