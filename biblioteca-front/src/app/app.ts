import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Propiedad que podremos mostrar en la plantilla
  titulo = 'Biblioteca Front';
  subtitulo = 'Mi primera aplicación con Angular';
}
