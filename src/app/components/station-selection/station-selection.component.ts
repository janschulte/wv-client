import { AddedDatasetPresentation } from './../added-dataset-overlay/added-dataset-overlay.component';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatasetType, HelgolandServicesConnector, HelgolandTimeseries } from '@helgoland/core';
import { DatasetByStationSelectorComponent, SelectableDataset } from '@helgoland/selector';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-station-selection',
  templateUrl: './station-selection.component.html',
  styleUrls: ['./station-selection.component.scss']
})
export class StationSelectionComponent extends DatasetByStationSelectorComponent implements OnInit {

  @Input() filteredTimeseries: HelgolandTimeseries[];

  public additionalTsCount: number;
  public showAdditionalTs = false;

  public added: AddedDatasetPresentation;

  constructor(
    protected servicesConnector: HelgolandServicesConnector,
    public activeModal: NgbActiveModal,
    private router: Router,
    public translateSrvc: TranslateService
  ) {
    super(servicesConnector, translateSrvc);
  }

  ngOnInit() {
    // override ngOnInit and check self, which timeseries are needed to request
    if (this.station) {
      this.servicesConnector.getPlatform(this.station.id, this.url)
        .subscribe(station => {
          this.station = station;
          this.additionalTsCount = 0;
          this.counter = 0;
          const additionalTsIDs = [];
          this.station.datasetIds.forEach(id => {
            const filtered = this.filteredTimeseries.find(e => e.id === id);
            if (!filtered) {
              this.counter++;
              this.additionalTsCount++;
              this.servicesConnector.getDataset({ id, url: this.url }, { type: DatasetType.Timeseries })
                .subscribe(
                  result => this.prepareResult(result as SelectableDataset, this.defaultSelected),
                  error => console.error(error),
                  () => this.counter--
                );
            }
          });
        });
    }
  }

  public datasetSelected(selected: boolean) {
    this.added = new AddedDatasetPresentation(selected);
  }

  public navigateToDiagram() {
    this.activeModal.dismiss();
    this.router.navigate(['/diagram']);
  }

}
