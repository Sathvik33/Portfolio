import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { projects } from '../data/projects'
import useScrollAnimation from '../hooks/useScrollAnimation'

const GH_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

/* ── Badge color map for dark theme ── */
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

/* ── Featured project card — large ─────────────────────────────────────── */
function FeaturedCard({ project, index }) {
  const { ref, inView } = useScrollAnimation()

  return (
    <motion.div
      ref={ref}
      className="group relative glass-card rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -6 }}
      style={{ transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)' }}
    >
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'var(--gradient-h)' }} />

      <div className="grid md:grid-cols-2 gap-0">
        {/* Image side */}
        <div className="relative h-56 md:h-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--panel)] opacity-60 hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--panel)] to-transparent opacity-60 md:hidden" />
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

            <p className="font-body text-sm text-[var(--t2)] leading-relaxed mb-5">
              {project.description}
            </p>
          </div>

          <div>
            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.tech.map(t => (
                <span
                  key={t}
                  className="rounded-lg px-2.5 py-1 font-mono text-[10px] font-medium border"
                  style={{ background: 'var(--surface)', color: 'var(--t2)', borderColor: 'var(--border)' }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-display font-bold text-xs text-[var(--t1)] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent1)] hover:text-[var(--accent1)] transition-all duration-200"
                >
                  {GH_ICON} View on GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Regular project card ─────────────────────────────────────────────── */
function ProjectCard({ project, index }) {
  return (
    <motion.div
      className="group glass-card rounded-2xl overflow-hidden flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--panel)] to-transparent opacity-50" />
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

        {/* Tech tags */}
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

        {/* GitHub link */}
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
    </motion.div>
  )
}

const FEATURED_COUNT = 2

export default function Projects() {
  const [showMore, setShowMore] = useState(false)
  const { ref: headerRef, inView: headerInView } = useScrollAnimation()

  const sortedProjects = [...projects].sort((a, b) => a.priority - b.priority)
  const featured = sortedProjects.slice(0, FEATURED_COUNT)
  const rest = sortedProjects.slice(FEATURED_COUNT)

  return (
    <section id="projects" className="section-padding relative">
      {/* Ambient blobs */}
      <motion.div
        className="pointer-events-none absolute -left-20 top-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.04]"
        style={{ background: 'var(--accent2)' }}
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 mx-auto max-w-6xl" ref={headerRef}>

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-xs text-[var(--accent1)] tracking-widest uppercase font-bold">
            03 · Projects
          </span>
          <motion.div
            className="h-[2px] flex-1 max-w-xs rounded-full"
            style={{ background: 'var(--gradient-h)', transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8 }}
          />
        </div>

        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold leading-tight">
              <span className="text-[var(--t1)]">Selected </span>
              <span className="gradient-text">Work</span>
            </h2>
            <p className="font-body text-base mt-2 text-[var(--t3)]">
              What I've built — from scratch, shipped, and iterated on.
            </p>
          </div>
          <a
            href="https://github.com/Sathvik33"
            target="_blank" rel="noreferrer"
            className="font-mono text-sm font-semibold text-[var(--t3)] hover:text-[var(--accent1)] transition-colors flex items-center gap-1.5"
          >
            {GH_ICON} github.com/Sathvik33 ↗
          </a>
        </motion.div>

        {/* Featured projects */}
        <div className="space-y-6 mb-10">
          {featured.map((p, i) => (
            <FeaturedCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* More projects toggle */}
        <div className="flex flex-col items-center gap-8">
          <motion.button
            onClick={() => setShowMore(v => !v)}
            className="group flex items-center gap-3 px-8 py-3.5 rounded-xl border font-display font-bold text-sm transition-all border-[var(--border)] bg-[var(--panel)] text-[var(--t2)] hover:border-[var(--accent1)] hover:text-[var(--accent1)]"
            whileHover={{ scale: 1.03 }}
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