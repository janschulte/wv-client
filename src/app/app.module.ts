import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { DiagramComponent } from './views/diagram/diagram.component';
import { FavoriteComponent } from './views/favorite/favorite.component';
import { MainNavigationComponent } from './views/main-navigation/main-navigation.component';
import { SelectionListComponent } from './views/selection-list/selection-list.component';
import { SelectionMapComponent } from './views/selection-map/selection-map.component';
import { ProviderSelectorComponent } from './views/selection-menu/provider-selector/provider-selector.component';
import { SelectionEntriesComponent } from './views/selection-menu/selection-entries/selection-entries.component';
import { SelectionMenuComponent } from './views/selection-menu/selection-menu.component';
import { StartComponent } from './views/start/start.component';

export function HttpLoaderFactory(http: HttpClient) {
   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
   declarations: [
      AppComponent,
      StartComponent,
      SelectionMapComponent,
      SelectionListComponent,
      DiagramComponent,
      MainNavigationComponent,
      FavoriteComponent,
      SelectionMenuComponent,
      ProviderSelectorComponent,
      SelectionEntriesComponent,
      SideMenuComponent
   ],
   imports: [
      HttpClientModule,
      CommonModule,
      FormsModule,
      BrowserModule,
      TranslateModule.forRoot({
         loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
         }
      }),
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
