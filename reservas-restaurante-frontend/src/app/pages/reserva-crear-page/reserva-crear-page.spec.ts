import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaCrearPage } from './reserva-crear-page';

describe('ReservaCrearPage', () => {
  let component: ReservaCrearPage;
  let fixture: ComponentFixture<ReservaCrearPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaCrearPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservaCrearPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
