import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoRecetas } from './listado-recetas';

describe('ListadoRecetas', () => {
  let component: ListadoRecetas;
  let fixture: ComponentFixture<ListadoRecetas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoRecetas],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoRecetas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
