/**
 * 초를 MM:SS 형태로 포맷팅
 */
export function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  /**
   * 분을 초로 변환
   */
  export function minutesToSeconds(minutes: number): number {
    return minutes * 60;
  }
  
  /**
   * 초를 분으로 변환
   */
  export function secondsToMinutes(seconds: number): number {
    return Math.floor(seconds / 60);
  }
  
  /**
   * 진행률 계산 (0-100)
   */
  export function calculateProgress(timeLeft: number, totalTime: number): number {
    if (totalTime === 0) return 0;
    return Math.round(((totalTime - timeLeft) / totalTime) * 100);
  }