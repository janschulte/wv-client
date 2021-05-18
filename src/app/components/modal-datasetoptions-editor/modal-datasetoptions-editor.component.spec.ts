import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalDatasetoptionsEditorComponent } from './modal-datasetoptions-editor.component';

describe('ModalDatasetoptionsEditorComponent', () => {
  let component: ModalDatasetoptionsEditorComponent;
  let fixture: ComponentFixture<ModalDatasetoptionsEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDatasetoptionsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDatasetoptionsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
