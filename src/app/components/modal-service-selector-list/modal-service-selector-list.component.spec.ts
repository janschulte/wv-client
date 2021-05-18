import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalServiceSelectorListComponent } from './modal-service-selector-list.component';

describe('ModalServiceSelectorListComponent', () => {
  let component: ModalServiceSelectorListComponent;
  let fixture: ComponentFixture<ModalServiceSelectorListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalServiceSelectorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalServiceSelectorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
