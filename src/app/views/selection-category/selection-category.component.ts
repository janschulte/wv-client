import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Provider } from '@helgoland/core';
import { ListSelectorParameter, MultiServiceFilterEndpoint } from '@helgoland/selector';

import { ServiceSelectorService } from '../../services/service-selector/service-selector.service';
import { LayoutValidatorService, ScreenSize } from './../../services/layout-validator/layout-validator.service';

@Component({
  selector: 'app-selection-category',
  templateUrl: './selection-category.component.html',
  styleUrls: ['./selection-category.component.scss']
})
export class SelectionCategoryComponent implements OnInit {

  public categoryParams: ListSelectorParameter[] = [{
    type: MultiServiceFilterEndpoint.category,
    header: 'listSelection.headers.category'
  }, {
    type: MultiServiceFilterEndpoint.feature,
    header: 'listSelection.headers.station'
  }, {
    type: MultiServiceFilterEndpoint.phenomenon,
    header: 'listSelection.headers.phenomenon'
  }, {
    type: MultiServiceFilterEndpoint.procedure,
    header: 'listSelection.headers.procedure'
  }];

  public selectedProviderList: Provider[] = [];
  public mobile: boolean;

  constructor(
    public serviceSelectorSrvc: ServiceSelectorService,
    public router: Router,
    public layoutValidator: LayoutValidatorService,
  ) { }

  ngOnInit() {
    this.mobile = this.layoutValidator.isMax(ScreenSize.mobileMax);
    this.layoutValidator.isMaxObserver(ScreenSize.mobileMax).subscribe(mobile => this.mobile = mobile);
    this.serviceSelectorSrvc.getSelectedService().subscribe(service => {
      this.selectedProviderList = [{
        id: service.id,
        url: service.apiUrl
      }];
    });
  }

  public toDiagram() {
    this.router.navigate(['/diagram']);
  }

}
