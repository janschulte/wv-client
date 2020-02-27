import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersListSelectionComponent } from './parameters-list-selection.component';

describe('ParametersListSelectionComponent', () => {
  let component: ParametersListSelectionComponent;
  let fixture: ComponentFixture<ParametersListSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametersListSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersListSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
