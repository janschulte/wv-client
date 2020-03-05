import { Component, Input } from '@angular/core';
import { TimespanButtonComponent } from '@helgoland/time';

@Component({
  selector: 'app-timespan-button',
  templateUrl: './timespan-button.component.html',
  styleUrls: ['./timespan-button.component.scss']
})
export class WvTimespanButtonComponent extends TimespanButtonComponent {

  @Input() shortlabel: string;

}
