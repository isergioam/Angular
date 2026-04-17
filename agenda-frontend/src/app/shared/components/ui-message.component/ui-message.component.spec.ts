import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiMessageComponent } from './ui-message.component';

describe('UiMessageComponent', () => {
  let component: UiMessageComponent;
  let fixture: ComponentFixture<UiMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiMessageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
