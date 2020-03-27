import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Provider } from '@helgoland/core';
import { ListSelectorParameter } from '@helgoland/selector';

import { LayoutValidatorService, ScreenSize } from '../../services/layout-validator/layout-validator.service';
import { ServiceSelectorService } from '../../services/service-selector/service-selector.service';

@Component({
  selector: 'app-selection-parameter',
  templateUrl: './selection-parameter.component.html',
  styleUrls: ['./selection-parameter.component.scss']
})
export class SelectionParameterComponent implements OnInit {

  public phenomenonParams: ListSelectorParameter[] = [
    {
      type: 'phenomenon',
      header: 'Phänomen'
    },
    {
      type: 'category',
      header: 'Kategorie'
    },
    {
      type: 'feature',
      header: 'Station'
    },
    {
      type: 'procedure',
      header: 'Sensor'
    }
  ];

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
