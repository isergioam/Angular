import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePostApi } from './detalle-post-api';

describe('DetallePostApi', () => {
  let component: DetallePostApi;
  let fixture: ComponentFixture<DetallePostApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallePostApi],
    }).compileComponents();

    fixture = TestBed.createComponent(DetallePostApi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
