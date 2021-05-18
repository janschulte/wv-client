import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServiceSelectorButtonComponent } from './service-selector-button.component';

describe('ServiceSelectorButtonComponent', () => {
  let component: ServiceSelectorButtonComponent;
  let fixture: ComponentFixture<ServiceSelectorButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceSelectorButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSelectorButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
