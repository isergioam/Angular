import { Component } from '@angular/core';

@Component({
  selector: 'app-formacion',
  imports: [],
  templateUrl: './formacion.html',
  styleUrl: './formacion.css',
})
export class Formacion {

    formaciones = [
     { id: 1, nombre: 'Fullstack Junior Web Developer con Java', Anno: 'Actualidad', Centro: 'CFFE. Remedios Rojo' }, 
    { id: 2, nombre: 'CFGS. Administración de Sistemas Informáticos en Red', Anno: '2010 - 2013', Centro: 'IES. Politécnico Jesús Marín' },
    { id: 3, nombre: 'Bachillerato', Anno: '2005 - 2008', Centro: 'IES. Politécnico Jesús Marín' }
  ];
}
