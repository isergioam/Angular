import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PanelLibro } from "./panel-libro/panel-libro";
import { PanelContador } from './panel-contador/panel-contador';
import { Semaforo } from './semaforo/semaforo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PanelLibro, PanelContador, Semaforo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('libreria');
}
