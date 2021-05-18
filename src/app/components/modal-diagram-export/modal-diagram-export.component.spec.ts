import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalDiagramExportComponent } from './modal-diagram-export.component';

describe('ModalDiagramExportComponent', () => {
  let component: ModalDiagramExportComponent;
  let fixture: ComponentFixture<ModalDiagramExportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDiagramExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDiagramExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
