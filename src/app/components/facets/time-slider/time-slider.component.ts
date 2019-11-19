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

  public minVal: number;
  public maxVal: number;
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
    this.facetSearchService.setSelectedTimespan(timespan);
  }

  private fetchTime() {
    const completeTs = this.facetSearchService.getFilteredTimespan();
    const duration = this.findDuration(completeTs);
    const timestops = this.getTimeStops(completeTs, duration);
    const currentTs = this.facetSearchService.getSelectedTimespan();
    if (currentTs) {
      this.minVal = currentTs.from;
      this.maxVal = currentTs.to;
    } else {
      this.minVal = completeTs.from;
      this.maxVal = completeTs.to;
    }
    if (timestops) {
      this.options = {
        animate: false,
        stepsArray: timestops,
        translate: (value): string => moment(value).format('MMM YYYY')
      };
    }
  }

  private getTimeStops(timespan: Timespan, duration: Duration): CustomStepDefinition[] {
    if (timespan) {
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

  private findDuration(timespan: Timespan) {
    if (timespan) {
      const diff = timespan.to - timespan.from;
      if (diff > moment.duration(20, 'years').asMilliseconds()) {
        return moment.duration(6, 'months');
      }
    }
    return moment.duration(1, 'months');
  }

}
