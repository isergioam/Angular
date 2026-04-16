import { Routes } from '@angular/router';
import { CategoriaListComponent } from './features/categorias/categoria-list/categoria-list.component/categoria-list.component';
import { ContactoListComponent } from './features/contactos/contacto-list/contacto-list.component/contacto-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'categorias',
    pathMatch: 'full'
  },
  {
    path: 'categorias',
    component: CategoriaListComponent
  },
  {
    path: 'contactos',
    component: ContactoListComponent
  }
];