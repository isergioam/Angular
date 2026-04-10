import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-encontrada',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="no-encontrada">
      <h2>Página no encontrada</h2>
      <p>La ruta a la que intentas acceder no existe.</p>
      <a routerLink="/">Volver al inicio</a>
    </section>
  `,
  styles: [`
    .no-encontrada {
      text-align: center;
      padding: 2rem 0;
    }

    .no-encontrada a {
      text-decoration: none;
      color: #1d4ed8;
      font-weight: bold;
    }
  `]
})
export class NoEncontrada {}