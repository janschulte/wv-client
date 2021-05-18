import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ZoomButtonsComponent } from './zoom-buttons.component';

describe('ZoomButtonsComponent', () => {
  let component: ZoomButtonsComponent;
  let fixture: ComponentFixture<ZoomButtonsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
