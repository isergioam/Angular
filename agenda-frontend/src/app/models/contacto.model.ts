import { Telefono } from './telefono.model';
import { Email } from './email.model';

export interface Contacto {
  id: number;
  nombre: string;
  apellidos: string;
  favorito: boolean;
  categoriaId: number;
  categoriaNombre: string;
  telefonos: Telefono[];
  emails: Email[];
}