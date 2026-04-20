import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaApi {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/reservas';

  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  getReservasPorFecha(fecha: string): Observable<Reserva[]> {
    const params = new HttpParams().set('fecha', fecha);
    return this.http.get<Reserva[]>(`${this.apiUrl}/por-fecha`, { params });
  }

  getReservasEntreFechas(inicio: string, fin: string): Observable<Reserva[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<Reserva[]>(`${this.apiUrl}/entre-fechas`, { params });
  }

  getReservaPorId(id: number): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.apiUrl}/${id}`);
  }

  crearReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reserva);
  }

  actualizarReserva(id: number, reserva: Reserva): Observable<Reserva> {
    return this.http.put<Reserva>(`${this.apiUrl}/${id}`, reserva);
  }

  borrarReserva(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}