const root = document.documentElement;

export default function printBackground(name: TimerName): void {
  if (name === 'pomodoro') {
    root.classList.remove('break-theme');
  } else {
    root.classList.add('break-theme');
  }
}
