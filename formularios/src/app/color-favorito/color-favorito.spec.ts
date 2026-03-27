import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorFavorito } from './color-favorito';

describe('ColorFavorito', () => {
  let component: ColorFavorito;
  let fixture: ComponentFixture<ColorFavorito>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorFavorito],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorFavorito);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
