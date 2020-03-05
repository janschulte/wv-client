import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionParameterComponent } from './selection-parameter.component';

describe('SelectionParameterComponent', () => {
  let component: SelectionParameterComponent;
  let fixture: ComponentFixture<SelectionParameterComponent>;

  beforeEach(async(() => {
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
