import { WvSettings } from './../app/models/wv-settings';

export const environment = {
  production: true
};

export let settings: WvSettings;

export const settingsPromise = new Promise<WvSettings>((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', './assets/settings.json');
  xhr.onload = () => {
    if (xhr.status === 200) {
      settings = JSON.parse(xhr.responseText);
      resolve(settings);
    } else {
      reject('Cannot load configuration');
    }
  };
  xhr.send();
});
