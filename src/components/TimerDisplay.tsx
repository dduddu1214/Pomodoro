import { formatTime, calculateProgress } from '@/utils/time';
import { SESSION_LABELS } from '@/utils/constants';
import { SessionType } from '@/types/timer';

interface TimerDisplayProps {
  timeLeft: number;
  totalTime: number;
  currentSession: SessionType;
}

export default function TimerDisplay({ 
  timeLeft, 
  totalTime, 
  currentSession 
}: TimerDisplayProps) {
  const progress = calculateProgress(timeLeft, totalTime);
  const circumference = 2 * Math.PI * 140; // 반지름 140px
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const sessionColors = {
    pomodoro: 'text-orange-400',
    shortBreak: 'text-teal-400',
    longBreak: 'text-indigo-400',
  };

  const ringColors = {
    pomodoro: 'stroke-orange-400',
    shortBreak: 'stroke-teal-400',
    longBreak: 'stroke-indigo-400',
  };

  const shadowColors = {
    pomodoro: 'drop-shadow-[0_0_20px_rgba(251,146,60,0.5)]',
    shortBreak: 'drop-shadow-[0_0_20px_rgba(45,212,191,0.5)]',
    longBreak: 'drop-shadow-[0_0_20px_rgba(129,140,248,0.5)]',
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* 세션 타입 표시 */}
      <div className="text-center">
        <h2 className={`text-2xl font-bold ${sessionColors[currentSession]} mb-2`}>
          {SESSION_LABELS[currentSession]}
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-50 mx-auto"></div>
      </div>

      {/* 원형 진행률 표시기 */}
      <div className="relative">
        {/* 외부 글로우 효과 */}
        <div className={`absolute inset-0 rounded-full ${shadowColors[currentSession]} opacity-75`}></div>
        
        <svg width="320" height="320" className="transform -rotate-90 relative z-10">
          {/* 배경 원 (외부) */}
          <circle
            cx="160"
            cy="160"
            r="150"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
            fill="none"
          />
          {/* 배경 원 (메인) */}
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            fill="none"
          />
          {/* 진행률 원 */}
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className={ringColors[currentSession]}
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)',
              filter: 'drop-shadow(0 0 10px currentColor)',
            }}
          />
        </svg>
        
        {/* 시간 표시 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-7xl font-['JetBrains_Mono'] font-bold text-white tracking-tighter">
            {formatTime(timeLeft)}
          </span>
          <div className="mt-2 flex items-center space-x-2">
            <div className={`w-1 h-1 rounded-full ${sessionColors[currentSession].replace('text-', 'bg-')}`}></div>
            <span className="text-sm font-medium text-white/60 uppercase tracking-wider">
              {progress}% 완료
            </span>
            <div className={`w-1 h-1 rounded-full ${sessionColors[currentSession].replace('text-', 'bg-')}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}