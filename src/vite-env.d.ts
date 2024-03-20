/// <reference types="vite/client" />

interface Settings {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  longBreakInterval: number;
}

interface Task {
  title: string;
  actPomodoros: number;
  estPomodoros: number;
  completed: boolean;
}

interface SyncStorageDataMap {
  settings: Settings;
  blocker: string[];
  tasks: Task[];
}

type TimerName = 'pomodoro' | 'shortBreak' | 'longBreak';

interface SessionStorageDataMap {
  timer: TimerName;
  count: number;
  timeLeft: number;
}

interface Alarm {
  name: TimerName;
  scheduledTime: number;
}
