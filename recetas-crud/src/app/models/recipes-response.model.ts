import { Recipe } from './recipe.model';

// Esta interfaz representa la respuesta cuando pedimos el listado de recetas.
export interface RecipesResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}