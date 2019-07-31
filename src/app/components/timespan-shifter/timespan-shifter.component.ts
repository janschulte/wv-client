import { Component } from '@angular/core';
import { TimespanShiftSelectorComponent } from '@helgoland/time';

@Component({
  selector: 'app-timespan-shifter',
  templateUrl: './timespan-shifter.component.html',
  styleUrls: ['./timespan-shifter.component.scss']
})
export class TimespanShifterComponent extends TimespanShiftSelectorComponent { }
