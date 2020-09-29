import { Component } from '@angular/core';
import { TimezoneService } from '@helgoland/core';

type TimeZone = {
  label: string;
  id: string;
};

@Component({
  selector: 'app-timezone-selector',
  templateUrl: './timezone-selector.component.html',
  styleUrls: ['./timezone-selector.component.scss']
})
export class TimezoneSelectorComponent {

  public timezones: TimeZone[] = [
    { label: 'UTC', id: 'UTC' },
    { label: 'MEZ (GMT+1)', id: 'Etc/GMT-1' },
    { label: 'MESZ (GMT+2)', id: 'Etc/GMT-2' }
  ];

  public timezone: TimeZone;

  constructor(
    private timezoneSrvc: TimezoneService
  ) {
    const tzName = this.timezoneSrvc.getTimezoneName();
    const zone = this.timezones.find(e => e.id === tzName);
    if (zone) {
      this.timezone = zone;
    } else {
      this.timezone = {
        id: tzName,
        label: tzName
      };
      this.timezones.push(this.timezone);
    }
  }

  public changeTimezone(tz: TimeZone) {
    this.timezone = tz;
    this.timezoneSrvc.setTimezone(tz.id);
  }

}
