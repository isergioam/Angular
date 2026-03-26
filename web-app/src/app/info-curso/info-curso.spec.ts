import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCurso } from './info-curso';

describe('InfoCurso', () => {
  let component: InfoCurso;
  let fixture: ComponentFixture<InfoCurso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCurso],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoCurso);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
