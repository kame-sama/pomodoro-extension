import './style.css';
import getDataFromSyncStorage from '../util/get-data-from-sync-storage';
import printBlockerTargetUrls from './print-blocker-target-urls';
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

const save: HTMLButtonElement = document.querySelector('#save')!;
const reset: HTMLButtonElement = document.querySelector('#reset')!;
const targetUrl: HTMLInputElement = document.querySelector('#targetURL')!;
const addUrl: HTMLButtonElement = document.querySelector('#addURL')!;
const blockList: HTMLOListElement = document.querySelector('.block-list')!;
let { settings, blocker } = await getDataFromSyncStorage([
  'settings',
  'blocker',
]);

if (settings === undefined) {
  settings = settingsDefault;
  storeDataInSyncStorage({ settings });
}

if (blocker === undefined) {
  blocker = [];
} else {
  printBlockerTargetUrls(blockList, blocker);
}

printSettingsToDom(settings);

save.addEventListener('click', () => {
  storeDataInSyncStorage({ settings: readSettingsFromDom() });
  chrome.alarms.clearAll();
});

reset.addEventListener('click', () => {
  settings = settingsDefault;
  storeDataInSyncStorage({ settings });
  printSettingsToDom(settings);
  chrome.alarms.clearAll();
});

addUrl.addEventListener('click', () => {
  if (targetUrl.value !== '') {
    blocker!.push(targetUrl.value);
    targetUrl.value = '';
    printBlockerTargetUrls(blockList, blocker!);
    storeDataInSyncStorage({ blocker });
    chrome.runtime.sendMessage({ msg: 'BLOCKER', blocker }).catch((error) => {
      console.warn(error);
    });
  }
});

blockList.addEventListener('click', (event: Event) => {
  const eventTarget: EventTarget | null = event.target;

  if (eventTarget instanceof HTMLButtonElement) {
    const i: number = parseInt(eventTarget.dataset.id!);
    const n: number = blocker!.length - 1;
    [blocker![i], blocker![n]] = [blocker![n], blocker![i]];
    blocker!.pop();
    printBlockerTargetUrls(blockList, blocker!);
    storeDataInSyncStorage({ blocker });
    chrome.runtime.sendMessage({ msg: 'BLOCKER', blocker }).catch((error) => {
      console.warn(error);
    });
  }
});
