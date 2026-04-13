import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Videojuego } from '../../models/videojuego';
import { VideojuegoService } from '../../services/videojuego.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-lista-videojuegos',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lista-videojuegos.html',
  styleUrl: './lista-videojuegos.css'
})
export class ListaVideojuegos implements OnInit { // Esta clase va a tener el método ngOnInit()

  // Lista donde guardaremos los videojuegos recibidos.
  videojuegos: Videojuego[] = [];

  // Si tiene valor, estamos editando ese videojuego.
  videojuegoEditandoId: number | null = null;

  // Inyectamos el servicio.
  private videojuegoService = inject(VideojuegoService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  // Formulario reactivo para crear videojuegos.
  formularioVideojuego = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(2)]],
    plataforma: ['', Validators.required],
    genero: ['', Validators.required],
    estado: ['', Validators.required],
    puntuacion: [0],
    horasJugadas: [0],
    favorito: [false]
  });

  // Este método se ejecuta al iniciar el componente.
  ngOnInit(): void {
    this.cargarVideojuegos();
  }

  // Método que pide los datos al servicio.
  cargarVideojuegos(): void {
    this.videojuegoService.getVideojuegos().subscribe({
      next: (datos) => {
        this.videojuegos = datos;
        this.cdr.detectChanges(); // Forzamos la detección de cambios para actualizar la vista con los nuevos datos.
      },
      error: (error) => {
        console.error('Error al cargar videojuegos', error);
        this.cdr.detectChanges(); // Forzamos la detección de cambios incluso si hay un error.
      }
    });
  }



  guardarVideojuego(): void {
    // Si el formulario no es válido, detenemos el proceso.
    if (this.formularioVideojuego.invalid) {
      console.log('Formulario no válido');
      this.formularioVideojuego.markAllAsTouched();
      return;
    }

    // Convertimos los valores del formulario en un objeto usable.
    const datosFormulario = this.formularioVideojuego.getRawValue() as Videojuego;

    // Si estamos editando, actualizamos. Si no, creamos.
    if (this.videojuegoEditandoId !== null) {
      this.videojuegoService.updateVideojuego(this.videojuegoEditandoId, datosFormulario).subscribe({
        next: () => {
          this.cargarVideojuegos();
          this.limpiarFormulario();
        },
        error: (error) => {
          console.error('Error al actualizar videojuego', error);
        }
      });
    } else {
      this.videojuegoService.createVideojuego(datosFormulario).subscribe({
        next: () => {
          this.cargarVideojuegos();
          this.limpiarFormulario();
          this.cdr.detectChanges(); // Forzamos la detección de cambios para actualizar la vista con el nuevo videojuego.
        },
        error: (error) => {
          console.error('Error al guardar videojuego', error);
          this.cdr.detectChanges(); // Forzamos la detección de cambios incluso si hay un error.
        }
      });
    }
  }

  // Carga en el formulario los datos del videojuego seleccionado.
  editarVideojuego(videojuego: Videojuego): void {
    this.videojuegoEditandoId = videojuego.id;

    this.formularioVideojuego.patchValue({
      titulo: videojuego.titulo,
      plataforma: videojuego.plataforma,
      genero: videojuego.genero,
      estado: videojuego.estado,
      puntuacion: videojuego.puntuacion,
      horasJugadas: videojuego.horasJugadas,
      favorito: videojuego.favorito
    });
  }

  // Método para borrar un videojuego, previa confirmación.
  borrarVideojuego(videojuego: Videojuego): void {
    const confirmarBorrado = confirm(`¿Seguro que quieres borrar el videojuego "${videojuego.titulo}"?`);

    if (!confirmarBorrado) {
      return;
    }

    this.videojuegoService.deleteVideojuego(videojuego.id).subscribe({
      next: () => {
        // Si justo estábamos editando ese videojuego, limpiamos el formulario.
        if (this.videojuegoEditandoId === videojuego.id) {
          this.limpiarFormulario();
          this.cdr.detectChanges(); // Forzamos la detección de cambios para actualizar la vista después de limpiar el formulario.
        }

        this.cargarVideojuegos();
      },
      error: (error) => {
        console.error('Error al borrar videojuego', error);
        this.cdr.detectChanges(); // Forzamos la detección de cambios incluso si hay un error.
      }
    });
  }


  // Devuelve el formulario a estado inicial.
  limpiarFormulario(): void {
    this.videojuegoEditandoId = null;

    this.formularioVideojuego.reset({
      titulo: '',
      plataforma: '',
      genero: '',
      estado: '',
      puntuacion: 0,
      horasJugadas: 0,
      favorito: false
    });
  }
}