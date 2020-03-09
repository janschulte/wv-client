import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterTableComponent } from './parameter-table.component';

describe('ParameterTableComponent', () => {
  let component: ParameterTableComponent;
  let fixture: ComponentFixture<ParameterTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
