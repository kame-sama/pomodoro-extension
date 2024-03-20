export default function getAlarmData(
  name?: TimerName
): Promise<Alarm | undefined> {
  return new Promise((resolve, reject) => {
    if (!name) {
      chrome.alarms.getAll((alarms) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          if (alarms.length) {
            resolve(undefined);
          } else {
            resolve({
              name: alarms[0].name as TimerName,
              scheduledTime: alarms[0].scheduledTime,
            });
          }
        }
      });
    } else {
      chrome.alarms.get(name, (alarm) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          if (!alarm) {
            resolve(undefined);
          } else {
            resolve({
              name: alarm.name as TimerName,
              scheduledTime: alarm.scheduledTime,
            });
          }
        }
      });
    }
  });
}
