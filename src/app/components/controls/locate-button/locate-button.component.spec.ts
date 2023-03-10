import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LocateButtonComponent } from './locate-button.component';

describe('LocateButtonComponent', () => {
  let component: LocateButtonComponent;
  let fixture: ComponentFixture<LocateButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LocateButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
