import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TimespanButtonComponent } from './timespan-button.component';

describe('TimespanButtonComponent', () => {
  let component: TimespanButtonComponent;
  let fixture: ComponentFixture<TimespanButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimespanButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimespanButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
