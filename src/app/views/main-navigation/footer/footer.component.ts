import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '@helgoland/favorite';

import { TimeseriesService } from '../../../services/timeseries/timeseries.service';
import { SelectionNavigationService } from '../selection-navigation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public datasetCount: number;
  public favoriteCount: number;

  constructor(
    public selectionNavigation: SelectionNavigationService,
    private timeseriesService: TimeseriesService,
    public favoriteSrvc: FavoriteService
  ) { }

  ngOnInit() {
    this.datasetCount = this.timeseriesService.datasetIds.length;
    this.timeseriesService.datasetIdsChanged.subscribe(ids => this.datasetCount = ids.length);
    this.favoriteSrvc.getFavoriteCountChanged().subscribe(count => this.favoriteCount = count);
  }

}
