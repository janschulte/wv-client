import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImprintComponent } from './modal-imprint.component';

describe('ModalImprintComponent', () => {
  let component: ModalImprintComponent;
  let fixture: ComponentFixture<ModalImprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalImprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
