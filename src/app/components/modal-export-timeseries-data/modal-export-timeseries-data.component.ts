import { Component, Input, OnInit } from '@angular/core';
import { ExportOptions, DownloadType } from '@helgoland/depiction';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TimeseriesService } from './../../services/timeseries/timeseries.service';
import { Timespan, IDataset } from '@helgoland/core';

@Component({
  selector: 'app-modal-export-timeseries-data',
  templateUrl: './modal-export-timeseries-data.component.html',
  styleUrls: ['./modal-export-timeseries-data.component.scss']
})
export class ModalExportTimeseriesDataComponent implements OnInit {

  @Input() internalId: string;

  public exportOptions: ExportOptions;

  public dataset: IDataset;

  public start: Date;
  public end: Date;
  public disabled = false;
  public loading = false;

  constructor(
    public activeModal: NgbActiveModal,
    public timeseriesService: TimeseriesService,
  ) { }

  ngOnInit() {
    this.start = new Date(this.timeseriesService.timespan.from);
    this.end = new Date(this.timeseriesService.timespan.to);
  }

  public onCSVDownload() {
    this.onDownload(DownloadType.CSV);
  }

  public onXSLXDownload() {
    this.onDownload(DownloadType.XSLX);
  }

  public onMetadata(dataset: IDataset): void {
    this.dataset = dataset;
    this.disabled = true;
  }

  public onLoading(loading: boolean): void {
    this.loading = loading;
  }

  private onDownload(dwType: DownloadType): void {
    this.exportOptions = {
      downloadType: dwType,
      timeperiod: new Timespan(this.start, this.end)
    };
  }

}
