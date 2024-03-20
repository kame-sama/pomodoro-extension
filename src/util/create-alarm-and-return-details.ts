export default function createAlarmAndReturnDetails(
  name: TimerName,
  delay: number
): Promise<Alarm> {
  return new Promise((resolve, reject) => {
    chrome.alarms.create(name, { delayInMinutes: delay }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        const simulatedAlarm: Alarm = {
          name: name,
          scheduledTime: Date.now() + delay * 60000,
        };
        resolve(simulatedAlarm);
      }
    });
  });
}
