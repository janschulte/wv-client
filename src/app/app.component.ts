import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Icon } from 'leaflet';
import { InitializeService } from './services/initialize/initialize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private translate: TranslateService,
    private init: InitializeService
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('de');

    // necessary to load information on e.g. what 'medium' date format should look like in German etc.
    registerLocaleData(localeDe);

    this.init.init();

    Icon.Default.mergeOptions({
      iconRetinaUrl: './assets/images/marker@2x.png',
      iconUrl: './assets/images/marker.png',
      shadowUrl: '',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });
  }

}
