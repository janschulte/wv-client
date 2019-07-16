import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HelgolandCoreModule } from '@helgoland/core';
import {
   GeoSearch,
   HelgolandMapControlModule,
   HelgolandMapModule,
   HelgolandMapViewModule,
   NominatimGeoSearchService,
} from '@helgoland/map';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiagramComponent } from './views/diagram/diagram.component';
import { SelectionListComponent } from './views/selection-list/selection-list.component';
import { SelectionMapComponent } from './views/selection-map/selection-map.component';
import { StartComponent } from './views/start/start.component';
import { MainNavigationComponent } from './views/main-navigation/main-navigation.component';

@NgModule({
   declarations: [
      AppComponent,
      StartComponent,
      SelectionMapComponent,
      SelectionListComponent,
      DiagramComponent,
      MainNavigationComponent
   ],
   imports: [
      HttpClientModule,
      CommonModule,
      FormsModule,
      BrowserModule,
      AppRoutingModule,
      HelgolandCoreModule,
      HelgolandMapModule,
      HelgolandMapViewModule,
      HelgolandMapControlModule
   ],
   providers: [
      {
         provide: GeoSearch,
         useClass: NominatimGeoSearchService
      }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
