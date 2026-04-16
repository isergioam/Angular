import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}