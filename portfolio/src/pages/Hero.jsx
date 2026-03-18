import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import PageWrapper from '../components/PageWrapper'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } } }
const fadeRight = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } } }

/* ── Animated particle canvas ── */
function ParticleField() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    const particles = []
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.4,
        dx: (Math.random() - 0.5) * 0.35,
        dy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.5 + 0.15,
        color: Math.random() > 0.5 ? '6,182,212' : Math.random() > 0.5 ? '59,130,246' : '139,92,246',
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(6,182,212,${0.07 * (1 - dist / 110)})`
            ctx.lineWidth = 0.6
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      // Draw dots
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

/* ── Scroll indicator ── */
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 2 }}
        >
          <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--t3)]">scroll</span>
          <motion.div
            className="w-[1px] h-6 rounded-full"
            style={{ background: 'linear-gradient(180deg, var(--accent1), transparent)' }}
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Hero() {
  const navigate = useNavigate()
  return (
    <PageWrapper>
      <section className="relative min-h-[calc(100vh-72px)] flex items-center justify-center overflow-hidden py-12 lg:py-0">
        {/* Rich layered background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 grid-bg opacity-30" />
          {/* Radial spotlight at center */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(6,182,212,0.08) 0%, rgba(59,130,246,0.05) 40%, transparent 70%)'
          }} />
          {/* Side glows */}
          <motion.div
            className="absolute -left-32 top-1/4 w-96 h-96 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(124,92,252,0.12), transparent 70%)', filter: 'blur(40px)' }}
            animate={{ y: [0, -30, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -right-32 bottom-1/4 w-80 h-80 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.1), transparent 70%)', filter: 'blur(40px)' }}
            animate={{ y: [0, 30, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </div>
        <ParticleField />

        <div className="relative z-10 mx-auto max-w-4xl px-6 w-full">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col">

            {/* Badge */}
            <motion.div variants={fadeRight} className="mb-8 inline-block self-start">
              <motion.div
                className="px-5 py-2 rounded-full shadow-sm"
                style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(59,130,246,0.1))', border: '1px solid rgba(6,182,212,0.25)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 4px 20px rgba(6,182,212,0.2)' }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <span className="font-mono text-xs text-[var(--accent1)] uppercase tracking-wider font-bold">
                  ● ML / AI Engineer
                </span>
              </motion.div>
            </motion.div>

            {/* Name and Image */}
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 mb-10">
              <div className="flex-1">
                <h1 className="font-display text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl">
                  <motion.span
                    className="inline-block"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <span className="gradient-text">Maru Sathvik</span>
                  </motion.span>
                  <br />
                  <motion.span
                    className="inline-block text-[var(--t1)]"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                  >
                    Reddy
                  </motion.span>
                </h1>

                {/* Punchy tagline */}
                <motion.p
                  className="mt-5 font-body text-xl text-[var(--t2)] leading-relaxed max-w-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.7 }}
                >
                  Building intelligent systems —{' '}
                  <span className="gradient-text font-semibold">from scratch.</span>
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  className="mt-8 flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <motion.button
                    onClick={() => navigate('/about')}
                    className="px-8 py-3.5 font-display font-bold text-sm text-white rounded-xl shadow-lg cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, var(--accent1), var(--accent2))' }}
                    whileHover={{ scale: 1.05, boxShadow: '0 12px 30px rgba(6,182,212,0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    About Me →
                  </motion.button>

                  <motion.a
                    href="/Sathvik_CV.pdf" download="Sathvik_CV.pdf" target="_blank" rel="noreferrer"
                    className="px-8 py-3.5 font-display font-bold text-sm text-[var(--t2)] rounded-xl border border-[var(--border)] hover:border-[var(--accent1)] hover:text-[var(--accent1)] transition-all bg-white/5 backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Download Resume
                  </motion.a>
                </motion.div>
              </div>

              {/* Profile photo */}
              <motion.div
                className="relative w-48 h-48 md:w-64 md:h-64 shrink-0"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="absolute -inset-1 rounded-2xl opacity-50" style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)', filter: 'blur(18px)' }} />
                <div className="relative glass-card p-2.5 rounded-2xl h-full">
                  <div className="w-full h-full overflow-hidden rounded-xl bg-[var(--panel)]">
                    <img
                      src="/profile.jpg"
                      alt="Maru Sathvik Reddy"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                      style={{ objectPosition: 'center 12%', transform: 'scale(1.2)' }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Stat pills */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              {[
                { label: 'Projects Built', value: '7+' },
                { label: 'Kaggle Rank', value: 'Top 15%' },
                { label: 'Models from Scratch', value: 'GPT · RAG · VAE' },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  className="px-4 py-2 rounded-xl border border-[var(--border)] bg-white/5 backdrop-blur-sm"
                  whileHover={{ borderColor: 'rgba(6,182,212,0.4)', scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <span className="font-display font-bold text-sm text-[var(--accent1)]">{s.value}</span>
                  <span className="ml-2 font-mono text-xs text-[var(--t3)]">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>
        </div>

        <ScrollHint />
      </section>
    </PageWrapper>
  )
}