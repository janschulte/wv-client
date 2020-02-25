import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { Component } from '@angular/core';
import { Settings, SettingsService } from '@helgoland/core';
import { D3TimeFormatLocaleService } from '@helgoland/d3';
import { TranslateService } from '@ngx-translate/core';
import { Icon } from 'leaflet';

import { KEY_STORAGE_LANGUAGE, StateHandlerService } from './services/state-handler/state-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private translate: TranslateService,
    private settings: SettingsService<Settings>,
    private stateHandler: StateHandlerService,
    private d3translate: D3TimeFormatLocaleService
  ) {

    this.setLanguage();

    this.addD3Language();

    // necessary to load information on e.g. what 'medium' date format should look like in German etc.
    registerLocaleData(localeDe);

    Icon.Default.mergeOptions({
      iconRetinaUrl: './assets/images/marker@2x.png',
      iconUrl: './assets/images/marker.png',
      shadowUrl: '',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });

  }

  private setLanguage() {
    // fetch save language
    const savedLang = this.stateHandler.load<string>(KEY_STORAGE_LANGUAGE);
    if (savedLang) {
      if (this.settings.getSettings().languages.find(e => e.code === savedLang)) {
        this.translate.use(savedLang);
      }
    } else {
      // else choose browser language
      const browserLang = this.translate.getBrowserLang();
      if (this.settings.getSettings().languages.find(e => e.code === browserLang)) {
        this.translate.use(browserLang);
      } else {
        // else set first configured language
        this.translate.use(this.settings.getSettings().languages[0].code);
      }
    }
  }

  private addD3Language() {
    this.d3translate.addTimeFormatLocale('de',
      {
        dateTime: '%a %b %e %X %Y',
        date: '%d-%m-%Y',
        time: '%H:%M:%S',
        periods: ['AM', 'PM'],
        days: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
        shortDays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        shortMonths: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
      }
    );
  }
}
