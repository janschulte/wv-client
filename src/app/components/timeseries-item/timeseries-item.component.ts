import { Component, Input, OnInit } from '@angular/core';
import { Timeseries } from '@helgoland/core';

@Component({
  selector: 'app-timeseries-item',
  templateUrl: './timeseries-item.component.html',
  styleUrls: ['./timeseries-item.component.scss']
})
export class TimeseriesItemComponent implements OnInit {

  @Input() public timeseries: Timeseries;

  public added: boolean;

  constructor() { }

  ngOnInit() {
    // TODO attach
    this.added = false;
  }

  addTs() {
  }

}
