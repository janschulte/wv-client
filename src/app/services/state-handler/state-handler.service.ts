import { Injectable } from '@angular/core';
import { LocalStorage } from '@helgoland/core';

export const KEY_STORAGE_CLUSTER_STATIONS = 'STORAGE_KEY_CLUSTER_STATIONS';
export const KEY_STORAGE_VALUED_MARKER = 'STORAGE_KEY_CONCENTRATION_MARKER';
export const KEY_STORAGE_LANGUAGE = 'STORAGE_KEY_LANGUAGE';

@Injectable({
  providedIn: 'root'
})
export class StateHandlerService extends LocalStorage {
  constructor() {
    super();
    this.defineDefault(KEY_STORAGE_CLUSTER_STATIONS, true);
    this.defineDefault(KEY_STORAGE_VALUED_MARKER, false);
  }
}

