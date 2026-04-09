import { Component, signal } from '@angular/core';
import { NuevoUsuario } from './paginas/nuevo-usuario/nuevo-usuario';

@Component({
  selector: 'app-root',
  imports: [NuevoUsuario],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('api-dummy');
}
