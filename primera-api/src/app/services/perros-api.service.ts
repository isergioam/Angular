import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaPerro } from '../models/perro';

@Injectable({
  providedIn: 'root'
})
export class PerrosApiService {

  private http = inject(HttpClient);
  private apiUrl = 'https://dog.ceo/api/breeds/image/random';

  getImagenAleatoria(): Observable<RespuestaPerro> {
    return this.http.get<RespuestaPerro>(this.apiUrl);
  }
}