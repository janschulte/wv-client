import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExportTimeseriesDataComponent } from './modal-export-timeseries-data.component';

describe('ModalExportTimeseriesDataComponent', () => {
  let component: ModalExportTimeseriesDataComponent;
  let fixture: ComponentFixture<ModalExportTimeseriesDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalExportTimeseriesDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExportTimeseriesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
