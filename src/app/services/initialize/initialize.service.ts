import { Injectable } from '@angular/core';
import { DatasetApiInterface } from '@helgoland/core';
import { FacetSearchService } from '@helgoland/facet-search';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitializeService {

  constructor(
    private facetSearch: FacetSearchService,
    private api: DatasetApiInterface
  ) { }

  init() {
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


    // setTimeout(() => {
    //   forkJoin([
    //     this.api.getTimeseries('https://fluggs.wupperverband.de/sos2/api/v1/', { expanded: true }),
    //     this.api.getTimeseries('http://sensorweb.demo.52north.org/sensorwebtestbed/api/v1/', { expanded: true }),
    //     // this.api.getTimeseries('http://sensorweb.demo.52north.org/sensorwebclient-webapp-stable/api/v1/', { expanded: true }),
    //     // this.api.getTimeseries('http://geo.irceline.be/sos/api/v1/', { expanded: true }),
    //     // this.api.getTimeseries('http://monalisasos.eurac.edu/sos/api/v1/', { expanded: true }),
    //   ]).subscribe(res => {
    //     const complete = [];
    //     res.forEach(e => complete.push(...e));
    //     this.facetSearch.setTimeseries(complete);
    //   });
    // }, 5000);
  }

}
