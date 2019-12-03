import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as L from 'leaflet';

@Component({
  selector: 'app-modal-show-phenomenon-location',
  templateUrl: './modal-show-phenomenon-location.component.html',
  styleUrls: ['./modal-show-phenomenon-location.component.scss']
})
export class ModalShowPhenomenonLocationComponent implements OnInit {

  @Input() public geometry: GeoJSON.GeoJsonObject;

  public customIcon = L.icon({
    iconRetinaUrl: './assets/images/marker@2x.png',
    iconUrl: './assets/images/marker.png',
    shadowUrl: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
    if (!this.geometry) {
      console.log('no geometry provided');
    } else {
      console.log(this.geometry);
    }
  }

}
