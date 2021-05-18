import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalTimeSettingsComponent } from './modal-time-settings.component';

describe('ModalTimeSettingsComponent', () => {
  let component: ModalTimeSettingsComponent;
  let fixture: ComponentFixture<ModalTimeSettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTimeSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTimeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
