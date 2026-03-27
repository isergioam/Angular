import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMatriculas } from './form-matriculas';

describe('FormMatriculas', () => {
  let component: FormMatriculas;
  let fixture: ComponentFixture<FormMatriculas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMatriculas],
    }).compileComponents();

    fixture = TestBed.createComponent(FormMatriculas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
