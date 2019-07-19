import { Component } from '@angular/core';
import { Timeseries } from '@helgoland/core';
import { FacetSearchService } from '@helgoland/facet-search';

@Component({
  selector: 'app-selection-list',
  templateUrl: './selection-list.component.html',
  styleUrls: ['./selection-list.component.scss']
})
export class SelectionListComponent {

  public sideMenuActive = true;

  constructor(
    public facetSearch: FacetSearchService,
  ) { }

  public onSelectedTs(ts: Timeseries) {
    alert(`Clicked: ${ts.label}`);
  }

}
