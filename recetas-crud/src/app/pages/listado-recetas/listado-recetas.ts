import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { RecipesService } from '../../core/services/recipes.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-listado-recetas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listado-recetas.html',
  styleUrl: './listado-recetas.css',
})
export class ListadoRecetas implements OnInit {
  // Inyectamos el servicio que se encarga de hablar con la API.
  private recipesService = inject(RecipesService);

  private cdr = inject(ChangeDetectorRef);

  // Aquí guardaremos el array de recetas recibido.
  recipes: Recipe[] = [];

  // Número total de recetas que informa la API.
  total: number = 0;

  // Indicador para mostrar un mensaje de carga.
  cargando: boolean = false;

  // Indicador para guardar mensajes de error.
  error: string = '';

  ngOnInit(): void {
    this.cargarRecetas();
  }

  cargarRecetas(): void {
    // Activamos el estado de carga y limpiamos errores previos.
    this.cargando = true;
    this.error = '';

    this.recipesService.getRecipes().subscribe({
      next: (respuesta) => {
        // La API devuelve un objeto. El array real está en respuesta.recipes.
        this.recipes = respuesta.recipes;
        this.total = respuesta.total;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudieron cargar las recetas. Inténtalo de nuevo.';
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }
}
