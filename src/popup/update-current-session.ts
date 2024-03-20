export default function updateCurrentSession(
  session: SessionStorageDataMap,
  settings: Settings
): void {
  if (session.timer === 'pomodoro') {
    session.timer =
      session.count % settings.longBreakInterval ? 'shortBreak' : 'longBreak';
  } else {
    session.timer = 'pomodoro';
    session.count++;
  }

  session.timeLeft = 0;
}
