import { Injectable } from '@angular/core';
import { DatasetApi, Settings, SettingsService } from '@helgoland/core';
import { LayerConfiguration } from '@helgoland/map';

import { settings } from '../../environments/environment';

export interface ExtendedDatasetApi extends DatasetApi {
    supportDatasetSelect: boolean;
}

export interface WvSettings extends Settings {
    saveState: boolean;
    baseLayers: LayerConfiguration[];
    overlayLayers: LayerConfiguration[];
    datasetApis: ExtendedDatasetApi[];
    noGeneralization: {
        phenomenonIds: string[];
    };
    barChartPeriodMapping: {
        procedure: {
            id: string;
            barPeriod: string;
            barStartOf: string;
        }[]
    }
}

@Injectable()
export class ExtendedSettingsService extends SettingsService<WvSettings> {
    constructor() {
        super();
        this.setSettings(settings);
    }
}
