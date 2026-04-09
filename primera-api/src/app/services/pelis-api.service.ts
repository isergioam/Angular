import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Peli } from '../models/peli';

@Injectable({
  providedIn: 'root'
})
export class PelisApiService {

  private http = inject(HttpClient);
  private apiUrl = 'https://ghibliapi.vercel.app/films';

  getPelis(): Observable<Peli[]> {
    return this.http.get<Peli[]>(this.apiUrl);
  }
}