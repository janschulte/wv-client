import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalImprintComponent } from '../../components/modal-imprint/modal-imprint.component';
import { TimeseriesService } from '../../services/timeseries/timeseries.service';
import { ModalSettingsComponent } from './../../components/modal-settings/modal-settings.component';
import { SelectionNavigationService } from './selection-navigation.service';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit {

  public datasetCount: number;

  constructor(
    public selectionNavigation: SelectionNavigationService,
    private timeseriesService: TimeseriesService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.datasetCount = this.timeseriesService.datasetIds.length;
    this.timeseriesService.datasetIdsChanged.subscribe(ids => {
      this.datasetCount = ids.length;
    });
  }

  public openImprint() {
    this.modalService.open(ModalImprintComponent);
  }

  public openSettings() {
    this.modalService.open(ModalSettingsComponent);
  }

}
