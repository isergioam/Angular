import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormMatriculas } from "./form-matriculas/form-matriculas";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormMatriculas],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('matriculas');
}
