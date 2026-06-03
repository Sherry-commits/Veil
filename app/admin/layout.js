import AdminNav from './AdminNav'

export const metadata = { title: 'Veil Admin' }

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#f5f5f4' }}>
        <AdminNav />
        <main style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px' }}>
          {children}
        </main>
      </body>
    </html>
  )
}
