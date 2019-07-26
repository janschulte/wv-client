import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HelgolandCoreModule } from '@helgoland/core';
import { HelgolandFacetSearchModule } from '@helgoland/facet-search';
import { HelgolandMapControlModule } from '@helgoland/map';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { GeoSearchComponent } from './controls/geo-search/geo-search.component';
import { LayersControlComponent } from './controls/layers-control/layers-control.component';
import { LocateButtonComponent } from './controls/locate-button/locate-button.component';
import { ZoomButtonsComponent } from './controls/zoom-buttons/zoom-buttons.component';
import { FacetsComponent } from './facets/facets.component';
import { WvResultListComponent } from './facets/result-list/result-list.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { StationSelectionComponent } from './station-selection/station-selection.component';
import { TimeseriesItemComponent } from './timeseries-item/timeseries-item.component';

const COMPONENTS = [
  FacetsComponent,
  GeoSearchComponent,
  LayersControlComponent,
  LocateButtonComponent,
  WvResultListComponent,
  StationSelectionComponent,
  SideMenuComponent,
  ZoomButtonsComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NgbModalModule,
    HelgolandCoreModule,
    HelgolandMapControlModule,
    HelgolandFacetSearchModule
  ],
  entryComponents: [COMPONENTS],
  exports: [COMPONENTS],
  declarations: [COMPONENTS, TimeseriesItemComponent]
})
export class ComponentsModule { }
