import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopListSelectorComponent } from './desktop-list-selector.component';

describe('ListSelectorComponent', () => {
  let component: DesktopListSelectorComponent;
  let fixture: ComponentFixture<DesktopListSelectorComponent>;

  beforeEach(async(() => {
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
