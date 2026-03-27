import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-matriculas',
  imports: [ReactiveFormsModule],
  templateUrl: './form-matriculas.html',
  styleUrl: './form-matriculas.css',
})
export class FormMatriculas {
  formularioMatricula = new FormGroup({
    dni: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9)
    ]),
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    apellidos: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    curso: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ])
  });
  

  guardarAlumno(): void {
    if (this.formularioMatricula.invalid) {
      console.log('Formulario no válido');
      return;
    }

    console.log('Alumno válido:', this.formularioMatricula.value);
    this.formularioMatricula.reset();
  }
}