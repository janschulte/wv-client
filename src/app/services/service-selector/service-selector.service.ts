import { EventEmitter, Injectable } from '@angular/core';
import {
  ApiV3DatasetTypes,
  ApiV3InterfaceService,
  ApiV3ObservationTypes,
  ApiV3ParameterFilter,
  ApiV3ValueTypes,
  DatasetType,
  HelgolandService,
  HelgolandServicesConnector,
  SettingsService,
} from '@helgoland/core';
import { convertFromApiV3Dataset, convertToFacetEntry, FacetSearchService } from '@helgoland/facet-search';
import { Observable, ReplaySubject } from 'rxjs';

import { WvSettings } from '../../models/wv-settings';

@Injectable({
  providedIn: 'root'
})
export class ServiceSelectorService {

  private selectedService: ReplaySubject<HelgolandService> = new ReplaySubject();

  private loading: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private facetSearch: FacetSearchService,
    private servicesConnector: HelgolandServicesConnector,
    private apiv3: ApiV3InterfaceService,
    private settings: SettingsService<WvSettings>
  ) {
    const defService = this.settings.getSettings().defaultService;
    if (defService) {
      this.servicesConnector.getService(defService.serviceId, defService.apiUrl).subscribe(
        service => this.fetchDatasets(service),
        e => console.error(e)
      );
    } else {
      console.error(`No 'defaultService' is defined in the settings.`);
    }
  }

  public getSelectedService(): Observable<HelgolandService> {
    return this.selectedService;
  }

  public getLoading(): Observable<boolean> {
    return this.loading;
  }

  public setSelectedService(service: HelgolandService) {
    this.fetchDatasets(service);
  }

  private fetchDatasets(service: HelgolandService) {
    this.loading.next(true);
    this.selectedService.next(service);
    const serviceConf = this.settings.getSettings().datasetApis.find(e => e.url === service.apiUrl);
    if (serviceConf.supportDatasetSelect) {
      const filter: ApiV3ParameterFilter = {
        expanded: true,
        datasetTypes: [ApiV3DatasetTypes.Timeseries],
        observationTypes: [ApiV3ObservationTypes.Simple],
        valueTypes: [ApiV3ValueTypes.Quantity, ApiV3ValueTypes.Count],
        services: [service.id],
        select: ['feature', 'parameters/phenomenon', 'firstValue', 'lastValue']
      };
      this.apiv3.getDatasets(service.apiUrl, filter).subscribe(
        res => {
          this.facetSearch.resetAllFacets();
          this.facetSearch.setEntries(res.map(e => convertFromApiV3Dataset(e, service.apiUrl)));
          this.loading.next(false);
        }, error => {
          console.error(error);
          this.loading.next(false);
        }
      )
    } else {
      this.servicesConnector.getDatasets(service.apiUrl, { type: DatasetType.Timeseries, expanded: true, service: service.id }).subscribe(
        res => {
          this.facetSearch.resetAllFacets();
          this.facetSearch.setEntries(res.map(e => convertToFacetEntry(e)));
        },
        error => console.error(error),
        () => this.loading.next(false)
      );
    }
  }

}
