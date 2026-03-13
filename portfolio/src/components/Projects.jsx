import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { projects, badgeStyles } from '../data/projects'

function ProjectCard({ project, index, inView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className={`gradient-border group relative rounded-xl bg-[#0e1017] p-6 card-hover cursor-default flex flex-col ${
        project.featured ? 'lg:col-span-1' : ''
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 + 0.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Glow on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background:
                'radial-gradient(circle at 50% 0%, rgba(0,212,255,0.05) 0%, transparent 70%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Top row */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <span
            className={`inline-block rounded border px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider ${
              badgeStyles[project.badgeColor]
            }`}
          >
            {project.badge}
          </span>
          <div className="mt-1 font-mono text-[11px] text-[#4a4d60]">{project.subtitle}</div>
        </div>
        <div className="flex gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-8 w-8 items-center justify-center rounded border border-[#1e2130] text-[#4a4d60] hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all duration-200"
              title="GitHub"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="font-display text-lg font-bold text-[#e8eaf2] mb-2 group-hover:text-[#00d4ff] transition-colors duration-200">
        {project.title}
      </h3>

      {/* Description */}
      <p className="font-body text-sm text-[#4a4d60] leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

      {/* Highlights */}
      <div className="mb-5 space-y-1">
        {project.highlights.map((h) => (
          <div key={h} className="flex items-start gap-2">
            <span className="mt-1 text-[#00d4ff] font-mono text-[10px]">▸</span>
            <span className="font-mono text-[11px] text-[#8b8fa8]">{h}</span>
          </div>
        ))}
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 border-t border-[#1e2130] pt-4">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded bg-[#13151f] px-2 py-0.5 font-mono text-[10px] text-[#4a4d60] border border-[#1e2130]"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [showAll, setShowAll] = useState(false)

  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)
  const displayedOthers = showAll ? otherProjects : otherProjects.slice(0, 2)

  return (
    <section id="projects" className="relative py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-60 top-1/3 h-[500px] w-[500px] rounded-full bg-[#00d4ff]/4 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6" ref={ref}>
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs text-[#00d4ff] tracking-widest uppercase">03 · Projects</span>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-[#00d4ff]/30 to-transparent" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-display text-4xl font-extrabold text-[#e8eaf2] leading-tight">
              Things I've built.
            </h2>
            <a
              href="https://github.com/Sathvik33"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-[#4a4d60] hover:text-[#00d4ff] transition-colors duration-200"
            >
              github.com/Sathvik33 ↗
            </a>
          </div>
        </motion.div>

        {/* Featured projects */}
        <div className="mb-5">
          <div className="mb-4 font-mono text-[11px] text-[#4a4d60] uppercase tracking-widest">
            — Featured
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} inView={inView} />
            ))}
          </div>
        </div>

        {/* Other projects */}
        <div className="mb-8">
          <div className="mb-4 font-mono text-[11px] text-[#4a4d60] uppercase tracking-widest">
            — Other Projects
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <AnimatePresence>
              {displayedOthers.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i + 3}
                  inView={inView}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Show more */}
        {!showAll && otherProjects.length > 2 && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="rounded border border-[#1e2130] px-8 py-3 font-mono text-xs text-[#8b8fa8] hover:border-[#00d4ff]/30 hover:text-[#00d4ff] transition-all duration-200"
            >
              Show {otherProjects.length - 2} more projects
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
