import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import './../blog.css';

export const metadata = {
  title: 'Blog | Veil by Wonlv',
  description: 'Discover the ancient wisdom of name origins, elemental personalities, and destiny guidance. Explore articles about the five elements, name meanings, and spiritual self-discovery.',
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

  return (
    <div className="blog-page">
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
