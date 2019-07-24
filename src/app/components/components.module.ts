import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HelgolandCoreModule } from '@helgoland/core';
import { HelgolandFacetSearchModule } from '@helgoland/facet-search';
import { HelgolandMapControlModule } from '@helgoland/map';
import { TranslateModule } from '@ngx-translate/core';

import { GeoSearchComponent } from './controls/geo-search/geo-search.component';
import { LayersControlComponent } from './controls/layers-control/layers-control.component';
import { LocateButtonComponent } from './controls/locate-button/locate-button.component';
import { ZoomButtonsComponent } from './controls/zoom-buttons/zoom-buttons.component';
import { FacetsComponent } from './facets/facets.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

const COMPONENTS = [
  FacetsComponent,
  GeoSearchComponent,
  LayersControlComponent,
  LocateButtonComponent,
  SideMenuComponent,
  ZoomButtonsComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    HelgolandCoreModule,
    HelgolandMapControlModule,
    HelgolandFacetSearchModule
  ],
  exports: [COMPONENTS],
  declarations: [COMPONENTS]
})
export class ComponentsModule { }
