import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { useState, useRef, useCallback } from 'react'
import { projects } from '../data/projects'
import useScrollAnimation from '../hooks/useScrollAnimation'

const GH_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const badgeColorMap = {
  cyan: { bg: 'rgba(6,182,212,0.1)', text: '#06b6d4', border: 'rgba(6,182,212,0.3)' },
  amber: { bg: 'rgba(245,158,11,0.1)', text: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
  green: { bg: 'rgba(34,197,94,0.1)', text: '#22c55e', border: 'rgba(34,197,94,0.3)' },
  purple: { bg: 'rgba(139,92,246,0.1)', text: '#8b5cf6', border: 'rgba(139,92,246,0.3)' },
  gold: { bg: 'rgba(234,179,8,0.1)', text: '#eab308', border: 'rgba(234,179,8,0.3)' },
  blue: { bg: 'rgba(59,130,246,0.1)', text: '#3b82f6', border: 'rgba(59,130,246,0.3)' },
  red: { bg: 'rgba(239,68,68,0.1)', text: '#ef4444', border: 'rgba(239,68,68,0.3)' },
}

function Badge({ label, color = 'cyan' }) {
  const c = badgeColorMap[color] || badgeColorMap.cyan
  return (
    <span
      className="inline-block rounded-full px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest border"
      style={{ background: c.bg, color: c.text, borderColor: c.border }}
    >
      {label}
    </span>
  )
}

/* ── 3D Tilt Card wrapper ─────────────────────────────────────────────── */
function TiltCard({ children, className = '' }) {
  const cardRef = useRef(null)

  const onMouseMove = useCallback((e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale3d(1.01,1.01,1.01)`
  }, [])

  const onMouseLeave = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale3d(1,1,1)'
  }, [])

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)', transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}

/* ── Featured project card — cinematic scroll reveal ─────────────────── */
function FeaturedCard({ project, index }) {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const y = useTransform(smoothProgress, [0, 1], [120, 0])
  const opacity = useTransform(smoothProgress, [0, 0.4], [0, 1])
  const scale = useTransform(smoothProgress, [0, 1], [0.9, 1])
  const imgScale = useTransform(smoothProgress, [0, 1], [1.2, 1])

  return (
    <motion.div ref={cardRef} style={{ y, opacity, scale }}>
      <TiltCard className="group relative glass-card rounded-2xl overflow-hidden">
        {/* Top gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'var(--gradient-h)' }} />

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image side with scroll-zoom */}
          <div className="relative h-56 md:h-full overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              style={{ scale: imgScale }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--panel)] opacity-60 hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--panel)] to-transparent opacity-60 md:hidden" />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-[var(--accent1)]/0 group-hover:bg-[var(--accent1)]/5 transition-colors duration-500" />
          </div>

          {/* Content side */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge label={project.badge} color={project.badgeColor} />
                <span className="font-mono text-[11px] text-[var(--t3)]">{project.subtitle}</span>
              </div>

              <h3 className="font-display text-xl md:text-2xl font-bold text-[var(--t1)] mb-3 group-hover:text-[var(--accent1)] transition-colors duration-300">
                {project.title}
              </h3>

              <p className="font-body text-sm text-[var(--t2)] leading-relaxed mb-4">
                {project.description}
              </p>

              {project.impact && (
                <div className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="font-mono text-[10px] text-[var(--t3)]">{project.impact}</span>
                </div>
              )}
            </div>

            <div>
              {/* Tech tags with staggered reveal on hover */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tech.map((t, i) => (
                  <motion.span
                    key={t}
                    className="rounded-lg px-2.5 py-1 font-mono text-[10px] font-medium border
                      group-hover:border-[var(--accent1)]/30 transition-colors duration-300"
                    style={{ background: 'var(--surface)', color: 'var(--t2)', borderColor: 'var(--border)' }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3">
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-display font-bold text-xs text-[var(--t1)] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent1)] hover:text-[var(--accent1)] transition-all duration-200"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {GH_ICON} View on GitHub
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

/* ── Regular project card with tilt ───────────────────────────────────── */
function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <TiltCard className="group glass-card rounded-2xl overflow-hidden flex flex-col h-full">
        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--panel)] to-transparent opacity-50" />
          <div className="absolute inset-0 bg-[var(--accent1)]/0 group-hover:bg-[var(--accent1)]/5 transition-colors duration-500" />
          <div className="absolute top-3 left-3">
            <Badge label={project.badge} color={project.badgeColor} />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-display text-base font-bold text-[var(--t1)] mb-1 group-hover:text-[var(--accent1)] transition-colors">
            {project.title}
          </h3>
          <p className="font-mono text-[11px] text-[var(--t3)] mb-3">{project.subtitle}</p>
          <p className="font-body text-sm text-[var(--t2)] leading-relaxed mb-4 flex-1">
            {project.description}
          </p>

          {/* Tech */}
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tech.slice(0, 5).map(t => (
              <span
                key={t}
                className="rounded-lg px-2 py-0.5 font-mono text-[9px] font-medium border"
                style={{ background: 'var(--surface)', color: 'var(--t3)', borderColor: 'var(--border)' }}
              >
                {t}
              </span>
            ))}
            {project.tech.length > 5 && (
              <span className="rounded-lg px-2 py-0.5 font-mono text-[9px] font-medium border" style={{ color: 'var(--t3)', borderColor: 'var(--border)' }}>
                +{project.tech.length - 5}
              </span>
            )}
          </div>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[var(--t3)] hover:text-[var(--accent1)] transition-colors"
            >
              {GH_ICON} GitHub ↗
            </a>
          )}
        </div>
      </TiltCard>
    </motion.div>
  )
}

const FEATURED_COUNT = 2

export default function Projects() {
  const [showMore, setShowMore] = useState(false)
  const { ref: headerRef, inView: headerInView } = useScrollAnimation()
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const decoY = useTransform(smoothProgress, [0, 1], [120, -120])
  const decoY2 = useTransform(smoothProgress, [0, 1], [-60, 60])

  const sortedProjects = [...projects].sort((a, b) => a.priority - b.priority)
  const featured = sortedProjects.slice(0, FEATURED_COUNT)
  const rest = sortedProjects.slice(FEATURED_COUNT)

  return (
    <section id="projects" className="section-padding relative overflow-hidden" ref={containerRef}>
      {/* Ambient parallax blobs */}
      <motion.div
        className="pointer-events-none absolute -left-20 top-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.04]"
        style={{ background: 'var(--accent2)', y: decoY }}
      />
      <motion.div
        className="pointer-events-none absolute -right-20 bottom-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.03]"
        style={{ background: 'var(--accent3)', y: decoY2 }}
      />

      <div className="relative z-10 mx-auto max-w-6xl" ref={headerRef}>

        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-4"
          initial={{ opacity: 0, x: -40 }}
          animate={headerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-xs text-[var(--accent1)] tracking-widest uppercase font-bold">
            03 · Projects
          </span>
          <motion.div
            className="h-[2px] flex-1 max-w-xs rounded-full"
            style={{ background: 'var(--gradient-h)', transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold leading-tight">
              <span className="text-[var(--t1)]">Selected </span>
              <span className="text-[var(--accent1)]">Work</span>
            </h2>
            <p className="font-body text-base mt-2 text-[var(--t3)]">
              What I've built — from scratch, shipped, and iterated on.
            </p>
          </div>
          <motion.a
            href="https://github.com/Sathvik33"
            target="_blank" rel="noreferrer"
            className="font-mono text-sm font-semibold text-[var(--t3)] hover:text-[var(--accent1)] transition-colors flex items-center gap-1.5"
            whileHover={{ x: 3 }}
          >
            {GH_ICON} github.com/Sathvik33 ↗
          </motion.a>
        </motion.div>

        {/* Featured projects — cinematic scroll reveals */}
        <div className="space-y-8 mb-12">
          {featured.map((p, i) => (
            <FeaturedCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* More projects toggle */}
        <div className="flex flex-col items-center gap-8">
          <motion.button
            onClick={() => setShowMore(v => !v)}
            className="group flex items-center gap-3 px-8 py-3.5 rounded-xl border font-display font-bold text-sm transition-all border-[var(--border)] bg-[var(--panel)] text-[var(--t2)] hover:border-[var(--accent1)] hover:text-[var(--accent1)]"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>{showMore ? 'Show less' : 'Explore more projects'}</span>
            <motion.span
              animate={{ rotate: showMore ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-lg leading-none"
            >
              ↓
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {showMore && (
              <motion.div
                className="w-full grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                {rest.map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}