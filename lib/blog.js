import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content', 'blog');

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'));
}

export function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return {
    slug: realSlug,
    frontmatter: {
      ...data,
      readingTime: `${readingTime} min read`,
    },
    content,
  };
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  return slugs
    .map(slug => getPostBySlug(slug))
    .filter(Boolean)
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
}
