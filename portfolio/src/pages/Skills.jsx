import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import useScrollAnimation from '../hooks/useScrollAnimation'

const categories = [
  {
    id: 'ai-ml',
    label: 'AI / ML',
    icon: '⚡',
    color: '#8b5cf6',
    skills: [
      { name: 'PyTorch', context: 'Built transformers, autoencoders, and diffusion models from scratch' },
      { name: 'Transformers', context: 'Implemented GPT-style decoder-only architecture (PyPilot)' },
      { name: 'Scikit-learn', context: 'Feature engineering, ensemble methods, Kaggle top 15%' },
      { name: 'HuggingFace', context: 'Datasets, tokenizers, model hub for fine-tuning' },
      { name: 'XGBoost', context: 'Accident risk prediction, Optuna hyperparameter tuning' },
      { name: 'TensorFlow', context: 'CNNs, transfer learning for image classification' },
      { name: 'OpenCV', context: 'Image preprocessing, denoising pipeline, video frame extraction' },
      { name: 'CUDA', context: 'GPU-accelerated training, custom CUDA kernel experience' },
    ],
  },
  {
    id: 'agentic',
    label: 'Agentic AI',
    icon: '◈',
    color: '#06b6d4',
    skills: [
      { name: 'LangChain', context: 'Multi-agent orchestration, tool calling, memory management' },
      { name: 'LangGraph', context: 'Stateful agent workflows, research automation' },
      { name: 'RAG Pipelines', context: 'Semantic chunking, ChromaDB, production retrieval systems' },
      { name: 'Ollama', context: 'Local LLM deployment, model management, API integration' },
      { name: 'Embeddings', context: 'Sentence-Transformers, GPU embeddings, vector similarity' },
      { name: 'Tool Calling', context: 'Custom tool definitions, API integration for agents' },
      { name: 'Multi-Agent', context: 'Planner-researcher-writer pipelines, role-based agents' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: '▲',
    color: '#3b82f6',
    skills: [
      { name: 'FastAPI', context: 'REST APIs, streaming responses, WebSocket, async endpoints' },
      { name: 'PostgreSQL', context: 'Schema design, complex queries, SQLAlchemy ORM' },
      { name: 'Docker', context: 'Multi-stage builds, compose, containerized ML pipelines' },
      { name: 'Redis', context: 'Caching layer, semantic cache for RAG systems' },
      { name: 'Streamlit', context: 'Rapid prototyping dashboards, interactive ML demos' },
      { name: 'Linux / Bash', context: 'Server management, automation scripts, deployment' },
      { name: 'Nginx', context: 'Reverse proxy, load balancing, SSL termination' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend & Tools',
    icon: '{ }',
    color: '#34d399',
    skills: [
      { name: 'Python', context: 'Primary language — ML, backend, scripting, automation' },
      { name: 'C++', context: 'Data structures, algorithms, competitive programming' },
      { name: 'React', context: 'Component architecture, hooks, Framer Motion, this portfolio' },
      { name: 'Tailwind CSS', context: 'Utility-first styling, responsive design, dark mode' },
      { name: 'Git', context: 'Version control, branching, collaborative workflows' },
      { name: 'Pandas / NumPy', context: 'Data wrangling, feature engineering, analysis' },
    ],
  },
]

function SkillPill({ skill }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.span
        className="inline-flex items-center px-3.5 py-2 rounded-xl font-mono text-xs font-semibold
          text-[var(--t2)] bg-[var(--panel)] border border-[var(--border)]
          hover:text-[var(--t1)] hover:border-[var(--accent1)] hover:bg-[var(--accent1)]/5
          transition-all duration-300 cursor-default"
        whileHover={{ scale: 1.05, y: -2 }}
      >
        {skill.name}
      </motion.span>

      {/* Hover tooltip */}
      <AnimatePresence>
        {hovered && skill.context && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-30 w-56 px-3 py-2 rounded-lg text-center
              font-body text-[11px] leading-relaxed text-[var(--t2)] bg-[var(--surface)] border border-[var(--border)]
              shadow-lg pointer-events-none"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
          >
            {skill.context}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 rotate-45 bg-[var(--surface)] border-r border-b border-[var(--border)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('ai-ml')
  const { ref, inView } = useScrollAnimation({ rootMargin: '-80px' })
  const activeCategory = categories.find(c => c.id === activeTab)

  return (
    <section id="skills" className="section-padding relative">
      <div ref={ref} className="mx-auto max-w-6xl">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-xs text-[var(--accent1)] tracking-widest uppercase font-bold">
            02 · Skills
          </span>
          <motion.div
            className="h-[2px] flex-1 max-w-xs rounded-full"
            style={{ background: 'var(--gradient-h)', transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8 }}
          />
        </div>

        <motion.h2
          className="font-display text-3xl md:text-4xl font-extrabold leading-tight mb-4"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="text-[var(--t1)]">Tools I actually </span>
          <span className="gradient-text">know deeply</span>
        </motion.h2>

        <motion.p
          className="font-body text-base text-[var(--t3)] max-w-xl mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          No padding. Every item here is something I've used to ship — or built from scratch to understand.
        </motion.p>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`group relative px-5 py-2.5 rounded-xl font-display text-sm font-semibold transition-all duration-300 border ${
                activeTab === cat.id
                  ? 'border-[var(--accent1)] text-[var(--t1)] bg-[var(--accent1)]/10'
                  : 'border-[var(--border)] text-[var(--t3)] bg-[var(--panel)] hover:text-[var(--t2)] hover:border-[var(--t3)]'
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.label}
              {activeTab === cat.id && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 rounded-xl border border-[var(--accent1)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  style={{ zIndex: -1 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeTab}
              className="glass-card rounded-2xl p-6 md:p-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: activeCategory.color }}
                />
                <h3 className="font-display text-lg font-bold text-[var(--t1)]">
                  {activeCategory.label}
                </h3>
                <span className="font-mono text-[11px] text-[var(--t3)]">
                  {activeCategory.skills.length} tools
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {activeCategory.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    <SkillPill skill={skill} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
