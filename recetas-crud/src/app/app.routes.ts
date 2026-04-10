import { Routes } from '@angular/router';

import { Inicio } from './pages/inicio/inicio';
import { ListadoRecetas } from './pages/listado-recetas/listado-recetas';
import { DetalleReceta } from './pages/detalle-receta/detalle-receta';
import { CrearReceta } from './pages/crear-receta/crear-receta';
import { EditarReceta } from './pages/editar-receta/editar-receta';
import { BorrarReceta } from './pages/borrar-receta/borrar-receta';
import { NoEncontrada } from './pages/no-encontrada/no-encontrada';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'recetas', component: ListadoRecetas },
  { path: 'recetas/:id', component: DetalleReceta },
  { path: 'crear', component: CrearReceta },
  { path: 'editar/:id', component: EditarReceta },
  { path: 'borrar/:id', component: BorrarReceta },
  { path: '**', component: NoEncontrada }
];