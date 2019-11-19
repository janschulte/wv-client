import { Component, OnDestroy, OnInit } from '@angular/core';
import { Station, Timeseries } from '@helgoland/core';
import { FacetSearchService } from '@helgoland/facet-search';
import { LayerOptions } from '@helgoland/map';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { tileLayer } from 'leaflet';
import { Subscription } from 'rxjs';

import { StateHandlerService } from '../../services/state-handler/state-handler.service';
import { StationSelectionComponent } from './../../components/station-selection/station-selection.component';
import { KEY_STORAGE_CLUSTER_STATIONS } from './../../services/state-handler/state-handler.service';

@Component({
  selector: 'app-selection-map',
  templateUrl: './selection-map.component.html',
  styleUrls: ['./selection-map.component.scss']
})
export class SelectionMapComponent implements OnInit, OnDestroy {

  public timeseries: Timeseries[];

  public overlayMaps: Map<string, LayerOptions> = new Map<string, LayerOptions>();

  public baseMaps: Map<string, LayerOptions> = new Map<string, LayerOptions>();

  public sideMenuActive = true;

  public resultCount: number;

  public resultSubs: Subscription;

  public toggleMarker = true;

  public clusterStations: boolean;

  constructor(
    public facetSearch: FacetSearchService,
    private stateHandler: StateHandlerService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.clusterStations = this.stateHandler.load(KEY_STORAGE_CLUSTER_STATIONS);

    this.resultSubs = this.facetSearch.getResults().subscribe(ts => this.resultCount = ts.length);

    this.baseMaps.set('OM', {
      label: 'OM',
      visible: true,
      layer: tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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
    this.resultSubs.unsubscribe();
  }

  public onSelectedTs(elem: { station: Station, url: string }) {
    const modalRef = this.modalService.open(StationSelectionComponent);
    (modalRef.componentInstance as StationSelectionComponent).station = elem.station;
    (modalRef.componentInstance as StationSelectionComponent).url = elem.url;
    (modalRef.componentInstance as StationSelectionComponent).filteredTimeseries =
      this.facetSearch.getFilteredResults().filter(e => e.url === elem.url && e.station.id === elem.station.id);
  }

  public updateSideMenu(active: boolean) {
    this.sideMenuActive = active;
    setTimeout(() => window.dispatchEvent(new Event('resize')), 10);
  }

}
