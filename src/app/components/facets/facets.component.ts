import { Component, OnInit } from '@angular/core';
import { FacetSearchService, ParameterFacetType } from '@helgoland/facet-search';

@Component({
  selector: 'app-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.scss']
})
export class FacetsComponent implements OnInit {

  public categoryType: ParameterFacetType = ParameterFacetType.category;
  public featureType: ParameterFacetType = ParameterFacetType.feature;
  public phenomenonType: ParameterFacetType = ParameterFacetType.phenomenon;

  public categoryAutocomplete: string;
  public featureAutocomplete: string;
  public phenomenonAutocomplete: string;

  public facetsActive: boolean;

  constructor(
    public facetSearch: FacetSearchService
  ) { }

  ngOnInit(): void {
    this.facetSearch.getResults().subscribe(res => {
      this.facetsActive = this.facetSearch.areFacetsSelected();
    });
  }

  public resetAll() {
    this.facetSearch.resetAllFacets();
  }

}
