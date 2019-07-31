import { Component, OnInit } from '@angular/core';
import { Time, Timespan } from '@helgoland/core';
import { D3PlotOptions } from '@helgoland/d3';

import { TimeseriesService } from '../../services/timeseries/timeseries.service';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit {

  public legendActive = true;

  public selectedIds: string[] = [];
  private timespan: Timespan;

  public overviewOptions: D3PlotOptions = {
    overview: true,
    showTimeLabel: false
  };

  public diagramOptions: D3PlotOptions = {
    showTimeLabel: false
  };

  constructor(
    public timeseriesService: TimeseriesService,
    private time: Time
  ) { }

  ngOnInit() {
    this.timespan = this.timeseriesService.timespan;
  }

  toggleLegend(active: boolean) {
    this.legendActive = active;
  }

  isSelected() {
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

  onGraphLoading() {
    // TODO implement
  }

  onOverviewLoading() {
    // TODO implement
  }

  centerTime(date: Date) {
    this.timespan = this.time.centerTimespan(this.timespan, date);
    this.timeseriesService.timespan = this.timespan;
  }

  timespanChanged(timespan: Timespan) {
    this.timespan = timespan;
    this.timeseriesService.timespan = this.timespan;
  }

}
