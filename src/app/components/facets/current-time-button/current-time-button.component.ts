import { Component, Input } from '@angular/core';
import { Required, Timespan } from '@helgoland/core';
import { FacetSearchService } from '@helgoland/facet-search';
import moment from 'moment';

@Component({
  selector: 'app-current-time-button',
  templateUrl: './current-time-button.component.html',
  styleUrls: ['./current-time-button.component.scss']
})
export class CurrentTimeButtonComponent {

  @Input() @Required public facetSearchService: FacetSearchService;

  public toggledTimeFilter: boolean;

  public toggleTimeFilter() {
    this.toggledTimeFilter = !this.toggledTimeFilter;
    if (this.toggledTimeFilter) {
      const end = moment().endOf('day');
      const start = moment(end).subtract(30, 'days');
      const timespan = new Timespan(start.toDate(), end.toDate());
      this.facetSearchService.setSelectedTimespan(timespan);
    } else {
      this.facetSearchService.setSelectedTimespan(null);
    }
  }

}
