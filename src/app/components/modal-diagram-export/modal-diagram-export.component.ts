import { Component, OnInit } from '@angular/core';
import { Timespan } from '@helgoland/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TimeseriesService } from '../../services/timeseries/timeseries.service';
import moment from 'moment';

@Component({
  selector: 'app-modal-diagram-export',
  templateUrl: './modal-diagram-export.component.html',
  styleUrls: ['./modal-diagram-export.component.scss']
})
export class ModalDiagramExportComponent implements OnInit {

  public timespan: Timespan;

  public title = 'Diagram Export';
  public start: string;
  public end: string;
  public showFirstLastDate = true;
  public showLegend = true;

  constructor(
    public activeModal: NgbActiveModal,
    public timeseriesService: TimeseriesService,
  ) { }

  ngOnInit() {
    this.timespan = new Timespan(this.timeseriesService.timespan.from, this.timeseriesService.timespan.to);
    this.start = moment(this.timespan.from).format('DD.MM.YYYY HH:mm');
    this.end = moment(this.timespan.to).format('DD.MM.YYYY HH:mm');
  }

  /**
   * Update timespan.
   * @param $event current date
   * @param fromDate indicate if from or to date was changed
   */
  onTimepickerSelected($event: Date, fromDate: boolean) {
    let from = this.timespan.from;
    let to = this.timespan.to;
    if (fromDate) {
      from = moment($event).unix() * 1000;
      if (from > to) {
        to = from;
      }
    } else {
      to = moment($event).unix() * 1000;
    }
    this.timespan = new Timespan(Math.min(from, to), Math.max(from, to));
    this.start = moment(this.timespan.from).format('DD.MM.YYYY HH:mm');
    this.end = moment(this.timespan.to).format('DD.MM.YYYY HH:mm');
  }

}
