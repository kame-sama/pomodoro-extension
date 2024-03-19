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

export default function readSettingsFromDom(): Settings {
  return {
    pomodoro: parseInt(pomodoroInput!.value),
    shortBreak: parseInt(shortBreakInput!.value),
    longBreak: parseInt(longBreakInput!.value),
    autoStartBreaks: autoStartBreaksInput!.checked,
    autoStartPomodoros: autoStartPomodorosInput!.checked,
    longBreakInterval: parseInt(longBreakIntervalInput!.value),
  };
}
