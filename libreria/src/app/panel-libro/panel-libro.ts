import { Component } from '@angular/core';

@Component({
  selector: 'app-panel-libro',
  imports: [],
  templateUrl: './panel-libro.html',
  styleUrl: './panel-libro.css',
})
export class PanelLibro {
  titulo = 'El Gran Gatsby';
  autor = 'F. Scott Fitzgerald';
  descripcion = 'Una novela clásica que explora el sueño americano y la decadencia de la sociedad en los años 20.';
  stock = 5;
  disponibilidad = true; // Cambia a true para mostrar "Disponible"
  msjDisponibilidad = 'Disponible';

  comprobarStock(){
    if(this.stock > 0){
      this.stock--;
      this.disponibilidad = true;
      this.msjDisponibilidad = 'Disponible';
    } else {
      this.disponibilidad = false;
      this.msjDisponibilidad = 'No Disponible';
    }
  }

  cambiarDisponibilidad() {
    this.disponibilidad = !this.disponibilidad;
    this.msjDisponibilidad = this.disponibilidad ? 'Disponible' : 'No Disponible';
  }

}
