import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('de');

    // necessary to load information on e.g. what 'medium' date format should look like in German etc.
    registerLocaleData(localeDe);
  }

}
