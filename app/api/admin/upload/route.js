import { NextResponse } from 'next/server'
import { uploadImage } from '@/lib/github'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const buffer = Buffer.from(await file.arrayBuffer())
    const base64 = buffer.toString('base64')

    // Sanitize filename: lowercase, spaces → hyphens, keep extension
    const ext = file.name.split('.').pop().toLowerCase()
    const base = file.name
      .replace(/\.[^.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    const filename = `${base}-${Date.now()}.${ext}`

    await uploadImage(filename, base64)

    return NextResponse.json({ url: `/images/blog/${filename}` })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
