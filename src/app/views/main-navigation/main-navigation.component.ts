import { Component, OnInit } from '@angular/core';

import { TimeseriesService } from '../../services/timeseries/timeseries.service';
import { SelectionNavigationService } from './selection-navigation.service';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit {

  public datasetCount: number;

  constructor(
    public selectionNavigation: SelectionNavigationService,
    private timeseriesService: TimeseriesService
  ) { }

  ngOnInit(): void {
    this.datasetCount = this.timeseriesService.datasetIds.length;
    this.timeseriesService.datasetIdsChanged.subscribe(ids => {
      this.datasetCount = ids.length;
    });
  }

}
