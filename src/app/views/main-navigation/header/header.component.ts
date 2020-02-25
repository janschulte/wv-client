import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '@helgoland/favorite';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalImprintComponent } from '../../../components/modal-imprint/modal-imprint.component';
import { ModalSettingsComponent } from '../../../components/modal-settings/modal-settings.component';
import { TimeseriesService } from '../../../services/timeseries/timeseries.service';
import { SelectionNavigationService } from '../selection-navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public datasetCount: number;
  public favoriteCount: number;

  constructor(
    public selectionNavigation: SelectionNavigationService,
    private timeseriesService: TimeseriesService,
    private modalService: NgbModal,
    public favoriteSrvc: FavoriteService
  ) { }

  ngOnInit(): void {
    this.datasetCount = this.timeseriesService.datasetIds.length;
    this.timeseriesService.datasetIdsChanged.subscribe(ids => this.datasetCount = ids.length);
    this.favoriteSrvc.getFavoriteCountChanged().subscribe(count => this.favoriteCount = count);
  }

  public openImprint() {
    this.modalService.open(ModalImprintComponent);
  }

  public openSettings() {
    this.modalService.open(ModalSettingsComponent);
  }

}
