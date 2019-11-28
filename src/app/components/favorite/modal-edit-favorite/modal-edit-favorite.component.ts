import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-edit-favorite',
  templateUrl: './modal-edit-favorite.component.html',
  styleUrls: ['./modal-edit-favorite.component.scss']
})
export class ModalEditFavoriteComponent {

  @Input() label: string;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  setNewLabel() {
    this.activeModal.close(this.label);
  }

}
