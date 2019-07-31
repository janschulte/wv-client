import { Injectable } from '@angular/core';
import {
  ColorService,
  DatasetApiInterface,
  DatasetOptions,
  LocalStorage,
  RenderingHintsDatasetService,
  Time,
  Timespan,
} from '@helgoland/core';

const TIMESERIES_OPTIONS_CACHE_PARAM = 'timeseriesOptions';
const TIMESERIES_IDS_CACHE_PARAM = 'timeseriesIds';
const TIME_CACHE_PARAM = 'timeseriesTime';
const GENERALIZE_CACHE_PARAM = 'generalize';

@Injectable({
  providedIn: 'root'
})
export class TimeseriesService extends RenderingHintsDatasetService<DatasetOptions> {

  private _timespan: Timespan;
  private _generalize: boolean;

  constructor(
    protected localStorage: LocalStorage,
    protected timeSrvc: Time,
    protected api: DatasetApiInterface,
    private color: ColorService
  ) {
    super(api);
    this.loadState();
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

  protected createStyles(internalId: string) {
    const options = new DatasetOptions(internalId, this.color.getColor());
    options.generalize = false;
    return options;
  }

  protected saveState(): void {
    this.localStorage.save(TIMESERIES_IDS_CACHE_PARAM, this.datasetIds);
    this.localStorage.save(TIMESERIES_OPTIONS_CACHE_PARAM, Array.from(this.datasetOptions.values()));
    this.localStorage.save(GENERALIZE_CACHE_PARAM, this._generalize);
    this.timeSrvc.saveTimespan(TIME_CACHE_PARAM, this._timespan);
  }

  protected loadState(): void {
    const options = this.localStorage.loadArray<DatasetOptions>(TIMESERIES_OPTIONS_CACHE_PARAM);
    if (options) { options.forEach(e => this.datasetOptions.set(e.internalId, e)); }
    this.datasetIds = this.localStorage.loadArray<string>(TIMESERIES_IDS_CACHE_PARAM) || [];
    this._timespan = this.timeSrvc.loadTimespan(TIME_CACHE_PARAM);
    this._generalize = this.localStorage.load<boolean>(GENERALIZE_CACHE_PARAM);
  }

}
