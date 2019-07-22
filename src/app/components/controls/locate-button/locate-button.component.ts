import { Component } from '@angular/core';
import { LocateControlComponent } from '@helgoland/map';

@Component({
  selector: 'app-locate-button',
  templateUrl: './locate-button.component.html',
  styleUrls: ['./locate-button.component.scss']
})
export class LocateButtonComponent extends LocateControlComponent { }
