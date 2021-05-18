import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DiagramExportButtonComponent } from './diagram-export-button.component';

describe('DiagramExportButtonComponent', () => {
  let component: DiagramExportButtonComponent;
  let fixture: ComponentFixture<DiagramExportButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagramExportButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramExportButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
