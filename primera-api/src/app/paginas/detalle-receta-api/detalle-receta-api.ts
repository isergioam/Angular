import { Component, OnInit, inject, ChangeDetectorRef, Pipe } from '@angular/core';
import { RecetasApiService } from '../../services/recetas-api.service';
import { Receta } from '../../models/receta';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detalle-receta-api',
  standalone: true,
  imports: [], // Es un componente standalone, la propiedad 'imports' es válida.
  templateUrl: './detalle-receta-api.html',
  styleUrl: './detalle-receta-api.css',
})
export class DetalleRecetasApi implements OnInit {

  private recetasApiService = inject(RecetasApiService);

  private sanitizer = inject(DomSanitizer);

  private cdr = inject(ChangeDetectorRef);

  receta: Receta[] = [];
  cargando = true;
  error = '';

  get ingredientes() {
    const ingredientes: Array<{ nombre: string, cant: string }> = [];

    // Evita el error si el array aún está vacío antes de recibir los datos
    if (!this.receta || this.receta.length === 0) {
      return ingredientes;
    }

    for (let i = 1; i <= 20; i++) {
      const ingrediente = (this.receta[0] as any)[`strIngredient${i}`];
      const medida = (this.receta[0] as any)[`strMeasure${i}`];
      if (ingrediente && ingrediente.trim() !== '') {
        ingredientes.push({ nombre: ingrediente, cant: medida });
      } else {
        break;
      }
    }
    return ingredientes;
  }

  ngOnInit(): void {
    this.recetasApiService.getRecetas().subscribe({
      next: (datos) => {
        console.log('Datos recibidos:', datos);
        this.receta = datos;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error real:', err);
        this.error = 'No se pudieron cargar las receta';
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

    // Método que cambia la url de youtube para utilizar embed
  cambiarUrlYoutube(url: string): SafeResourceUrl {
    if (!url) {
      return '';
    }
    const urlModificada = url.replace('watch?v=', 'embed/');
    return this.sanitizer.bypassSecurityTrustResourceUrl(urlModificada);
  }
}
