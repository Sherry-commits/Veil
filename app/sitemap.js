import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SITE_URL = 'https://veil.wonlv.com';

export default async function sitemap() {
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Add blog posts
  const postsDir = path.join(process.cwd(), 'content', 'blog');
  const blogPages = [];

  if (fs.existsSync(postsDir)) {
    const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
      const { data } = matter(content);
      const slug = file.replace(/\.md$/, '');
      blogPages.push({
        url: `${SITE_URL}/blog/${slug}`,
        lastModified: data.date ? new Date(data.date) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return [...staticPages, ...blogPages];
}
