import PomodoroTimer from '@/components/PomodoroTimer';

export default function Home() {
  return (
    <main>
      <PomodoroTimer />

      {/* SEO용 시맨틱 콘텐츠 - 크롤러가 페이지 내용을 이해할 수 있도록 */}
      <article className="sr-only" aria-hidden="true">
        <h2>무료 온라인 포모도로 타이머</h2>
        <p>
          포모도로 기법(Pomodoro Technique)은 25분 집중 작업 후 5분 휴식을 반복하는
          시간 관리 방법입니다. 4번의 집중 세션을 완료하면 15분의 긴 휴식을 취합니다.
        </p>
        <h3>주요 기능</h3>
        <ul>
          <li>25분 집중, 5분 짧은 휴식, 15분 긴 휴식 타이머</li>
          <li>시각적 원형 진행률 표시기</li>
          <li>타이머 완료 시 알림음 및 브라우저 알림</li>
          <li>자동 세션 전환 기능</li>
          <li>키보드 단축키 지원 (Space, R, N)</li>
          <li>브라우저 탭에 남은 시간 표시</li>
          <li>완료 횟수 자동 저장</li>
          <li>모바일, 태블릿, 데스크톱 반응형 디자인</li>
          <li>PWA 지원 - 홈 화면에 추가하여 앱처럼 사용</li>
        </ul>
        <h3>포모도로 기법 사용법</h3>
        <ol>
          <li>집중할 작업을 선택합니다.</li>
          <li>타이머를 25분으로 설정하고 시작합니다.</li>
          <li>타이머가 울릴 때까지 작업에 집중합니다.</li>
          <li>5분간 짧은 휴식을 취합니다.</li>
          <li>4번의 포모도로를 완료하면 15분간 긴 휴식을 취합니다.</li>
        </ol>
        <h3>이런 분들에게 추천합니다</h3>
        <ul>
          <li>공부에 집중하기 어려운 학생</li>
          <li>업무 효율을 높이고 싶은 직장인</li>
          <li>시간 관리가 필요한 프리랜서</li>
          <li>집중력 향상을 원하는 모든 분</li>
        </ul>
      </article>
    </main>
  );
}
