import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarReceta } from './editar-receta';

describe('EditarReceta', () => {
  let component: EditarReceta;
  let fixture: ComponentFixture<EditarReceta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarReceta],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarReceta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
