import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TimeFacetComponent } from './time-facet.component';

describe('TimeFacetComponent', () => {
  let component: TimeFacetComponent;
  let fixture: ComponentFixture<TimeFacetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeFacetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeFacetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
