import { Component } from '@angular/core';
import { FacetSearchService, ParameterFacetType } from '@helgoland/facet-search';

@Component({
  selector: 'app-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.scss']
})
export class FacetsComponent {

  public categoryType: ParameterFacetType = ParameterFacetType.category;
  public featureType: ParameterFacetType = ParameterFacetType.feature;
  public phenomenonType: ParameterFacetType = ParameterFacetType.phenomenon;

  public categoryAutocomplete: string;
  public featureAutocomplete: string;
  public phenomenonAutocomplete: string;

  constructor(
    public facetSearch: FacetSearchService
  ) { }

}
