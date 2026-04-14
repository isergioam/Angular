import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <header class="cabecera">
      <h1>Reservas Restaurante</h1>
      <nav>
        <a routerLink="/">Inicio</a>
        <a routerLink="/reservas">Reservas</a>
        <a routerLink="/reservas/nueva">Crear</a>
      </nav>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      .cabecera {
        padding: 16px 24px;
        background: #222;
        color: white;
        font-family: Arial, sans-serif;
      }

      nav {
        display: flex;
        gap: 16px;
        margin-top: 10px;
        flex-wrap: wrap;
      }

      a {
        color: white;
        text-decoration: none;
      }

      main {
        padding: 0;
      }
    `
  ]
})
export class App {}