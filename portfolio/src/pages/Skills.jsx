import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
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
      { name: 'OpenCV', context: 'Image preprocessing, denoising pipeline, video frame extraction' },
      { name: 'CUDA', context: 'GPU-accelerated training, custom CUDA kernel experience' },
      { name: 'Pandas / NumPy', context: 'Data wrangling, feature engineering, analysis' },
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
    ],
  },
]

function SkillPill({ skill, catColor }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="relative z-10 hover:z-50"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.span
        className="inline-flex items-center px-4 py-2.5 rounded-xl font-mono text-xs font-semibold
          text-[var(--t2)] bg-[var(--panel)] border border-[var(--border)]
          transition-all duration-300 cursor-default select-none"
        whileHover={{
          scale: 1.08,
          y: -4,
          borderColor: catColor,
          color: catColor,
          backgroundColor: `${catColor}10`,
        }}
        style={{ transition: 'box-shadow 0.3s' }}
      >
        {skill.name}
        {/* Glow on hover */}
        {hovered && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ boxShadow: `0 0 20px ${catColor}20, inset 0 0 20px ${catColor}05` }}
          />
        )}
      </motion.span>

      {/* Hover tooltip */}
      <AnimatePresence>
        {hovered && skill.context && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 z-[100] w-60 px-4 py-3 rounded-xl text-center
              font-body text-[11px] leading-relaxed text-[var(--t2)] bg-[var(--surface)] border border-[var(--border)]
              shadow-xl pointer-events-none"
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {skill.context}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-2.5 h-2.5 rotate-45 bg-[var(--surface)] border-r border-b border-[var(--border)]" />
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
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const decoX = useTransform(scrollYProgress, [0, 1], [-30, 30])
  const decoY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section id="skills" className="section-padding relative overflow-hidden" ref={containerRef}>
      {/* Animated background accent */}
      <motion.div
        className="absolute right-0 top-1/4 w-[300px] h-[300px] rounded-full opacity-[0.04] blur-[80px] pointer-events-none"
        style={{ background: activeCategory?.color || '#8b5cf6', x: decoX, y: decoY }}
      />

      <div ref={ref} className="mx-auto max-w-6xl relative z-10">

        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-4"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-xs text-[var(--accent1)] tracking-widest uppercase font-bold">
            02 · Skills
          </span>
          <motion.div
            className="h-[2px] flex-1 max-w-xs rounded-full"
            style={{ background: 'var(--gradient-h)', transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </motion.div>

        <motion.h2
          className="font-display text-3xl md:text-4xl font-extrabold leading-tight mb-4"
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="text-[var(--t1)]">Tools I actually </span>
          <span className="text-[var(--accent1)]">know deeply</span>
        </motion.h2>

        <motion.p
          className="font-body text-base text-[var(--t3)] max-w-xl mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          No padding. Every item here is something I've used to ship — or built from scratch to understand.
        </motion.p>

        {/* Category Tabs — animated with spring layout */}
        <motion.div
          className="flex flex-wrap gap-2.5 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`group relative px-5 py-2.5 rounded-xl font-display text-sm font-semibold transition-all duration-300 border ${
                activeTab === cat.id
                  ? 'text-[var(--t1)]'
                  : 'border-[var(--border)] text-[var(--t3)] bg-[var(--panel)] hover:text-[var(--t2)] hover:border-[var(--t3)]'
              }`}
              style={activeTab === cat.id ? { borderColor: cat.color, background: `${cat.color}15` } : {}}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.label}
              <span className="ml-2 font-mono text-[10px] opacity-50">{cat.skills.length}</span>

              {activeTab === cat.id && (
                <motion.div
                  layoutId="skills-tab-glow"
                  className="absolute inset-0 rounded-xl"
                  style={{ boxShadow: `0 0 20px ${cat.color}15` }}
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid — unique visual: card with accent bar + pills */}
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeTab}
              className="glass-card rounded-2xl"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Accent bar at top - matches category color */}
              <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${activeCategory.color}, transparent)` }} />

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm border"
                    style={{ background: `${activeCategory.color}15`, borderColor: `${activeCategory.color}40`, color: activeCategory.color }}
                    layoutId="cat-icon"
                  >
                    {activeCategory.icon}
                  </motion.div>
                  <h3 className="font-display text-lg font-bold text-[var(--t1)]">
                    {activeCategory.label}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {activeCategory.skills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 16, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <SkillPill skill={skill} catColor={activeCategory.color} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
