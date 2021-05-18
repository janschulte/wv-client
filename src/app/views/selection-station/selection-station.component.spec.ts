import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectionStationComponent } from './selection-station.component';

describe('SelectionStationComponent', () => {
  let component: SelectionStationComponent;
  let fixture: ComponentFixture<SelectionStationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
