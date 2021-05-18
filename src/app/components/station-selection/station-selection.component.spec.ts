import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StationSelectionComponent } from './station-selection.component';

describe('StationSelectionComponent', () => {
  let component: StationSelectionComponent;
  let fixture: ComponentFixture<StationSelectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StationSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
