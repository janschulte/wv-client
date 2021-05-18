import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { DiagramComponent } from './views/diagram/diagram.component';
import { FavoriteComponent } from './views/favorite/favorite.component';
import { HelpComponent } from './views/help/help.component';
import { SelectionCategoryComponent } from './views/selection-category/selection-category.component';
import { SelectionMapComponent } from './views/selection-map/selection-map.component';
import { SelectionParameterComponent } from './views/selection-parameter/selection-parameter.component';
import { SelectionStationComponent } from './views/selection-station/selection-station.component';
import { StartComponent } from './views/start/start.component';

const routes: Route[] = [
  { path: '', component: StartComponent },
  { path: 'start', component: StartComponent },
  { path: 'diagram', component: DiagramComponent },
  { path: 'favorite', component: FavoriteComponent },
  { path: 'help', component: HelpComponent },
  { path: 'selection-map', component: SelectionMapComponent },
  { path: 'selection-category', component: SelectionCategoryComponent },
  { path: 'selection-station', component: SelectionStationComponent },
  { path: 'selection-parameter', component: SelectionParameterComponent },
  { path: '**', component: StartComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
