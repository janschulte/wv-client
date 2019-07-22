import { Component } from '@angular/core';
import { ZoomControlComponent } from '@helgoland/map';

@Component({
  selector: 'app-zoom-buttons',
  templateUrl: './zoom-buttons.component.html',
  styleUrls: ['./zoom-buttons.component.scss']
})
export class ZoomButtonsComponent extends ZoomControlComponent { }
