import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LegendEntryComponent } from './legend-entry.component';

describe('LegendEntryComponent', () => {
  let component: LegendEntryComponent;
  let fixture: ComponentFixture<LegendEntryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LegendEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
