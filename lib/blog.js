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
    wordCount,
  };
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  return slugs
    .map(slug => getPostBySlug(slug))
    .filter(Boolean)
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
}

export function getRelatedPosts(currentSlug, limit = 3) {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];
  const allPosts = getAllPosts().filter(p => p.slug !== currentSlug);
  const currentTags = current.frontmatter.tags || [];
  if (currentTags.length === 0) return allPosts.slice(0, limit);

  const scored = allPosts.map(post => {
    const postTags = post.frontmatter.tags || [];
    const sharedTags = postTags.filter(t => currentTags.includes(t));
    return { post, score: sharedTags.length };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.post.frontmatter.date) - new Date(a.post.frontmatter.date))
    .slice(0, limit)
    .map(s => s.post);
}

export function getPostsByTag(tag) {
  return getAllPosts().filter(post =>
    (post.frontmatter.tags || []).some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getAllTags() {
  const posts = getAllPosts();
  const tagCount = {};
  posts.forEach(post => {
    (post.frontmatter.tags || []).forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });
  return Object.entries(tagCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
