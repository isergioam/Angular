import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoPost } from './nuevo-post';

describe('NuevoPost', () => {
  let component: NuevoPost;
  let fixture: ComponentFixture<NuevoPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoPost],
    }).compileComponents();

    fixture = TestBed.createComponent(NuevoPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
