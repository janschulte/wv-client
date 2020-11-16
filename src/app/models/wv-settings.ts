import { Injectable } from '@angular/core';
import { Settings, SettingsService } from '@helgoland/core';
import { LayerConfiguration } from '@helgoland/map';

import { settings } from '../../environments/environment';

export interface WvSettings extends Settings {
    saveState: boolean;
    baseLayers: LayerConfiguration[];
    overlayLayers: LayerConfiguration[];
}

@Injectable()
export class ExtendedSettingsService extends SettingsService<WvSettings> {
    constructor() {
        super();
        this.setSettings(settings);
    }
}
