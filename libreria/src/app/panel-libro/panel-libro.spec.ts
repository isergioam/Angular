import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelLibro } from './panel-libro';

describe('PanelLibro', () => {
  let component: PanelLibro;
  let fixture: ComponentFixture<PanelLibro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelLibro],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelLibro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
