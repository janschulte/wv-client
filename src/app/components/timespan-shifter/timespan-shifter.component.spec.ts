import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimespanShifterComponent } from './timespan-shifter.component';

describe('TimespanShifterComponent', () => {
  let component: TimespanShifterComponent;
  let fixture: ComponentFixture<TimespanShifterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimespanShifterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimespanShifterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
