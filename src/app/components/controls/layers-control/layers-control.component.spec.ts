import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LayersControlComponent } from './layers-control.component';

describe('LayersControlComponent', () => {
  let component: LayersControlComponent;
  let fixture: ComponentFixture<LayersControlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LayersControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayersControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
