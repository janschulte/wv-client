import { Component, Input, OnInit } from '@angular/core';
import { Timespan } from '@helgoland/core';
import { FacetSearch } from '@helgoland/facet-search';
import moment, { Duration } from 'moment';
import { ChangeContext, CustomStepDefinition, Options } from 'ng5-slider';



@Component({
  selector: 'app-time-slider',
  templateUrl: './time-slider.component.html',
  styleUrls: ['./time-slider.component.scss']
})
export class TimeSliderComponent implements OnInit {

  @Input() public facetSearchService: FacetSearch;

  public minVal;
  public maxVal;
  public options: Options;

  constructor() { }

  ngOnInit() {
    if (!this.facetSearchService) {
      console.error('TimeFacetComponent needs a facet search service');
    }
    this.facetSearchService.getResults().subscribe(() => this.fetchTime());
  }

  public updateTime(change: ChangeContext) {
    const timespan = new Timespan(change.value, change.highValue);
    this.facetSearchService.setCurrentTimespan(timespan);
  }

  private fetchTime() {
    if (!this.options) {
      const comleteTs = this.facetSearchService.getCompleteTimespan();
      const currentTs = this.facetSearchService.getCurrentTimespan();
      const timestops = this.getTimeStops(comleteTs, moment.duration(6, 'months'));
      this.minVal = currentTs.from;
      this.maxVal = currentTs.to;
      this.options = {
        animate: false,
        stepsArray: timestops,
        floor: timestops[0].value,
        ceil: timestops[timestops.length - 1].value,
        translate: (value): string => moment(value).format('MMM YYYY')
      };
    }
  }

  private getTimeStops(timespan: Timespan, duration: Duration): CustomStepDefinition[] {
    const startTime = moment(timespan.from);
    const endTime = moment(timespan.to);

    if (endTime.isBefore(startTime)) {
      endTime.add(1, 'day');
    }

    const timeStops: CustomStepDefinition[] = [{ value: startTime.valueOf() }];

    do {
      startTime.add(duration);
      timeStops.push({ value: startTime.valueOf() });
    } while (startTime <= endTime);

    return timeStops;
  }

}
