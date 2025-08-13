'use client';

import { useTimer } from '@/hooks/useTimer';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import { SessionType } from '@/types/timer';

export default function PomodoroTimer() {
  const {
    timeLeft,
    totalTime,
    currentSession,
    state,
    completedPomodoros,
    start,
    pause,
    reset,
    switchSession,
    goToNextSession,
  } = useTimer();

  const handleSessionChange = (session: SessionType) => {
    switchSession(session);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-zinc-900 to-neutral-900 flex items-center justify-center p-4 font-['Pretendard']">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 w-full max-w-lg">
        {/* 헤더 */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight">
            Pomodoro
          </h1>
          <div className="flex items-center justify-center space-x-2 text-white/70">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <p className="text-sm font-medium">
              {completedPomodoros}개 완료
            </p>
          </div>
        </div>

        {/* 세션 선택 버튼들 */}
        <div className="bg-white/5 rounded-2xl p-2 mb-10 backdrop-blur-sm border border-white/10">
          <div className="grid grid-cols-3 gap-1">
            <button
              onClick={() => handleSessionChange('pomodoro')}
              className={`py-3 px-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                currentSession === 'pomodoro'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              disabled={state === 'running'}
            >
              집중
              <div className="text-xs opacity-70 mt-0.5">25분</div>
            </button>
            <button
              onClick={() => handleSessionChange('shortBreak')}
              className={`py-3 px-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                currentSession === 'shortBreak'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/25'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              disabled={state === 'running'}
            >
              짧은 휴식
              <div className="text-xs opacity-70 mt-0.5">5분</div>
            </button>
            <button
              onClick={() => handleSessionChange('longBreak')}
              className={`py-3 px-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                currentSession === 'longBreak'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              disabled={state === 'running'}
            >
              긴 휴식
              <div className="text-xs opacity-70 mt-0.5">15분</div>
            </button>
          </div>
        </div>

        {/* 타이머 표시 */}
        <TimerDisplay
          timeLeft={timeLeft}
          totalTime={totalTime}
          currentSession={currentSession}
        />

        {/* 컨트롤 버튼들 */}
        <div className="mt-10">
          <TimerControls
            state={state}
            onStart={start}
            onPause={pause}
            onReset={reset}
            onNext={goToNextSession}
          />
        </div>

        {/* 상태 메시지 */}
        <div className="mt-8 text-center">
          {state === 'completed' && (
            <div className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30 text-teal-300 px-6 py-4 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-xl">🎉</span>
                <span className="font-semibold">
                  {currentSession === 'pomodoro' ? '집중 시간' : '휴식 시간'} 완료!
                </span>
              </div>
            </div>
          )}
          {state === 'running' && (
            <div className="text-white/60 flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
              <span className="font-medium">타이머 실행 중...</span>
            </div>
          )}
          {state === 'paused' && (
            <div className="text-yellow-300 flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="font-medium">일시정지됨</span>
            </div>
          )}
        </div>

        {/* 크레딧 */}
        <div className="mt-8 text-center">
          <p className="text-white/40 text-sm font-medium">
            Made by{' '}
            <span className="text-white/70 font-semibold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              devdduddu
            </span>
            <span className="text-red-400 ml-1 animate-pulse">❤️</span>
          </p>
        </div>
      </div>
    </div>
  );
}