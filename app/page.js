'use client'
import dynamic from 'next/dynamic'

const VeilApp = dynamic(() => import('./veil-wonlv'), { ssr: false })

export default function Home() {
  return <VeilApp />
}
