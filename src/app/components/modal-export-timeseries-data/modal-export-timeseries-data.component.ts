import { Component, Input, OnInit } from '@angular/core';
import { ExportOptions, DownloadType } from '@helgoland/depiction';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TimeseriesService } from './../../services/timeseries/timeseries.service';
import { Timespan, IDataset } from '@helgoland/core';
import moment from 'moment';

@Component({
  selector: 'app-modal-export-timeseries-data',
  templateUrl: './modal-export-timeseries-data.component.html',
  styleUrls: ['./modal-export-timeseries-data.component.scss']
})
export class ModalExportTimeseriesDataComponent implements OnInit {

  @Input() internalId: string;

  public exportOptions: ExportOptions;

  public dataset: IDataset;

  public timespan: Timespan;
  public start: string;
  public end: string;
  public disabled = false;
  public loading = false;

  constructor(
    public activeModal: NgbActiveModal,
    public timeseriesService: TimeseriesService,
  ) { }

  ngOnInit() {
    this.timespan = new Timespan(this.timeseriesService.timespan.from, this.timeseriesService.timespan.to);
    this.start = moment(this.timespan.from).format('DD.MM.YYYY HH:mm');
    this.end = moment(this.timespan.to).format('DD.MM.YYYY HH:mm');

  }

  /**
   * Update timespan.
   * @param $event current date
   * @param fromDate indicate if from or to date was changed
   */
  onTimepickerSelected($event: Date, fromDate: boolean) {
    let from = this.timespan.from;
    let to = this.timespan.to;
    if (fromDate) {
      from = moment($event).unix() * 1000;
      if (from > to) {
        to = from;
      }
    } else {
      to = moment($event).unix() * 1000;
    }
    this.timespan = new Timespan(Math.min(from, to), Math.max(from, to));
    this.start = moment(this.timespan.from).format('DD.MM.YYYY HH:mm');
    this.end = moment(this.timespan.to).format('DD.MM.YYYY HH:mm');
  }

  public onCSVDownload() {
    this.onDownload(DownloadType.CSV);
  }

  public onXSLXDownload() {
    this.onDownload(DownloadType.XLSX);
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
      timeperiod: this.timespan
    };
  }

}
