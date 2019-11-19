import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatasetApiInterface, Timeseries } from '@helgoland/core';
import { DatasetByStationSelectorComponent, ExtendedTimeseries } from '@helgoland/selector';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-station-selection',
  templateUrl: './station-selection.component.html',
  styleUrls: ['./station-selection.component.scss']
})
export class StationSelectionComponent extends DatasetByStationSelectorComponent implements OnInit {

  @Input() filteredTimeseries: Timeseries[];

  public additionalTsCount: number;
  public showAdditionalTs = false;

  constructor(
    protected apiInterface: DatasetApiInterface,
    public activeModal: NgbActiveModal,
    private router: Router
  ) {
    super(apiInterface);
  }

  ngOnInit() {
    // override ngOnInit and check self, which timeseries are needed to request
    if (this.station) {
      this.apiInterface.getStation(this.station.id, this.url)
        .subscribe(station => {
          this.station = station;
          this.additionalTsCount = 0;
          this.counter = 0;
          const additionalTsIDs = [];
          for (const key in this.station.properties.timeseries) {
            if (this.station.properties.timeseries.hasOwnProperty(key)) {
              const filtered = this.filteredTimeseries.find(e => e.id === key);
              if (!filtered) {
                this.counter++;
                this.additionalTsCount++;
                this.apiInterface.getSingleTimeseries(key, this.url)
                  .subscribe(
                    result => this.prepareResult(result as ExtendedTimeseries, this.defaultSelected),
                    error => console.error(error),
                    () => this.counter--
                  );
              }
            }
          }
        });
    }
  }

  public navigateToDiagram() {
    this.activeModal.dismiss();
    this.router.navigate(['/diagram']);
  }

}
