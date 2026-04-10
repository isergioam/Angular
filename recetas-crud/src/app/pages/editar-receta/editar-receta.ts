import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { RecipesService } from '../../core/services/recipes.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-editar-receta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './editar-receta.html',
  styleUrl: './editar-receta.css',
})
export class EditarReceta implements OnInit {
  // Inyección de dependencias.
  private fb = inject(FormBuilder);
  private recipesService = inject(RecipesService);
  private route = inject(ActivatedRoute);

  private cdr = inject(ChangeDetectorRef);

  // Guardamos aquí el id actual de la receta.
  recipeId: number | null = null;

  // Estados visuales.
  cargando: boolean = true;
  enviando: boolean = false;
  mensajeExito: string = '';
  mensajeError: string = '';

  // Formulario reactivo.
  formReceta = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    cuisine: ['', [Validators.required, Validators.minLength(3)]],
    difficulty: ['', [Validators.required]],
    prepTimeMinutes: [0, [Validators.required, Validators.min(1)]],
    cookTimeMinutes: [0, [Validators.required, Validators.min(1)]],
    servings: [1, [Validators.required, Validators.min(1)]],
    image: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
  });

  ngOnInit(): void {
    this.cargarReceta();
  }

  cargarReceta(): void {
    this.mensajeExito = '';
    this.mensajeError = '';

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
    this.cargando = true;

    this.recipesService.getRecipeById(id).subscribe({
      next: (recipe) => {
        // Rellenamos el formulario con los datos obtenidos.
        this.formReceta.patchValue({
          name: recipe.name,
          cuisine: recipe.cuisine,
          difficulty: recipe.difficulty,
          prepTimeMinutes: recipe.prepTimeMinutes,
          cookTimeMinutes: recipe.cookTimeMinutes,
          servings: recipe.servings,
          image: recipe.image,
        });

        this.cargando = false;
      },
      error: () => {
        this.mensajeError = 'No se pudo cargar la receta para editarla.';
        this.cargando = false;
      },
    });
  }

  guardarCambios(): void {
    this.mensajeExito = '';
    this.mensajeError = '';

    if (this.formReceta.invalid) {
      this.formReceta.markAllAsTouched();
      return;
    }

    if (this.recipeId === null) {
      this.mensajeError = 'No hay un identificador válido para actualizar la receta.';
      return;
    }

    this.enviando = true;

    const recetaActualizada: Partial<Recipe> = {
      name: this.formReceta.value.name ?? undefined,
      cuisine: this.formReceta.value.cuisine ?? undefined,
      difficulty: this.formReceta.value.difficulty ?? undefined,
      prepTimeMinutes: this.formReceta.value.prepTimeMinutes ?? undefined,
      cookTimeMinutes: this.formReceta.value.cookTimeMinutes ?? undefined,
      servings: this.formReceta.value.servings ?? undefined,
      image: this.formReceta.value.image ?? undefined,
    };

    this.recipesService.updateRecipe(this.recipeId, recetaActualizada).subscribe({
      next: (respuesta) => {
        this.mensajeExito = `Receta actualizada correctamente: ${respuesta.name}`;
        console.log(respuesta);
        this.enviando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensajeError = 'No se pudo actualizar la receta. Inténtalo de nuevo.';
        this.enviando = false;
        this.cdr.detectChanges();
      },
    });
  }

  campoNoValido(nombreCampo: string): boolean {
    const campo = this.formReceta.get(nombreCampo);
    return !!campo && campo.invalid && campo.touched;
  }
}

