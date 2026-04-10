import { Component, OnInit, inject, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { RecipesService } from '../../core/services/recipes.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-borrar-receta',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './borrar-receta.html',
  styleUrl: './borrar-receta.css'
})
export class BorrarReceta implements OnInit {

  // Inyección de dependencias.
  private recipesService = inject(RecipesService);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);

  // Id actual de la receta.
  recipeId: number | null = null;

  // Receta que se va a mostrar para confirmar el borrado.
  recipe: Recipe | null = null;

  // Estados visuales.
  cargando: boolean = true;
  borrando: boolean = false;
  borradoExitoso: boolean = false;
  mensajeError: string = '';

  ngOnInit(): void {
    this.cargarReceta();
  }

  cargarReceta(): void {
    this.mensajeError = '';
    this.cargando = true;

    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      this.mensajeError = 'No se ha recibido el identificador de la receta.';
      this.cargando = false;
      return;
    }

    const id = Number(idParam);

    if (isNaN(id)) {
      this.mensajeError = 'El identificador de la receta no es válido.';
      this.cargando = false;
      return;
    }

    this.recipeId = id;

    this.recipesService.getRecipeById(id).subscribe({
      next: (respuesta) => {
        this.recipe = respuesta;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensajeError = 'No se pudo cargar la receta que quieres borrar.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  confirmarBorrado(): void {
    this.mensajeError = '';

    if (this.recipeId === null) {
      this.mensajeError = 'No hay un identificador válido para borrar la receta.';
      return;
    }

    this.borrando = true;

    this.recipesService.deleteRecipe(this.recipeId).subscribe({
      next: () => {
        this.borradoExitoso = true;
        this.borrando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensajeError = 'No se pudo borrar la receta. Inténtalo de nuevo.';
        this.borrando = false;
        this.cdr.detectChanges();
      }
    });
  }
}