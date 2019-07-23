import { Component } from '@angular/core';
import { GeosearchControlComponent } from '@helgoland/map';

@Component({
  selector: 'app-geo-search',
  templateUrl: './geo-search.component.html',
  styleUrls: ['./geo-search.component.scss']
})
export class GeoSearchComponent extends GeosearchControlComponent {

  public active: boolean;

}
