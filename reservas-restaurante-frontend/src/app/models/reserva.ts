import { Mesa } from './mesa';

export interface Reserva {
  id?: number;
  nombreCliente: string;
  telefono: string;
  fechaReserva: string;
  horaReserva: string;
  numeroPersonas: number;
  observaciones: string;
  mesa: Mesa;
}