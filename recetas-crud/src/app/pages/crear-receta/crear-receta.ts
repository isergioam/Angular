import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { RecipesService } from '../../core/services/recipes.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-crear-receta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './crear-receta.html',
  styleUrl: './crear-receta.css',
})
export class CrearReceta {
  // Inyectamos el constructor de formularios.
  private fb = inject(FormBuilder);

  // Inyectamos el servicio que habla con la API.
  private recipesService = inject(RecipesService);

  // Indicador para mostrar que se está enviando el formulario.
  enviando: boolean = false;

  // Mensaje de éxito.
  mensajeExito: string = '';

  // Mensaje de error.
  mensajeError: string = '';

  // Construimos el formulario reactivo.
  formReceta = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    cuisine: ['', [Validators.required, Validators.minLength(3)]],
    difficulty: ['', [Validators.required]],
    prepTimeMinutes: [0, [Validators.required, Validators.min(1)]],
    cookTimeMinutes: [0, [Validators.required, Validators.min(1)]],
    servings: [1, [Validators.required, Validators.min(1)]],
    image: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
  });

  guardarReceta(): void {
    // Limpiamos mensajes anteriores.
    this.mensajeExito = '';
    this.mensajeError = '';

    // Si el formulario no es válido, marcamos todos los campos como tocados.
    if (this.formReceta.invalid) {
      this.formReceta.markAllAsTouched();
      return;
    }

    this.enviando = true;

    // Preparamos el objeto que enviaremos a la API.
    // Convertimos null a undefined para compatibilidad con el tipo Partial<Recipe>.
    const formValue = this.formReceta.value;
    const recetaNueva = {
      name: formValue.name ?? undefined,
      cuisine: formValue.cuisine ?? undefined,
      difficulty: formValue.difficulty ?? undefined,
      prepTimeMinutes: formValue.prepTimeMinutes ?? undefined,
      cookTimeMinutes: formValue.cookTimeMinutes ?? undefined,
      servings: formValue.servings ?? undefined,
      image: formValue.image ?? undefined,
      ingredients: ['Ingrediente pendiente de definir'],
      instructions: ['Instrucción pendiente de definir'],
      tags: ['nueva'],
      mealType: ['Dinner'],
    };

    this.recipesService.createRecipe(recetaNueva).subscribe({
      next: (respuesta) => {
        this.mensajeExito = `Receta creada correctamente: ${respuesta.name}`;
        this.enviando = false;

        // Reiniciamos el formulario con algunos valores base.
        this.formReceta.reset({
          name: '',
          cuisine: '',
          difficulty: '',
          prepTimeMinutes: 0,
          cookTimeMinutes: 0,
          servings: 1,
          image: '',
        });
      },
      error: () => {
        this.mensajeError = 'No se pudo crear la receta. Inténtalo de nuevo.';
        this.enviando = false;
      },
    });
  }

  // Método de ayuda para la plantilla.
  campoNoValido(nombreCampo: string): boolean {
    const campo = this.formReceta.get(nombreCampo);
    return !!campo && campo.invalid && campo.touched;
  }
}
