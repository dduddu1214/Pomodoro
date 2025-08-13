import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '포모도로 타이머 | Pomodoro Timer',
  description: '25분 집중 + 5분 휴식으로 생산성을 높여보세요. 모던하고 아름다운 디자인의 포모도로 타이머입니다.',
  keywords: ['포모도로', 'pomodoro', '타이머', 'timer', '집중', '생산성', 'productivity', '25분', 'focus'],
  authors: [{ name: 'devdduddu' }],
  creator: 'devdduddu',
  publisher: 'devdduddu',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-pomodoro-app.vercel.app'), // 실제 URL로 변경하세요
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '포모도로 타이머 | 25분 집중의 힘',
    description: '검증된 포모도로 기법으로 집중력을 극대화하세요. 25분 집중 + 5분 휴식 사이클로 생산성을 2배 높여보세요!',
    url: 'https://your-pomodoro-app.vercel.app',
    siteName: '포모도로 타이머',
    images: [
      {
        url: '/og-image.png', // OG 이미지 추가 필요
        width: 1200,
        height: 630,
        alt: '포모도로 타이머 - 25분 집중 + 5분 휴식',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '포모도로 타이머 | 25분 집중의 힘',
    description: '검증된 포모도로 기법으로 집중력을 극대화하세요. 25분 집중 + 5분 휴식 사이클로 생산성을 2배 높여보세요!',
    images: ['/og-image.png'], // Twitter 카드 이미지
    creator: '@devdduddu', // 트위터 계정이 있다면
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'google-site-verification-code', // Google Search Console
    // other: {
    //   'naver-site-verification': 'naver-verification-code', // 네이버 웹마스터
    // },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        {/* 추가 메타 태그 */}
        <meta name="theme-color" content="#0f172a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="포모도로 타이머" />
        
        {/* 파비콘 */}
        <link rel="icon" href="/favicon.ico" />
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
        
        {/* JSON-LD 구조화된 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: '포모도로 타이머',
              description: '25분 집중 + 5분 휴식으로 생산성을 높이는 포모도로 타이머',
              url: 'https://your-pomodoro-app.vercel.app',
              applicationCategory: 'ProductivityApplication',
              operatingSystem: 'Web Browser',
              author: {
                '@type': 'Person',
                name: 'devdduddu',
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'KRW',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5',
                ratingCount: '1',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}