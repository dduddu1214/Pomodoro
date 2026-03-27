import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const SITE_URL = 'https://pomodoro-self-zeta.vercel.app';
const SITE_NAME = '포모도로 타이머';
const SITE_TITLE = '포모도로 타이머 - 무료 온라인 타이머 | Pomodoro Timer';
const SITE_DESCRIPTION = '무료 온라인 포모도로 타이머로 집중력을 높이세요. 25분 집중 + 5분 휴식 사이클, 알림음, 브라우저 알림, 자동 세션 전환을 지원합니다. 설치 없이 바로 사용 가능한 웹 포모도로 타이머.';

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    '포모도로', '포모도로 타이머', '뽀모도로 타이머', '온라인 타이머',
    '집중 타이머', '공부 타이머', '업무 타이머', '25분 타이머',
    '생산성', '집중력', '시간 관리', '타이머 앱',
    'pomodoro', 'pomodoro timer', 'focus timer', 'study timer',
    'productivity', 'online timer', 'free timer',
  ],
  authors: [{ name: 'devdduddu', url: 'https://github.com/dduddu1214' }],
  creator: 'devdduddu',
  publisher: 'devdduddu',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
    languages: {
      'ko-KR': '/',
    },
  },
  openGraph: {
    title: '포모도로 타이머 - 25분 집중으로 생산성 2배 높이기',
    description: '검증된 포모도로 기법으로 집중력을 극대화하세요. 25분 집중 + 5분 휴식 사이클, 알림음, 자동 세션 전환. 무료 온라인 타이머.',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '포모도로 타이머 - 25분 집중 + 5분 휴식 온라인 타이머',
        type: 'image/png',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '포모도로 타이머 - 25분 집중으로 생산성 2배 높이기',
    description: '검증된 포모도로 기법으로 집중력을 극대화하세요. 무료 온라인 포모도로 타이머.',
    images: ['/og-image.png'],
    creator: '@devdduddu',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'UuP-XAG-bcvmnubldYMWhTIVRRuDlSmrbSYc1FEcTvU',
  },
  category: 'productivity',
  classification: '생산성 도구',
  other: {
    'naver-site-verification': 'aee51462ca3c4201545fea7b672c2a93c6456bf0',
    'subject': '포모도로 타이머 - 무료 온라인 집중 타이머',
    'rating': 'General',
    'revisit-after': '7 days',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '포모도로 타이머',
    alternateName: ['Pomodoro Timer', '뽀모도로 타이머', '집중 타이머'],
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'Web Browser',
    browserRequirements: 'Requires JavaScript',
    softwareVersion: '1.0.0',
    inLanguage: 'ko',
    isAccessibleForFree: true,
    author: {
      '@type': 'Person',
      name: 'devdduddu',
      url: 'https://github.com/dduddu1214',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
      availability: 'https://schema.org/InStock',
    },
    featureList: [
      '25분 집중 + 5분 휴식 포모도로 사이클',
      '알림음 및 브라우저 알림',
      '자동 세션 전환',
      '키보드 단축키 지원',
      '반응형 디자인',
      'PWA 지원',
    ],
    screenshot: `${SITE_URL}/og-image.png`,
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '포모도로 기법이란 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '포모도로 기법은 25분 집중 작업 후 5분 휴식을 반복하는 시간 관리 방법입니다. 4번의 집중 세션 후에는 15분의 긴 휴식을 취합니다. 이탈리아의 프란체스코 시릴로가 개발한 이 기법은 집중력과 생산성을 크게 향상시키는 것으로 알려져 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '이 포모도로 타이머는 무료인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 완전히 무료입니다. 회원가입이나 설치 없이 웹 브라우저에서 바로 사용할 수 있습니다. 알림음, 브라우저 알림, 자동 세션 전환 등 모든 기능을 무료로 이용하실 수 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '포모도로 타이머의 키보드 단축키는 어떻게 되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Space 키로 시작/일시정지, R 키로 리셋, N 키로 다음 세션으로 전환할 수 있습니다.',
        },
      },
    ],
  };

  return (
    <html lang="ko">
      <head>
        {/* 모바일 앱 메타 태그 */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="포모도로 타이머" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="포모도로 타이머" />

        {/* 파비콘 */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* 폰트 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          rel="stylesheet"
        />

        {/* JSON-LD 구조화된 데이터 - WebApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* JSON-LD 구조화된 데이터 - FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
