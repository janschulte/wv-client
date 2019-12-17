import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDataset, Timespan, SettingsService, Settings } from '@helgoland/core';

import { TimeseriesService } from '../../services/timeseries/timeseries.service';

const PARAM_IDS = 'ts';
const PARAM_TIME = 'timespan';
const ID_SEPERATOR = ',';
const TIME_SEPERATOR = '/';

@Injectable({
  providedIn: 'root'
})
export class DiagramPermalinkService {

  constructor(
    private activatedRoute: ActivatedRoute,
    private timeseriesSrvc: TimeseriesService,
    private settingsSrvc: SettingsService<Settings>
  ) { }

  public canValidatePermalink(): boolean {
    const params = this.activatedRoute.snapshot.queryParams;
    if (params[PARAM_IDS]) {
      let ids = params[PARAM_IDS].split(ID_SEPERATOR) as string[];
      ids = this.mapOldToCurrentIds(ids);
      ids.forEach(id => this.timeseriesSrvc.addDataset(id));
    }
    if (params[PARAM_TIME]) {
      const timestamps = params[PARAM_TIME].split(TIME_SEPERATOR) as string[];
      if (timestamps.length === 2) {
        try {
          const start = new Date(timestamps[0]);
          const end = new Date(timestamps[1]);
          this.timeseriesSrvc.timespan = new Timespan(start, end);
        } catch (error) {
          console.error('Could not parse the timespan in the permalink.');
        }
      }
    }
    return true;
  }

  public generatePermalink(dataset?: IDataset): string {
    const params = [];
    if (dataset) {
      params.push(`${PARAM_IDS}=${dataset.internalId}`);
    } else {
      if (this.timeseriesSrvc.hasDatasets()) {
        const ids = this.timeseriesSrvc.datasetIds.join(ID_SEPERATOR);
        params.push(`${PARAM_IDS}=${encodeURIComponent(ids)}`);
      }
    }

    if (this.timeseriesSrvc.timespan) {
      const from = new Date(this.timeseriesSrvc.timespan.from);
      console.log(from);
      const timespan = new Date(this.timeseriesSrvc.timespan.from).toISOString()
        + TIME_SEPERATOR
        + new Date(this.timeseriesSrvc.timespan.to).toISOString();
      const encodedTimespan = encodeURIComponent(timespan);
      params.push(`${PARAM_TIME}=${encodedTimespan}`);
    }

    return this.createBaseUrl() + '?' + params.join('&');
  }

  private createBaseUrl() {
    const url = window.location.href;
    if (url.indexOf('?') !== -1) {
      return url.substring(0, url.indexOf('?'));
    } else {
      return url;
    }
  }

  private mapOldToCurrentIds(ids: string[]): string[] {
    return ids.map(id => {
      const seperatedId = id.split('__');
      if (seperatedId.length === 2 && !seperatedId[0].startsWith('http')) {
        const matchedService = this.settingsSrvc.getSettings().datasetApis.find(e => e.name === seperatedId[0]);
        id = `${matchedService.url}__${seperatedId[1]}`;
      }
      return id;
    });
  }

}
