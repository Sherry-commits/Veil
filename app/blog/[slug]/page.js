import { notFound } from 'next/navigation';
import { getPostSlugs, getPostBySlug } from '@/lib/blog';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../../blog.css';

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map(slug => ({ slug: slug.replace(/\.md$/, '') }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.frontmatter.title} | Veil Blog`,
    description: post.frontmatter.description,
    alternates: {
      canonical: `https://veil.wonlv.com/blog/${params.slug}`,
    },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
    },
  };
}

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

export default function BlogPost({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    author: {
      '@type': 'Organization',
      name: frontmatter.author || 'Veil by Wonlv',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Veil by Wonlv',
    },
    keywords: frontmatter.tags?.join(', '),
  };

  return (
    <div className="blog-page">
      <Stars />
      <div className="blog-wrap">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <header className="blog-header">
          <Link href="/blog" className="blog-header-link">
            <h1 className="blog-title">Veil Blog</h1>
          </Link>
          <a href="/" className="blog-back-home">← Back to Veil</a>
        </header>

        <article>
          <div className="blog-post-header">
            <h1 className="blog-post-title">{frontmatter.title}</h1>
            <div className="blog-post-meta">
              <span>{new Date(frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>{frontmatter.readingTime}</span>
              {frontmatter.author && <span>By {frontmatter.author}</span>}
            </div>
            {frontmatter.tags && (
              <div className="blog-post-tags">
                {frontmatter.tags.map(tag => (
                  <span key={tag} className="blog-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>

          <div className="blog-post-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        </article>

        <div className="blog-nav-links">
          <Link href="/blog" className="blog-nav-link">← All Articles</Link>
          <a href="/" className="blog-nav-link">Veil Reading →</a>
        </div>
      </div>
    </div>
  );
}
