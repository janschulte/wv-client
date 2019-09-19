import { Component } from '@angular/core';
import { Language, LocalSelectorComponent } from '@helgoland/core';
import { TranslateService } from '@ngx-translate/core';

import { StateHandlerService } from '../../services/state-handler/state-handler.service';
import { KEY_STORAGE_LANGUAGE } from './../../services/state-handler/state-handler.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent extends LocalSelectorComponent {

  constructor(
    protected translate: TranslateService,
    private stateHandler: StateHandlerService
  ) {
    super(translate);
  }

  public setLanguage(lang: Language) {
    this.translate.use(lang.code);
    this.currentLang = lang;
    this.stateHandler.save(KEY_STORAGE_LANGUAGE, lang.code);
  }

}
