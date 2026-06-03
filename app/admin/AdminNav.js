'use client'
import { useRouter, usePathname } from 'next/navigation'

export default function AdminNav() {
  const router = useRouter()
  const pathname = usePathname()
  if (pathname === '/admin/login') return null

  async function logout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  return (
    <div style={{
      background: '#1a1208', borderBottom: '1px solid #c9a84c',
      padding: '0 24px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', height: 52,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <span style={{ fontFamily: 'Cinzel, serif', fontSize: 14, color: '#c9a84c', letterSpacing: '0.15em' }}>
          VEIL ADMIN
        </span>
        <a href="/admin" style={navLink}>Posts</a>
        <a href="/admin/posts/new" style={navLink}>+ New Post</a>
      </div>
      <button onClick={logout} style={logoutBtn}>Log out</button>
    </div>
  )
}

const navLink = {
  color: '#a0916e', textDecoration: 'none', fontSize: 13,
  fontFamily: 'Cinzel, serif', letterSpacing: '0.1em',
}
const logoutBtn = {
  background: 'transparent', border: '1px solid #4a3820', color: '#7a6040',
  padding: '5px 14px', cursor: 'pointer', fontSize: 12,
  fontFamily: 'Cinzel, serif', letterSpacing: '0.1em',
}
