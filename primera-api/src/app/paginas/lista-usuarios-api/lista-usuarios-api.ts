import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { UsuariosApiService } from '../../services/usuarios-api.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-lista-usuarios-api',
  templateUrl: './lista-usuarios-api.html',
  styleUrl: './lista-usuarios-api.css',
})
export class ListaUsuariosApiComponent implements OnInit {
  private usuariosApiService = inject(UsuariosApiService);

  private cdr = inject(ChangeDetectorRef);

  usuarios: Usuario[] = [];
  cargando = true;
  error = '';

  ngOnInit(): void {
    this.usuariosApiService.getUsuarios().subscribe({
      next: (datos) => {
        console.log('Datos recibidos:', datos);
        this.usuarios = datos;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error real:', err);
        this.error = 'No se pudieron cargar los usuarios';
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }
}

