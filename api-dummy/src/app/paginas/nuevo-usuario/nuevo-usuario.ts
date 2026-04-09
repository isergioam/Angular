import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { UsuariosApiService } from '../../services/usuarios-api.service';

@Component({
  selector: 'app-nuevo-usuario',
  imports: [ReactiveFormsModule],
  templateUrl: './nuevo-usuario.html',
  styleUrl: './nuevo-usuario.css'
})
export class NuevoUsuario {
  private usuariosApiService = inject(UsuariosApiService);

  usuarioCreado?: Usuario;
  error = '';

  formulario = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    age: new FormControl(18, [Validators.required, Validators.min(1)])
  });

  guardarUsuario(): void {
    if (this.formulario.invalid) {
      this.error = 'Formulario inválido';
      this.usuarioCreado = undefined;
      return;
    }

    const nuevoUsuario: Usuario = {
      firstName: this.formulario.value.firstName ?? '',
      lastName: this.formulario.value.lastName ?? '',
      age: this.formulario.value.age ?? 18
    };

    this.usuariosApiService.crearUsuario(nuevoUsuario).subscribe({
      next: (respuesta) => {
        this.usuarioCreado = respuesta;
        this.error = '';
      },
      error: () => {
        this.error = 'No se pudo crear el usuario';
        this.usuarioCreado = undefined;
      }
    });
  }
}