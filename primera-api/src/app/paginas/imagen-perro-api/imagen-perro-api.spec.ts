import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenPerroApi } from './imagen-perro-api';

describe('ImagenPerroApi', () => {
  let component: ImagenPerroApi;
  let fixture: ComponentFixture<ImagenPerroApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagenPerroApi],
    }).compileComponents();

    fixture = TestBed.createComponent(ImagenPerroApi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
