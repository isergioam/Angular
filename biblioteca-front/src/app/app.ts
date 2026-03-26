import { Component, signal } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Header, Footer]
})
export class App {


  listado = [
    'Node.js',
    'Angular CLI',
    'Java'
  ];
}
