import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPelisApi } from './lista-pelis-api';

describe('ListaPelisApi', () => {
  let component: ListaPelisApi;
  let fixture: ComponentFixture<ListaPelisApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPelisApi],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaPelisApi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
