'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    setLoading(false)
    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Incorrect password.')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0806' }}>
      <div style={{ width: 360, background: '#1a1208', border: '1px solid #c9a84c', padding: '40px 36px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 22, color: '#c9a84c', marginBottom: 4 }}>Veil</div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 10, color: '#8a6f32', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Admin Access</div>
        </div>
        <form onSubmit={handleLogin}>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={inputStyle}
            autoFocus
            required
          />
          {error && <div style={{ color: '#b07070', fontSize: 13, marginBottom: 12 }}>{error}</div>}
          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? 'Verifying...' : '✦ Enter ✦'}
          </button>
        </form>
      </div>
    </div>
  )
}

const labelStyle = { display: 'block', fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a6f32', marginBottom: 8 }
const inputStyle = { width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.06)', border: '1px solid #4a3820', padding: '12px 14px', color: '#e8c96a', fontSize: 16, marginBottom: 16, outline: 'none', fontFamily: 'inherit' }
const btnStyle = { width: '100%', padding: '13px', background: 'linear-gradient(135deg,#2a1f0a,#1a1208)', border: '1px solid #c9a84c', color: '#c9a84c', fontFamily: 'Cinzel, serif', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', cursor: 'pointer' }
