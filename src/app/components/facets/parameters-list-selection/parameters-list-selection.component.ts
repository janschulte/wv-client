import { Component, OnInit } from '@angular/core';
import { HelgolandServicesConnector } from '@helgoland/core';
import { FacetParameter, ParameterFacetComponent } from '@helgoland/facet-search';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';

import { ServiceSelectorService } from '../../../services/service-selector/service-selector.service';

@Component({
  selector: 'app-parameters-list-selection',
  templateUrl: './parameters-list-selection.component.html',
  styleUrls: ['./parameters-list-selection.component.scss']
})
export class ParametersListSelectionComponent extends ParameterFacetComponent implements OnInit {

  public isParameterSelected: boolean;

  constructor(
    private translate: TranslateService,
    private serviceSelector: ServiceSelectorService,
    private servicesConnector: HelgolandServicesConnector
  ) {
    super();
    this.translate.onLangChange.subscribe(() => {
      console.log(`lang changed ${this.type}`);
      this.serviceSelector.getSelectedService().pipe(first()).subscribe(service => {
        this.servicesConnector.getPhenomena(service.apiUrl).subscribe(res => {
          if (this.parameterList && this.parameterList.length >= 0) {
            this.parameterList.forEach(entry => {
              const match = res.find(e => e.id === entry.id);
              if (match) {
                entry.label = match.label;
              }
            });
          }
        });
      });
    });
  }

  public ngOnInit() {
    super.ngOnInit();
    this.checkSelectedParameter();
  }

  private checkSelectedParameter() {
    if (this.parameterList) {
      this.isParameterSelected = this.parameterList.findIndex(e => e.selected) >= 0;
    }
  }

  public toggleFacet(parameter: FacetParameter) {
    super.toggleFacet(parameter);
    this.checkSelectedParameter();
  }

  public clearFacet() {
    const selection = this.parameterList.find(e => e.selected);
    this.toggleFacet(selection);
  }
}
