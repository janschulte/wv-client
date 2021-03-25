import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedDatasetOverlayComponent } from './added-dataset-overlay.component';

describe('AddedDatasetOverlayComponent', () => {
  let component: AddedDatasetOverlayComponent;
  let fixture: ComponentFixture<AddedDatasetOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddedDatasetOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedDatasetOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
