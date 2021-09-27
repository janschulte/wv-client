import { Component, OnInit } from '@angular/core';
import { DatasetOptions, DatasetType, HelgolandServicesConnector, Time, Timespan } from '@helgoland/core';
import { D3PlotOptions } from '@helgoland/d3';
import { FavoriteService } from '@helgoland/favorite';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { forkJoin } from 'rxjs';

import { ModalSharePermalinkComponent } from '../../components/modal-share-permalink/modal-share-permalink.component';
import { ToastService, ToastType } from '../../components/toast/toast-container/toast-container.service';
import { LayoutValidatorService, ScreenSize } from '../../services/layout-validator/layout-validator.service';
import { TimeseriesService } from '../../services/timeseries/timeseries.service';
import {
  ModalDatasetoptionsEditorComponent,
} from './../../components/modal-datasetoptions-editor/modal-datasetoptions-editor.component';
import { ModalDiagramExportComponent } from './../../components/modal-diagram-export/modal-diagram-export.component';
import {
  ModalShowPhenomenonLocationComponent,
} from './../../components/modal-show-phenomenon-location/modal-show-phenomenon-location.component';
import { ModalTimeSettingsComponent } from './../../components/modal-time-settings/modal-time-settings.component';
import { DiagramPermalinkService } from './diagram-permalink.service';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit {

  public legendActive = false;
  public hideOverview = true;

  public selectedIds: string[] = [];
  public highlightId: string;
  public timespan: Timespan;

  public overviewLoading = false;
  public chartLoading = false;

  public loadData: Set<string> = new Set();

  public favoriteGroupAdded: boolean;

  public overviewOptions: D3PlotOptions = {
    overview: true,
    requestBeforeAfterValues: true,
    showTimeLabel: false
  };

  public diagramOptions: D3PlotOptions = {
    showTimeLabel: false,
    showReferenceValues: true,
    requestBeforeAfterValues: true,
    generalizeAllways: false,
    yaxis: true,
    timeRangeLabel: {
      show: false
    },
    copyright: {
      label: this.translateSrvc.instant('chart.annotation'),
      positionX: 'right',
      positionY: 'bottom'
    }
  };

  constructor(
    public timeseriesService: TimeseriesService,
    private modalService: NgbModal,
    private time: Time,
    private favoriteSrvc: FavoriteService,
    private servicesConnector: HelgolandServicesConnector,
    private toast: ToastService,
    private translateSrvc: TranslateService,
    private diagramPermalinkSrvc: DiagramPermalinkService,
    private layoutValidator: LayoutValidatorService
  ) {
    // https://stackoverflow.com/questions/50792027/touchmove-event-not-firing-on-google-chrome-for-android
    document.body.addEventListener("touchstart", function (e) { }, false);
    // document.body.addEventListener("touchend", function (e) { }, false);
    // document.body.addEventListener("touchmove", function (e) { }, false);
  }

  ngOnInit() {
    if (!this.diagramPermalinkSrvc.canValidatePermalink()) {
      this.timeseriesService.initFromState();
    }
    this.timespan = this.timeseriesService.timespan;

    this.legendActive = !this.layoutValidator.isMax(ScreenSize.mobileMax);
    this.hideOverview = this.layoutValidator.isMax(ScreenSize.mobileMax);

    this.translateSrvc.onLangChange.subscribe(() => this.diagramOptions.copyright.label = this.translateSrvc.instant('chart.annotation'));
  }

  toggleLegend(active: boolean) {
    this.legendActive = active;
    setTimeout(() => window.dispatchEvent(new Event('resize')), 10);
  }

  isSelected(id: string) {
    // TODO implement
    return false;
  }

  shareTimeseries() {
    const permalink = this.diagramPermalinkSrvc.generatePermalink();
    const modalRef = this.modalService.open(ModalSharePermalinkComponent);
    (modalRef.componentInstance as ModalSharePermalinkComponent).link = permalink;
    (modalRef.componentInstance as ModalSharePermalinkComponent).multi = true;
  }

  createFavoriteGroup() {
    forkJoin(this.timeseriesService.datasetIds.map(id => this.servicesConnector.getDataset(id, { type: DatasetType.Timeseries })))
      .subscribe(datasets => {
        const label = this.translateSrvc.instant('favorite.label') + ' ' + (this.favoriteSrvc.getFavoriteGroups().length + 1);
        this.toast.show(this.translateSrvc.instant('favorite.group.add', { label }), { type: ToastType.Info });
        const group = datasets.map(e => ({ dataset: e, options: this.timeseriesService.datasetOptions.get(e.internalId) }));
        this.favoriteSrvc.addFavoriteGroup(group, label);
        this.favoriteGroupAdded = true;
        setTimeout(() => this.favoriteGroupAdded = false, 2000);
      });
  }

  updateOptions(options: DatasetOptions, id: string) {
    this.timeseriesService.updateDatasetOptions(options, id);
  }

  openModalExportImage() {
    this.modalService.open(ModalDiagramExportComponent, { windowClass: 'fit-modal' });
  }

  editOption(options: DatasetOptions) {
    const modalRef = this.modalService.open(ModalDatasetoptionsEditorComponent);
    (modalRef.componentInstance as ModalDatasetoptionsEditorComponent).options = options;
    modalRef.result.then((editedOptions: DatasetOptions) =>
      this.timeseriesService.updateDatasetOptions(editedOptions, editedOptions.internalId)
    );
  }

  setSelected(ids: string[]) {
    // TODO implement
  }

  selectDataset(selection: boolean, id: string) {
    // TODO implement
  }

  showGeometry(geometry: GeoJSON.GeoJsonObject) {
    const modalRef = this.modalService.open(ModalShowPhenomenonLocationComponent);
    (modalRef.componentInstance as ModalShowPhenomenonLocationComponent).geometry = geometry;
  }

  toggleGeneralization() {
    this.timeseriesService.generalize = !this.timeseriesService.generalize;
    this.timeseriesService.datasetOptions.forEach(v => {
      v.generalize = this.timeseriesService.generalize;
    });
  }

  onHighlighted(id: string) {
    // reset old one
    if (this.highlightId && this.timeseriesService.datasetOptions.get(this.highlightId)) {
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
    setTimeout(() => this.chartLoading = loading);
  }

  onOverviewLoading(loading: boolean) {
    setTimeout(() => this.overviewLoading = loading);
  }

  openTimeSettings() {
    const modalRef = this.modalService.open(ModalTimeSettingsComponent, { windowClass: 'fit-modal' });
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

  setLoadedIds(loadedIds: Set<string>) {
    this.loadData = loadedIds;
  }

}
