import { Component, OnInit } from '@angular/core';
import { Timespan } from '@helgoland/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TimeseriesService } from '../../services/timeseries/timeseries.service';

@Component({
  selector: 'app-modal-diagram-export',
  templateUrl: './modal-diagram-export.component.html',
  styleUrls: ['./modal-diagram-export.component.scss']
})
export class ModalDiagramExportComponent implements OnInit {

  public timespan: Timespan;

  public title = 'Diagram Export';
  public start: Date;
  public end: Date;
  public showFirstLastDate = true;
  public showLegend = true;

  constructor(
    public activeModal: NgbActiveModal,
    public timeseriesService: TimeseriesService,
  ) { }

  ngOnInit() {
    this.start = new Date(this.timeseriesService.timespan.from);
    this.end = new Date(this.timeseriesService.timespan.to);
    this.setTimespan();
  }

  setStart(start: Date) {
    this.start = new Date(start);
    this.setTimespan();
  }

  setEnd(end: Date) {
    this.end = new Date(end);
    this.setTimespan();
  }

  private setTimespan() {
    this.timespan = new Timespan(this.start, this.end);
  }

}
