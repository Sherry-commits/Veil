import { NextResponse } from 'next/server'
import { getPost, updatePost, deletePost } from '@/lib/github'

export async function GET(request, { params }) {
  try {
    const post = await getPost(params.slug)
    return NextResponse.json(post)
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { content, sha } = await request.json()
    await updatePost(params.slug, content, sha)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { sha } = await request.json()
    await deletePost(params.slug, sha)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
