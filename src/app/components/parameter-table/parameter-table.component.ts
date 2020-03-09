import { Component } from '@angular/core';
import { MultiServiceFilterSelectorComponent } from '@helgoland/selector';

@Component({
  selector: 'app-parameter-table',
  templateUrl: './parameter-table.component.html',
  styleUrls: ['./parameter-table.component.scss']
})
export class ParameterTableComponent extends MultiServiceFilterSelectorComponent { }
