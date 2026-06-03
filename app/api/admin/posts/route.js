import { NextResponse } from 'next/server'
import { listPosts, createPost } from '@/lib/github'

export async function GET() {
  try {
    const posts = await listPosts()
    return NextResponse.json(posts)
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { slug, content } = await request.json()
    await createPost(slug, content)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
