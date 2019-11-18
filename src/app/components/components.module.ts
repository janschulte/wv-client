import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HelgolandCoreModule } from '@helgoland/core';
import { HelgolandDatasetDownloadModule } from '@helgoland/depiction';
import { HelgolandFacetSearchModule } from '@helgoland/facet-search';
import { HelgolandMapControlModule } from '@helgoland/map';
import { NgbDatepickerModule, NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Ng5SliderModule } from 'ng5-slider';

import { GeoSearchComponent } from './controls/geo-search/geo-search.component';
import { LayersControlComponent } from './controls/layers-control/layers-control.component';
import { LocateButtonComponent } from './controls/locate-button/locate-button.component';
import { ZoomButtonsComponent } from './controls/zoom-buttons/zoom-buttons.component';
import { FacetsComponent } from './facets/facets.component';
import { WvParameterFacetComponent } from './facets/parameter-facet/parameter-facet.component';
import { WvResultListComponent } from './facets/result-list/result-list.component';
import { TimeFacetComponent } from './facets/time-facet/time-facet.component';
import { TimeSliderComponent } from './facets/time-slider/time-slider.component';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { ModalDatasetoptionsEditorComponent } from './modal-datasetoptions-editor/modal-datasetoptions-editor.component';
import { DiagramExportButtonComponent } from './modal-diagram-export/diagram-export-button/diagram-export-button.component';
import { ModalDiagramExportComponent } from './modal-diagram-export/modal-diagram-export.component';
import { NoDataHintComponent } from './modal-diagram-export/no-data-hint/no-data-hint.component';
import { ModalExportTimeseriesDataComponent } from './modal-export-timeseries-data/modal-export-timeseries-data.component';
import { ModalImprintComponent } from './modal-imprint/modal-imprint.component';
import { ModalSettingsComponent } from './modal-settings/modal-settings.component';
import { ModalTimeSettingsComponent } from './modal-time-settings/modal-time-settings.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { StationSelectionComponent } from './station-selection/station-selection.component';
import { TimeseriesItemComponent } from './timeseries-item/timeseries-item.component';
import { WvTimespanButtonComponent } from './timespan-button/timespan-button.component';
import { TimespanShifterComponent } from './timespan-shifter/timespan-shifter.component';

const COMPONENTS = [
  DiagramExportButtonComponent,
  FacetsComponent,
  GeoSearchComponent,
  LanguageSelectorComponent,
  LayersControlComponent,
  LocateButtonComponent,
  ModalDatasetoptionsEditorComponent,
  ModalDiagramExportComponent,
  ModalExportTimeseriesDataComponent,
  ModalImprintComponent,
  ModalSettingsComponent,
  ModalTimeSettingsComponent,
  NoDataHintComponent,
  SideMenuComponent,
  StationSelectionComponent,
  TimeFacetComponent,
  TimeSliderComponent,
  TimeseriesItemComponent,
  TimespanShifterComponent,
  WvParameterFacetComponent,
  WvResultListComponent,
  WvTimespanButtonComponent,
  ZoomButtonsComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NgbModalModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    Ng5SliderModule,
    HelgolandCoreModule,
    HelgolandMapControlModule,
    HelgolandDatasetDownloadModule,
    HelgolandFacetSearchModule
  ],
  entryComponents: [COMPONENTS],
  exports: [COMPONENTS],
  declarations: [COMPONENTS]
})
export class ComponentsModule { }
