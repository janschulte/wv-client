import { Component } from '@angular/core';

import { SelectionNavigationService } from './selection-navigation.service';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent {

  public datasetCount: number; // TODO set count;

  constructor(
    public selectionNavigation: SelectionNavigationService
  ) { }

}
