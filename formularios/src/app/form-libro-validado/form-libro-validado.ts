import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-form-libro-validado',
  imports: [ReactiveFormsModule],
  templateUrl: './form-libro-validado.html',
  styleUrl: './form-libro-validado.css'
})
export class FormLibroValidado {
  formularioLibro = new FormGroup({
    titulo: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    autor: new FormControl('', [
      Validators.required
    ]),
    paginas: new FormControl(1, [
      Validators.required,
      Validators.min(1)
    ])
  });

  guardarLibro(): void {
    if (this.formularioLibro.invalid) {
      console.log('Formulario no válido');
      return;
    }

    console.log('Libro válido:', this.formularioLibro.value);
    this.formularioLibro.reset();
  }
}