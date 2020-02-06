import { EventEmitter, Injectable } from '@angular/core';
import { DatasetType, HelgolandService, HelgolandServicesConnector, Settings, SettingsService } from '@helgoland/core';
import { FacetSearchService } from '@helgoland/facet-search';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceSelectorService {

  private selectedService: ReplaySubject<HelgolandService> = new ReplaySubject();

  private loading: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private facetSearch: FacetSearchService,
    private servicesConnector: HelgolandServicesConnector,
    private settings: SettingsService<Settings>
  ) {
    const defService = this.settings.getSettings().defaultService;
    if (defService) {
      this.servicesConnector.getServices(defService.apiUrl, { service: defService.serviceId }).subscribe(s => this.fetchDatasets(s[0]));
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
    this.servicesConnector.getDatasets(service.apiUrl, { type: DatasetType.Timeseries, expanded: true, service: service.id }).subscribe(
      res => {
        this.facetSearch.resetAllFacets();
        this.facetSearch.setTimeseries(res);
      },
      error => console.error(error),
      () => this.loading.next(false)
    );
  }

}
