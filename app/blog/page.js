import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import './../blog.css';

export const metadata = {
  title: 'Blog | Veil by Wonlv',
  description: 'Discover the ancient wisdom of name origins, elemental personalities, and destiny guidance. Explore articles about the five elements, name meanings, and spiritual self-discovery.',
  alternates: {
    canonical: 'https://veilsame.com/blog',
  },
  openGraph: {
    title: 'Veil Blog — Name Origins & Elemental Wisdom',
    description: 'Discover the ancient wisdom of name origins, elemental personalities, and destiny guidance.',
    type: 'website',
    siteName: 'Veil by Wonlv',
    locale: 'en_US',
    url: 'https://veilsame.com/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veil Blog — Name Origins & Elemental Wisdom',
    description: 'Discover the ancient wisdom of name origins, elemental personalities, and destiny guidance.',
  },
};

function Stars() {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    dur: 2 + Math.random() * 3,
    delay: Math.random() * 3,
    brightness: 0.3 + Math.random() * 0.7,
  }));

  return (
    <div className="blog-stars">
      {stars.map(s => (
        <div
          key={s.id}
          className="blog-star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            '--dur': `${s.dur}s`,
            '--delay': `${s.delay}s`,
            '--b': s.brightness,
          }}
        />
      ))}
    </div>
  );
}

export default function BlogPage() {
  const posts = getAllPosts();

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://veilsame.com/blog#blog',
    name: 'Veil Blog',
    description: 'Discover the ancient wisdom of name origins, elemental personalities, and destiny guidance.',
    url: 'https://veilsame.com/blog',
    blogPost: posts.map((post, i) => ({
      '@type': 'BlogPosting',
      '@id': `https://veilsame.com/blog/${post.slug}#article`,
      headline: post.frontmatter.title,
      description: post.frontmatter.description,
      datePublished: post.frontmatter.date,
      url: `https://veilsame.com/blog/${post.slug}`,
      position: i + 1,
    })),
    publisher: {
      '@type': 'Organization',
      name: 'Veil by Wonlv',
      url: 'https://veilsame.com',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Veil', item: 'https://veilsame.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog' },
    ],
  };

  return (
    <div className="blog-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Stars />
      <div className="blog-wrap">
        <header className="blog-header">
          <Link href="/blog" className="blog-header-link">
            <h1 className="blog-title">Veil Blog</h1>
          </Link>
          <p className="blog-subtitle">Name Origins · Elemental Wisdom · Destiny Guidance</p>
          <a href="/" className="blog-back-home">← Back to Veil</a>
        </header>

        <h2 className="blog-list-title">Latest Articles</h2>

        {posts.length === 0 ? (
          <p className="blog-empty">The scrolls are being inscribed. Check back soon for ancient wisdom.</p>
        ) : (
          <div className="blog-posts">
            {posts.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="blog-card"
              >
                <h3 className="blog-card-title">{post.frontmatter.title}</h3>
                <div className="blog-card-meta">
                  <span>{new Date(post.frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span>{post.frontmatter.readingTime}</span>
                </div>
                <p className="blog-card-desc">{post.frontmatter.description}</p>
                {post.frontmatter.tags && (
                  <div className="blog-card-tags">
                    {post.frontmatter.tags.map(tag => (
                      <span key={tag} className="blog-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
