import { Component, OnInit } from '@angular/core';
import { Time, Timespan } from '@helgoland/core';
import { D3PlotOptions } from '@helgoland/d3';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';

import { TimeseriesService } from '../../services/timeseries/timeseries.service';
import { ModalTimeSettingsComponent } from './../../components/modal-time-settings/modal-time-settings.component';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit {

  public legendActive = true;

  public selectedIds: string[] = [];
  public timespan: Timespan;

  public overviewOptions: D3PlotOptions = {
    overview: true,
    showTimeLabel: false
  };

  public diagramOptions: D3PlotOptions = {
    showTimeLabel: false
  };

  constructor(
    public timeseriesService: TimeseriesService,
    private modalService: NgbModal,
    private time: Time
  ) { }

  ngOnInit() {
    this.timespan = this.timeseriesService.timespan;
  }

  toggleLegend(active: boolean) {
    this.legendActive = active;
  }

  isSelected(id: string) {
    // TODO implement
    return false;
  }

  shareTimeseries() { }

  createFavoriteGroup() { }

  toggleGeneralization() {
    this.timeseriesService.generalize = !this.timeseriesService.generalize;
    this.timeseriesService.datasetOptions.forEach(v => {
      v.generalize = this.timeseriesService.generalize;
    });
  }

  deleteAll() {
    // TODO implement
  }

  onGraphLoading(loading: boolean) {
    // TODO implement
  }

  onOverviewLoading(loading: boolean) {
    // TODO implement
  }

  openTimeSettings() {
    const modalRef = this.modalService.open(ModalTimeSettingsComponent);
    (modalRef.componentInstance as ModalTimeSettingsComponent).timespan = this.timespan;
    modalRef.result.then((res: Timespan) => {
      this.timespanChanged(res);
    });
  }

  centerTime(date: Date) {
    this.timespan = this.time.centerTimespan(this.timespan, date);
    this.timeseriesService.timespan = this.timespan;
  }

  timespanChanged(timespan: Timespan) {
    this.timespan = timespan;
    this.timeseriesService.timespan = this.timespan;
  }

  oneDay = (): Timespan => {
    return this.time.centerTimespanWithDuration(this.timespan, moment.duration(1, 'day'));
  }

  oneWeek = (): Timespan => {
    return this.time.centerTimespanWithDuration(this.timespan, moment.duration(7, 'day'));
  }

  oneMonth = (): Timespan => {
    return this.time.centerTimespanWithDuration(this.timespan, moment.duration(30, 'day'));
  }

}
