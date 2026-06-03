'use client'
import { useEffect, useState } from 'react'
import PostEditor from '../../../PostEditor'

export default function EditPostPage({ params }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/admin/posts/${params.slug}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) setError(d.error)
        else setData(d)
      })
  }, [params.slug])

  if (error) return <p style={{ color: '#b07070' }}>Error: {error}</p>
  if (!data) return <p style={{ color: '#888', fontFamily: 'Cinzel, serif' }}>Loading...</p>

  return <PostEditor slug={params.slug} initialContent={data.content} initialSha={data.sha} />
}
