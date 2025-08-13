export const TIMER_SETTINGS = {
    POMODORO: 25 * 60, // 25분 (초 단위)
    SHORT_BREAK: 5 * 60, // 5분
    LONG_BREAK: 15 * 60, // 15분
  } as const;
  
  export const TIMER_STATES = {
    IDLE: 'idle',
    RUNNING: 'running',
    PAUSED: 'paused',
    COMPLETED: 'completed',
  } as const;
  
  export const SESSION_LABELS = {
    pomodoro: '집중 시간',
    shortBreak: '짧은 휴식',
    longBreak: '긴 휴식',
  } as const;