import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRecetaApi } from './detalle-receta-api';

describe('DetalleRecetaApi', () => {
  let component: DetalleRecetaApi;
  let fixture: ComponentFixture<DetalleRecetaApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleRecetaApi],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleRecetaApi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
