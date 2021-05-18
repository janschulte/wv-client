import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CurrentTimeButtonComponent } from './current-time-button.component';

describe('CurrentTimeButtonComponent', () => {
  let component: CurrentTimeButtonComponent;
  let fixture: ComponentFixture<CurrentTimeButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentTimeButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentTimeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
