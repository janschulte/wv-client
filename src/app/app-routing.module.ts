import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { DiagramComponent } from './views/diagram/diagram.component';
import { FavoriteComponent } from './views/favorite/favorite.component';
import { HelpComponent } from './views/help/help.component';
import { SelectionListComponent } from './views/selection-list/selection-list.component';
import { SelectionMapComponent } from './views/selection-map/selection-map.component';
import { StartComponent } from './views/start/start.component';

const routes: Route[] = [
  { path: '', component: StartComponent },
  { path: 'start', component: StartComponent },
  { path: 'diagram', component: DiagramComponent },
  { path: 'favorite', component: FavoriteComponent },
  { path: 'help', component: HelpComponent },
  { path: 'selection-map', component: SelectionMapComponent },
  { path: 'selection-list', component: SelectionListComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
