import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-libro',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario-libro.html',
  styleUrl: './formulario-libro.css'
})
export class FormLibro {
  // Creamos un FormGroup con tres controles
  formularioLibro = new FormGroup({
    titulo: new FormControl(''),
    autor: new FormControl(''),
    paginas: new FormControl(0)
  });

  mostrarDatos(): void {
    console.log(this.formularioLibro.value);
  }

  guardarLibro(): void {
    console.log('Datos enviados:', this.formularioLibro.value);
  }

}