import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatasetApiInterface } from '@helgoland/core';
import { DatasetByStationSelectorComponent } from '@helgoland/selector';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-station-selection',
  templateUrl: './station-selection.component.html',
  styleUrls: ['./station-selection.component.scss']
})
export class StationSelectionComponent extends DatasetByStationSelectorComponent {

  constructor(
    protected apiInterface: DatasetApiInterface,
    public activeModal: NgbActiveModal,
    private router: Router
  ) {
    super(apiInterface);
  }

  public navigateToDiagram() {
    this.activeModal.dismiss();
    this.router.navigate(['/start']);
  }

}
