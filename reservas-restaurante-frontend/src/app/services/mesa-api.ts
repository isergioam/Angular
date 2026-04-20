import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mesa } from '../models/mesa';
import { MesaEstado } from '../models/mesa-estado';

@Injectable({
  providedIn: 'root'
})
export class MesaApi {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/mesas';

  getMesasActivas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(this.apiUrl);
  }

  getMesasDisponibles(fecha: string, hora: string, personas: number): Observable<Mesa[]> {
    const params = new HttpParams()
      .set('fecha', fecha)
      .set('hora', hora)
      .set('personas', personas);

    return this.http.get<Mesa[]>(`${this.apiUrl}/disponibles`, { params });
  }

  getEstadoMesas(fecha: string, hora: string): Observable<MesaEstado[]> {
    const params = new HttpParams()
      .set('fecha', fecha)
      .set('hora', hora);

    return this.http.get<MesaEstado[]>(`${this.apiUrl}/estado`, { params });
  }
}