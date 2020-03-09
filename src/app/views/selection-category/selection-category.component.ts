import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Provider } from '@helgoland/core';
import { ListSelectorParameter } from '@helgoland/selector';

import { ServiceSelectorService } from '../../services/service-selector/service-selector.service';

@Component({
  selector: 'app-selection-category',
  templateUrl: './selection-category.component.html',
  styleUrls: ['./selection-category.component.scss']
})
export class SelectionCategoryComponent implements OnInit {

  public categoryParams: ListSelectorParameter[] = [{
    type: 'category',
    header: 'Kategorie'
  }, {
    type: 'feature',
    header: 'Station'
  }, {
    type: 'phenomenon',
    header: 'Phänomen'
  }, {
    type: 'procedure',
    header: 'Sensor'
  }];

  public selectedProviderList: Provider[] = [];

  constructor(
    public serviceSelectorSrvc: ServiceSelectorService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.serviceSelectorSrvc.getSelectedService().subscribe(service => {
      this.selectedProviderList = [{
        id: service.id,
        url: service.apiUrl
      }];
    });
  }

  public onDatasetSelected(datasets: any[]) {
    datasets.forEach((dataset) => console.log('Select Dataset: ' + dataset.label + ' with ID: ' + dataset.id));
  }

  public toDiagram() {
    this.router.navigate(['/diagram']);
  }

}
