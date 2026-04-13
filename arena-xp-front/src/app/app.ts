import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaVideojuegos } from './components/lista-videojuegos/lista-videojuegos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListaVideojuegos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('arena-xp-front');
}
