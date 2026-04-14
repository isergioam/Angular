import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaBorrarPage } from './reserva-borrar-page';

describe('ReservaBorrarPage', () => {
  let component: ReservaBorrarPage;
  let fixture: ComponentFixture<ReservaBorrarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaBorrarPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservaBorrarPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
