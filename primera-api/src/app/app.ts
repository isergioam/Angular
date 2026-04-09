import { Component, signal } from '@angular/core';
import { ListaUsuariosApiComponent } from './paginas/lista-usuarios-api/lista-usuarios-api';
import { DetallePostApiComponent } from './paginas/detalle-post-api/detalle-post-api';
import { ImagenPerroApiComponent } from './paginas/imagen-perro-api/imagen-perro-api';
import { ListaPelisApiComponent } from './paginas/lista-pelis-api/lista-pelis-api';
import { DetalleRecetasApi } from "./paginas/detalle-receta-api/detalle-receta-api";

@Component({
  selector: 'app-root',
  imports: [ListaUsuariosApiComponent, DetallePostApiComponent, ImagenPerroApiComponent, ListaPelisApiComponent, DetalleRecetasApi],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('primera-api');
}
