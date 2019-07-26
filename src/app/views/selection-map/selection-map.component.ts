import { Component, OnDestroy, OnInit } from '@angular/core';
import { Station, Timeseries } from '@helgoland/core';
import { FacetSearchService } from '@helgoland/facet-search';
import { LayerOptions, MapCache } from '@helgoland/map';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { tileLayer } from 'leaflet';
import { Subscription } from 'rxjs';

import { StationSelectionComponent } from './../../components/station-selection/station-selection.component';

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

  constructor(
    public facetSearch: FacetSearchService,
    private modalService: NgbModal,
    private mapCache: MapCache
  ) { }

  ngOnInit() {
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
  }

  public updateSideMenu(active: boolean) {
    this.sideMenuActive = active;
    setTimeout(() => this.mapCache.getMap('facet-search').invalidateSize(), 100);
  }

}
