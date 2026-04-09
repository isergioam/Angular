import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Receta } from '../models/receta';

@Injectable({
  providedIn: 'root'
})
export class RecetasApiService {

  private http = inject(HttpClient);
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

  getRecetas(): Observable<Receta[]> {
    return this.http.get<{ meals: Receta[] }>(this.apiUrl).pipe(
      map(response => response.meals || [])
    );
  }
}