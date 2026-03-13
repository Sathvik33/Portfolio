import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const repos = [
  { name: 'multi-modal-rag', desc: 'Production RAG with doc/image/video ingestion', lang: 'Python', stars: '—', color: '#ff8c42' },
  { name: 'financial-helper-agent', desc: 'Multi-agent AI for investment analysis', lang: 'Python', stars: '—', color: '#00d4ff' },
  { name: 'pypilot', desc: 'GPT-style code generation transformer from scratch', lang: 'Python', stars: '—', color: '#a78bfa' },
  { name: 'multimodal-ai-platform', desc: 'Full-stack AI: text, image gen, VQA with Model Registry', lang: 'Python', stars: '—', color: '#34d399' },
  { name: 'Road_Accident_Risk', desc: 'XGBoost ensemble — Kaggle Top 15% (Rank 588)', lang: 'Python', stars: '—', color: '#f472b6' },
  { name: 'AutoEncoders', desc: 'Convolutional autoencoder for image compression', lang: 'Python', stars: '—', color: '#fbbf24' },
]

// Simulated contribution grid (52 weeks)
function ContribGrid() {
  const weeks = 52
  const days = 7
  // Simulate a realistic commit pattern
  const grid = Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: days }, (_, d) => {
      const rand = Math.random()
      if (rand < 0.3) return 0
      if (rand < 0.55) return 1
      if (rand < 0.75) return 2
      if (rand < 0.9) return 3
      return 4
    })
  )

  const colors = ['#1e2130', '#0d3d2e', '#0a5c40', '#00a86b', '#00d4ff']

  return (
    <div className="flex gap-[3px] overflow-x-auto scroll-x py-1">
      {grid.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-[3px]">
          {week.map((level, di) => (
            <div
              key={di}
              className="h-[10px] w-[10px] rounded-sm transition-all duration-200 hover:ring-1 hover:ring-[#00d4ff]/40"
              style={{ backgroundColor: colors[level] }}
              title={`${level} contributions`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default function GitHub() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="github" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6" ref={ref}>
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs text-[#00d4ff] tracking-widest uppercase">04 · GitHub</span>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-[#00d4ff]/30 to-transparent" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-display text-4xl font-extrabold text-[#e8eaf2] leading-tight">
              Code in the open.
            </h2>
            <a
              href="https://github.com/Sathvik33"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded border border-[#1e2130] px-4 py-2 font-mono text-xs text-[#8b8fa8] hover:border-[#00d4ff]/30 hover:text-[#00d4ff] transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#8b8fa8]">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              @Sathvik33 ↗
            </a>
          </div>
        </motion.div>

        {/* Contribution graph */}
        <motion.div
          className="gradient-border rounded-xl bg-[#0e1017] p-6 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-xs text-[#4a4d60]">Contribution activity</span>
            <span className="font-mono text-xs text-[#00d4ff]">github.com/Sathvik33</span>
          </div>
          <ContribGrid />
          <div className="mt-3 flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#4a4d60]">Less</span>
            {['#1e2130', '#0d3d2e', '#0a5c40', '#00a86b', '#00d4ff'].map((c) => (
              <div key={c} className="h-3 w-3 rounded-sm" style={{ backgroundColor: c }} />
            ))}
            <span className="font-mono text-[10px] text-[#4a4d60]">More</span>
          </div>
        </motion.div>

        {/* Repo grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={`https://github.com/Sathvik33/${repo.name}`}
              target="_blank"
              rel="noreferrer"
              className="group gradient-border rounded-lg bg-[#0e1017] p-5 card-hover block"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 + 0.4, duration: 0.5 }}
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: repo.color }} />
                  <span className="font-mono text-xs text-[#4a4d60]">{repo.lang}</span>
                </div>
                <span className="font-mono text-xs text-[#4a4d60] group-hover:text-[#00d4ff] transition-colors duration-200">
                  ↗
                </span>
              </div>
              <div className="font-display text-sm font-bold text-[#e8eaf2] mb-1.5 group-hover:text-[#00d4ff] transition-colors duration-200">
                {repo.name}
              </div>
              <div className="font-body text-xs text-[#4a4d60] leading-relaxed">{repo.desc}</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
