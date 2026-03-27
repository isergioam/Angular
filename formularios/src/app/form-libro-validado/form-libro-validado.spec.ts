import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLibroValidado } from './form-libro-validado';

describe('FormLibroValidado', () => {
  let component: FormLibroValidado;
  let fixture: ComponentFixture<FormLibroValidado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormLibroValidado],
    }).compileComponents();

    fixture = TestBed.createComponent(FormLibroValidado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
