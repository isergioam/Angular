import { Component, inject, ChangeDetectorRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { PostsApiService } from '../../services/posts-api.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-nuevo-post',
  imports: [ReactiveFormsModule],
  templateUrl: './nuevo-post.html',
  styleUrl: './nuevo-post.css'
})
export class NuevoPost {
  private postsApiService = inject(PostsApiService);
  private cdr = inject(ChangeDetectorRef);

  mensaje = '';
  error = '';
  postCreado?: Post;

  formulario = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    body: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]),
    userId: new FormControl(1, [
      Validators.required,
      Validators.min(1)
    ])
  });

  guardarPost(): void {
    // Si el formulario no es válido, no continuamos
    if (this.formulario.invalid) {
      this.error = 'Revisa los datos del formulario';
      this.mensaje = '';
      this.postCreado = undefined;
      this.cdr.detectChanges();
      return;
    }

    // Construimos el objeto a enviar
    const nuevoPost: Post = {
      title: this.formulario.value.title ?? '',
      body: this.formulario.value.body ?? '',
      userId: this.formulario.value.userId ?? 1
    };

    // Lanzamos la petición POST
    this.postsApiService.crearPost(nuevoPost).subscribe({
      next: (respuesta) => {
        this.mensaje = `Post creado correctamente con id ${respuesta.id}`;
        this.error = '';
        this.postCreado = respuesta;

        // Limpiamos el formulario
        this.formulario.reset({
          title: '',
          body: '',
          userId: 1
        });
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudo crear el post';
        this.mensaje = '';
        this.postCreado = undefined;
        this.cdr.detectChanges();
      }
    });
  }
}