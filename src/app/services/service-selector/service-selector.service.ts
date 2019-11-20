import { EventEmitter, Injectable } from '@angular/core';
import { DatasetApiInterface, Service, Settings, SettingsService } from '@helgoland/core';
import { FacetSearchService } from '@helgoland/facet-search';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceSelectorService {

  private selectedService: ReplaySubject<Service> = new ReplaySubject();

  private loading: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private facetSearch: FacetSearchService,
    private api: DatasetApiInterface,
    private settings: SettingsService<Settings>
  ) {
    const defService = this.settings.getSettings().defaultService;
    if (defService) {
      this.api.getService(defService.serviceId, defService.apiUrl).subscribe(s => this.fetchDatasets(s));
    } else {
      console.error(`No 'defaultService' is defined in the settings.`);
    }
  }

  public getSelectedService(): Observable<Service> {
    return this.selectedService;
  }

  public getLoading(): Observable<boolean> {
    return this.loading;
  }

  public setSelectedService(service: Service) {
    this.fetchDatasets(service);
  }

  private fetchDatasets(service: Service) {
    this.loading.next(true);
    this.selectedService.next(service);
    this.api.getTimeseries(service.apiUrl, { expanded: true, service: service.id }).subscribe(
      res => this.facetSearch.setTimeseries(res),
      error => console.error(error),
      () => this.loading.next(false)
    );
  }

}
