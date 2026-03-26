import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { Bienvenida } from "./bienvenida/bienvenida";
import { InfoCurso } from "./info-curso/info-curso";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Bienvenida, InfoCurso],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('web-app');
}
