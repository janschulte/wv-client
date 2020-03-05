import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HelgolandCachingModule } from '@helgoland/caching';
import {
   DatasetApiInterface,
   DatasetApiV1ConnectorProvider,
   HelgolandCoreModule,
   Settings,
   SettingsService,
   SplittedDataDatasetApiInterface,
} from '@helgoland/core';
import { HelgolandD3Module } from '@helgoland/d3';
import { HelgolandDatasetlistModule } from '@helgoland/depiction';
import { FacetSearchConfig, HelgolandFacetSearchModule } from '@helgoland/facet-search';
import { HelgolandFavoriteModule } from '@helgoland/favorite';
import { GeoSearch, NominatimGeoSearchService } from '@helgoland/map';
import { HelgolandSelectorModule } from '@helgoland/selector';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { settings } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { ErrorInterceptor } from './interceptors/error-interceptor/error-interceptor.service';
import { DiagramComponent } from './views/diagram/diagram.component';
import { LegendEntryComponent } from './views/diagram/legend/legend-entry/legend-entry.component';
import { FavoriteComponent } from './views/favorite/favorite.component';
import { HelpComponent } from './views/help/help.component';
import { FooterComponent } from './views/main-navigation/footer/footer.component';
import { HeaderComponent } from './views/main-navigation/header/header.component';
import { SelectionCategoryComponent } from './views/selection-category/selection-category.component';
import { SelectionListComponent } from './views/selection-list/selection-list.component';
import { SelectionMapComponent } from './views/selection-map/selection-map.component';
import { SelectionEntriesComponent } from './views/selection-menu/selection-entries/selection-entries.component';
import { SelectionMenuComponent } from './views/selection-menu/selection-menu.component';
import { SelectionParameterComponent } from './views/selection-parameter/selection-parameter.component';
import { SelectionStationComponent } from './views/selection-station/selection-station.component';
import { StartComponent } from './views/start/start.component';

export function HttpLoaderFactory(http: HttpClient) {
   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Injectable()
export class ExtendedSettingsService extends SettingsService<Settings> {
   constructor() {
      super();
      this.setSettings(settings);
   }
}

@NgModule({
   declarations: [
      AppComponent,
      DiagramComponent,
      FavoriteComponent,
      FooterComponent,
      HeaderComponent,
      HelpComponent,
      LegendEntryComponent,
      SelectionCategoryComponent,
      SelectionEntriesComponent,
      SelectionListComponent,
      SelectionMapComponent,
      SelectionMenuComponent,
      SelectionParameterComponent,
      SelectionStationComponent,
      StartComponent,
   ],
   imports: [
      HttpClientModule,
      CommonModule,
      FormsModule,
      BrowserModule,
      ComponentsModule,
      TranslateModule.forRoot({
         loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
         }
      }),
      AppRoutingModule,
      HelgolandCoreModule,
      HelgolandD3Module,
      HelgolandSelectorModule,
      HelgolandFavoriteModule,
      HelgolandCachingModule.forRoot({
         cachingDurationInMilliseconds: 300000,
         getDataCacheActive: false
      }),
      HelgolandDatasetlistModule,
      HelgolandFacetSearchModule
   ],
   providers: [
      DatasetApiV1ConnectorProvider,
      {
         provide: GeoSearch,
         useClass: NominatimGeoSearchService
      },
      {
         provide: SettingsService,
         useClass: ExtendedSettingsService
      },
      {
         useClass: SplittedDataDatasetApiInterface,
         provide: DatasetApiInterface
      },
      {
         provide: HTTP_INTERCEPTORS,
         useClass: ErrorInterceptor,
         multi: true
      },
      {
         provide: FacetSearchConfig,
         useValue: { showZeroValues: true } as FacetSearchConfig
      }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
