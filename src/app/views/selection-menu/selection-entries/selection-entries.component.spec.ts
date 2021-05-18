import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectionEntriesComponent } from './selection-entries.component';

describe('SelectionEntriesComponent', () => {
  let component: SelectionEntriesComponent;
  let fixture: ComponentFixture<SelectionEntriesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
