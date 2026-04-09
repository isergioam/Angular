import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { PelisApiService } from '../../services/pelis-api.service';
import { Peli } from '../../models/peli';

@Component({
  selector: 'app-lista-pelis-api',
  templateUrl: './lista-pelis-api.html',
  styleUrl: './lista-pelis-api.css',
})
export class ListaPelisApiComponent implements OnInit{

  private pelisApiService = inject(PelisApiService);

  private cdr = inject(ChangeDetectorRef);

  pelis: Peli[] = [];
  cargando = true;
  error = '';

  ngOnInit(): void {
    this.pelisApiService.getPelis().subscribe({
      next: (datos) => {
        console.log('Datos recibidos:', datos);
        this.pelis = datos;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error real:', err);
        this.error = 'No se pudieron cargar las pelis';
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }
}
