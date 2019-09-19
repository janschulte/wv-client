import { SettingsService, Settings, Language } from '@helgoland/core';
import { TimeseriesService } from './../../services/timeseries/timeseries.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { StateHandlerService } from '../../services/state-handler/state-handler.service';
import {
  KEY_STORAGE_CLUSTER_STATIONS,
  KEY_STORAGE_VALUED_MARKER,
} from './../../services/state-handler/state-handler.service';

@Component({
  selector: 'app-modal-settings',
  templateUrl: './modal-settings.component.html',
  styleUrls: ['./modal-settings.component.scss']
})
export class ModalSettingsComponent implements OnInit {

  public clusterMarker: boolean;
  public valuedMarker: boolean;
  public languageList: Language[];

  constructor(
    public activeModal: NgbActiveModal,
    private timeseriesSrvc: TimeseriesService,
    private stateHandler: StateHandlerService,
    private settings: SettingsService<Settings>
  ) { }

  ngOnInit() {
    this.clusterMarker = this.stateHandler.load(KEY_STORAGE_CLUSTER_STATIONS);
    this.valuedMarker = this.stateHandler.load(KEY_STORAGE_VALUED_MARKER);
    this.languageList = this.settings.getSettings().languages;
  }

  public toggleMarkerCluster() {
    this.stateHandler.save(KEY_STORAGE_CLUSTER_STATIONS, !this.clusterMarker);
    this.activeModal.close();
  }

  public toggleValuedMarker() {
    this.stateHandler.save(KEY_STORAGE_VALUED_MARKER, !this.valuedMarker);
    this.activeModal.close();
  }

  public resetStatus() {
    this.stateHandler.removeItem(KEY_STORAGE_CLUSTER_STATIONS);
    this.stateHandler.removeItem(KEY_STORAGE_VALUED_MARKER);
    this.timeseriesSrvc.removeAllDatasets();
    this.activeModal.close();
  }

}
