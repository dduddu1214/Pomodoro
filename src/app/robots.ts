import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Yeti',
        allow: '/',
      },
    ],
    sitemap: 'https://pomodoro-self-zeta.vercel.app/sitemap.xml',
    host: 'https://pomodoro-self-zeta.vercel.app',
  };
}
