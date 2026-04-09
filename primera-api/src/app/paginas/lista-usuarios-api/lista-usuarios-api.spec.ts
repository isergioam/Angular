import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaUsuariosApiComponent } from './lista-usuarios-api';

describe('ListaUsuariosApiComponent', () => {
  let component: ListaUsuariosApiComponent;
  let fixture: ComponentFixture<ListaUsuariosApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaUsuariosApiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaUsuariosApiComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
