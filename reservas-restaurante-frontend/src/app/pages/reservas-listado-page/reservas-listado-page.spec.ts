import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasListadoPage } from './reservas-listado-page';

describe('ReservasListadoPage', () => {
  let component: ReservasListadoPage;
  let fixture: ComponentFixture<ReservasListadoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservasListadoPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservasListadoPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
