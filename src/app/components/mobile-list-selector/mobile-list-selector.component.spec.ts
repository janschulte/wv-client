import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileListSelectorComponent } from './mobile-list-selector.component';

describe('MobileListSelectorComponent', () => {
  let component: MobileListSelectorComponent;
  let fixture: ComponentFixture<MobileListSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileListSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileListSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
