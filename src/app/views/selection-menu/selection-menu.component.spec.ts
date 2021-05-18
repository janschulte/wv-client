import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectionMenuComponent } from './selection-menu.component';

describe('SelectionMenuComponent', () => {
  let component: SelectionMenuComponent;
  let fixture: ComponentFixture<SelectionMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
