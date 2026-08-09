import { notFound } from 'next/navigation';
import { getPostsByTag, getAllTags } from '@/lib/blog';
import Link from 'next/link';
import '../../../blog.css';

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(tag => ({ tag: tag.name }));
}

export async function generateMetadata({ params }) {
  const tag = decodeURIComponent(params.tag);
  return {
    title: `Articles tagged "${tag}" | Veil Blog`,
    description: `Browse Veil Blog articles about ${tag} — name meanings, elemental wisdom, and spiritual guidance.`,
  };
}

function Stars() {
  const stars = Array.from({ length: 40 }, (_, i) => ({
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

export default function TagPage({ params }) {
  const tag = decodeURIComponent(params.tag);
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Articles tagged "${tag}"`,
    description: `Veil Blog articles about ${tag} — name meanings, elemental wisdom, and spiritual guidance.`,
    url: `https://veilsame.com/blog/tag/${encodeURIComponent(tag)}`,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Veil', item: 'https://veilsame.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://veilsame.com/blog' },
      { '@type': 'ListItem', position: 3, name: `Tag: ${tag}` },
    ],
  };

  return (
    <div className="blog-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
          <p className="blog-subtitle">Tag: {tag}</p>
          <a href="/blog" className="blog-back-home">← All Articles</a>
        </header>

        <p className="blog-list-title">{posts.length} article{posts.length !== 1 ? 's' : ''} tagged &ldquo;{tag}&rdquo;</p>

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
                  {post.frontmatter.tags.map(t => (
                    <span key={t} className="blog-tag">{t}</span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
