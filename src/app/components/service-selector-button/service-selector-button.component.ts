import { Component, OnInit } from '@angular/core';
import { Service, Settings, SettingsService } from '@helgoland/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ServiceSelectorService } from '../../services/service-selector/service-selector.service';
import { ModalServiceSelectorListComponent } from './../modal-service-selector-list/modal-service-selector-list.component';

@Component({
  selector: 'app-service-selector-button',
  templateUrl: './service-selector-button.component.html',
  styleUrls: ['./service-selector-button.component.scss']
})
export class ServiceSelectorButtonComponent implements OnInit {

  public selectedService: Service;

  private modalInstance: ModalServiceSelectorListComponent;

  constructor(
    private modalService: NgbModal,
    private settings: SettingsService<Settings>,
    private serviceSelector: ServiceSelectorService
  ) { }

  ngOnInit() {
    this.serviceSelector.getSelectedService().subscribe(s => {
      this.selectedService = s;
      if (this.modalInstance) {
        this.modalInstance.selectedService = s;
      }
    });
  }

  openServiceList() {
    const modalRef = this.modalService.open(ModalServiceSelectorListComponent);
    this.modalInstance = modalRef.componentInstance;
    this.modalInstance.datasetApiList = this.settings.getSettings().datasetApis;
    this.modalInstance.providerBlacklist = this.settings.getSettings().providerBlackList;
    this.modalInstance.supportStations = true;
    this.modalInstance.selectedService = this.selectedService;
    this.modalInstance.onServiceSelected.subscribe(s => {
      this.serviceSelector.setSelectedService(s);
      modalRef.dismiss();
    });
  }

}
