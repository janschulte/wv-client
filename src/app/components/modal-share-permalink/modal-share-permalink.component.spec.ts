import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalSharePermalinkComponent } from './modal-share-permalink.component';

describe('ModalSharePermalinkComponent', () => {
  let component: ModalSharePermalinkComponent;
  let fixture: ComponentFixture<ModalSharePermalinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSharePermalinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSharePermalinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
