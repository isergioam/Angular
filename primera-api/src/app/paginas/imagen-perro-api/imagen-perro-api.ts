import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { PerrosApiService } from '../../services/perros-api.service';

@Component({
  selector: 'app-imagen-perro-api',
  templateUrl: './imagen-perro-api.html',
  styleUrl: './imagen-perro-api.css',
})
export class ImagenPerroApiComponent implements OnInit {
  private perrosApiService = inject(PerrosApiService);
  private cdr = inject(ChangeDetectorRef);

  imagen = '';
  error = '';

  ngOnInit(): void {
    this.perrosApiService.getImagenAleatoria().subscribe({
      next: (respuesta) => {
        this.imagen = respuesta.message;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudo cargar la imagen';
        this.cdr.detectChanges();
      },
    });
  }
}
