import { Component } from '@angular/core';

@Component({
  selector: 'app-info-curso',
  imports: [],
  templateUrl: './info-curso.html',
  styleUrl: './info-curso.css',
})
export class InfoCurso {
  horas = 'Duración: 40 horas';
  nombre = 'Introducción a Programación';
  profesor = 'Profesor: Juan Pérez';
}