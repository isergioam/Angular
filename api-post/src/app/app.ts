import { Component } from '@angular/core';
import { NuevoPost } from './paginas/nuevo-post/nuevo-post';

@Component({
  selector: 'app-root',
  imports: [NuevoPost],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}