import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NuevoPost } from './paginas/nuevo-post/nuevo-post';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NuevoPost],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('api-post');
}
