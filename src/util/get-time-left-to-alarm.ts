export default function getTimeLeftToAlarm(alarm: Alarm): number {
  return Math.round((alarm.scheduledTime - Date.now()) / 1000);
}
