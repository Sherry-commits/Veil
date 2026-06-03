'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function buildFrontmatter({ title, date, slug, tags, description }) {
  const tagLines = tags.split(',').map(t => `  - ${t.trim()}`).filter(Boolean).join('\n')
  return `---\ntitle: '${title.replace(/'/g, "\\'")}'\ndate: '${date}'\nslug: ${slug}\ntags:\n${tagLines}\ndescription: '${description.replace(/'/g, "\\'")}'\nauthor: 'Veil by Wonlv'\n---`
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)/)
  if (!match) return { fields: {}, body: raw }
  const fm = match[1]
  const body = match[2].trim()
  const get = (key) => { const m = fm.match(new RegExp(`^${key}:\\s*'?([^'\\n]+)'?`, 'm')); return m ? m[1].trim() : '' }
  const tags = [...fm.matchAll(/^  - (.+)$/mg)].map(m => m[1]).join(', ')
  return { fields: { title: get('title'), date: get('date'), slug: get('slug'), tags, description: get('description') }, body }
}

export default function PostEditor({ slug: initialSlug, initialContent, initialSha }) {
  const isNew = !initialSlug
  const router = useRouter()
  const today = new Date().toISOString().split('T')[0]

  const parsed = initialContent ? parseFrontmatter(initialContent) : null
  const [title, setTitle] = useState(parsed?.fields.title || '')
  const [slug, setSlug] = useState(parsed?.fields.slug || initialSlug || '')
  const [date, setDate] = useState(parsed?.fields.date || today)
  const [tags, setTags] = useState(parsed?.fields.tags || '')
  const [description, setDescription] = useState(parsed?.fields.description || '')
  const [body, setBody] = useState(parsed?.body || '')
  const [slugEdited, setSlugEdited] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const textareaRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (!slugEdited && isNew) setSlug(slugify(title))
  }, [title, slugEdited, isNew])

  function insertAtCursor(text) {
    const ta = textareaRef.current
    if (!ta) { setBody(b => b + text); return }
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const newBody = body.slice(0, start) + text + body.slice(end)
    setBody(newBody)
    setTimeout(() => {
      ta.selectionStart = ta.selectionEnd = start + text.length
      ta.focus()
    }, 0)
  }

  async function handleImageUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { setError('Please select an image file.'); return }
    if (file.size > 5 * 1024 * 1024) { setError('Image must be under 5 MB.'); return }

    setUploading(true)
    setError('')
    const form = new FormData()
    form.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: form })
    setUploading(false)
    fileInputRef.current.value = ''

    if (res.ok) {
      const { url } = await res.json()
      const alt = file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ')
      insertAtCursor(`\n![${alt}](${url})\n`)
    } else {
      const d = await res.json()
      setError(d.error || 'Upload failed.')
    }
  }

  async function handleSave() {
    if (!title || !slug || !body) { setError('Title, slug, and content are required.'); return }
    setSaving(true); setError(''); setSuccess('')
    const content = buildFrontmatter({ title, date, slug, tags, description }) + '\n\n' + body
    const url = isNew ? '/api/admin/posts' : `/api/admin/posts/${initialSlug}`
    const method = isNew ? 'POST' : 'PUT'
    const bodyPayload = isNew ? { slug, content } : { content, sha: initialSha }
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(bodyPayload) })
    setSaving(false)
    if (res.ok) {
      setSuccess('Saved! Vercel is deploying...')
      if (isNew) setTimeout(() => router.push('/admin'), 1500)
    } else {
      const d = await res.json()
      setError(d.error || 'Save failed.')
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={h1}>{isNew ? 'New Post' : `Edit: ${initialSlug}`}</h1>
        <a href="/admin" style={backLink}>← Back</a>
      </div>

      <div style={card}>
        <div style={grid2}>
          <Field label="Title" required>
            <input style={input} value={title} onChange={e => setTitle(e.target.value)} placeholder="Post title" />
          </Field>
          <Field label="Slug (URL)" required>
            <input style={input} value={slug}
              onChange={e => { setSlug(e.target.value); setSlugEdited(true) }}
              placeholder="my-post-slug" />
          </Field>
          <Field label="Date">
            <input style={input} type="date" value={date} onChange={e => setDate(e.target.value)} />
          </Field>
          <Field label="Tags (comma separated)">
            <input style={input} value={tags} onChange={e => setTags(e.target.value)} placeholder="name-origins, elemental-wisdom" />
          </Field>
        </div>
        <Field label="Meta Description (150-160 chars)">
          <input style={input} value={description} onChange={e => setDescription(e.target.value)} placeholder="Compelling meta description with keyword..." maxLength={160} />
          <div style={{ fontSize: 12, color: description.length > 160 ? '#c07070' : '#999', marginTop: 4 }}>{description.length} / 160</div>
        </Field>
      </div>

      <div style={{ ...card, marginTop: 12 }}>
        {/* Toolbar */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 10, alignItems: 'center' }}>
          <span style={toolbarLabel}>Markdown Content <span style={{ color: '#c9a84c' }}>*</span></span>
          <div style={{ flex: 1 }} />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            style={toolbarBtn}
          >
            {uploading ? '⏳ Uploading...' : '🖼 Insert Image'}
          </button>
          <button type="button" onClick={() => insertAtCursor('\n**bold text**')} style={toolbarBtn}>B</button>
          <button type="button" onClick={() => insertAtCursor('\n*italic text*')} style={{ ...toolbarBtn, fontStyle: 'italic' }}>I</button>
          <button type="button" onClick={() => insertAtCursor('\n## Heading')} style={toolbarBtn}>H2</button>
          <button type="button" onClick={() => insertAtCursor('\n[link text](url)')} style={toolbarBtn}>🔗</button>
        </div>
        <textarea
          ref={textareaRef}
          style={{ ...input, minHeight: 480, resize: 'vertical', fontFamily: '"Courier New", monospace', fontSize: 14, lineHeight: 1.7 }}
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Write your post in Markdown..."
        />
        <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>~{Math.round(body.split(/\s+/).filter(Boolean).length)} words</div>
      </div>

      {error && <div style={{ background: '#fff5f5', border: '1px solid #f5c6c6', color: '#b07070', padding: '10px 16px', marginTop: 12, fontSize: 14 }}>{error}</div>}
      {success && <div style={{ background: '#f0faf0', border: '1px solid #a8d8a8', color: '#4a8a4a', padding: '10px 16px', marginTop: 12, fontSize: 14 }}>{success}</div>}

      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <button onClick={handleSave} disabled={saving} style={saveBtn}>
          {saving ? 'Saving...' : '✦ Save & Publish ✦'}
        </button>
        {!isNew && (
          <a href={`/blog/${initialSlug}`} target="_blank" rel="noopener" style={previewBtn}>
            Preview ↗
          </a>
        )}
      </div>
    </div>
  )
}

