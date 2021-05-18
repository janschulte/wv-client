import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalShowPhenomenonLocationComponent } from './modal-show-phenomenon-location.component';

describe('ModalShowPhenomenonLocationComponent', () => {
  let component: ModalShowPhenomenonLocationComponent;
  let fixture: ComponentFixture<ModalShowPhenomenonLocationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalShowPhenomenonLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalShowPhenomenonLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
