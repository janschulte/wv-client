import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HelgolandCoreModule } from '@helgoland/core';
import { HelgolandDatasetDownloadModule } from '@helgoland/depiction';
import { HelgolandFacetSearchModule } from '@helgoland/facet-search';
import { HelgolandMapControlModule, HelgolandMapViewModule } from '@helgoland/map';
import { HelgolandSelectorModule } from '@helgoland/selector';
import {
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbModule,
  NgbTimepickerModule,
  NgbToastModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { QRCodeModule } from 'angular2-qrcode';
import { ClipboardModule } from 'ngx-clipboard';

import { GeoSearchComponent } from './controls/geo-search/geo-search.component';
import { LayersControlComponent } from './controls/layers-control/layers-control.component';
import { LocateButtonComponent } from './controls/locate-button/locate-button.component';
import { ZoomButtonsComponent } from './controls/zoom-buttons/zoom-buttons.component';
import { DatasetTableComponent } from './dataset-table/dataset-table.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { NgbCustomTimepickerComponent } from './datepicker/ngb-custom-timepicker/ngb-custom-timepicker.component';
import { DesktopListSelectorComponent } from './desktop-list-selector/desktop-list-selector.component';
import { CurrentTimeButtonComponent } from './facets/current-time-button/current-time-button.component';
import { WvParameterFacetComponent } from './facets/parameter-facet/parameter-facet.component';
import { ParametersListSelectionComponent } from './facets/parameters-list-selection/parameters-list-selection.component';
import { WvResultListComponent } from './facets/result-list/result-list.component';
import { TimeFacetComponent } from './facets/time-facet/time-facet.component';
import { FavoriteExportButtonComponent } from './favorite/favorite-export-button/favorite-export-button.component';
import { FavoriteImportButtonComponent } from './favorite/favorite-import-button/favorite-import-button.component';
import { FavoriteListComponent } from './favorite/favorite-list/favorite-list.component';
import { ModalEditFavoriteComponent } from './favorite/modal-edit-favorite/modal-edit-favorite.component';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { MobileListSelectorComponent } from './mobile-list-selector/mobile-list-selector.component';
import { ModalDatasetoptionsEditorComponent } from './modal-datasetoptions-editor/modal-datasetoptions-editor.component';
import { DiagramExportButtonComponent } from './modal-diagram-export/diagram-export-button/diagram-export-button.component';
import { ModalDiagramExportComponent } from './modal-diagram-export/modal-diagram-export.component';
import { NoDataHintComponent } from './modal-diagram-export/no-data-hint/no-data-hint.component';
import { ModalExportTimeseriesDataComponent } from './modal-export-timeseries-data/modal-export-timeseries-data.component';
import { ModalImprintComponent } from './modal-imprint/modal-imprint.component';
import { ModalServiceSelectorListComponent } from './modal-service-selector-list/modal-service-selector-list.component';
import { SortServicesPipe } from './modal-service-selector-list/sort-services.pipe';
import { ModalSettingsComponent } from './modal-settings/modal-settings.component';
import { ModalSharePermalinkComponent } from './modal-share-permalink/modal-share-permalink.component';
import {
  ModalShowPhenomenonLocationComponent,
} from './modal-show-phenomenon-location/modal-show-phenomenon-location.component';
import { ModalTimeSettingsComponent } from './modal-time-settings/modal-time-settings.component';
import { ParameterTableComponent } from './parameter-table/parameter-table.component';
import { ServiceSelectorButtonComponent } from './service-selector-button/service-selector-button.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { StationSelectionComponent } from './station-selection/station-selection.component';
import { TimeseriesItemComponent } from './timeseries-item/timeseries-item.component';
import { WvTimespanButtonComponent } from './timespan-button/timespan-button.component';
import { TimespanShifterComponent } from './timespan-shifter/timespan-shifter.component';
import { ToastContainerComponent } from './toast/toast-container/toast-container.component';

const COMPONENTS = [
  CurrentTimeButtonComponent,
  DatasetTableComponent,
  DatePickerComponent,
  DatepickerComponent,
  DesktopListSelectorComponent,
  DiagramExportButtonComponent,
  // FacetsComponent,
  FavoriteExportButtonComponent,
  FavoriteImportButtonComponent,
  FavoriteListComponent,
  GeoSearchComponent,
  LanguageSelectorComponent,
  LayersControlComponent,
  LoadingOverlayComponent,
  LocateButtonComponent,
  MobileListSelectorComponent,
  ModalDatasetoptionsEditorComponent,
  ModalDiagramExportComponent,
  ModalEditFavoriteComponent,
  ModalExportTimeseriesDataComponent,
  ModalImprintComponent,
  ModalServiceSelectorListComponent,
  ModalSettingsComponent,
  ModalSharePermalinkComponent,
  ModalShowPhenomenonLocationComponent,
  ModalTimeSettingsComponent,
  NgbCustomTimepickerComponent,
  NoDataHintComponent,
  ParameterTableComponent,
  ParametersListSelectionComponent,
  ServiceSelectorButtonComponent,
  SideMenuComponent,
  StationSelectionComponent,
  TimeFacetComponent,
  // TimeSliderComponent,
  TimeseriesItemComponent,
  TimespanShifterComponent,
  ToastContainerComponent,
  WvParameterFacetComponent,
  WvResultListComponent,
  WvTimespanButtonComponent,
  ZoomButtonsComponent,
];

const PIPES = [
  SortServicesPipe
];

@NgModule({
  imports: [
    CommonModule,
    ClipboardModule,
    FormsModule,
    TranslateModule,
    QRCodeModule,
    NgbModalModule,
    NgbToastModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbModule,
    NgbTimepickerModule,
    // Ng5SliderModule,
    HelgolandCoreModule,
    HelgolandMapControlModule,
    HelgolandMapViewModule,
    HelgolandSelectorModule,
    HelgolandDatasetDownloadModule,
    HelgolandFacetSearchModule
  ],
  entryComponents: [COMPONENTS],
  exports: [COMPONENTS],
  declarations: [COMPONENTS, PIPES],
})
export class ComponentsModule { }
