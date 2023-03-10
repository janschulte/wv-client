import { Component, EventEmitter, Input, Output } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import {
  ColorService,
  DatasetOptions,
  HelgolandServicesConnector,
  IDataset,
  InternalIdHandler,
  Time,
} from '@helgoland/core';
import { ReferenceValueColorCache, TimeseriesEntryComponent } from '@helgoland/depiction';
import { FavoriteService } from '@helgoland/favorite';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

import { ModalSharePermalinkComponent } from '../../../../components/modal-share-permalink/modal-share-permalink.component';
import { ToastService, ToastType } from '../../../../components/toast/toast-container/toast-container.service';
import { DiagramPermalinkService } from '../../diagram-permalink.service';
import {
  ModalExportTimeseriesDataComponent,
} from './../../../../components/modal-export-timeseries-data/modal-export-timeseries-data.component';

marker('favorite.single.remove');
marker('favorite.single.add');

@Component({
  selector: 'app-legend-entry',
  templateUrl: './legend-entry.component.html',
  styleUrls: ['./legend-entry.component.scss']
})
export class LegendEntryComponent extends TimeseriesEntryComponent {

  @Input() loadingData: boolean;

  @Output() highlighted: EventEmitter<string> = new EventEmitter();

  constructor(
    servicesConnector: HelgolandServicesConnector,
    timeSrvc: Time,
    internalIdHandler: InternalIdHandler,
    color: ColorService,
    refValCache: ReferenceValueColorCache,
    translateSrvc: TranslateService,
    private modalService: NgbModal,
    private favoriteSrvc: FavoriteService,
    private toast: ToastService,
    private diagramPermalinkSrvc: DiagramPermalinkService
  ) {
    super(servicesConnector, timeSrvc, internalIdHandler, color, refValCache, translateSrvc);
  }

  public isInTimeSpan(timestamp: number) {
    return this.timeSrvc.containsIn(this.timeInterval, timestamp);
  }

  public toggleHighlight() {
    if (!this.highlight) {
      this.highlighted.emit(this.dataset.internalId);
    } else {
      this.highlighted.emit();
    }
  }

  public openDataExport() {
    const modalRef = this.modalService.open(ModalExportTimeseriesDataComponent, { windowClass: 'fit-modal' });
    (modalRef.componentInstance as ModalExportTimeseriesDataComponent).internalId = this.dataset.internalId;
  }

  public toggleFavorite(options: DatasetOptions) {
    if (this.favoriteSrvc.hasFavorite(this.dataset)) {
      this.favoriteSrvc.removeFavorite(this.dataset.internalId);
      this.toast.show(this.translateSrvc.instant('favorite.single.remove'), { type: ToastType.Warn });
    } else {
      this.favoriteSrvc.addFavorite(this.dataset, options);
      this.toast.show(this.translateSrvc.instant('favorite.single.add', { label: this.dataset.label }), { type: ToastType.Info });
    }
  }

  public isFavorite() {
    return this.favoriteSrvc.hasFavorite(this.dataset);
  }

  public shareTimeseries(dataset: IDataset) {
    const permalink = this.diagramPermalinkSrvc.generatePermalink(dataset);
    const modalRef = this.modalService.open(ModalSharePermalinkComponent);
    (modalRef.componentInstance as ModalSharePermalinkComponent).link = permalink;
  }

}
