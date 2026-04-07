import { Component } from '@angular/core';

@Component({
  selector: 'app-experiencia',
  imports: [],
  templateUrl: './experiencia.html',
  styleUrl: './experiencia.css',
})
export class Experiencia {

  experiencias = [
    { id: 1, puesto: 'Freelance', empresa: 'Autónomo', tiempo: 'Actualidad' },
    { id: 2, puesto: 'Especialista informático', empresa: 'Kankana Import SL.', tiempo: '2019 - 2020' },
    { id: 3, puesto: 'Front-End Developer', empresa: 'SolBooking', tiempo: '2018 - 2019' },
    { id: 4, puesto: 'BI Developer', empresa: 'Besoftware BSW', tiempo: '2017 - 2018' },
    { id: 5, puesto: 'Web Developer', empresa: 'Arelance', tiempo: '2014 - 2017' }
  ];

}
