import createAlarmAndReturnDetails from './src/util/create-alarm-and-return-details';
import getAlarmData from './src/util/get-alarm-data';
import getDataFromSessionStorage from './src/util/get-data-from-session-storage';
import getDataFromSyncStorage from './src/util/get-data-from-sync-storage';
import notificationIconUrl from '/icon-128.png';
import storeDataInSessionStorage from './src/util/store-data-in-session-storage';
import updateCurrentSession from './src/util/update-current-session';

let blocker: string[];

chrome.runtime.onMessage.addListener((request) => {
  if (request.msg === 'BLOCKER') {
    blocker = request.blocker;
  }
});

chrome.runtime.onInstalled.addListener(async (_reason) => {
  chrome.tabs.create({
    url: './settings.html',
  });
  blocker = await getDataFromSyncStorage('blocker');
});

chrome.runtime.onStartup.addListener(async () => {
  blocker = await getDataFromSyncStorage('blocker');
});

chrome.alarms.onAlarm.addListener(async (event) => {
  const session = await getDataFromSessionStorage([
    'timer',
    'count',
    'timeLeft',
  ])!;
  const settings = await getDataFromSyncStorage('settings');

  updateCurrentSession(session as SessionStorageDataMap, settings);
  storeDataInSessionStorage(session);

  chrome.notifications.create({
    iconUrl: notificationIconUrl,
    message: `Time to ${session.timer === 'pomodoro' ? 'focus' : 'rest'}`,
    title: 'Pomodoro',
    type: 'basic',
  });

  if (
    (event.name === 'pomodoro' && settings.autoStartBreaks) ||
    (event.name !== 'pomodoro' && settings.autoStartPomodoros)
  ) {
    const alarm = await createAlarmAndReturnDetails(
      session.timer!,
      settings[session.timer!],
    );

    chrome.runtime.sendMessage({ msg: 'ALARM', alarm }).catch((error) => {
      console.warn(error);
    });
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, _tab) => {
  if (blocker === undefined) {
    blocker = await getDataFromSyncStorage('blocker');
  }

  if (blocker === undefined) return;

  if (blocker.some((url) => changeInfo.url?.startsWith(url))) {
    chrome.tabs.sendMessage(
      tabId,
      { msg: 'ARE_YOU_THERE_CONTENT_SCRIPT' },
      (response) => {
        if (chrome.runtime.lastError) {
          console.warn(new Error(chrome.runtime.lastError.message));
        }
        if (response?.msg !== 'YES') {
          chrome.scripting.executeScript({
            target: { tabId },
            files: ['content.js'],
          });
        }
      },
    );
  }
});

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.msg === 'IS_FOCUS_TIME') {
    (async () => {
      const alarm = await getAlarmData('pomodoro');
      sendResponse(alarm);
    })();
  }
  return true;
});
