import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const ROLES = ['ML Engineer', 'AI Systems Builder', 'Deep Learning Dev', 'Agentic AI Architect']

function TypingText() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = ROLES[roleIdx]
    let timeout

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIdx((roleIdx + 1) % ROLES.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIdx])

  return (
    <span className="font-mono text-[#00d4ff]">
      {displayed}
      <span className="cursor-blink">_</span>
    </span>
  )
}

const floatVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12 + 0.3, duration: 0.7, ease: [0.4, 0, 0.2, 1] },
  }),
}

export default function Hero() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Decorative orb */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-[#00d4ff]/6 blur-[120px]" />
        <div className="absolute top-1/2 -right-60 h-[400px] w-[400px] rounded-full bg-[#ff8c42]/4 blur-[100px]" />
      </div>

      {/* Grid lines */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-100" />

      {/* Corner decorations */}
      <div className="pointer-events-none absolute top-24 left-8 hidden lg:block">
        <div className="h-12 w-12 border-l border-t border-[#00d4ff]/20" />
      </div>
      <div className="pointer-events-none absolute top-24 right-8 hidden lg:block">
        <div className="h-12 w-12 border-r border-t border-[#00d4ff]/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-16">
        {/* Status badge */}
        <motion.div
          custom={0}
          variants={floatVariants}
          initial="hidden"
          animate="visible"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/5 px-4 py-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#00d4ff] opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00d4ff]" />
          </span>
          <span className="font-mono text-xs text-[#8b8fa8]">
            Open to opportunities
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          custom={1}
          variants={floatVariants}
          initial="hidden"
          animate="visible"
          className="font-display text-5xl font-extrabold leading-none tracking-tight text-[#e8eaf2] sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Maru Sathvik
          <br />
          <span className="relative">
            Reddy
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00d4ff] via-[#00d4ff]/60 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformOrigin: 'left' }}
            />
          </span>
        </motion.h1>

        {/* Role + typing */}
        <motion.div
          custom={2}
          variants={floatVariants}
          initial="hidden"
          animate="visible"
          className="mt-6 flex flex-wrap items-center gap-3"
        >
          <span className="font-body text-lg text-[#4a4d60]">ML / AI Engineer ·</span>
          <span className="font-body text-lg text-[#4a4d60]">CS Undergrad ·</span>
          <TypingText />
        </motion.div>

        {/* Description */}
        <motion.p
          custom={3}
          variants={floatVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-[#8b8fa8]"
        >
          I don't just{' '}
          <span className="text-[#e8eaf2]">use AI models</span> — I build them from scratch,
          architect <span className="text-[#e8eaf2]">multi-agent pipelines</span>, and ship{' '}
          <span className="text-[#e8eaf2]">production-grade ML systems</span>. Every project is a
          working system, not a tutorial clone.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={4}
          variants={floatVariants}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-wrap gap-4"
        >
          <button
            onClick={() => scrollTo('#projects')}
            className="group relative overflow-hidden rounded bg-[#00d4ff] px-8 py-3.5 font-display font-bold text-sm text-obsidian transition-all duration-300 hover:shadow-glow-cyan"
          >
            <span className="relative z-10">View Projects</span>
            <span className="absolute inset-0 -translate-x-full bg-white/20 group-hover:translate-x-0 transition-transform duration-300 skew-x-12" />
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="rounded border border-[#1e2130] bg-transparent px-8 py-3.5 font-display font-bold text-sm text-[#8b8fa8] transition-all duration-300 hover:border-[#00d4ff]/40 hover:text-[#e8eaf2]"
          >
            Contact Me
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          custom={5}
          variants={floatVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 flex flex-wrap gap-10 border-t border-[#1e2130] pt-10"
        >
          {[
            { value: '7+', label: 'ML Projects' },
            { value: 'Top 15%', label: 'Kaggle Rank' },
            { value: '3', label: 'Prod. AI Systems' },
            { value: 'LLM', label: 'Built from Scratch' },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-2xl font-extrabold text-[#e8eaf2]">{s.value}</div>
              <div className="font-mono text-xs text-[#4a4d60] mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="font-mono text-xs text-[#4a4d60] tracking-widest">SCROLL</span>
        <motion.div
          className="h-10 w-[1px] bg-gradient-to-b from-[#00d4ff] to-transparent"
          animate={{ scaleY: [1, 0.3, 1], opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  )
}
