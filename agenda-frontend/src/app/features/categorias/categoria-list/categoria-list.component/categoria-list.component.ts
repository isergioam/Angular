import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../../../models/categoria.model';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.css',
})
export class CategoriaListComponent implements OnInit {
  private categoriaService = inject(CategoriaService);
  private cdr = inject(ChangeDetectorRef);

  categorias: Categoria[] = [];
  cargando = true;
  error = '';

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
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
}
