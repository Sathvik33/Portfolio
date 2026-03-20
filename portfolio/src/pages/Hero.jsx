import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import MagneticButton from '../components/MagneticButton'

const roles = ['ML Engineer', 'AI Builder', 'Full Stack Developer', 'Systems Thinker']

function useMouseGlow() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 })
  const handleMouse = useCallback((e) => {
    setPos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
  }, [])
  useEffect(() => {
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [handleMouse])
  return pos
}

function RotatingRole() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % roles.length), 2800)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className="inline-block relative h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          className="inline-block gradient-text"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function ScrollHint() {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const handler = () => setVisible(window.scrollY < 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 2.5 }}
        >
          <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--t3)]">scroll</span>
          <motion.div
            className="w-[1px] h-7 rounded-full"
            style={{ background: 'linear-gradient(180deg, var(--accent1), transparent)' }}
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const headlineWords = ['Building', 'intelligent', 'systems', '—', 'from', 'model', 'to', 'deployment.']

export default function Hero() {
  const mouse = useMouseGlow()
  const navigate = useNavigate()

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Mouse-reactive gradient background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30 transition-all duration-1000"
        style={{
          background: `radial-gradient(800px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(6,182,212,0.12), rgba(59,130,246,0.06), transparent 60%)`,
        }}
      />

      {/* Floating ambient orbs */}
      <motion.div
        className="pointer-events-none absolute w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[100px]"
        style={{ background: 'var(--accent1)', top: '10%', left: '-10%' }}
        animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[80px]"
        style={{ background: 'var(--accent3)', bottom: '5%', right: '-5%' }}
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* Grid texture */}
      <div className="absolute inset-0 bg-grid" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">

          {/* Left — Text */}
          <div className="flex-1">
            {/* Badge */}
            <motion.div
              className="mb-6 inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div
                className="px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--panel)]"
              >
                <span className="font-mono text-[11px] text-[var(--accent1)] uppercase tracking-widest font-semibold">
                  ● Open to Opportunities
                </span>
              </div>
            </motion.div>

            {/* Staggered Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight mb-4">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.3em] text-[var(--t1)]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Rotating role */}
            <motion.p
              className="font-body text-xl text-[var(--t2)] mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <RotatingRole />
            </motion.p>

            {/* Description */}
            <motion.p
              className="font-body text-lg text-[var(--t2)] leading-relaxed max-w-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              Hi, I'm <strong className="text-[var(--t1)] font-semibold">Maru Sathvik Reddy</strong> — a CS undergraduate building production-grade AI systems, from transformers to agentic pipelines.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <MagneticButton
                onClick={() => scrollTo('projects')}
                className="px-8 py-3.5 font-display font-bold text-sm text-white rounded-xl shadow-lg"
                style={{ background: 'var(--gradient)' }}
              >
                View Projects
              </MagneticButton>

              <MagneticButton
                onClick={() => scrollTo('contact')}
                className="px-8 py-3.5 font-display font-bold text-sm text-[var(--t1)] bg-[var(--panel)] rounded-xl border border-[var(--border)] hover:border-[var(--accent1)] transition-colors"
              >
                Contact Me
              </MagneticButton>

              <MagneticButton
                onClick={() => navigate('/resume')}
                className="px-8 py-3.5 font-display font-bold text-sm text-[var(--t2)] rounded-xl border border-[var(--border)] hover:border-[var(--accent1)] hover:text-[var(--accent1)] transition-colors"
              >
                Resume ↗
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right — Profile photo */}
          <motion.div
            className="relative w-48 h-48 md:w-64 md:h-64 shrink-0 mt-12 lg:mt-0 mx-auto lg:mx-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Glow ring */}
            <motion.div
              className="absolute -inset-4 rounded-full opacity-30 blur-3xl"
              style={{ background: 'var(--gradient)' }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="relative p-[3px] rounded-full h-full" style={{ background: 'var(--gradient)' }}>
              <div className="w-full h-full overflow-hidden rounded-full bg-[var(--bg)]">
                <img
                  src="/profile.jpg"
                  alt="Maru Sathvik Reddy"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 12%', transform: 'scale(1.15)' }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <ScrollHint />
    </section>
  )
}