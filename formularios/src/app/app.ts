import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColorFavorito } from './color-favorito/color-favorito';
import { FormLibro } from "./formulario-libro/formulario-libro";
import { FormLibroValidado } from "./form-libro-validado/form-libro-validado";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ColorFavorito, FormLibro, FormLibroValidado],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('formularios');
}
