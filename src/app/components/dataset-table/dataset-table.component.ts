import { ToastService } from './../toast/toast-container/toast-container.service';
import { Component } from '@angular/core';
import {
  DatasetType,
  Filter,
  HelgolandParameterFilter,
  HelgolandServicesConnector,
  HelgolandTimeseries,
} from '@helgoland/core';
import { FilteredParameter, MultiServiceFilterSelectorComponent } from '@helgoland/selector';
import { TranslateService } from '@ngx-translate/core';

import { TimeseriesService } from './../../services/timeseries/timeseries.service';

export interface DatasetFilteredParameter extends FilteredParameter {
  dataset: HelgolandTimeseries;
}

@Component({
  selector: 'app-dataset-table',
  templateUrl: './dataset-table.component.html',
  styleUrls: ['./dataset-table.component.scss']
})
export class DatasetTableComponent extends MultiServiceFilterSelectorComponent {

  public items: DatasetFilteredParameter[];

  constructor(
    protected servicesConnector: HelgolandServicesConnector,
    protected translate: TranslateService,
    protected timeseriesSrvc: TimeseriesService,
    protected toast: ToastService
  ) {
    super(servicesConnector, translate);
  }

  public onSelectItem(item: DatasetFilteredParameter) {
    if (item.selected) {
      this.timeseriesSrvc.removeDataset(item.dataset.internalId);
      item.selected = false;
    } else {
      this.timeseriesSrvc.addDataset(item.dataset.internalId);
      item.selected = true;
    }
  }

  protected setItems(res: FilteredParameter[], prevfilter: HelgolandParameterFilter, url: string, service: string): void {
    this.loading--;
    res.forEach((entry) => {
      const filter: Filter = {
        filter: prevfilter,
        itemId: entry.id,
        url,
        service
      };
      const item = this.items.find((elem) => {
        if (elem.label === entry.label) { return true; }
      });
      if (item) {
        item.filterList.push(filter);
      } else {
        entry.filterList = [filter];
        this.items.push(entry as DatasetFilteredParameter);
      }
      prevfilter.type = DatasetType.Timeseries;
      prevfilter[this.endpoint] = entry.id;
      this.servicesConnector.getDatasets(url, {
        ...prevfilter,
        expanded: true,
        type: DatasetType.Timeseries
      }).subscribe(ds => {
        if (ds.length === 1) {
          const dataset = ds[0];
          (entry as DatasetFilteredParameter).dataset = ds[0];
          entry.selected = this.timeseriesSrvc.hasDataset(dataset.internalId);
        }
      });
    });
  }

}
