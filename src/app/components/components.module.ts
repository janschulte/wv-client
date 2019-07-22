import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HelgolandCoreModule } from '@helgoland/core';
import { HelgolandFacetSearchModule } from '@helgoland/facet-search';
import { HelgolandMapControlModule } from '@helgoland/map';

import { LocateButtonComponent } from './controls/locate-button/locate-button.component';
import { ZoomButtonsComponent } from './controls/zoom-buttons/zoom-buttons.component';
import { FacetsComponent } from './facets/facets.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

const COMPONENTS = [
  SideMenuComponent,
  FacetsComponent,
  LocateButtonComponent,
  ZoomButtonsComponent
];

@NgModule({
  imports: [
    CommonModule,
    HelgolandCoreModule,
    HelgolandMapControlModule,
    HelgolandFacetSearchModule
  ],
  exports: [COMPONENTS],
  declarations: [COMPONENTS]
})
export class ComponentsModule { }
