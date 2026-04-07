import { Component, signal } from '@angular/core';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { Inicio } from './inicio/inicio';
import { Formacion } from './formacion/formacion';
import { Formulario } from './formulario/formulario';
import { Experiencia } from './experiencia/experiencia';
import { Habilidades } from './habilidades/habilidades';
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [Header, Footer, Inicio, Formacion, Formulario, Experiencia, Habilidades, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cv-sergio');
}
