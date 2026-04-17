import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../../../models/categoria.model';
import { Contacto } from '../../../../models/contacto.model';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { ContactoService } from '../../../../core/services/contacto.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-contacto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto-form.component.html',
  styleUrl: './contacto-form.component.css'
})
export class ContactoFormComponent implements OnInit, OnChanges {

  private fb = inject(FormBuilder);
  private categoriaService = inject(CategoriaService);
  private contactoService = inject(ContactoService);
  private cdr = inject(ChangeDetectorRef);

  @Input() contactoEditar: Contacto | null = null;

  @Output() contactoGuardado = new EventEmitter<void>();
  @Output() cancelarEdicion = new EventEmitter<void>();

  categorias: Categoria[] = [];
  error = '';
  guardando = false;

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(80)]],
    apellidos: ['', [Validators.required, Validators.maxLength(120)]],
    favorito: [false, [Validators.required]],
    categoriaId: this.fb.control<number | null>(null, [Validators.required]),
    telefonos: this.fb.array([]),
    emails: this.fb.array([])
  });

  ngOnInit(): void {
    this.cargarCategorias();
    if (!this.contactoEditar) {
      this.agregarTelefono();
      this.agregarEmail();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contactoEditar']) {
      this.cargarFormularioDesdeContacto();
    }
  }

  get telefonos(): FormArray {
    return this.form.get('telefonos') as FormArray;
  }

  get emails(): FormArray {
    return this.form.get('emails') as FormArray;
  }

  agregarTelefono(numero = '', tipo = ''): void {
    this.telefonos.push(
      this.fb.group({
        numero: [numero, Validators.required],
        tipo: [tipo, Validators.required]
      })
    );
  }

  eliminarTelefono(index: number): void {
    if (this.telefonos.length > 1) {
      this.telefonos.removeAt(index);
    }
  }

  agregarEmail(direccion = '', tipo = ''): void {
    this.emails.push(
      this.fb.group({
        direccion: [direccion, [Validators.required, Validators.email]],
        tipo: [tipo, Validators.required]
      })
    );
  }

  eliminarEmail(index: number): void {
    if (this.emails.length > 1) {
      this.emails.removeAt(index);
    }
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        this.cdr.detectChanges();

      },
      error: () => {
        this.error = 'No se pudieron cargar las categorías';
        this.cdr.detectChanges();
      }
    });
  }

 cargarFormularioDesdeContacto(): void {
    this.telefonos.clear();
    this.emails.clear();

    if (this.contactoEditar) {
      this.form.patchValue({
        nombre: this.contactoEditar.nombre,
        apellidos: this.contactoEditar.apellidos,
        favorito: this.contactoEditar.favorito,
        categoriaId: this.contactoEditar.categoriaId
      });

      this.contactoEditar.telefonos.forEach(t => this.agregarTelefono(t.numero, t.tipo));
      this.contactoEditar.emails.forEach(e => this.agregarEmail(e.direccion, e.tipo));
    } else {
      this.form.reset({
        nombre: '',
        apellidos: '',
        favorito: false,
        categoriaId: null
      });
      this.agregarTelefono();
      this.agregarEmail();
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardando = true;
    this.error = '';

    const peticion = this.contactoEditar
      ? this.contactoService.actualizarContacto(this.contactoEditar.id, this.form.value)
      : this.contactoService.crearContacto(this.form.value);

    peticion.subscribe({
      next: () => {
        this.guardando = false;
        this.contactoGuardado.emit();
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = this.contactoEditar
          ? 'No se pudo actualizar el contacto'
          : 'No se pudo guardar el contacto';
        this.guardando = false;
        this.cdr.detectChanges();
      }
    });
  }

  cancelar(): void {
    this.cancelarEdicion.emit();
  }
}