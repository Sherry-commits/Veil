'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)
  const router = useRouter()

  async function fetchPosts() {
    const res = await fetch('/api/admin/posts')
    const data = await res.json()
    setPosts(data)
    setLoading(false)
  }

  useEffect(() => { fetchPosts() }, [])

  async function handleDelete(post) {
    if (!confirm(`Delete "${post.slug}"?`)) return
    setDeleting(post.slug)
    await fetch(`/api/admin/posts/${post.slug}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sha: post.sha }),
    })
    await fetchPosts()
    setDeleting(null)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={h1}>Blog Posts</h1>
        <a href="/admin/posts/new" style={newBtn}>+ New Post</a>
      </div>

      {loading && <p style={{ color: '#888' }}>Loading...</p>}

      {!loading && posts.length === 0 && (
        <p style={{ color: '#888' }}>No posts yet. <a href="/admin/posts/new" style={{ color: '#c9a84c' }}>Create one</a>.</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {posts.map(post => (
          <div key={post.slug} style={rowStyle}>
            <div style={{ fontWeight: 500, color: '#1a1208', fontFamily: 'Cinzel, serif', fontSize: 14 }}>
              {post.slug}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <a href={`/blog/${post.slug}`} target="_blank" rel="noopener" style={actionLink}>View</a>
              <button onClick={() => router.push(`/admin/posts/${post.slug}/edit`)} style={editBtn}>Edit</button>
              <button
                onClick={() => handleDelete(post)}
                disabled={deleting === post.slug}
                style={deleteBtn}
              >
                {deleting === post.slug ? '...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const h1 = { fontFamily: 'Cinzel, serif', fontSize: 20, color: '#1a1208', margin: 0, letterSpacing: '0.08em' }
const newBtn = { background: '#1a1208', color: '#c9a84c', padding: '9px 20px', textDecoration: 'none', fontFamily: 'Cinzel, serif', fontSize: 11, letterSpacing: '0.18em', border: '1px solid #c9a84c' }
const rowStyle = { background: '#fff', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e8e4de' }
const actionLink = { color: '#8a6f32', fontSize: 13, textDecoration: 'none', fontFamily: 'Cinzel, serif', letterSpacing: '0.08em' }
const editBtn = { background: '#f5f0e8', border: '1px solid #c9a84c', color: '#8a6f32', padding: '5px 16px', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: 12, letterSpacing: '0.1em' }
const deleteBtn = { background: 'transparent', border: '1px solid #e0a0a0', color: '#c07070', padding: '5px 14px', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: 12, letterSpacing: '0.1em' }
