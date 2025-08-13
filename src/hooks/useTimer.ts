import { useState, useEffect, useCallback, useRef } from 'react';
import { TimerState, SessionType, TimerData } from '@/types/timer';
import { TIMER_SETTINGS } from '@/utils/constants';

export function useTimer() {
  const [timeLeft, setTimeLeft] = useState(TIMER_SETTINGS.POMODORO);
  const [totalTime, setTotalTime] = useState(TIMER_SETTINGS.POMODORO);
  const [state, setState] = useState<TimerState>('idle');
  const [currentSession, setCurrentSession] = useState<SessionType>('pomodoro');
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 타이머 실행
  const tick = useCallback(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        // 타이머 완료
        setState('completed');
        return 0;
      }
      return prev - 1;
    });
  }, []);

  // 타이머 시작
  const start = useCallback(() => {
    if (state === 'idle' || state === 'paused') {
      setState('running');
    }
  }, [state]);

  // 타이머 일시정지
  const pause = useCallback(() => {
    if (state === 'running') {
      setState('paused');
    }
  }, [state]);

  // 타이머 리셋
  const reset = useCallback(() => {
    setState('idle');
    const sessionTime = getSessionTime(currentSession);
    setTimeLeft(sessionTime);
    setTotalTime(sessionTime);
  }, [currentSession]);

  // 세션 변경
  const switchSession = useCallback((session: SessionType) => {
    setState('idle');
    setCurrentSession(session);
    const sessionTime = getSessionTime(session);
    setTimeLeft(sessionTime);
    setTotalTime(sessionTime);
  }, []);

  // 다음 세션으로 자동 전환
  const goToNextSession = useCallback(() => {
    if (currentSession === 'pomodoro') {
      setCompletedPomodoros(prev => prev + 1);
      // 4번째 포모도로 후에는 긴 휴식, 그 외에는 짧은 휴식
      const nextSession = (completedPomodoros + 1) % 4 === 0 ? 'longBreak' : 'shortBreak';
      switchSession(nextSession);
    } else {
      switchSession('pomodoro');
    }
  }, [currentSession, completedPomodoros, switchSession]);

  // 세션별 시간 가져오기
  const getSessionTime = (session: SessionType): number => {
    switch (session) {
      case 'pomodoro':
        return TIMER_SETTINGS.POMODORO;
      case 'shortBreak':
        return TIMER_SETTINGS.SHORT_BREAK;
      case 'longBreak':
        return TIMER_SETTINGS.LONG_BREAK;
      default:
        return TIMER_SETTINGS.POMODORO;
    }
  };

  // 타이머 실행 효과
  useEffect(() => {
    if (state === 'running') {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state, tick]);

  // 타이머 완료 시 처리
  useEffect(() => {
    if (state === 'completed') {
      // 알림음 재생이나 알림 처리는 여기서
      console.log(`${currentSession} 완료!`);
    }
  }, [state, currentSession]);

  const timerData: TimerData = {
    timeLeft,
    totalTime,
    currentSession,
    state,
    completedPomodoros,
  };

  return {
    ...timerData,
    start,
    pause,
    reset,
    switchSession,
    goToNextSession,
  };
}