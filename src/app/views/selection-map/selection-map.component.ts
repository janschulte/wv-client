import { Component, OnDestroy, OnInit } from '@angular/core';
import { HelgolandPlatform, HelgolandTimeseries } from '@helgoland/core';
import { FacetSearchService } from '@helgoland/facet-search';
import { LayerOptions } from '@helgoland/map';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { tileLayer } from 'leaflet';
import { Subscription } from 'rxjs';

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
    private layoutValidator: LayoutValidatorService
  ) { }

  ngOnInit() {
    this.clusterStations = this.stateHandler.load(KEY_STORAGE_CLUSTER_STATIONS);

    this.subscriptions.push(this.facetSearch.getResults().subscribe(ts => this.resultCount = ts.length));
    this.subscriptions.push(this.serviceSelectorSrvc.getLoading().subscribe(loading => this.loading = loading));

    this.sideMenuActive = !this.layoutValidator.isMax(ScreenSize.mobileMax);

    this.baseMaps.set('OM', {
      label: 'OM',
      visible: true,
      layer: tileLayer('https://maps.omniscale.net/v2/fluggs-d9227d46/style.default/{z}/{x}/{y}.png', {
        maxZoom: 18,
      })
    });

    this.overlayMaps.set('wv-area',
      {
        label: 'Wupperverbandsgebiet',
        visible: true,
        layer: tileLayer.wms('http://fluggs.wupperverband.de/WMS_WV_Oberflaechengewaesser_EZG?', {
          layers: '0',
          format: 'image/png',
          transparent: true
        })
      }
    );
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
