import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelMesasPage } from './panel-mesas-page';

describe('PanelMesasPage', () => {
  let component: PanelMesasPage;
  let fixture: ComponentFixture<PanelMesasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelMesasPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelMesasPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
