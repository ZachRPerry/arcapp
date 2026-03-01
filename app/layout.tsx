import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Raid Roulette',
  description: 'Randomize your next Arc Raiders drop with random gun loadouts, maps, and special rules. A free community tool for Arc Raiders players.',
  keywords: ['Arc Raiders', 'game spinner', 'random loadout', 'Arc Raiders tools', 'game randomizer', 'raid roulette', 'Arc Raiders spinner'],
  authors: [{ name: 'Raid Roulette' }],
  creator: 'Raid Roulette',
  publisher: 'Raid Roulette',
  metadataBase: new URL('https://raidroulette.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Raid Roulette - Arc Raiders Random Game Format Generator',
    description: 'Randomize your next Arc Raiders drop with random gun loadouts, maps, and special rules. A free community tool for Arc Raiders players.',
    url: 'https://raidroulette.com',
    siteName: 'Raid Roulette',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/placeholder-logo.png',
        width: 1200,
        height: 630,
        alt: 'Raid Roulette - Arc Raiders Spinner',
      },
    ],
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
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0f14',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-FNSZ572Z0R"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FNSZ572Z0R');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Raid Roulette',
              description: 'Randomize your next Arc Raiders drop with random gun loadouts, maps, and special rules.',
              url: 'https://raidroulette.com',
              applicationCategory: 'GameApplication',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              author: {
                '@type': 'Organization',
                name: 'Raid Roulette',
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
