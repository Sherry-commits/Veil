const OWNER = process.env.GITHUB_OWNER || 'Sherry-commits'
const REPO = process.env.GITHUB_REPO || 'Veil'
const BASE = `https://api.github.com/repos/${OWNER}/${REPO}/contents`

async function ghFetch(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
      ...options.headers,
    },
    cache: 'no-store',
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`GitHub ${res.status}: ${body}`)
  }
  return res.json()
}

export async function listPosts() {
  const files = await ghFetch('/content/blog')
  return files
    .filter(f => f.name.endsWith('.md'))
    .map(f => ({ name: f.name, slug: f.name.replace('.md', ''), sha: f.sha, path: f.path }))
}

export async function getPost(slug) {
  const data = await ghFetch(`/content/blog/${slug}.md`)
  const content = Buffer.from(data.content, 'base64').toString('utf-8')
  return { content, sha: data.sha }
}

export async function createPost(slug, content) {
  return ghFetch(`/content/blog/${slug}.md`, {
    method: 'PUT',
    body: JSON.stringify({
      message: `blog: add ${slug}`,
      content: Buffer.from(content).toString('base64'),
    }),
  })
}

export async function updatePost(slug, content, sha) {
  return ghFetch(`/content/blog/${slug}.md`, {
    method: 'PUT',
    body: JSON.stringify({
      message: `blog: update ${slug}`,
      content: Buffer.from(content).toString('base64'),
      sha,
    }),
  })
}

export async function deletePost(slug, sha) {
  return ghFetch(`/content/blog/${slug}.md`, {
    method: 'DELETE',
    body: JSON.stringify({ message: `blog: delete ${slug}`, sha }),
  })
}

export async function uploadImage(filename, base64Content) {
  // Check if file already exists (need its SHA to overwrite)
  let sha
  try {
    const existing = await ghFetch(`/public/images/blog/${filename}`)
    sha = existing.sha
  } catch {
    // New file, no SHA needed
  }
  return ghFetch(`/public/images/blog/${filename}`, {
    method: 'PUT',
    body: JSON.stringify({
      message: `blog: upload image ${filename}`,
      content: base64Content,
      ...(sha ? { sha } : {}),
    }),
  })
}
