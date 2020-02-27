import { Component, OnInit } from '@angular/core';
import { FacetParameter, ParameterFacetComponent } from '@helgoland/facet-search';

@Component({
  selector: 'app-parameters-list-selection',
  templateUrl: './parameters-list-selection.component.html',
  styleUrls: ['./parameters-list-selection.component.scss']
})
export class ParametersListSelectionComponent extends ParameterFacetComponent implements OnInit {

  public isParameterSelected: boolean;

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
