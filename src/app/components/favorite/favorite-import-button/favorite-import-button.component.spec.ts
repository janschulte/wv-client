import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FavoriteImportButtonComponent } from './favorite-import-button.component';

describe('FavoriteImportButtonComponent', () => {
  let component: FavoriteImportButtonComponent;
  let fixture: ComponentFixture<FavoriteImportButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteImportButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteImportButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
