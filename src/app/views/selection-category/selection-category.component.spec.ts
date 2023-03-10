import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectionCategoryComponent } from './selection-category.component';

describe('SelectionCategoryComponent', () => {
  let component: SelectionCategoryComponent;
  let fixture: ComponentFixture<SelectionCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
