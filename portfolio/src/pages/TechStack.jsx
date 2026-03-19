import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import useScrollAnimation from '../hooks/useScrollAnimation'

// -- Actual Skills Data --
const categories = [
  {
    id: 'deep-learning',
    label: '01',
    title: 'Deep Learning & Architectures',
    desc: 'Built from scratch — not fine-tuned, not wrapped.',
    span: 'col-span-1 md:col-span-2 lg:col-span-2',
    accent: 'from-violet-500/10 to-indigo-500/5',
    border: 'hover:border-violet-400/40',
    dot: 'bg-violet-400',
    skills: [
      'Transformers', 'CNN', 'RNN', 'LSTM',
      'Encoder–Decoder', 'Auto-Encoders', 'GANs',
      'Diffusion Models', 'Attention Mechanisms',
    ],
  },
  {
    id: 'agentic',
    label: '02',
    title: 'Agentic AI',
    desc: 'Stateful, multi-actor systems that plan and act.',
    span: 'col-span-1 md:col-span-2 lg:col-span-2',
    accent: 'from-sky-500/10 to-cyan-500/5',
    border: 'hover:border-sky-400/40',
    dot: 'bg-sky-400',
    skills: [
      'LangGraph', 'LangChain', 'LangSmith',
      'Tool Calling', 'Ollama', 'Embedding Models',
      'Multi-Agent Systems', 'RAG Pipelines',
    ],
  },
  {
    id: 'ml',
    label: '03',
    title: 'ML & Data',
    desc: 'Classical ML, feature engineering, experimentation.',
    span: 'col-span-1 md:col-span-1 lg:col-span-1',
    accent: 'from-emerald-500/10 to-teal-500/5',
    border: 'hover:border-emerald-400/40',
    dot: 'bg-emerald-400',
    skills: [
      'PyTorch', 'Scikit-learn',
      'HuggingFace', 'Sentence-Transformers',
      'Pandas', 'NumPy', 'Matplotlib',
    ],
  },
  {
    id: 'infra',
    label: '04',
    title: 'Backend & Infra',
    desc: 'Production systems that actually stay up.',
    span: 'col-span-1 md:col-span-1 lg:col-span-1',
    accent: 'from-orange-500/10 to-amber-500/5',
    border: 'hover:border-orange-400/40',
    dot: 'bg-orange-400',
    skills: [
      'FastAPI', 'Docker', 'Nginx',
      'Redis', 'PostgreSQL', 'Streamlit',
      'Linux / Bash',
    ],
  },
  {
    id: 'languages',
    label: '05',
    title: 'Languages',
    desc: 'The ones I reach for without thinking.',
    span: 'col-span-1 md:col-span-full lg:col-span-4',
    accent: 'from-slate-500/10 to-zinc-500/5',
    border: 'hover:border-[var(--accent1)]/40',
    dot: 'bg-[var(--accent1)]',
    skills: ['Python', 'C++'],
    isLang: true,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

export default function TechStack() {
  const navigate = useNavigate()
  const { ref: headerRef, inView: headerInView } = useScrollAnimation()
  const { ref: gridRef, inView: gridInView } = useScrollAnimation({ rootMargin: '-40px' })

  return (
    <PageWrapper>
      <section className="relative min-h-screen py-24 z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* ── Header ── */}
          <motion.div ref={headerRef} className="mb-20">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs text-[var(--accent1)] tracking-widest uppercase font-bold">
                02 · Tech Stack
              </span>
              <motion.div
                className="h-[2px] flex-1 max-w-xs rounded-full"
                style={{ background: 'var(--gradient-h)', transformOrigin: 'left' }}
                initial={{ scaleX: 0 }}
                animate={headerInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8 }}
              />
            </div>

            <motion.h2
              className="font-display text-4xl md:text-5xl font-extrabold leading-tight mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-[var(--t1)]">Tools I actually </span>
              <span className="text-[var(--accent1)]">know deeply.</span>
            </motion.h2>

            <motion.p
              className="font-body text-lg text-[var(--t2)] max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              No padding. No buzzwords I can't back up. Every item here is something
              I've used to ship — or built from scratch to understand.
            </motion.p>
          </motion.div>

          {/* ── Grid ── */}
          <div ref={gridRef}>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
              variants={containerVariants}
              initial="hidden"
              animate={gridInView ? 'visible' : 'hidden'}
            >
              {categories.map((cat) => (
                <motion.div
                  key={cat.id}
                  variants={itemVariants}
                  className={`
                    group relative rounded-3xl border border-[var(--border)]
                    bg-[var(--surface)] overflow-hidden
                    transition-all duration-500 hover:shadow-2xl hover:-translate-y-1
                    ${cat.span} ${cat.border}
                    ${cat.isLang ? 'p-8' : 'p-7'}
                  `}
                >
                  {/* Hover glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative z-10 h-full flex flex-col">

                    {/* Card header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <span className="font-mono text-[10px] text-[var(--t3)] tracking-widest mb-1 block">
                          {cat.label}
                        </span>
                        <h3 className="font-display font-bold text-xl text-[var(--t1)] leading-tight group-hover:text-[var(--accent1)] transition-colors duration-300">
                          {cat.title}
                        </h3>
                      </div>
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${cat.dot} opacity-60 group-hover:opacity-100 transition-opacity`} />
                    </div>

                    <p className="font-body text-sm text-[var(--t3)] mb-6 leading-relaxed">
                      {cat.desc}
                    </p>

                    {/* Skills — large pill layout for Languages, normal for rest */}
                    {cat.isLang ? (
                      <div className="flex gap-4 mt-auto flex-wrap">
                        {cat.skills.map((skill) => (
                          <motion.span
                            key={skill}
                            className="font-mono text-2xl font-extrabold text-[var(--t1)] px-6 py-3 rounded-2xl border border-[var(--border)] bg-[var(--panel)] hover:border-[var(--accent1)] hover:text-[var(--accent1)] transition-all duration-300 cursor-default"
                            whileHover={{ scale: 1.04, y: -2 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {cat.skills.map((skill) => (
                          <motion.span
                            key={skill}
                            className="font-mono text-xs font-semibold px-3 py-1.5 rounded-xl
                              text-[var(--t2)] bg-[var(--panel)] border border-[var(--border)]
                              hover:text-[var(--t1)] hover:border-[var(--accent1)] hover:bg-[var(--accent1)]/5
                              transition-all duration-300 cursor-default"
                            whileHover={{ scale: 1.05, y: -2 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Nav ── */}
          <motion.div
            className="mt-24 flex justify-between items-center border-t border-[var(--border)] pt-8"
            initial={{ opacity: 0 }}
            animate={gridInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              onClick={() => navigate('/about')}
              className="font-mono text-xs font-bold text-[var(--t3)] hover:text-[var(--accent1)] transition-colors flex items-center gap-2 px-4 py-2 rounded-full border border-transparent hover:border-[var(--accent1)]/30 hover:bg-[var(--accent1)]/5"
              whileHover={{ x: -2 }}
            >
              <span className="text-lg">←</span> About
            </motion.button>
            <motion.button
              onClick={() => navigate('/projects')}
              className="font-mono text-xs font-bold text-[var(--t3)] hover:text-[var(--accent1)] transition-colors flex items-center gap-2 px-4 py-2 rounded-full border border-transparent hover:border-[var(--accent1)]/30 hover:bg-[var(--accent1)]/5"
              whileHover={{ x: 2 }}
            >
              Projects <span className="text-lg">→</span>
            </motion.button>
          </motion.div>

        </div>
      </section>
    </PageWrapper>
  )
}