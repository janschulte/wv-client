import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DesktopListSelectorComponent } from './desktop-list-selector.component';

describe('ListSelectorComponent', () => {
  let component: DesktopListSelectorComponent;
  let fixture: ComponentFixture<DesktopListSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DesktopListSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopListSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
