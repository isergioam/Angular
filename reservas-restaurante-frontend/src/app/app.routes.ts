import { Routes } from '@angular/router';
import { InicioPage } from './pages/inicio-page/inicio-page';
import { ReservasListadoPage } from './pages/reservas-listado-page/reservas-listado-page';
import { ReservaCrearPage } from './pages/reserva-crear-page/reserva-crear-page';
import { ReservaEditarPage } from './pages/reserva-editar-page/reserva-editar-page';
import { ReservaBorrarPage } from './pages/reserva-borrar-page/reserva-borrar-page';

export const routes: Routes = [
  {
    path: '',
    component: InicioPage
  },
  {
    path: 'reservas',
    component: ReservasListadoPage
  },
  {
    path: 'reservas/nueva',
    component: ReservaCrearPage
  },
  {
    path: 'reservas/editar/:id',
    component: ReservaEditarPage
  },
  {
    path: 'reservas/borrar/:id',
    component: ReservaBorrarPage
  }
];