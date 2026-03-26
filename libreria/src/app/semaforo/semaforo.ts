import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-semaforo',
  imports: [CommonModule],
  templateUrl: './semaforo.html',
  styleUrl: './semaforo.css',
})
export class Semaforo {
  estadoSemaforo: 'verde' | 'amarillo' | 'rojo' = 'verde';

  cambiarSemaforo() {
    if (this.estadoSemaforo === 'verde') {
      this.estadoSemaforo = 'amarillo';
    } else if (this.estadoSemaforo === 'amarillo') {
      this.estadoSemaforo = 'rojo';
    } else {
      this.estadoSemaforo = 'verde';
    }
  }
}
