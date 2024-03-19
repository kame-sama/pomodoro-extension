const pomodoroInput = document.querySelector<HTMLInputElement>('#pomodoro');
const shortBreakInput = document.querySelector<HTMLInputElement>('#shortBreak');
const longBreakInput = document.querySelector<HTMLInputElement>('#longBreak');
const autoStartBreaksInput =
  document.querySelector<HTMLInputElement>('#autoStartBreaks');
const autoStartPomodorosInput = document.querySelector<HTMLInputElement>(
  '#autoStartPomodoros'
);
const longBreakIntervalInput =
  document.querySelector<HTMLInputElement>('#longBreakInterval');

export default function printSettingsToDom(settings: Settings): void {
  pomodoroInput!.value = settings.pomodoro.toString();
  shortBreakInput!.value = settings.shortBreak.toString();
  longBreakInput!.value = settings.shortBreak.toString();
  autoStartBreaksInput!.checked = settings.autoStartBreaks;
  autoStartPomodorosInput!.checked = settings.autoStartPomodoros;
  longBreakIntervalInput!.value = settings.longBreakInterval.toString();
}
