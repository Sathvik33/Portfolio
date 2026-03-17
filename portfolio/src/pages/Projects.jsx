import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import { projects, badgeStyles } from '../data/projects'
import useScrollAnimation from '../hooks/useScrollAnimation'

const GH_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

function ProjectCard({ project, index }) {
  const { ref, inView } = useScrollAnimation({ rootMargin: '0px 0px -30px 0px' })
  const [hovered, setHovered] = useState(false)
  const isEven = index % 2 === 0
  const colors = ['#2563eb', '#0ea5e9', '#10b981']
  const accent = colors[index % 3]

  return (
    <motion.div
      ref={ref}
      className="glass-card gradient-border group relative rounded-xl p-6 cursor-default flex flex-col"
      initial={{ opacity: 0, x: isEven ? -60 : 60, rotateY: isEven ? -5 : 5 }}
      animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6, boxShadow: `0 20px 50px ${accent}12` }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div className="pointer-events-none absolute inset-0 rounded-xl"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ background: `radial-gradient(circle at 50% 0%, ${accent}06 0%, transparent 70%)` }} />
        )}
      </AnimatePresence>

      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <motion.span
            className={`inline-block rounded-full border px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wider ${badgeStyles[project.badgeColor]}`}
            animate={hovered ? { scale: 1.05 } : { scale: 1 }}
          >
            {project.badge}
          </motion.span>
          <div className="mt-1 font-mono text-[11px] text-[var(--t3)]">{project.subtitle}</div>
        </div>
        {project.github && (
          <motion.a
            href={project.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--t3)] hover:text-[var(--accent1)] hover:border-[var(--accent1)] transition-all duration-200"
            whileHover={{ scale: 1.15, rotate: 5 }}
          >
            {GH_ICON}
          </motion.a>
        )}
      </div>

      <h3 className="font-display text-lg font-bold text-[var(--t1)] mb-2 group-hover:text-[var(--accent1)] transition-colors duration-300">{project.title}</h3>
      <p className="font-body text-sm text-[var(--t3)] leading-relaxed mb-4 flex-1">{project.description}</p>

      <div className="mb-5 space-y-1.5">
        {project.highlights.map((h, hi) => (
          <motion.div
            key={h}
            className="flex items-start gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.08 + hi * 0.05 + 0.3 }}
          >
            <span className="mt-1 font-mono text-[10px]" style={{ color: accent }}>▸</span>
            <span className="font-mono text-[11px] text-[var(--t2)]">{h}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5 border-t border-[var(--border)] pt-4">
        {project.tech.map((t, ti) => (
          <motion.span
            key={t}
            className="rounded-full bg-[var(--panel)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--t3)] border border-[var(--border)]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0.8, scale: 1 }}
            transition={{ delay: ti * 0.03 }}
          >
            {t}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const navigate = useNavigate()
  const { ref: headerRef, inView: headerInView } = useScrollAnimation()

  return (
    <PageWrapper>
      <section className="relative min-h-[calc(100vh-72px)] py-24">
        <motion.div
          className="pointer-events-none absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)' }}
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute right-[-80px] top-[20%] h-[300px] w-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.04) 0%, transparent 70%)' }}
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        <div className="mx-auto max-w-6xl px-6">
          <motion.div ref={headerRef}>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs gradient-text tracking-widest uppercase font-bold">03 · Projects</span>
              <motion.div
                className="h-[2px] flex-1 max-w-xs rounded-full"
                style={{ background: 'linear-gradient(90deg, #2563eb, #0ea5e9, transparent)', transformOrigin: 'left' }}
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
                href="https://github.com/Sathvik33" target="_blank" rel="noreferrer"
                className="font-mono text-xs text-[var(--t3)] hover:text-[var(--accent1)] transition-colors flex items-center gap-1"
                whileHover={{ x: 3 }}
              >
                github.com/Sathvik33 ↗
              </motion.a>
            </motion.div>
          </motion.div>

          <div className="grid gap-6 grid-cols-1">
            {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>

          <motion.div className="mt-12 flex justify-between">
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
