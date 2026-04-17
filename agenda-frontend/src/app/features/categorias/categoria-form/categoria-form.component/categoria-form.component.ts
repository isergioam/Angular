import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { Categoria } from '../../../../models/categoria.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.css'
})
export class CategoriaFormComponent implements OnChanges {

  private fb = inject(FormBuilder);
  private categoriaService = inject(CategoriaService);
  private cdr = inject(ChangeDetectorRef);

  @Input() categoriaEditar: Categoria | null = null;

  @Output() categoriaGuardada = new EventEmitter<void>();
  @Output() cancelarEdicion = new EventEmitter<void>();

  error = '';
  guardando = false;

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoriaEditar']) {
      if (this.categoriaEditar) {
        this.form.patchValue({
          nombre: this.categoriaEditar.nombre
        });
      } else {
        this.form.reset();
      }
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();// Marcar todos los campos como tocados para mostrar los errores
      return;
    }

    this.guardando = true;
    this.error = '';

const payload = {
      nombre: this.form.value.nombre ?? ''
    };

    const peticion = this.categoriaEditar
      ? this.categoriaService.actualizarCategoria(this.categoriaEditar.id, payload)
      : this.categoriaService.crearCategoria(payload);

    peticion.subscribe({
      next: () => {
        this.form.reset();
        this.guardando = false;
        this.categoriaGuardada.emit();
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = this.categoriaEditar
          ? 'No se pudo actualizar la categoría'
          : 'No se pudo guardar la categoría';
        this.guardando = false;
        this.cdr.detectChanges();
      }
    });
  }

  cancelar(): void {
    this.form.reset();
    this.cancelarEdicion.emit();
  }
}