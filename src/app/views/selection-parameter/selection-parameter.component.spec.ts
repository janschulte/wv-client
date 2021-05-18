import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectionParameterComponent } from './selection-parameter.component';

describe('SelectionParameterComponent', () => {
  let component: SelectionParameterComponent;
  let fixture: ComponentFixture<SelectionParameterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
