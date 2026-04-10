import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="inicio">
      <div class="hero">
        <h2>Bienvenido a Recetas Locas</h2>
        <p>
          Aplicación de ejemplo para practicar un CRUD completo en Angular
          consumiendo una API pública de recetas.
        </p>

        <div class="acciones">
          <a routerLink="/recetas">Ver listado</a>
          <a routerLink="/crear">Crear una receta</a>
        </div>
      </div>

      <div class="bloques">
        <article>
          <h3>Qué puedes hacer</h3>
          <ul>
            <li>Consultar recetas existentes</li>
            <li>Ver el detalle de una receta</li>
            <li>Crear nuevas recetas</li>
            <li>Editar información</li>
            <li>Borrar registros con confirmación</li>
          </ul>
        </article>

        <article>
          <h3>Qué se practica</h3>
          <ul>
            <li>Rutas y navegación</li>
            <li>Servicios y HttpClient</li>
            <li>Formularios reactivos</li>
            <li>Métodos HTTP del CRUD</li>
            <li>Gestión de estados y mensajes</li>
          </ul>
        </article>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      text-align: center;
      padding: 1rem 0 2rem;
    }

    .hero h2 {
      margin-top: 0;
      font-size: 2rem;
      color: #0f172a;
    }

    .hero p {
      max-width: 700px;
      margin: 0.8rem auto 0;
      color: #475569;
      line-height: 1.6;
    }

    .acciones {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .acciones a {
      text-decoration: none;
      background-color: #1d4ed8;
      color: white;
      padding: 0.9rem 1.2rem;
      border-radius: 10px;
      font-weight: bold;
    }

    .bloques {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
      margin-top: 1rem;
    }

    .bloques article {
      background-color: #f8fbff;
      border: 1px solid #dbeafe;
      border-radius: 14px;
      padding: 1.2rem;
    }

    .bloques h3 {
      margin-top: 0;
    }

    .bloques ul {
      padding-left: 1.2rem;
      margin-bottom: 0;
    }

    @media (max-width: 800px) {
      .bloques {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class Inicio {}