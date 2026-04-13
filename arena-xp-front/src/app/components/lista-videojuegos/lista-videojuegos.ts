import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Videojuego } from '../../models/videojuego';
import { VideojuegoService } from '../../services/videojuego.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-lista-videojuegos',
  imports: [CommonModule],
  templateUrl: './lista-videojuegos.html',
  styleUrl: './lista-videojuegos.css'
})
export class ListaVideojuegos implements OnInit { // Esta clase va a tener el método ngOnInit()

  // Lista donde guardaremos los videojuegos recibidos.
  videojuegos: Videojuego[] = [];

  // Inyectamos el servicio.
  private videojuegoService = inject(VideojuegoService);
  private cdr = inject(ChangeDetectorRef);

  // Este método se ejecuta al iniciar el componente.
  ngOnInit(): void {
    this.cargarVideojuegos();
  }

  // Método que pide los datos al servicio.
  cargarVideojuegos(): void {
    this.videojuegoService.getVideojuegos().subscribe({
      next: (datos) => {
        this.videojuegos = datos;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar videojuegos', error);
        this.cdr.detectChanges();
      }
    });
  }
}