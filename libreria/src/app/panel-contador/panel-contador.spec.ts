import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelContador } from './panel-contador';

describe('PanelContador', () => {
  let component: PanelContador;
  let fixture: ComponentFixture<PanelContador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelContador],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelContador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
