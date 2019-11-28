import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteExportButtonComponent } from './favorite-export-button.component';

describe('FavoriteExportButtonComponent', () => {
  let component: FavoriteExportButtonComponent;
  let fixture: ComponentFixture<FavoriteExportButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteExportButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteExportButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
