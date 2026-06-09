import VeilApp from './veil-wonlv'
import { getAllPosts } from '@/lib/blog'
import Link from 'next/link'

export default function Home() {
  const posts = getAllPosts().slice(0, 3)

  return (
    <>
      <VeilApp />
      {posts.length > 0 && (
        <section style={{
          background: '#0a0806',
          borderTop: '1px solid rgba(138,111,50,0.15)',
          padding: '48px 20px 80px',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '9px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#8a6f32',
            marginBottom: '28px',
          }}>Read Our Guides</p>
          <div style={{
            maxWidth: '620px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}>
            {posts.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{
                  display: 'block',
                  padding: '14px 20px',
                  border: '1px solid rgba(138,111,50,0.2)',
                  color: '#c9a84c',
                  textDecoration: 'none',
                  fontFamily: 'Cinzel, serif',
                  fontSize: '12px',
                  letterSpacing: '0.04em',
                  textAlign: 'left',
                }}
              >
                {post.frontmatter.title}
              </Link>
            ))}
            <Link
              href="/blog"
              style={{
                display: 'block',
                marginTop: '8px',
                fontFamily: 'Cinzel, serif',
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#8a6f32',
                textDecoration: 'none',
              }}
            >
              View All Articles →
            </Link>
          </div>
        </section>
      )}
    </>
  )
}
