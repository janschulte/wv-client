import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColorService, DatasetApiInterface, DatasetOptions, IDataset, InternalIdHandler, Time } from '@helgoland/core';
import { ReferenceValueColorCache, TimeseriesEntryComponent } from '@helgoland/depiction';
import { FavoriteService } from '@helgoland/favorite';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

import { ToastService } from '../../../../components/toast/toast-container/toast-container.service';
import {
  ModalExportTimeseriesDataComponent,
} from './../../../../components/modal-export-timeseries-data/modal-export-timeseries-data.component';

@Component({
  selector: 'app-legend-entry',
  templateUrl: './legend-entry.component.html',
  styleUrls: ['./legend-entry.component.scss']
})
export class LegendEntryComponent extends TimeseriesEntryComponent {

  @Input() loadingData: boolean;

  @Output() highlighted: EventEmitter<string> = new EventEmitter();

  constructor(
    api: DatasetApiInterface,
    timeSrvc: Time,
    internalIdHandler: InternalIdHandler,
    color: ColorService,
    refValCache: ReferenceValueColorCache,
    translateSrvc: TranslateService,
    private modalService: NgbModal,
    private favoriteSrvc: FavoriteService,
    private toast: ToastService
  ) {
    super(api, timeSrvc, internalIdHandler, color, refValCache, translateSrvc);
  }

  public isInTimeSpan(timestamp: number) {
    // TODO: implement, perhaps add to toolbox
    return true;
  }

  public toggleHighlight() {
    if (!this.highlight) {
      this.highlighted.emit(this.dataset.internalId);
    } else {
      this.highlighted.emit();
    }
  }

  public openDataExport() {
    const modalRef = this.modalService.open(ModalExportTimeseriesDataComponent);
    (modalRef.componentInstance as ModalExportTimeseriesDataComponent).internalId = this.dataset.internalId;
  }

  public toggleFavorite(dataset: IDataset, options: DatasetOptions) {
    if (this.favoriteSrvc.hasFavorite(dataset)) {
      this.favoriteSrvc.removeFavorite(dataset.internalId);
      this.toast.show(this.translateSrvc.instant('favorite.single.remove'), { classname: 'negative' });
    } else {
      this.favoriteSrvc.addFavorite(dataset, options);
      this.toast.show(this.translateSrvc.instant('favorite.single.add', { label: dataset.label }), { classname: 'positive' });
    }
  }

  public isFavorite(dataset: IDataset) {
    return this.favoriteSrvc.hasFavorite(dataset);
  }

}
