import { Component, Input } from '@angular/core';
import { Timespan } from '@helgoland/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';

@Component({
  selector: 'app-modal-time-settings',
  templateUrl: './modal-time-settings.component.html',
  styleUrls: ['./modal-time-settings.component.scss']
})
export class ModalTimeSettingsComponent {

  @Input() timespan: Timespan;

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

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

  private calcTimespan(duration: moment.Duration) {
    const end = new Date().getTime();
    return new Timespan(end - duration.asMilliseconds(), end);
  }
}
