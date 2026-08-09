export default function robots() {
  return {
    rules: [
      // AI crawlers — explicitly welcome them for GEO visibility
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      // Search engines
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      // Catch-all (must go last — Next.js merges in order)
      { userAgent: '*', allow: '/' },
    ],
    sitemap: 'https://veilsame.com/sitemap.xml',
  }
}
