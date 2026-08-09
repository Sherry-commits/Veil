import { notFound } from 'next/navigation';
import { getPostSlugs, getPostBySlug, getRelatedPosts } from '@/lib/blog';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
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
      canonical: `https://veilsame.com/blog/${params.slug}`,
    },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
      siteName: 'Veil by Wonlv',
      locale: 'en_US',
      url: `https://veilsame.com/blog/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
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

  // ─── Extract first image from content for schema ──────────────────────
  const imageMatch = content.match(/!\[.*?\]\((https?:\/\/[^\s)]+)\)/);
  const featuredImage = imageMatch ? imageMatch[1] : null;

  // ─── Extract FAQs from <details>/<summary> blocks ─────────────────────
  const faqs = [];
  const detailsRegex = /<details>\s*<summary>\s*(.+?)\s*<\/summary>\s*([\s\S]*?)\s*<\/details>/gi;
  let match;
  while ((match = detailsRegex.exec(content)) !== null) {
    faqs.push({
      '@type': 'Question',
      name: match[1].replace(/<[^>]*>/g, '').trim(),
      acceptedAnswer: {
        '@type': 'Answer',
        text: match[2].replace(/<[^>]*>/g, '').trim(),
      },
    });
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `https://veilsame.com/blog/${params.slug}#article`,
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    ...(featuredImage && { image: featuredImage }),
    wordCount: post.wordCount,
    timeRequired: `PT${Math.max(1, Math.ceil(post.wordCount / 200))}M`,
    author: {
      '@type': 'Organization',
      name: frontmatter.author || 'Veil by Wonlv',
      url: 'https://veilsame.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Veil by Wonlv',
      url: 'https://veilsame.com',
    },
    keywords: frontmatter.tags?.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://veilsame.com/blog/${params.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Veil',
        item: 'https://veilsame.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://veilsame.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: frontmatter.title,
      },
    ],
  };

  const faqJsonLd = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs,
  } : null;

  const relatedPosts = getRelatedPosts(params.slug, 3);

  return (
    <div className="blog-page">
      <Stars />
      <div className="blog-wrap">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}

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
                  <Link key={tag} href={`/blog/tag/${encodeURIComponent(tag)}`} className="blog-tag" style={{textDecoration:'none'}}>{tag}</Link>
                ))}
              </div>
            )}
          </div>

          <div className="blog-post-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {content}
            </ReactMarkdown>
          </div>
        </article>

        {/* ─── Related Posts ────────────────────────────────────────── */}
        {relatedPosts.length > 0 && (
          <section className="related-posts">
            <h2 className="related-title">Related Articles</h2>
            <div className="related-grid">
              {relatedPosts.map(rp => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="related-card">
                  <h3 className="related-card-title">{rp.frontmatter.title}</h3>
                  <div className="related-card-meta">
                    <span>{rp.frontmatter.readingTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="blog-nav-links">
          <Link href="/blog" className="blog-nav-link">← All Articles</Link>
          <a href="/" className="blog-nav-link">Veil Reading →</a>
        </div>
      </div>
    </div>
  );
}
