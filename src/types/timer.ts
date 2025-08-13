export type TimerState = 'idle' | 'running' | 'paused' | 'completed';
export type SessionType = 'pomodoro' | 'shortBreak' | 'longBreak';

export interface TimerSettings {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
}

export interface TimerData {
  timeLeft: number;
  totalTime: number;
  currentSession: SessionType;
  state: TimerState;
  completedPomodoros: number;
}