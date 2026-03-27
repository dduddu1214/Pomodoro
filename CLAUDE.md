# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pomodoro Timer (포모도로 타이머) is a Next.js web app implementing the Pomodoro technique with a dark glassmorphism UI. All UI text is in Korean. Built by devdduddu as part of a daily service-building challenge.

## Build & Run Commands

```bash
npm install              # Install dependencies
npm run dev              # Start dev server (localhost:3000)
npm run build            # Production build
npm start                # Start production server
npm run lint             # Run ESLint
```

## Architecture

Single-page app using Next.js 15 App Router with React 19, TypeScript 5, and Tailwind CSS 4.

- **Hook-driven state**: All timer logic lives in `useTimer` hook (`src/hooks/useTimer.ts`) — manages countdown, session transitions, and completed pomodoro count. No external state management.
- **Component hierarchy**: `PomodoroTimer` (client component, main container) renders `TimerDisplay` (SVG progress ring + time) and `TimerControls` (play/pause/reset/next buttons).
- **Types** (`src/types/timer.ts`): `TimerState` = `'idle' | 'running' | 'paused' | 'completed'`; `SessionType` = `'pomodoro' | 'shortBreak' | 'longBreak'`.
- **Constants** (`src/utils/constants.ts`): Timer durations (25/5/15 min) and Korean session labels. Modify here to change default times.
- **Utilities** (`src/utils/time.ts`): Pure functions for `formatTime`, `calculateProgress`, unit conversions.

## Key Patterns

- **Session cycle**: Pomodoro -> Short Break, repeating. After every 4th pomodoro, Long Break instead. Counter resets after long break.
- **State machine**: `idle -> running -> paused` (toggle), `running -> completed -> idle` (auto-advance via `goToNextSession`).
- **Styling**: Dark gradient background (`slate-900/zinc-900/neutral-900`), glassmorphism cards (`bg-white/10 backdrop-blur-xl`). Session colors: orange-red (focus), teal-cyan (short break), indigo-purple (long break).
- **Fonts**: Inter (body), JetBrains Mono (timer digits), Pretendard (Korean text via CDN).
- **PWA**: Has `site.webmanifest`, apple-touch-icon, and standalone display mode configured.
- **Path alias**: `@/*` maps to `./src/*` in tsconfig.

## Planned Features (not yet implemented)

Sound notifications, browser notifications, session statistics, custom time settings, theme toggle, keyboard shortcuts, local storage persistence.
