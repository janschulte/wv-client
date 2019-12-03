import { Component, OnDestroy, OnInit } from '@angular/core';
import { FacetSearchService, ParameterFacetType } from '@helgoland/facet-search';
import { Subscription } from 'rxjs';

import { ServiceSelectorService } from '../../services/service-selector/service-selector.service';

@Component({
  selector: 'app-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.scss']
})
export class FacetsComponent implements OnInit, OnDestroy {

  public categoryType: ParameterFacetType = ParameterFacetType.category;
  public featureType: ParameterFacetType = ParameterFacetType.feature;
  public phenomenonType: ParameterFacetType = ParameterFacetType.phenomenon;

  public categoryAutocomplete: string;
  public featureAutocomplete: string;
  public phenomenonAutocomplete: string;

  public facetsActive: boolean;
  public loading: boolean;

  public subscriptions: Subscription[] = [];

  constructor(
    public facetSearch: FacetSearchService,
    public serviceSelectorSrvc: ServiceSelectorService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.facetSearch.getResults().subscribe(res => this.facetsActive = this.facetSearch.areFacetsSelected()));
    this.subscriptions.push(this.serviceSelectorSrvc.getLoading().subscribe(loading => this.loading = loading));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public resetAll() {
    this.facetSearch.resetAllFacets();
  }

}
