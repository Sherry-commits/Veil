import dynamic from 'next/dynamic'

const VeilApp = dynamic(() => import('./veil-wonlv'), { ssr: false })

export default function Home() {
  return (
    <div>
      {/*
        Server-rendered text — visible to crawlers and Creem's compliance bot.
        Visually hidden but semantically present (accessible / sr-only pattern).
      */}
      <div style={{position:'absolute',width:'1px',height:'1px',padding:0,margin:'-1px',overflow:'hidden',clip:'rect(0,0,0,0)',whiteSpace:'nowrap',border:0}}>
        <h1>Veil — Reveal the Soul Within Your Name</h1>
        <p>
          VEIL is a mystical name-origins reading service powered by ancient etymology,
          elemental wisdom, and destiny numerology. Enter your name to receive a free
          soul reading, or unlock the full birth-chart destiny report for $9.90.
          Discover your name origin, elemental nature, core traits, and 2026 guidance.
        </p>
      </div>
      <VeilApp />
    </div>
  )
}
