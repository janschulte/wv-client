import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NoDataHintComponent } from './no-data-hint.component';

describe('NoDataHintComponent', () => {
  let component: NoDataHintComponent;
  let fixture: ComponentFixture<NoDataHintComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NoDataHintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDataHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
