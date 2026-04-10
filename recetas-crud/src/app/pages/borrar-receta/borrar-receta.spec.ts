import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarReceta } from './borrar-receta';

describe('BorrarReceta', () => {
  let component: BorrarReceta;
  let fixture: ComponentFixture<BorrarReceta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrarReceta],
    }).compileComponents();

    fixture = TestBed.createComponent(BorrarReceta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
