import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditFavoriteComponent } from './modal-edit-favorite.component';

describe('ModalEditFavoriteComponent', () => {
  let component: ModalEditFavoriteComponent;
  let fixture: ComponentFixture<ModalEditFavoriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditFavoriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
