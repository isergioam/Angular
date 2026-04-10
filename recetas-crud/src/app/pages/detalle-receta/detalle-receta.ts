import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { RecipesService } from '../../core/services/recipes.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-detalle-receta',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-receta.html',
  styleUrl: './detalle-receta.css',
})
export class DetalleReceta implements OnInit {
  // Servicio para acceder a la API.
  private recipesService = inject(RecipesService);

  private cdr = inject(ChangeDetectorRef);

  // Servicio de Angular para acceder a los parámetros de la ruta.
  private route = inject(ActivatedRoute);

  // Aquí guardaremos la receta obtenida.
  recipe: Recipe | null = null;

  // Control del estado de carga.
  cargando: boolean = true;

  // Mensaje de error si algo falla.
  error: string = '';

  ngOnInit(): void {
    this.cargarDetalle();
  }

  cargarDetalle(): void {
    // Obtenemos el parámetro id desde la URL.
    const idParam = this.route.snapshot.paramMap.get('id');

    // Validamos que exista.
    if (!idParam) {
      this.error = 'No se ha recibido el identificador de la receta.';
      this.cargando = true;
      return;
    }

    // Convertimos el valor de texto a número.
    const id = Number(idParam);

    // Validamos que el valor sea un número válido.
    if (isNaN(id)) {
      this.error = 'El identificador de la receta no es válido.';
      this.cargando = false;
      return;
    }

    // Iniciamos carga y limpiamos errores previos.
    this.cargando = true;
    this.error = '';

    this.recipesService.getRecipeById(id).subscribe({
      next: (respuesta) => {
        this.recipe = respuesta;
        console.log(respuesta);
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudo cargar el detalle de la receta.';
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }
}