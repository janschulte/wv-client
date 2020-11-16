import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { SettingsService } from '@helgoland/core';
import { LayerCreator, LayerMap, LayerOptions, MapCache } from '@helgoland/map';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as L from 'leaflet';

import { WvSettings } from '../../models/wv-settings';

@Component({
  selector: 'app-modal-show-phenomenon-location',
  templateUrl: './modal-show-phenomenon-location.component.html',
  styleUrls: ['./modal-show-phenomenon-location.component.scss']
})
export class ModalShowPhenomenonLocationComponent implements OnInit, AfterViewInit {

  @Input() public geometry: GeoJSON.GeoJsonObject;

  public mapId = 'mapGeometryViewerModal';
  public mapOptions: L.MapOptions = { maxZoom: 12 };

  public baseMaps: LayerMap = new Map<string, LayerOptions>();

  public customIcon = L.icon({
    iconRetinaUrl: './assets/images/marker@2x.png',
    iconUrl: './assets/images/marker.png',
    shadowUrl: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });

  constructor(
    public activeModal: NgbActiveModal,
    public mapCache: MapCache,
    private settingsService: SettingsService<WvSettings>
  ) { }

  ngOnInit() {
    this.settingsService.getSettings().baseLayers
      .forEach(conf => this.baseMaps.set(conf.label, new LayerCreator().createLayerOptions(conf)));
    this.settingsService.getSettings().overlayLayers
      .forEach(conf => this.baseMaps.set(conf.label, new LayerCreator().createLayerOptions(conf)));

    if (!this.geometry) {
      console.log('no geometry provided');
    } else {
      console.log(this.geometry);
    }
  }

  ngAfterViewInit(): void {
    window.setTimeout(() => this.mapCache.getMap(this.mapId).invalidateSize(), 10);
  }

}
