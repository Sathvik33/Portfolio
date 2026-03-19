import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import { projects } from '../data/projects'
import useScrollAnimation from '../hooks/useScrollAnimation'

const GH_ICON = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

/* Badge uses CSS vars - works in both light & dark mode */
function Badge({ label }) {
  return (
    <span
      className="inline-block self-start rounded-full px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest border"
      style={{
        background: 'var(--accent-soft)',
        color: 'var(--accent1)',
        borderColor: 'var(--accent1)',
        opacity: 0.9,
      }}
    >
      {label}
    </span>
  )
}

/* ── 3-D Flip Card ── */
function FlipCard({ project, index, visible }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      className="relative cursor-pointer"
      style={{ perspective: '1200px', height: '360px' }}
      initial={{ opacity: 0, y: 50 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.4, 0, 0.2, 1] }}
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border border-[var(--border)] shadow-[var(--shadow-card)]"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: 'var(--panel)',
          }}
        >
          {/* Cover image */}
          <div className="w-full h-[190px] overflow-hidden relative">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700"
            />
            {/* Gradient fade */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, var(--panel) 100%)' }}
            />
          </div>

          {/* Content */}
          <div className="px-5 pt-1 pb-5 flex flex-col gap-2" style={{ background: 'var(--panel)' }}>
            <Badge label={project.badge} />
            <h3 className="font-display text-base font-bold leading-snug" style={{ color: 'var(--t1)' }}>
              {project.title}
            </h3>
            <p className="font-mono text-[11px] font-medium" style={{ color: 'var(--t3)' }}>
              {project.subtitle}
            </p>
          </div>

          {/* Flip hint */}
          <div
            className="absolute bottom-4 right-5 font-mono text-[9px] uppercase font-bold tracking-widest hidden md:block"
            style={{ color: 'var(--accent1)' }}
          >
            hover to flip →
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-2xl border border-[var(--border)] p-6 flex flex-col justify-between"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'var(--surface)',
          }}
        >
          {/* Top gradient accent line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: 'var(--gradient-h)' }} />

          <div>
            <Badge label={project.badge} />
            <h3
              className="font-display text-xl font-bold mt-3 mb-2 leading-snug"
              style={{ color: 'var(--t1)' }}
            >
              {project.title}
            </h3>
            <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--t2)' }}>
              {project.description}
            </p>
          </div>

          <div>
            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.tech.slice(0, 5).map(t => (
                <span
                  key={t}
                  className="rounded-lg px-2 py-1 font-mono text-[10px] border"
                  style={{
                    background: 'var(--panel)',
                    color: 'var(--t2)',
                    borderColor: 'var(--border)',
                  }}
                >
                  {t}
                </span>
              ))}
              {project.tech.length > 5 && (
                <span
                  className="rounded-lg px-2 py-1 font-mono text-[10px] border"
                  style={{ background: 'var(--panel)', color: 'var(--t3)', borderColor: 'var(--border)' }}
                >
                  +{project.tech.length - 5}
                </span>
              )}
            </div>

            {/* GitHub button */}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                onClick={e => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-display font-bold text-sm transition-all duration-200"
                style={{
                  background: 'var(--gradient)',
                  color: '#fff',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
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

        {/* Ambient blobs */}
        <motion.div
          className="pointer-events-none absolute -left-20 top-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-30"
          style={{ background: 'var(--accent2)' }}
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute right-[-40px] bottom-[10%] w-[400px] h-[400px] rounded-full blur-[120px] opacity-20"
          style={{ background: 'var(--accent3)' }}
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6">

          {/* ── Header ── */}
          <motion.div ref={headerRef} className="mb-14">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs gradient-text tracking-widest uppercase font-bold">
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
              className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div>
                <h2
                  className="font-display text-4xl md:text-5xl font-extrabold leading-tight"
                  style={{ color: 'var(--t1)' }}
                >
                  Selected <span className="gradient-text">Work</span>
                </h2>
                <p className="font-body text-base mt-2" style={{ color: 'var(--t3)' }}>
                  Hover or tap a card to see details
                </p>
              </div>
              <motion.a
                href="https://github.com/Sathvik33"
                target="_blank" rel="noreferrer"
                className="font-mono font-bold text-sm flex items-center gap-1.5 transition-all"
                style={{ color: 'var(--accent1)' }}
                whileHover={{ x: 3 }}
              >
                github.com/Sathvik33 ↗
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ── Top 4 flip cards ── */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            {topProjects.map((p, i) => (
              <FlipCard key={p.id} project={p} index={i} visible={true} />
            ))}
          </div>

          {/* ── More projects ── */}
          <div className="mt-12 flex flex-col items-center gap-8">
            <motion.button
              onClick={() => setShowMore(v => !v)}
              className="group flex items-center gap-3 px-8 py-3.5 rounded-xl border font-display font-bold text-sm transition-all"
              style={{
                borderColor: 'var(--border)',
                background: 'var(--panel)',
                color: 'var(--t2)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent1)'
                e.currentTarget.style.color = 'var(--accent1)'
                e.currentTarget.style.boxShadow = 'var(--shadow-hover)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--t2)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>{showMore ? 'Collapse view' : 'Explore more projects'}</span>
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

          {/* ── Page nav ── */}
          <div
            className="mt-20 flex justify-between border-t pt-8"
            style={{ borderColor: 'var(--border)' }}
          >
            <motion.button
              onClick={() => navigate('/stack')}
              className="font-mono text-sm font-bold transition-colors flex items-center gap-2"
              style={{ color: 'var(--t3)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent1)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--t3)' }}
              whileHover={{ x: -5 }}
            >
              <span className="text-lg">←</span> Stack
            </motion.button>
            <motion.button
              onClick={() => navigate('/certifications')}
              className="font-mono text-sm font-bold transition-colors flex items-center gap-2"
              style={{ color: 'var(--t3)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent1)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--t3)' }}
              whileHover={{ x: 5 }}
            >
              Certificates <span className="text-lg">→</span>
            </motion.button>
          </div>

        </div>
      </section>
    </PageWrapper>
  )
}
