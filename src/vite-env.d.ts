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
