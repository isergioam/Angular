import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-color-favorito',
  imports: [ReactiveFormsModule],
  templateUrl: './color-favorito.html',
  styleUrl: './color-favorito.css'
})
export class ColorFavorito {
  // Creamos un FormControl para controlar el input
  colorFavorito = new FormControl('');
}