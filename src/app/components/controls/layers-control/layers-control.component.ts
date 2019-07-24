import { Component, Input } from '@angular/core';
import { LayerMap, LayerOptions, MapCache, MapControlComponent, MapHandlerService } from '@helgoland/map';

@Component({
  selector: 'app-layers-control',
  templateUrl: './layers-control.component.html',
  styleUrls: ['./layers-control.component.scss']
})
export class LayersControlComponent extends MapControlComponent {

  @Input() public baseMaps: LayerMap;

  @Input() public overlayMaps: LayerMap;

  public toggled: boolean;

  constructor(
    protected mapCache: MapCache,
    protected mapHandler: MapHandlerService
  ) {
    super(mapCache);
  }

  switchOverlayVisibility(layer: LayerOptions) {
    this.mapHandler.toggleOverlayLayer(layer, this.mapId);
  }

  switchBaseVisibility(layer: LayerOptions) {
    this.mapHandler.toggleBaseLayer(layer, this.baseMaps, this.mapId);
  }

}
