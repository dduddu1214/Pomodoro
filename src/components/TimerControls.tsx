import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { TimerState } from '@/types/timer';

interface TimerControlsProps {
  state: TimerState;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onNext: () => void;
}

export default function TimerControls({
  state,
  onStart,
  onPause,
  onReset,
  onNext,
}: TimerControlsProps) {
  const isRunning = state === 'running';
  const canStart = state === 'idle' || state === 'paused';
  const canPause = state === 'running';
  const isCompleted = state === 'completed';

  return (
    <div className="flex items-center justify-center space-x-6">
      {/* 시작/일시정지 버튼 */}
      {canStart && (
        <button
          onClick={onStart}
          className="group relative flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white rounded-full transition-all duration-300 shadow-xl shadow-green-500/25 hover:shadow-green-400/40 hover:scale-105 active:scale-95"
          aria-label="타이머 시작"
        >
          <Play size={28} className="ml-1 group-hover:scale-110 transition-transform duration-200" />
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      )}

      {canPause && (
        <button
          onClick={onPause}
          className="group relative flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white rounded-full transition-all duration-300 shadow-xl shadow-yellow-500/25 hover:shadow-yellow-400/40 hover:scale-105 active:scale-95"
          aria-label="타이머 일시정지"
        >
          <Pause size={28} className="group-hover:scale-110 transition-transform duration-200" />
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      )}

      {/* 리셋 버튼 */}
      <button
        onClick={onReset}
        className="group relative flex items-center justify-center w-14 h-14 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
        aria-label="타이머 리셋"
        disabled={state === 'idle'}
      >
        <RotateCcw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
      </button>

      {/* 다음 세션으로 버튼 (완료 시에만 표시) */}
      {isCompleted && (
        <button
          onClick={onNext}
          className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white rounded-full transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-400/40 hover:scale-105 active:scale-95"
          aria-label="다음 세션으로"
        >
          <SkipForward size={20} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      )}
    </div>
  );
}