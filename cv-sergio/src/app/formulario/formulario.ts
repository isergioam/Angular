import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {
  formularioContacto = new FormGroup({
    Nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    Email: new FormControl('', [
      Validators.required
    ]),
    Teléfono: new FormControl(1, [
      Validators.required,
      Validators.min(1)
    ])
  });

  guardarContacto(): void {
    if (this.formularioContacto.invalid) {
      console.log('Formulario no válido');
      return;
    }

    console.log('Contacto válido:', this.formularioContacto.value);
    this.formularioContacto.reset();
  }
}