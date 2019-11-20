import { Component, OnInit } from '@angular/core';
import { ServiceSelectorComponent, ServiceSelectorService } from '@helgoland/selector';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-service-selector-list',
  templateUrl: './modal-service-selector-list.component.html',
  styleUrls: ['./modal-service-selector-list.component.scss']
})
export class ModalServiceSelectorListComponent extends ServiceSelectorComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
    protected serviceSelectorService: ServiceSelectorService
  ) {
    super(serviceSelectorService);
  }

}
