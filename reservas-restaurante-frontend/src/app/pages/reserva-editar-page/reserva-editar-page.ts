import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reserva-editar-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="contenedor">
      <h1>Editar reserva</h1>
      <p>Esta pantalla se desarrollará en una fase posterior.</p>
      <a routerLink="/reservas">Volver al listado</a>
    </section>
  `,
  styles: [`.contenedor { padding: 24px; font-family: Arial, sans-serif; }`]
})
export class ReservaEditarPage {}