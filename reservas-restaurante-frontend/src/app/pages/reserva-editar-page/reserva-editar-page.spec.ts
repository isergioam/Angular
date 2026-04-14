import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaEditarPage } from './reserva-editar-page';

describe('ReservaEditarPage', () => {
  let component: ReservaEditarPage;
  let fixture: ComponentFixture<ReservaEditarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaEditarPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservaEditarPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
