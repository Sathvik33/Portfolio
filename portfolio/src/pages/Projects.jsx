import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import { projects, badgeStyles } from '../data/projects'
import useScrollAnimation from '../hooks/useScrollAnimation'

const GH_ICON = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

/* ── 3-D Flip Card ── */
function FlipCard({ project, index, visible }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      className="relative"
      style={{ perspective: '1200px', height: '340px' }}
      initial={{ opacity: 0, y: 50 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.4, 0, 0.2, 1] }}
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--panel)]"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Cover image */}
          <div className="w-full h-48 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 h-48" style={{
              background: 'linear-gradient(180deg, transparent 50%, rgba(17,24,54,0.95) 100%)'
            }} />
          </div>
          {/* Title area */}
          <div className="p-5 pt-3 flex flex-col gap-2">
            <span className={`inline-block self-start rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${badgeStyles[project.badgeColor]}`}>
              {project.badge}
            </span>
            <h3 className="font-display text-lg font-bold text-[var(--t1)] leading-snug">{project.title}</h3>
            <p className="font-mono text-[10px] text-[var(--t3)]">{project.subtitle}</p>
          </div>
          {/* Hover hint */}
          <div className="absolute bottom-3 right-4 font-mono text-[9px] text-[var(--t3)] opacity-60 tracking-wider">hover to flip →</div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-2xl border border-[var(--accent1)]/30 p-6 flex flex-col justify-between"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, rgba(6,182,212,0.08), rgba(59,130,246,0.06))',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div>
            <span className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider mb-3 ${badgeStyles[project.badgeColor]}`}>
              {project.badge}
            </span>
            <h3 className="font-display text-lg font-bold text-[var(--t1)] mb-3">{project.title}</h3>
            <p className="font-body text-sm text-[var(--t2)] leading-relaxed">{project.description}</p>
          </div>

          <div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.slice(0, 5).map(t => (
                <span key={t} className="rounded-full bg-white/5 border border-[var(--border)] px-2 py-0.5 font-mono text-[10px] text-[var(--t3)]">
                  {t}
                </span>
              ))}
              {project.tech.length > 5 && (
                <span className="rounded-full bg-white/5 border border-[var(--border)] px-2 py-0.5 font-mono text-[10px] text-[var(--t3)]">
                  +{project.tech.length - 5} more
                </span>
              )}
            </div>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                onClick={e => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--t2)] hover:text-[var(--accent1)] hover:border-[var(--accent1)] transition-all font-mono text-xs"
              >
                {GH_ICON} View on GitHub
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const TOP_COUNT = 4

export default function Projects() {
  const navigate = useNavigate()
  const { ref: headerRef, inView: headerInView } = useScrollAnimation()
  const [showMore, setShowMore] = useState(false)

  const topProjects = projects.slice(0, TOP_COUNT)
  const moreProjects = projects.slice(TOP_COUNT)

  return (
    <PageWrapper>
      <section className="relative min-h-[calc(100vh-72px)] py-24">
        {/* Background glows */}
        <motion.div
          className="pointer-events-none absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)' }}
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute right-[-80px] bottom-[20%] h-[300px] w-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)' }}
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        <div className="mx-auto max-w-6xl px-6">
          {/* Header */}
          <motion.div ref={headerRef}>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs gradient-text tracking-widest uppercase font-bold">03 · Projects</span>
              <motion.div
                className="h-[2px] flex-1 max-w-xs rounded-full"
                style={{ background: 'linear-gradient(90deg, #06b6d4, #3b82f6, transparent)', transformOrigin: 'left' }}
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
              <h2 className="font-display text-4xl font-extrabold leading-tight">
                <span className="gradient-text">Things I've built.</span>
              </h2>
              <motion.a
                href="https://github.com/Sathvik33"
                target="_blank" rel="noreferrer"
                className="font-mono text-xs text-[var(--t3)] hover:text-[var(--accent1)] transition-colors flex items-center gap-1"
                whileHover={{ x: 3 }}
              >
                github.com/Sathvik33 ↗
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Top 4 flip cards */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
            {topProjects.map((p, i) => (
              <FlipCard key={p.id} project={p} index={i} visible={true} />
            ))}
          </div>

          {/* More Projects */}
          <div className="mt-10 flex flex-col items-center gap-8">
            {/* Toggle button */}
            <motion.button
              onClick={() => setShowMore(v => !v)}
              className="group flex items-center gap-3 px-7 py-3 rounded-xl border border-[var(--border)] font-display font-bold text-sm text-[var(--t2)] transition-all hover:border-[var(--accent1)] hover:text-[var(--accent1)] bg-white/5 backdrop-blur-sm"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>{showMore ? 'Hide Projects' : 'More Projects'}</span>
              <motion.span
                animate={{ rotate: showMore ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-lg leading-none"
              >
                ↓
              </motion.span>
            </motion.button>

            {/* Expandable remaining projects */}
            <AnimatePresence>
              {showMore && (
                <motion.div
                  className="w-full grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  {moreProjects.map((p, i) => (
                    <FlipCard key={p.id} project={p} index={i} visible={showMore} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Page nav */}
          <motion.div className="mt-16 flex justify-between">
            <motion.button
              onClick={() => navigate('/stack')}
              className="font-mono text-xs text-[var(--t3)] hover:text-[var(--accent1)] transition-colors flex items-center gap-2"
              whileHover={{ x: -5 }}
            >
              <span className="text-lg">←</span> Stack
            </motion.button>
            <motion.button
              onClick={() => navigate('/Certifications')}
              className="font-mono text-xs text-[var(--t3)] hover:text-[var(--accent1)] transition-colors flex items-center gap-2"
              whileHover={{ x: 5 }}
            >
              Certificates <span className="text-lg">→</span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
