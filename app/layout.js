import Link from 'next/link'

export const metadata = {
  title: {
    default: 'Veil by Wonlv · Discover Your Name Meaning & Soul Destiny',
    template: '%s | Veil by Wonlv',
  },
  description: 'Enter your name and discover its ancient meaning, elemental nature, soul essence, and 2026 spiritual guidance. Free name reading powered by ancient wisdom.',
  openGraph: {
    title: 'Veil by Wonlv · Discover Your Name Meaning & Soul Destiny',
    description: 'Enter your name and discover its ancient meaning, elemental nature, soul essence, and 2026 spiritual guidance.',
    type: 'website',
    siteName: 'Veil by Wonlv',
    locale: 'en_US',
    url: 'https://veilsame.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veil by Wonlv · Discover Your Name Meaning & Soul Destiny',
    description: 'Enter your name and discover its ancient meaning, elemental nature, and 2026 spiritual guidance.',
  },
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Veil by Wonlv',
  url: 'https://veilsame.com',
  description:
    'Veil by Wonlv is a mystical name-origins and elemental wisdom platform offering free name readings, elemental personality insights, and destiny guidance.',
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'support@veilsame.com',
    contactType: 'customer support',
  },
};

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Veil by Wonlv',
  url: 'https://veilsame.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://veilsame.com/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body style={{ margin: 0, background: '#0a0806' }}>
        {/* ─── NAVIGATION ───────────────────────────────────────────── */}
        <nav style={{
          position: 'sticky', top: 0, zIndex: 100,
          background: 'rgba(10,8,6,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(138,111,50,0.18)',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '50px',
        }}>
          <Link href="/" style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: '18px',
            color: '#c9a84c',
            textDecoration: 'none',
            letterSpacing: '0.08em',
            textShadow: '0 0 20px rgba(201,168,76,0.3)',
          }}>
            VEIL
          </Link>
          <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            <Link href="/" style={navLinkStyle}>
              Home
            </Link>
            <Link href="/blog" style={{ ...navLinkStyle, color: '#8a6f32' }}>
              Blog
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}

const navLinkStyle = {
  fontFamily: "'Cinzel', serif",
  fontSize: '10px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: '#c9a84c',
  textDecoration: 'none',
  transition: 'color 0.25s',
}
