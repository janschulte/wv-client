import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-imprint',
  templateUrl: './modal-imprint.component.html',
  styleUrls: ['./modal-imprint.component.scss']
})
export class ModalImprintComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

}
