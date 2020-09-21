import { Component, Input, OnInit } from '@angular/core';
import { Timespan } from '@helgoland/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';

@Component({
  selector: 'app-modal-time-settings',
  templateUrl: './modal-time-settings.component.html',
  styleUrls: ['./modal-time-settings.component.scss']
})
export class ModalTimeSettingsComponent implements OnInit {

  @Input() timespan: Timespan;

  public selected = {
    from: false,
    to: false
  };
  public tsStart: string;
  public tsEnd: string;

  constructor(
    public activeModal: NgbActiveModal,
  ) {
  }

  ngOnInit() {
    this.tsStart = moment(this.timespan.from).format('DD.MM.YYYY HH:mm');
    this.tsEnd = moment(this.timespan.to).format('DD.MM.YYYY HH:mm');
  }

  last6Hours = (): Timespan => {
    return this.calcTimespan(moment.duration(6, 'hours'));
  }

  last24Hours = (): Timespan => {
    return this.calcTimespan(moment.duration(24, 'hours'));
  }

  lastWeek = (): Timespan => {
    return this.calcTimespan(moment.duration(1, 'week'));
  }

  lastMonth = (): Timespan => {
    return this.calcTimespan(moment.duration(1, 'month'));
  }

  last3Months = (): Timespan => {
    return this.calcTimespan(moment.duration(3, 'month'));
  }

  customTime = (): Timespan => {
    return this.timespan;
  }

  /**
   * Update timespan with selected range.
   * @param $event current timespan
   */
  onTimepickerRangeSelected($event: Timespan) {
    this.timespan = $event;
    this.tsStart = moment(this.timespan.from).format('DD.MM.YYYY HH:mm');
    this.tsEnd = moment(this.timespan.to).format('DD.MM.YYYY HH:mm');
  }

  /**
   * Update timespan.
   * @param $event current date
   * @param fromDate indicate if from or to date was changed
   */
  onTimepickerSelected($event: Date, fromDate: boolean) {
    let from = this.timespan.from;
    let to = this.timespan.to;
    if (fromDate) {
      from = moment($event).unix() * 1000;
      if (from > to) {
        to = from;
      }
      this.selected.from = true;
    } else {
      to = moment($event).unix() * 1000;
      this.selected.to = true;
    }
    this.timespan = new Timespan(Math.min(from, to), Math.max(from, to));
    this.tsStart = moment(this.timespan.from).format('DD.MM.YYYY HH:mm');
    this.tsEnd = moment(this.timespan.to).format('DD.MM.YYYY HH:mm');
  }

  private calcTimespan(duration: moment.Duration) {
    const end = new Date().getTime();
    return new Timespan(end - duration.asMilliseconds(), end);
  }
}
