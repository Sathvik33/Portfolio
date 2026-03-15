import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PageWrapper from '../components/PageWrapper'

const ROLES = ['ML Engineer', 'AI Systems Builder', 'Deep Learning Dev', 'Agentic AI Architect']

function TypingText() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = ROLES[roleIdx]
    let t
    if (!deleting && displayed.length < current.length)
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60)
    else if (!deleting && displayed.length === current.length)
      t = setTimeout(() => setDeleting(true), 1800)
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
    else { setDeleting(false); setRoleIdx((roleIdx + 1) % ROLES.length) }
    return () => clearTimeout(t)
  }, [displayed, deleting, roleIdx])

  return <span className="font-mono text-[#00d4ff]">{displayed}<span className="cursor-blink">_</span></span>
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } } }

export default function Hero() {
  const navigate = useNavigate()
  return (
    <PageWrapper>
      <section className="relative min-h-[calc(100vh-72px)] flex items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-[#00d4ff]/6 blur-[120px]" />
          <div className="absolute top-1/2 -right-60 h-[400px] w-[400px] rounded-full bg-[#ff8c42]/4 blur-[100px]" />
        </div>
        <div className="pointer-events-none absolute inset-0 grid-bg" />
        {['top-8 left-8 border-l border-t','top-8 right-8 border-r border-t','bottom-8 left-8 border-l border-b','bottom-8 right-8 border-r border-b'].map(cls => (
          <div key={cls} className={`pointer-events-none absolute ${cls} border-[var(--border)] h-12 w-12 hidden lg:block`} />
        ))}

        <div className="relative z-10 mx-auto max-w-5xl px-6 py-24">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            {/* Badge */}
            <motion.div variants={item} className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/5 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#00d4ff] opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00d4ff]" />
              </span>
              <span className="font-mono text-xs text-[var(--t2)]">Open to opportunities · Campus Placements 2026</span>
            </motion.div>

            {/* Heading */}
            <motion.h1 variants={item} className="font-display text-5xl font-extrabold leading-none tracking-tight text-[var(--t1)] sm:text-6xl md:text-7xl lg:text-8xl">
              Maru Sathvik<br />
              <span className="relative">
                Reddy
                <motion.span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00d4ff] via-[#00d4ff]/60 to-transparent"
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.8, ease: [0.4, 0, 0.2, 1] }} style={{ transformOrigin: 'left' }} />
              </span>
            </motion.h1>

            {/* Roles */}
            <motion.div variants={item} className="mt-6 flex flex-wrap items-center gap-3">
              <span className="font-body text-lg text-[var(--t3)]">ML / AI Engineer ·</span>
              <span className="font-body text-lg text-[var(--t3)]">CS Undergrad ·</span>
              <TypingText />
            </motion.div>

            {/* Description */}
            <motion.p variants={item} className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-[var(--t2)]">
              I don't just <span className="text-[var(--t1)]">use AI models</span> — I build them from scratch,
              architect <span className="text-[var(--t1)]">multi-agent pipelines</span>, and ship{' '}
              <span className="text-[var(--t1)]">production-grade ML systems</span>. Every project is a working system, not a tutorial clone.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
              <button onClick={() => navigate('/projects')}
                className="group relative overflow-hidden rounded bg-[#00d4ff] px-8 py-3.5 font-display font-bold text-sm text-[#07080d] transition-all duration-300 hover:shadow-glow-cyan">
                <span className="relative z-10">View Projects</span>
                <span className="absolute inset-0 -translate-x-full bg-white/20 group-hover:translate-x-0 transition-transform duration-300 skew-x-12" />
              </button>
              <button onClick={() => navigate('/contact')}
                className="rounded border border-[var(--border)] bg-transparent px-8 py-3.5 font-display font-bold text-sm text-[var(--t2)] transition-all duration-300 hover:border-[#00d4ff]/40 hover:text-[var(--t1)]">
                Contact Me
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={item} className="mt-16 flex flex-wrap gap-10 border-t border-[var(--border)] pt-10">
              {[{value:'7+',label:'ML Projects'},{value:'Top 15%',label:'Kaggle Rank'},{value:'3',label:'Prod. AI Systems'},{value:'LLM',label:'Built from Scratch'}].map(s => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-extrabold text-[var(--t1)]">{s.value}</div>
                  <div className="font-mono text-xs text-[var(--t3)] mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.button onClick={() => navigate('/about')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hover:opacity-70 transition-opacity"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
          <span className="font-mono text-xs text-[var(--t3)] tracking-widest">EXPLORE</span>
          <motion.div className="h-10 w-[1px] bg-gradient-to-b from-[#00d4ff] to-transparent"
            animate={{ scaleY: [1, 0.3, 1], opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }} />
        </motion.button>
      </section>
    </PageWrapper>
  )
}
