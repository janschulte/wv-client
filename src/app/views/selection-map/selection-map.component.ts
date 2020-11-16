import { Component, OnDestroy, OnInit } from '@angular/core';
import { HelgolandPlatform, HelgolandTimeseries, SettingsService } from '@helgoland/core';
import { FacetSearchService } from '@helgoland/facet-search';
import { LayerCreator, LayerOptions } from '@helgoland/map';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { WvSettings } from '../../models/wv-settings';
import { ServiceSelectorService } from '../../services/service-selector/service-selector.service';
import { StateHandlerService } from '../../services/state-handler/state-handler.service';
import { StationSelectionComponent } from './../../components/station-selection/station-selection.component';
import { LayoutValidatorService, ScreenSize } from './../../services/layout-validator/layout-validator.service';
import { KEY_STORAGE_CLUSTER_STATIONS } from './../../services/state-handler/state-handler.service';

@Component({
  selector: 'app-selection-map',
  templateUrl: './selection-map.component.html',
  styleUrls: ['./selection-map.component.scss']
})
export class SelectionMapComponent implements OnInit, OnDestroy {

  public timeseries: HelgolandTimeseries[];

  public overlayMaps: Map<string, LayerOptions> = new Map<string, LayerOptions>();

  public baseMaps: Map<string, LayerOptions> = new Map<string, LayerOptions>();

  public sideMenuActive = false;

  public resultCount: number;

  public subscriptions: Subscription[] = [];

  public loading: boolean;

  public toggleMarker = true;

  public clusterStations: boolean;

  constructor(
    public facetSearch: FacetSearchService,
    private stateHandler: StateHandlerService,
    private modalService: NgbModal,
    public serviceSelectorSrvc: ServiceSelectorService,
    private layoutValidator: LayoutValidatorService,
    private settings: SettingsService<WvSettings>
  ) { }

  ngOnInit() {
    this.clusterStations = this.stateHandler.load(KEY_STORAGE_CLUSTER_STATIONS);

    this.subscriptions.push(this.facetSearch.getResults().subscribe(ts => this.resultCount = ts.length));
    this.subscriptions.push(this.serviceSelectorSrvc.getLoading().subscribe(loading => this.loading = loading));

    this.sideMenuActive = !this.layoutValidator.isMax(ScreenSize.mobileMax);

    this.settings.getSettings().baseLayers
      .forEach(conf => this.baseMaps.set(conf.label, new LayerCreator().createLayerOptions(conf)));

    this.settings.getSettings().overlayLayers
      .forEach(conf => this.overlayMaps.set(conf.label, new LayerCreator().createLayerOptions(conf)));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public onSelectedTs(elem: { station: HelgolandPlatform, url: string }) {
    // TODO: Translation
    const modalRef = this.modalService.open(StationSelectionComponent);
    (modalRef.componentInstance as StationSelectionComponent).station = elem.station;
    (modalRef.componentInstance as StationSelectionComponent).url = elem.url;
    (modalRef.componentInstance as StationSelectionComponent).filteredTimeseries =
      this.facetSearch.getFilteredResults().filter(e => e.url === elem.url && e.platform.id === elem.station.id);
  }

  public updateSideMenu(active: boolean) {
    this.sideMenuActive = active;
    setTimeout(() => window.dispatchEvent(new Event('resize')), 10);
  }

}
