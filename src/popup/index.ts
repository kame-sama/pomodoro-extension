import './style.css';
import * as DomController from './barrel';
import createAlarmAndReturnDetails from '../util/create-alarm-and-return-details';
import getAlarmData from '../util/get-alarm-data';
import getDataFromSessionStorage from '../util/get-data-from-session-storage';
import getDataFromSyncStorage from '../util/get-data-from-sync-storage';
import getTimeLeftToAlarm from '../util/get-time-left-to-alarm';
import storeDataInSessionStorage from '../util/store-data-in-session-storage';
import storeDataInSyncStorage from '../util/store-data-in-sync-storage';
import updateCurrentSession from '../util/update-current-session';

const settingsDefault: Settings = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  longBreakInterval: 4,
};

const sessionDefault: SessionStorageDataMap = {
  timer: 'pomodoro',
  count: 1,
  timeLeft: 0,
};

const togglerButton: HTMLButtonElement = document.querySelector('#toggler')!;
const settingsButton: HTMLButtonElement = document.querySelector('#settings')!;
const skipButton: HTMLButtonElement = document.querySelector('#skip')!;

let session = await getDataFromSessionStorage(['timer', 'count', 'timeLeft']);

if (session === undefined) {
  session = sessionDefault;
}

if (session.timer === undefined) {
  session.timer = 'pomodoro';
}

if (session.count === undefined) {
  session.count = 1;
}

if (session.timeLeft === undefined) {
  session.timeLeft = 0;
}

let settings = await getDataFromSyncStorage('settings');

if (settings === undefined) {
  settings = settingsDefault;
}

let alarm = await getAlarmData(session.timer);
let intervalId: NodeJS.Timeout;

storeDataInSessionStorage(session);
storeDataInSyncStorage({ settings });

DomController.printBackground(session.timer);
DomController.printCounter(session.count);
DomController.printStatus(session.timer);

if (!alarm && !session.timeLeft) {
  DomController.printTimer(settings[session.timer] * 60);
} else if (!alarm && session.timeLeft) {
  DomController.printTimer(session.timeLeft);
} else {
  DomController.printToToggler('Pause');
  DomController.printTimer(getTimeLeftToAlarm(alarm!));
  intervalId = setInterval(() => {
    DomController.printTimer(getTimeLeftToAlarm(alarm!));
  }, 1000);
}

togglerButton.addEventListener('click', async () => {
  if (togglerButton.textContent === 'Start') {
    if (!session.timeLeft) {
      alarm = await createAlarmAndReturnDetails(
        session.timer!,
        settings[session.timer!]
      );
    } else {
      alarm = await createAlarmAndReturnDetails(
        session.timer!,
        session.timeLeft / 60
      );
    }

    intervalId = setInterval(() => {
      DomController.printTimer(getTimeLeftToAlarm(alarm!));
    }, 1000);
  } else {
    session.timeLeft = getTimeLeftToAlarm(alarm!);
    storeDataInSessionStorage({ timeLeft: session.timeLeft });
    chrome.alarms.clearAll();
    clearInterval(intervalId);
  }

  DomController.printToToggler();
});

settingsButton.addEventListener('click', () => {
  chrome.tabs.create({ url: './settings.html' });
});

skipButton.addEventListener('click', () => {
  chrome.alarms.clear(session.timer);
  clearInterval(intervalId);
  updateCurrentSession(session as SessionStorageDataMap, settings);
  storeDataInSessionStorage(session);

  DomController.printBackground(session.timer!);
  DomController.printCounter(session.count!);
  DomController.printStatus(session.timer!);
  DomController.printTimer(settings[session.timer!] * 60);
  DomController.printToToggler('Start');
});

chrome.alarms.onAlarm.addListener(async (event) => {
  clearInterval(intervalId);
  updateCurrentSession(session as SessionStorageDataMap, settings);

  if (
    (event.name === 'pomodoro' && !settings.autoStartBreaks) ||
    (event.name !== 'pomodoro' && !settings.autoStartPomodoros)
  ) {
    DomController.printToToggler('Start');
  }

  DomController.printTimer(settings[session.timer!] * 60);

  chrome.runtime.onMessage.addListener((message: Alarm) => {
    alarm = message;
    intervalId = setInterval(() => {
      DomController.printTimer(getTimeLeftToAlarm(alarm!));
    }, 1000);
  });

  DomController.printBackground(session.timer!);
  DomController.printCounter(session.count!);
  DomController.printStatus(session.timer!);
});
