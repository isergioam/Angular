import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../core/services/categoria.service';
import { CategoriaFormComponent } from '../categoria-form/categoria-form.component/categoria-form.component';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CommonModule, CategoriaFormComponent],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.css',
})
export class CategoriaListComponent implements OnInit {
  private categoriaService = inject(CategoriaService);
  private cdr = inject(ChangeDetectorRef);

  categorias: Categoria[] = [];
  categoriaEnEdicion: Categoria | null = null;
  cargando = true;
  error = '';

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.cargando = true;
    this.error = '';

    this.categoriaService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudieron cargar las categorías';
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

editar(categoria: Categoria): void {
    this.categoriaEnEdicion = categoria;
  }

  cancelarEdicion(): void {
    this.categoriaEnEdicion = null;
  }

  recargarTrasGuardar(): void {
    this.categoriaEnEdicion = null;
    this.cargarCategorias();
  }

  eliminar(categoria: Categoria): void {
    const confirmar = confirm(`¿Seguro que quieres eliminar la categoría "${categoria.nombre}"?`);

    if (!confirmar) {
      return;
    }

    this.categoriaService.eliminarCategoria(categoria.id).subscribe({
      next: () => {
        this.cargarCategorias();
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudo eliminar la categoría';
        this.cdr.detectChanges();
      }
    });
  }
}
