import { Component } from '@angular/core';

@Component({
  selector: 'app-panel-contador',
  imports: [],
  templateUrl: './panel-contador.html',
  styleUrl: './panel-contador.css',
})
export class PanelContador {
  contador = 0;

  incrementar() {
    this.contador++;
  }

  decrementar() {
    this.contador--;
  }

  resetear() {
    this.contador = 0;
  }

}
