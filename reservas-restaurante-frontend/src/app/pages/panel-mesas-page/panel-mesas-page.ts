import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MesaApi } from '../../services/mesa-api';
import { MesaEstado } from '../../models/mesa-estado';

@Component({
  selector: 'app-panel-mesas-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-mesas-page.html',
  styleUrl: './panel-mesas-page.css',
})
export class PanelMesasPage {
  private mesaApi = inject(MesaApi);

  private cdr = inject(ChangeDetectorRef);

  fecha = '';
  hora = '';
  mesas: MesaEstado[] = [];
  mensaje = '';

  consultarEstado(): void {
    this.mensaje = '';
    this.mesas = [];

    if (!this.fecha || !this.hora) {
      this.mensaje = 'Debes indicar fecha y hora para consultar el estado de las mesas.';
      return;
    }

    this.mesaApi.getEstadoMesas(this.fecha, this.hora).subscribe({
      next: (datos) => {
        this.mesas = datos;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al consultar el estado de las mesas', error);
        this.mensaje = 'No se ha podido consultar el estado de las mesas.';
        this.cdr.detectChanges();
      },
    });
  }
}