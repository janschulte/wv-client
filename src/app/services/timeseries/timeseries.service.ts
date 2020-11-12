import { Injectable } from '@angular/core';
import {
  BarRenderingHints,
  ColorService,
  DatasetOptions,
  HelgolandServicesConnector,
  LocalStorage,
  RenderingHintsDatasetService,
  SettingsService,
  Time,
  Timespan,
} from '@helgoland/core';

import { WvSettings } from '../../models/wv-settings';

const TIMESERIES_OPTIONS_CACHE_PARAM = 'timeseriesOptions';
const TIMESERIES_IDS_CACHE_PARAM = 'timeseriesIds';
const TIME_CACHE_PARAM = 'timeseriesTime';
const GENERALIZE_CACHE_PARAM = 'generalize';

@Injectable({
  providedIn: 'root'
})
export class TimeseriesService extends RenderingHintsDatasetService<DatasetOptions> {

  private _timespan: Timespan;
  private _generalize = true;

  constructor(
    protected localStorage: LocalStorage,
    protected timeSrvc: Time,
    protected servicesConnector: HelgolandServicesConnector,
    private settings: SettingsService<WvSettings>,
    private color: ColorService
  ) {
    super(servicesConnector);
    this.initFromState();
  }

  get timespan(): Timespan {
    return this._timespan || this.timeSrvc.initTimespan();
  }

  set timespan(timespan: Timespan) {
    this._timespan = timespan;
    this.saveState();
  }

  get generalize(): boolean {
    return this._generalize;
  }

  set generalize(g: boolean) {
    this._generalize = g;
    this.saveState();
  }

  public initFromState() {
    this.loadState();
  }

  protected createStyles(internalId: string) {
    const options = new DatasetOptions(internalId, this.color.getColor());
    options.generalize = this._generalize;
    return options;
  }

  protected handleBarRenderingHints(barHints: BarRenderingHints, options: DatasetOptions) {
    options.type = 'bar';
    if (barHints && barHints.properties.width) {
      options.lineWidth = Math.round(parseFloat(barHints.properties.width));
    }
    if (barHints && barHints.properties.interval) {
      if (barHints.properties.interval === 'byDay') {
        options.barPeriod = 'P1D';
        options.barStartOf = 'day';
      }
      if (barHints.properties.interval === 'byHour') {
        options.barPeriod = 'PT1H';
        options.barStartOf = 'hour';
      }
    }
    options.yAxisRange = { min: 0 };
  }

  protected saveState(): void {
    if (this.settings.getSettings().saveState) {
      this.localStorage.save(TIMESERIES_IDS_CACHE_PARAM, this.datasetIds);
      this.localStorage.save(TIMESERIES_OPTIONS_CACHE_PARAM, Array.from(this.datasetOptions.values()));
      this.localStorage.save(GENERALIZE_CACHE_PARAM, this._generalize);
      this.timeSrvc.saveTimespan(TIME_CACHE_PARAM, this._timespan);
    }
  }

  protected loadState(): void {
    if (this.settings.getSettings().saveState) {
      const options = this.localStorage.loadArray<DatasetOptions>(TIMESERIES_OPTIONS_CACHE_PARAM);
      if (options) { options.forEach(e => this.datasetOptions.set(e.internalId, e)); }
      this.datasetIds = this.localStorage.loadArray<string>(TIMESERIES_IDS_CACHE_PARAM) || [];
      this._timespan = this.timeSrvc.loadTimespan(TIME_CACHE_PARAM);
      this._generalize = this.localStorage.load<boolean>(GENERALIZE_CACHE_PARAM) || true;
    }
  }

}
