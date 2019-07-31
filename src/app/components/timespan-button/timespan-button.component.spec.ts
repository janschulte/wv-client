import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimespanButtonComponent } from './timespan-button.component';

describe('TimespanButtonComponent', () => {
  let component: TimespanButtonComponent;
  let fixture: ComponentFixture<TimespanButtonComponent>;

  beforeEach(async(() => {
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
