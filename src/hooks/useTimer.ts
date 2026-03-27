import { useState, useEffect, useCallback, useRef } from 'react';
import { TimerState, SessionType, TimerData } from '@/types/timer';
import { TIMER_SETTINGS, SESSION_LABELS } from '@/utils/constants';
import { formatTime } from '@/utils/time';

export function useTimer() {
  const [timeLeft, setTimeLeft] = useState(TIMER_SETTINGS.POMODORO);
  const [totalTime, setTotalTime] = useState(TIMER_SETTINGS.POMODORO);
  const [state, setState] = useState<TimerState>('idle');
  const [currentSession, setCurrentSession] = useState<SessionType>('pomodoro');
  const [completedPomodoros, setCompletedPomodoros] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedDate = localStorage.getItem('pomodoroDate');
      const today = new Date().toDateString();
      if (savedDate !== today) {
        localStorage.setItem('pomodoroDate', today);
        localStorage.setItem('completedPomodoros', '0');
        return 0;
      }
      return Number(localStorage.getItem('completedPomodoros')) || 0;
    }
    return 0;
  });
  
  const [autoStart, setAutoStart] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('autoStart') === 'true';
    }
    return false;
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const endTimeRef = useRef<number>(0);

  // 타이머 시작
  const start = useCallback(() => {
    if (state === 'idle' || state === 'paused') {
      endTimeRef.current = Date.now() + timeLeft * 1000;
      setState('running');
    }
  }, [state, timeLeft]);

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
      setCompletedPomodoros(prev => {
        const next = prev + 1;
        // 4번째 포모도로 후에는 긴 휴식, 그 외에는 짧은 휴식
        const nextSession = next % 4 === 0 ? 'longBreak' : 'shortBreak';
        switchSession(nextSession);
        return next;
      });
    } else {
      switchSession('pomodoro');
    }
  }, [currentSession, switchSession]);

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

  // 타이머 실행 효과 (실제 시간 기반으로 비활성 탭에서도 정확)
  useEffect(() => {
    if (state === 'running') {
      const tick = () => {
        const remaining = Math.round((endTimeRef.current - Date.now()) / 1000);
        if (remaining <= 0) {
          setTimeLeft(0);
          setState('completed');
        } else {
          setTimeLeft(remaining);
        }
      };
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
  }, [state]);

  // 탭 타이틀에 남은 시간 표시
  useEffect(() => {
    const defaultTitle = '포모도로 타이머 | Pomodoro Timer';
    if (state === 'running' || state === 'paused') {
      const prefix = state === 'paused' ? '⏸ ' : '';
      document.title = `${prefix}${formatTime(timeLeft)} - ${SESSION_LABELS[currentSession]}`;
    } else {
      document.title = defaultTitle;
    }
    return () => {
      document.title = defaultTitle;
    };
  }, [timeLeft, state, currentSession]);

  // 알림음 재생
  const playAlarmSound = useCallback(() => {
    try {
      const ctx = new AudioContext();
      const notes = [659.25, 783.99, 659.25]; // E5, G5, E5
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.2);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.2 + 0.18);
        osc.start(ctx.currentTime + i * 0.2);
        osc.stop(ctx.currentTime + i * 0.2 + 0.2);
      });
    } catch {
      // AudioContext not supported
    }
  }, []);

  // 타이머 완료 시 알림 + 자동 시작
  useEffect(() => {
    if (state === 'completed') {
      playAlarmSound();

      const label = SESSION_LABELS[currentSession];
      const message = currentSession === 'pomodoro'
        ? '집중 시간이 끝났습니다. 휴식을 취하세요!'
        : '휴식이 끝났습니다. 다시 집중해보세요!';

      // 브라우저 알림
      if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        new Notification(`${label} 완료!`, { body: message, icon: '/apple-touch-icon.png' });
      }

      // 자동 시작 모드: 3초 후 다음 세션 전환 + 시작
      if (autoStart) {
        const timeout = setTimeout(() => {
          goToNextSession();
          // switchSession이 idle로 설정하므로 약간의 딜레이 후 start
          setTimeout(() => {
            endTimeRef.current = Date.now() + getSessionTime(
              currentSession === 'pomodoro'
                ? ((completedPomodoros + 1) % 4 === 0 ? 'longBreak' : 'shortBreak')
                : 'pomodoro'
            ) * 1000;
            setState('running');
          }, 100);
        }, 3000);
        return () => clearTimeout(timeout);
      }
    }
  }, [state, currentSession, playAlarmSound, autoStart, goToNextSession, completedPomodoros]);

  // completedPomodoros를 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('completedPomodoros', String(completedPomodoros));
    localStorage.setItem('pomodoroDate', new Date().toDateString());
  }, [completedPomodoros]);

  // 완료 카운터 초기화
  const resetPomodoros = useCallback(() => {
    setCompletedPomodoros(0);
  }, []);

  // 자동 시작 토글
  const toggleAutoStart = useCallback(() => {
    setAutoStart(prev => {
      localStorage.setItem('autoStart', String(!prev));
      return !prev;
    });
  }, []);

  // 알림 권한 요청 (마운트 시)
  useEffect(() => {
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

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
    resetPomodoros,
    autoStart,
    toggleAutoStart,
  };
}