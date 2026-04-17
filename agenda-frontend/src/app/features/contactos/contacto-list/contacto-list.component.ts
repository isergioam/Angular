import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Contacto } from '../../../models/contacto.model';
import { ContactoService } from '../../../core/services/contacto.service';
import { CategoriaService } from '../../../core/services/categoria.service';
import { ChangeDetectorRef } from '@angular/core';
import { ContactoFormComponent } from '../contacto-form/contacto-form.component/contacto-form.component';
import { Categoria } from '../../../models/categoria.model';

@Component({
  selector: 'app-contacto-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ContactoFormComponent],
  templateUrl: './contacto-list.component.html',
  styleUrl: './contacto-list.component.css'
})
export class ContactoListComponent implements OnInit {

  private contactoService = inject(ContactoService);
  private categoriaService = inject(CategoriaService);
  private cdr = inject(ChangeDetectorRef);

  contactos: Contacto[] = [];
  categorias: Categoria[] = [];
  contactoEnEdicion: Contacto | null = null;

  textoBusqueda = '';
  categoriaSeleccionada: number | null = null;
  soloFavoritos = false;

  cargando = true;
  error = '';


  ngOnInit(): void {
    this.cargarCategorias();
    this.buscar();
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        this.cdr.detectChanges();
      }
    });
  }

  buscar(): void {
    this.cargando = true;
    this.error = '';

    this.contactoService.buscarContactos(
      this.textoBusqueda,
      this.categoriaSeleccionada,
      this.soloFavoritos
    ).subscribe({
      next: (data) => {
        this.contactos = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los contactos';
        this.cargando = false;
      }
    });
  }

  limpiarFiltros(): void {
    this.textoBusqueda = '';
    this.categoriaSeleccionada = null;
    this.soloFavoritos = false;
    this.buscar();
  }

  editar(contacto: Contacto): void {
    this.contactoEnEdicion = contacto;
  }

  cancelarEdicion(): void {
    this.contactoEnEdicion = null;
  }

  recargarTrasGuardar(): void {
    this.contactoEnEdicion = null;
    this.buscar();
  }

  eliminar(contacto: Contacto): void {
    const confirmar = confirm(`¿Seguro que quieres eliminar a ${contacto.nombre} ${contacto.apellidos}?`);

    if (!confirmar) {
      return;
    }

    this.contactoService.eliminarContacto(contacto.id).subscribe({
      next: () => this.buscar(),
      error: () => {
        this.error = 'No se pudo eliminar el contacto';
      }
    });
  }

  toggleFavorito(contacto: Contacto): void {
    this.contactoService.cambiarFavorito(contacto.id, !contacto.favorito).subscribe({
      next: () => this.buscar(),
      error: () => {
        this.error = 'No se pudo actualizar el estado favorito';
      }
    });
  }
}