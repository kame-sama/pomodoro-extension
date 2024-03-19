import './style.css';
import getDataFromSyncStorage from '../util/get-data-from-sync-storage';
import printSettingsToDom from './print-settings-to-dom';
import readSettingsFromDom from './read-settings-from-dom';
import storeDataInSyncStorage from '../util/store-data-in-sync-storage';

const settingsDefault: Settings = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  longBreakInterval: 4,
};
let settings = await getDataFromSyncStorage('settings');

if (settings === undefined) {
  settings = settingsDefault;
  storeDataInSyncStorage({ settings });
}

printSettingsToDom(settings);

document
  .querySelector<HTMLButtonElement>('#save')!
  .addEventListener('click', () => {
    storeDataInSyncStorage({ settings: readSettingsFromDom() });
  });

document
  .querySelector<HTMLButtonElement>('#reset')!
  .addEventListener('click', () => {
    settings = settingsDefault;
    storeDataInSyncStorage({ settings });
    printSettingsToDom(settings);
  });
