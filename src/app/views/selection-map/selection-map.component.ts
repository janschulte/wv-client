import { Component, OnInit } from '@angular/core';
import { DatasetApiInterface, Timeseries } from '@helgoland/core';
import { FacetSearchService, ParameterFacetType } from '@helgoland/facet-search';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-selection-map',
  templateUrl: './selection-map.component.html',
  styleUrls: ['./selection-map.component.scss']
})
export class SelectionMapComponent implements OnInit {

  public timeseries: Timeseries[];

  public categoryType: ParameterFacetType = ParameterFacetType.category;
  public featureType: ParameterFacetType = ParameterFacetType.feature;
  public phenomenonType: ParameterFacetType = ParameterFacetType.phenomenon;

  public categoryAutocomplete: string;
  public featureAutocomplete: string;
  public phenomenonAutocomplete: string;

  public resultCount: number;

  constructor(
    private api: DatasetApiInterface,
    public facetSearch: FacetSearchService
  ) { }

  ngOnInit() {
    forkJoin([
      this.api.getTimeseries('https://fluggs.wupperverband.de/sos2/api/v1/', { expanded: true }),
      // this.api.getTimeseries('http://sensorweb.demo.52north.org/sensorwebtestbed/api/v1/', { expanded: true }),
      // this.api.getTimeseries('http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v1/', { expanded: true }),
      // this.api.getTimeseries('http://geo.irceline.be/sos/api/v1/', { expanded: true }),
      // this.api.getTimeseries('http://monalisasos.eurac.edu/sos/api/v1/', { expanded: true }),
    ]).subscribe(res => {
      const complete = [];
      res.forEach(e => complete.push(...e));
      this.facetSearch.setTimeseries(complete);
    });

    this.facetSearch.onResultsChanged.subscribe(ts => this.resultCount = ts.length);
  }

  public onSelectedTs(ts: Timeseries) {
    alert(`Clicked: ${ts.label}`);
  }

}
