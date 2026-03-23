import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback, useRef } from 'react'
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
          className="inline-block text-[var(--accent1)]"
          initial={{ y: 30, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -30, opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/* Floating particles that drift gently in the hero */
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `rgba(6,182,212,${0.15 + Math.random() * 0.15})`,
          }}
          animate={{
            y: [0, -80 - Math.random() * 60, 0],
            x: [0, (Math.random() - 0.5) * 60, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 2.5 }}
        >
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--t3)]">explore</span>
          <motion.div
            className="w-5 h-8 rounded-full border border-[var(--border)] flex justify-center pt-1.5"
          >
            <motion.div
              className="w-1 h-1.5 rounded-full"
              style={{ background: 'var(--accent1)' }}
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const headlineWords = ['Building', 'intelligent', 'systems', '—', 'from', 'model', 'to', 'deployment.']

export default function Hero() {
  const mouse = useMouseGlow()
  const navigate = useNavigate()
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // Scroll-driven parallax for hero content
  const contentY = useTransform(smoothProgress, [0, 1], [0, 180])
  const contentOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0])
  const photoScale = useTransform(smoothProgress, [0, 0.6], [1, 0.8])
  const photoY = useTransform(smoothProgress, [0, 1], [0, 120])
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.2])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Multi-layer animated background */}
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        {/* Mouse-reactive gradient */}
        <div
          className="absolute inset-0 opacity-40 transition-all duration-700"
          style={{
            background: `radial-gradient(900px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(6,182,212,0.15), rgba(59,130,246,0.08), transparent 60%)`,
          }}
        />

        {/* Animated gradient mesh */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(600px at 20% 30%, rgba(6,182,212,0.12) 0%, transparent 70%)',
              'radial-gradient(600px at 80% 70%, rgba(139,92,246,0.12) 0%, transparent 70%)',
              'radial-gradient(600px at 50% 20%, rgba(59,130,246,0.1) 0%, transparent 70%)',
              'radial-gradient(600px at 20% 30%, rgba(6,182,212,0.12) 0%, transparent 70%)',
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating orbs with parallax depth */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.08] blur-[120px]"
          style={{ background: 'var(--accent1)', top: '5%', left: '-15%' }}
          animate={{ y: [0, -60, 0], x: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.06] blur-[80px]"
          style={{ background: 'var(--accent3)', bottom: '10%', right: '-8%' }}
          animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full opacity-[0.04] blur-[60px]"
          style={{ background: 'var(--accent2)', top: '60%', left: '50%' }}
          animate={{ y: [0, -25, 0], x: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
        />

        <FloatingParticles />
        <div className="absolute inset-0 bg-grid" />
      </motion.div>

      {/* Content with scroll-driven parallax */}
      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-6 w-full"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">

          {/* Left — Text */}
          <div className="flex-1">
            {/* Badge */}
            <motion.div
              className="mb-6 inline-block"
              initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--panel)]">
                <span className="font-mono text-[11px] text-[var(--accent1)] uppercase tracking-widest font-semibold">
                  ● Open to Opportunities
                </span>
              </div>
            </motion.div>

            {/* Staggered Headline — each word animates with blur resolve */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-tight mb-5">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  className={`inline-block mr-[0.28em] ${
                    word === '—' ? 'text-[var(--accent1)]' : 'text-[var(--t1)]'
                  }`}
                  initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.3 + i * 0.09, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Rotating role */}
            <motion.div
              className="font-body text-xl text-[var(--t2)] mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <RotatingRole />
            </motion.div>

            {/* Description — letter-perfect reveal */}
            <motion.p
              className="font-body text-lg text-[var(--t2)] leading-relaxed max-w-lg mb-9"
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 1.3, duration: 0.7 }}
            >
              Hi, I'm <strong className="text-[var(--t1)] font-semibold">Maru Sathvik Reddy</strong> — a CS undergraduate building production-grade AI systems, from transformers to agentic pipelines.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <MagneticButton
                onClick={() => scrollTo('about')}
                className="group relative px-8 py-3.5 font-display font-bold text-sm text-white rounded-xl shadow-lg overflow-hidden"
                style={{ background: 'var(--gradient)' }}
              >
                <span className="relative z-10">About Me</span>
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 100%)' }}
                />
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

          {/* Right — Profile photo with scroll parallax */}
          <motion.div
            className="relative w-48 h-48 md:w-64 md:h-64 shrink-0 mt-12 lg:mt-0 mx-auto lg:mx-0"
            initial={{ opacity: 0, scale: 0.7, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.6, duration: 1, ease: [0.4, 0, 0.2, 1] }}
            style={{ scale: photoScale, y: photoY }}
          >
            <div className="relative w-full h-full overflow-hidden rounded-full">
              <img
                src="/profile.jpg"
                alt="Maru Sathvik Reddy"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 12%', transform: 'scale(1.15)' }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <ScrollHint />
    </section>
  )
}