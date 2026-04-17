import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contacto } from '../../models/contacto.model';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/contactos';

  getContactos(): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(this.apiUrl);
  }
  getContactoById(id: number): Observable<Contacto> {
    return this.http.get<Contacto>(`${this.apiUrl}/${id}`);
  }

  crearContacto(data: any): Observable<Contacto> {
    return this.http.post<Contacto>(this.apiUrl, data);
  }

  actualizarContacto(id: number, data: any): Observable<Contacto> {
    return this.http.put<Contacto>(`${this.apiUrl}/${id}`, data);
  }

  eliminarContacto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buscarContactos(texto?: string, categoriaId?: number | null, soloFavoritos?: boolean): Observable<Contacto[]> {
    let params = new HttpParams();

    if (texto) {
      params = params.set('texto', texto);
    }

    if (categoriaId !== null && categoriaId !== undefined) {
      params = params.set('categoriaId', categoriaId);
    }

    if (soloFavoritos) {
      params = params.set('soloFavoritos', true);
    }

    return this.http.get<Contacto[]>(`${this.apiUrl}/buscar`, { params });
  }

  cambiarFavorito(id: number, favorito: boolean): Observable<Contacto> {
    return this.http.patch<Contacto>(`${this.apiUrl}/${id}/favorito?favorito=${favorito}`, {});
  }
}