export const metadata = {
  title: 'Veil by Wonlv · Reveal the Soul Within Your Name',
  description: 'Discover your name origin, elemental nature, soul essence, and 2026 destiny guidance.',
}

function SiteFooter() {
  return (
    <footer style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: '#0a0806',
      borderTop: '1px solid rgba(138,111,50,0.15)',
      padding: '10px 20px',
      textAlign: 'center',
    }}>
      <div className="site-footer-links" style={{
        fontFamily: 'Cinzel, serif',
        fontSize: '9px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: '#4a3820',
      }}>
        <a href="/">Veil by Wonlv</a>
        <span className="sep">·</span>
        <a href="/privacy">Privacy</a>
        <span className="sep">·</span>
        <a href="/terms">Terms</a>
        <span className="sep">·</span>
        <a href="mailto:support@veil.wonlv.com">support@veil.wonlv.com</a>
      </div>
      <style>{`.site-footer-links a{color:inherit;text-decoration:none;transition:color 0.3s;}.site-footer-links a:hover{color:#e8c96a;}.site-footer-links .sep{margin:0 10px;opacity:0.3;}`}</style>
    </footer>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
