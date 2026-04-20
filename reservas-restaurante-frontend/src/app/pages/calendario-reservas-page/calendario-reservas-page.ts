import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaApi } from '../../services/reserva-api';
import { Reserva } from '../../models/reserva';

interface DiaCalendario {
  numero: number;
  fechaISO: string;
  fueraDeMes: boolean;
  reservas: Reserva[];
}

@Component({
  selector: 'app-calendario-reservas-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendario-reservas-page.html',
  styleUrl: './calendario-reservas-page.css',
})
export class CalendarioReservasPage implements OnInit {
  private reservaApi = inject(ReservaApi);

  private cdr = inject(ChangeDetectorRef);

  fechaActual = new Date();
  diasCalendario: DiaCalendario[] = [];
  reservasMes: Reserva[] = [];
  fechaSeleccionada = '';
  reservasDelDia: Reserva[] = [];

  ngOnInit(): void {
    this.cargarMes();
  }

  mesAnterior(): void {
    this.fechaActual = new Date(this.fechaActual.getFullYear(), this.fechaActual.getMonth() - 1, 1);
    this.cargarMes();
    this.cdr.detectChanges();
  }

  mesSiguiente(): void {
    this.fechaActual = new Date(this.fechaActual.getFullYear(), this.fechaActual.getMonth() + 1, 1);
    this.cargarMes();
    this.cdr.detectChanges();
  }

  cargarMes(): void {
    const year = this.fechaActual.getFullYear();
    const month = this.fechaActual.getMonth();

    const inicio = new Date(year, month, 1);
    const fin = new Date(year, month + 1, 0);

    const inicioISO = this.formatearFecha(inicio);
    const finISO = this.formatearFecha(fin);

    this.reservaApi.getReservasEntreFechas(inicioISO, finISO).subscribe({
      next: (datos) => {
        this.reservasMes = datos;
        this.generarCalendario();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar las reservas del mes', error);
        this.cdr.detectChanges();
      },
    });
  }

  generarCalendario(): void {
    const year = this.fechaActual.getFullYear();
    const month = this.fechaActual.getMonth();

    const primerDiaMes = new Date(year, month, 1);
    const ultimoDiaMes = new Date(year, month + 1, 0);
    const primerDiaSemana = (primerDiaMes.getDay() + 6) % 7;
    const diasEnMes = ultimoDiaMes.getDate();

    const dias: DiaCalendario[] = [];

    for (let i = 0; i < primerDiaSemana; i++) {
      dias.push({
        numero: 0,
        fechaISO: '',
        fueraDeMes: true,
        reservas: [],
      });
    }

    for (let dia = 1; dia <= diasEnMes; dia++) {
      const fecha = new Date(year, month, dia);
      const fechaISO = this.formatearFecha(fecha);
      const reservas = this.reservasMes.filter((reserva) => reserva.fechaReserva === fechaISO);

      dias.push({
        numero: dia,
        fechaISO,
        fueraDeMes: false,
        reservas,
      });
    }

    this.diasCalendario = dias;
  }

  seleccionarDia(dia: DiaCalendario): void {
    if (dia.fueraDeMes || !dia.fechaISO) {
      return;
    }

    this.fechaSeleccionada = dia.fechaISO;
    this.reservasDelDia = dia.reservas;
  }

  obtenerTituloMes(): string {
    return this.fechaActual.toLocaleDateString('es-ES', {
      month: 'long',
      year: 'numeric',
    });
  }

  private formatearFecha(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
