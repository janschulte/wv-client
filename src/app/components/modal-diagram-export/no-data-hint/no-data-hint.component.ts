import { Component } from '@angular/core';
import { FirstLatestTimeseriesEntryComponent } from '@helgoland/depiction';

@Component({
  selector: 'app-no-data-hint',
  templateUrl: './no-data-hint.component.html',
  styleUrls: ['./no-data-hint.component.scss']
})
export class NoDataHintComponent extends FirstLatestTimeseriesEntryComponent { }
