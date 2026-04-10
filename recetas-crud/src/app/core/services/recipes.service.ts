import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Recipe } from '../../models/recipe.model';
import { RecipesResponse } from '../../models/recipes-response.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  // inject() obtiene una instancia de HttpClient.
  private http = inject(HttpClient);

  // URL base de la API.
  private apiUrl = 'https://dummyjson.com/recipes';

  // Obtener todas las recetas.
  getRecipes(): Observable<RecipesResponse> {
    return this.http.get<RecipesResponse>(this.apiUrl);
  }

  // Obtener una receta por id.
  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  // Crear una receta nueva.
  createRecipe(recipe: Partial<Recipe>): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.apiUrl}/add`, recipe);
  }

  // Actualizar una receta existente.
  updateRecipe(id: number, recipe: Partial<Recipe>): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.apiUrl}/${id}`, recipe);
  }

  // Eliminar una receta.
  deleteRecipe(id: number): Observable<Recipe> {
    return this.http.delete<Recipe>(`${this.apiUrl}/${id}`);
  }
}