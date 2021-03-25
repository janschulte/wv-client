import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Timeseries } from '@helgoland/core';

import { TimeseriesService } from './../../services/timeseries/timeseries.service';

@Component({
  selector: 'app-timeseries-item',
  templateUrl: './timeseries-item.component.html',
  styleUrls: ['./timeseries-item.component.scss']
})
export class TimeseriesItemComponent implements OnInit {

  @Input() public timeseries: Timeseries;

  @Output() public onTimeseriesSelect: EventEmitter<boolean> = new EventEmitter();

  public added: boolean;

  constructor(
    private timeseriesService: TimeseriesService
  ) { }

  ngOnInit() {
    this.added = this.timeseriesService.hasDataset(this.timeseries.internalId);
  }

  toggleTs() {
    if (this.timeseriesService.hasDataset(this.timeseries.internalId)) {
      this.onTimeseriesSelect.emit(false);
      this.timeseriesService.removeDataset(this.timeseries.internalId);
      this.added = this.timeseriesService.hasDataset(this.timeseries.internalId);
    } else {
      this.onTimeseriesSelect.emit(true);
      this.timeseriesService.addDataset(this.timeseries.internalId)
        .then(() => this.added = this.timeseriesService.hasDataset(this.timeseries.internalId));
    }
  }

}
