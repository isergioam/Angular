import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Videojuego } from '../models/videojuego';

@Injectable({
  providedIn: 'root'
})
export class VideojuegoService {

  // Inyectamos HttpClient.
  private http = inject(HttpClient);

  // URL base del endpoint del backend.
  private apiUrl = 'http://localhost:8080/api/videojuegos';

  // Método para obtener todos los videojuegos.
  getVideojuegos(): Observable<Videojuego[]> {
    return this.http.get<Videojuego[]>(this.apiUrl);
  }
}