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
import { DiagramExportButtonComponent } from './diagram-export-button/diagram-export-button.component';
import { FacetsComponent } from './facets/facets.component';
import { WvParameterFacetComponent } from './facets/parameter-facet/parameter-facet.component';
import { WvResultListComponent } from './facets/result-list/result-list.component';
import { ModalTimeSettingsComponent } from './modal-time-settings/modal-time-settings.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { StationSelectionComponent } from './station-selection/station-selection.component';
import { TimeseriesItemComponent } from './timeseries-item/timeseries-item.component';
import { WvTimespanButtonComponent } from './timespan-button/timespan-button.component';
import { TimespanShifterComponent } from './timespan-shifter/timespan-shifter.component';

const COMPONENTS = [
  FacetsComponent,
  GeoSearchComponent,
  LayersControlComponent,
  LocateButtonComponent,
  ModalTimeSettingsComponent,
  SideMenuComponent,
  StationSelectionComponent,
  TimeseriesItemComponent,
  TimespanShifterComponent,
  WvResultListComponent,
  WvTimespanButtonComponent,
  ZoomButtonsComponent,
  DiagramExportButtonComponent,
  WvParameterFacetComponent,
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
  declarations: [COMPONENTS]
})
export class ComponentsModule { }
