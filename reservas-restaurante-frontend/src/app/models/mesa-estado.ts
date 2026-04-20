export interface MesaEstado {
  idMesa: number;
  numeroMesa: number;
  capacidad: number;
  ubicacion: string;
  activa: boolean;
  ocupada: boolean;
  reservaId: number | null;
  nombreCliente: string | null;
  horaReserva: string | null;
  numeroPersonas: number | null;
}