function Field({ label, children, required }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>{label}{required && <span style={{ color: '#c9a84c' }}> *</span>}</label>
      {children}
    </div>
  )
}

const h1 = { fontFamily: 'Cinzel, serif', fontSize: 20, color: '#1a1208', margin: 0, letterSpacing: '0.08em' }
const backLink = { color: '#8a6f32', textDecoration: 'none', fontFamily: 'Cinzel, serif', fontSize: 12, letterSpacing: '0.1em' }
const card = { background: '#fff', padding: '24px', border: '1px solid #e8e4de' }
const grid2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }
const labelStyle = { display: 'block', fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a6f32', marginBottom: 7 }
const toolbarLabel = { fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a6f32' }
const input = { width: '100%', boxSizing: 'border-box', border: '1px solid #d8d0c0', background: '#fdfaf5', padding: '10px 13px', fontSize: 15, color: '#2a1f0a', outline: 'none', fontFamily: 'inherit' }
const toolbarBtn = { background: '#f5f0e8', border: '1px solid #d8d0c0', color: '#5a4020', padding: '5px 12px', cursor: 'pointer', fontSize: 12, fontFamily: 'Cinzel, serif', letterSpacing: '0.05em' }
const saveBtn = { background: '#1a1208', border: '1px solid #c9a84c', color: '#c9a84c', padding: '13px 32px', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' }
const previewBtn = { border: '1px solid #d8d0c0', color: '#8a6f32', padding: '13px 24px', textDecoration: 'none', fontFamily: 'Cinzel, serif', fontSize: 12, letterSpacing: '0.15em', display: 'inline-block' }
