import { Component, OnInit } from '@angular/core';
import { DatasetOptions, Time, Timespan } from '@helgoland/core';
import { D3PlotOptions } from '@helgoland/d3';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';

import { TimeseriesService } from '../../services/timeseries/timeseries.service';
import {
  ModalDatasetoptionsEditorComponent,
} from './../../components/modal-datasetoptions-editor/modal-datasetoptions-editor.component';
import { ModalDiagramExportComponent } from './../../components/modal-diagram-export/modal-diagram-export.component';
import { ModalTimeSettingsComponent } from './../../components/modal-time-settings/modal-time-settings.component';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit {

  public legendActive = true;

  public selectedIds: string[] = [];
  public highlightId: string;
  public timespan: Timespan;

  public loadData: Set<string> = new Set();

  public overviewOptions: D3PlotOptions = {
    overview: true,
    showTimeLabel: false
  };

  public diagramOptions: D3PlotOptions = {
    showTimeLabel: false,
    showReferenceValues: true,
    generalizeAllways: false
  };

  constructor(
    public timeseriesService: TimeseriesService,
    private modalService: NgbModal,
    private time: Time
  ) { }

  ngOnInit() {
    this.timespan = this.timeseriesService.timespan;
  }

  toggleLegend(active: boolean) {
    this.legendActive = active;
    setTimeout(() => window.dispatchEvent(new Event('resize')), 10);
  }

  isSelected(id: string) {
    // TODO implement
    return false;
  }

  shareTimeseries() { }

  createFavoriteGroup() { }

  updateOptions(options: DatasetOptions, id: string) {
    // TODO implement
  }

  dataLoaded(loaded) {
    debugger;
  }

  openModalExportImage() {
    const modalRef = this.modalService.open(ModalDiagramExportComponent);
    // (modalRef.componentInstance as ModalDatasetoptionsEditorComponent).options = options;
  }

  editOption(options: DatasetOptions) {
    const modalRef = this.modalService.open(ModalDatasetoptionsEditorComponent);
    (modalRef.componentInstance as ModalDatasetoptionsEditorComponent).options = options;
  }

  setSelected(ids: string[]) {
    // TODO implement
  }

  selectDataset(selection: boolean, id: string) {
    // TODO implement
  }

  showGeometry(geometry: GeoJSON.GeoJsonObject) {
    // TODO implement
  }

  toggleGeneralization() {
    this.timeseriesService.generalize = !this.timeseriesService.generalize;
    this.timeseriesService.datasetOptions.forEach(v => {
      v.generalize = this.timeseriesService.generalize;
    });
  }

  onHighlighted(id: string) {
    // reset old one
    if (this.highlightId) {
      this.timeseriesService.datasetOptions.get(this.highlightId).lineWidth = 1;
    }
    this.highlightId = id;
    if (id) {
      this.timeseriesService.datasetOptions.get(id).lineWidth = 3;
    }
  }

  deleteAll() {
    this.timeseriesService.removeAllDatasets();
  }

  onGraphLoading(loading: boolean) {
    // TODO implement
  }

  onOverviewLoading(loading: boolean) {
    // TODO implement
  }

  openTimeSettings() {
    const modalRef = this.modalService.open(ModalTimeSettingsComponent);
    (modalRef.componentInstance as ModalTimeSettingsComponent).timespan = this.timespan;
    modalRef.result.then((res: Timespan) => this.timespanChanged(res));
  }

  centerTime(date: Date) {
    this.timespan = this.time.centerTimespan(this.timespan, date);
    this.timeseriesService.timespan = this.timespan;
  }

  timespanChanged(timespan: Timespan) {
    this.timespan = timespan;
    this.timeseriesService.timespan = this.timespan;
  }

  oneDay = (): Timespan => {
    return this.time.centerTimespanWithDuration(this.timespan, moment.duration(1, 'day'));
  }

  oneWeek = (): Timespan => {
    return this.time.centerTimespanWithDuration(this.timespan, moment.duration(7, 'day'));
  }

  oneMonth = (): Timespan => {
    return this.time.centerTimespanWithDuration(this.timespan, moment.duration(30, 'day'));
  }

}
