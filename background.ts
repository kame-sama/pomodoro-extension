import createAlarmAndReturnDetails from './src/util/create-alarm-and-return-details';
import getDataFromSessionStorage from './src/util/get-data-from-session-storage';
import getDataFromSyncStorage from './src/util/get-data-from-sync-storage';
import notificationIconUrl from '/icon-128.png';
import storeDataInSessionStorage from './src/util/store-data-in-session-storage';
import updateCurrentSession from './src/util/update-current-session';

chrome.runtime.onInstalled.addListener((_reason) => {
  chrome.tabs.create({
    url: './settings.html',
  });
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
      settings[session.timer!]
    );

    chrome.runtime.sendMessage(alarm).catch((error) => {
      console.log(error);
    });
  }
});
