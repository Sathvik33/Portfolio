import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import { projects, badgeStyles } from '../data/projects'

const C = { hidden:{}, visible:{ transition:{ staggerChildren:0.08, delayChildren:0.05 } } }
const F = { hidden:{ opacity:0, y:24 }, visible:{ opacity:1, y:0, transition:{ duration:0.55, ease:[0.4,0,0.2,1] } } }

const GH_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      variants={F}
      className="gradient-border group relative rounded-xl bg-[var(--surface)] p-6 card-hover cursor-default flex flex-col"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background:
                'radial-gradient(circle at 50% 0%, rgba(0,212,255,0.1) 0%, rgba(124,58,237,0.05) 50%, transparent 70%)',
            }}
          />
        )}
      </AnimatePresence>

      <div className="mb-4 flex items-start justify-between gap-3 relative z-10">
        <div>
          <motion.span
            className={`inline-block rounded border px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider ${badgeStyles[project.badgeColor]}`}
            whileHover={{ scale: 1.05 }}
          >
            {project.badge}
          </motion.span>
          <div className="mt-1 font-mono text-[11px] text-[var(--t3)]">{project.subtitle}</div>
        </div>
        {project.github && (
          <motion.a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex h-8 w-8 items-center justify-center rounded border border-[var(--border)] text-[var(--t3)] hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all duration-200 bg-[var(--surface)]"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            {GH_ICON}
          </motion.a>
        )}
      </div>

      <h3 className="relative z-10 font-display text-lg font-bold text-[var(--t1)] mb-2 group-hover:text-gradient transition-all duration-200">
        {project.title}
      </h3>
      <p className="relative z-10 font-body text-sm text-[var(--t3)] leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

      <div className="relative z-10 mb-5 space-y-1">
        {project.highlights.map((h, i) => (
          <motion.div
            key={h}
            className="flex items-start gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <span className="mt-1 text-[#00d4ff] font-mono text-[10px]">▸</span>
            <span className="font-mono text-[11px] text-[var(--t2)]">{h}</span>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex flex-wrap gap-1.5 border-t border-[var(--border)] pt-4">
        {project.tech.map((t) => (
          <motion.span
            key={t}
            className="skill-tag"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
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
  const [showAll, setShowAll] = useState(false)
  const displayed = projects

  return (
    <PageWrapper>
      <section className="relative min-h-[calc(100vh-72px)] py-24">
        <div className="pointer-events-none absolute -left-60 top-1/3 h-[500px] w-[500px] rounded-full bg-[#00d4ff]/4 blur-[120px]" />
        <div className="mx-auto max-w-6xl px-6">
          <motion.div variants={C} initial="hidden" animate="visible">
            <motion.div variants={F} className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs text-[#00d4ff] tracking-widest uppercase">03 · Projects</span>
              <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-[#00d4ff]/30 to-transparent" />
            </motion.div>
            <motion.div variants={F} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <h2 className="font-display text-4xl font-extrabold text-[var(--t1)] leading-tight">Things I've built.</h2>
              <a href="https://github.com/Sathvik33" target="_blank" rel="noreferrer" className="font-mono text-xs text-[var(--t3)] hover:text-[#00d4ff] transition-colors">github.com/Sathvik33 ↗</a>
            </motion.div>

            <div className="grid gap-5 grid-cols-1 mb-8">
              <AnimatePresence>{displayed.map(p => <ProjectCard key={p.id} project={p} />)}</AnimatePresence>
            </div>

            <motion.div variants={F} className="flex justify-between">
              <button onClick={() => navigate('/stack')} className="font-mono text-xs text-[var(--t3)] hover:text-[#00d4ff] transition-colors">← Stack</button>
              <button onClick={() => navigate('/Certifications')} className="font-mono text-xs text-[var(--t3)] hover:text-[#00d4ff] transition-colors">Certificates →</button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
