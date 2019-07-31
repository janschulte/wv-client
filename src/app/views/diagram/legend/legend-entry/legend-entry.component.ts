import { Component, Output, EventEmitter } from '@angular/core';
import { TimeseriesEntryComponent, ReferenceValueColorCache } from '@helgoland/depiction';
import { DatasetApiInterface, Time, InternalIdHandler, ColorService } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-legend-entry',
  templateUrl: './legend-entry.component.html',
  styleUrls: ['./legend-entry.component.scss']
})
export class LegendEntryComponent extends TimeseriesEntryComponent {

  @Output() highlighted: EventEmitter<string> = new EventEmitter();

  constructor(
    api: DatasetApiInterface,
    timeSrvc: Time,
    internalIdHandler: InternalIdHandler,
    color: ColorService,
    refValCache: ReferenceValueColorCache,
    translateSrvc: TranslateService
  ) {
    super(api, timeSrvc, internalIdHandler, color, refValCache, translateSrvc);
  }

  public isInTimeSpan(timespan: number) {
    // TODO implement, perhaps add to toolbox
    return true;
  }

  public toggleHighlight() {
    if (!this.highlight) {
      this.highlighted.emit(this.dataset.internalId);
    } else {
      this.highlighted.emit();
    }
  }

}
