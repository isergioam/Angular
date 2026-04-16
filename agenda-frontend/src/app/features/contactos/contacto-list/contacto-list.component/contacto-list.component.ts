import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contacto } from '../../../../models/contacto.model';
import { ContactoService } from '../../../../core/services/contacto.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-contacto-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacto-list.component.html',
  styleUrl: './contacto-list.component.css'
})
export class ContactoListComponent implements OnInit {

  private contactoService = inject(ContactoService);
  private cdr = inject(ChangeDetectorRef);

  contactos: Contacto[] = [];
  cargando = true;
  error = '';

  ngOnInit(): void {
    this.contactoService.getContactos().subscribe({
      next: (data) => {
        this.contactos = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudieron cargar los contactos';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
}