import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioReservasPage } from './calendario-reservas-page';

describe('CalendarioReservasPage', () => {
  let component: CalendarioReservasPage;
  let fixture: ComponentFixture<CalendarioReservasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarioReservasPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarioReservasPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
