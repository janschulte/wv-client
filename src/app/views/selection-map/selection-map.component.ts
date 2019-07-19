import { Component, OnDestroy, OnInit } from '@angular/core';
import { Timeseries } from '@helgoland/core';
import { FacetSearchService } from '@helgoland/facet-search';
import { MapCache } from '@helgoland/map';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-selection-map',
  templateUrl: './selection-map.component.html',
  styleUrls: ['./selection-map.component.scss']
})
export class SelectionMapComponent implements OnInit, OnDestroy {

  public timeseries: Timeseries[];

  public sideMenuActive = true;

  public resultCount: number;

  public resultSubs: Subscription;

  constructor(
    public facetSearch: FacetSearchService,
    private mapCache: MapCache
  ) { }

  ngOnInit() {
    this.resultSubs = this.facetSearch.getResults().subscribe(ts => this.resultCount = ts.length);
  }

  ngOnDestroy(): void {
    this.resultSubs.unsubscribe();
  }

  public onSelectedTs(ts: Timeseries) {
    alert(`Clicked: ${ts.label}`);
  }

  public updateSideMenu(active: boolean) {
    this.sideMenuActive = active;
    setTimeout(() => this.mapCache.getMap('facet-search').invalidateSize(), 100);
  }

}
