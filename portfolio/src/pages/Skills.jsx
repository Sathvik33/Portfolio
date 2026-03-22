import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import useScrollAnimation from '../hooks/useScrollAnimation'

const categories = [
  {
    id: 'ai-ml',
    label: 'AI / ML',
    icon: '⚡',
    color: '#8b5cf6', // Violet
    span: 'md:col-span-2 lg:col-span-2 lg:row-span-2', // Large focus block
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
    color: '#06b6d4', // Cyan
    span: 'md:col-span-1 lg:col-span-1 lg:row-span-1',
    skills: [
      { name: 'LangChain', context: 'Multi-agent orchestration, tool calling, memory management' },
      { name: 'LangGraph', context: 'Stateful workflows, research automation' },
      { name: 'RAG', context: 'Semantic chunking, ChromaDB, retrieval systems' },
      { name: 'Ollama', context: 'Local LLM deployment, model management' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: '▲',
    color: '#3b82f6', // Blue
    span: 'md:col-span-1 lg:col-span-1 lg:row-span-1',
    skills: [
      { name: 'FastAPI', context: 'REST APIs, streaming responses, WebSocket' },
      { name: 'PostgreSQL', context: 'Schema design, complex queries, SQLAlchemy' },
      { name: 'Docker', context: 'Multi-stage builds, containerized ML pipelines' },
      { name: 'Redis', context: 'Caching layer, semantic cache for RAG systems' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend & Infra',
    icon: '{ }',
    color: '#10b981', // Emerald
    span: 'md:col-span-2 lg:col-span-3 lg:row-span-1', // Wide bottom block
    skills: [
      { name: 'Python', context: 'Primary language — ML, backend, scripting' },
      { name: 'C++', context: 'Data structures, algorithms' },
      { name: 'React', context: 'Component architecture, Framer Motion' },
      { name: 'Linux / Bash', context: 'Server management, automation scripts' },
      { name: 'Git', context: 'Version control, collaborative workflows' },
    ],
  },
]

// --- Spotlight Card Component ---
// Creates a glowing gradient that follows the user's cursor
function SpotlightCard({ children, color, className }) {
  const divRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative rounded-3xl border border-[var(--border)] bg-[var(--surface)] transition-colors duration-300 hover:border-[var(--accent1)]/30 ${className}`}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {/* The spotlight effect (hidden overflow so it doesn't bleed out of the card) */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${color}15, transparent 40%)`,
          }}
        />
      </div>
      
      {/* Content wrapper (relative z-10 so tooltips can still overflow the main card) */}
      <div className="relative z-10 p-8 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  )
}

function SkillPill({ skill, catColor, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="relative z-10"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // Subtle continuous floating animation
      animate={{ y: [0, -4, 0] }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: 'easeInOut',
        delay: index * 0.2 // Stagger the floating effect
      }}
    >
      <motion.span
        className="inline-flex items-center px-4 py-2.5 rounded-xl font-mono text-xs font-semibold text-[var(--t2)] bg-[var(--panel)] border border-[var(--border)] transition-all duration-300 cursor-default select-none shadow-sm"
        whileHover={{
          scale: 1.1,
          borderColor: catColor,
          color: catColor,
          backgroundColor: `${catColor}10`,
          zIndex: 50
        }}
      >
        {skill.name}
      </motion.span>

      {/* Hover tooltip */}
      <AnimatePresence>
        {hovered && skill.context && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 z-[100] w-60 px-4 py-3 rounded-xl text-center font-body text-[11px] leading-relaxed text-[var(--t2)] bg-[var(--surface)] border border-[var(--border)] shadow-2xl pointer-events-none"
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 rounded-xl bg-[var(--bg)] opacity-50" />
            <span className="relative z-10">{skill.context}</span>
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-2.5 h-2.5 rotate-45 bg-[var(--surface)] border-r border-b border-[var(--border)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Skills() {
  const { ref, inView } = useScrollAnimation({ rootMargin: '-80px' })
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const decoY1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const decoY2 = useTransform(scrollYProgress, [0, 1], [-50, 50])

  return (
    <section id="skills" className="section-padding relative overflow-visible" ref={containerRef}>
      
      {/* Abstract Background Elements */}
      <motion.div
        className="absolute left-[10%] top-1/4 w-96 h-96 rounded-full opacity-[0.03] blur-[100px] pointer-events-none bg-violet-500"
        style={{ y: decoY1 }}
      />
      <motion.div
        className="absolute right-[5%] bottom-1/4 w-80 h-80 rounded-full opacity-[0.03] blur-[80px] pointer-events-none bg-cyan-500"
        style={{ y: decoY2 }}
      />

      <div ref={ref} className="mx-auto max-w-6xl relative z-10">

        {/* Section Header */}
        <motion.div
          className="flex items-center gap-4 mb-4"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-xs text-[var(--accent1)] tracking-widest uppercase font-bold">
            02 · Technical Arsenal
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
          className="font-display text-4xl md:text-5xl font-extrabold leading-tight mb-4"
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="text-[var(--t1)]">My Technical </span>
          <span className="text-[var(--accent1)]">Arsenal</span>
        </motion.h2>

        <motion.p
          className="font-body text-base text-[var(--t3)] max-w-xl mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          No padding. Every item here is something I've used to ship production pipelines, or built from scratch to understand the math behind it.
        </motion.p>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              className={cat.span}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + (i * 0.1), duration: 0.6, type: 'spring', damping: 20 }}
            >
              <SpotlightCard color={cat.color} className="h-full">
                
                {/* Card Header */}
                <div className="flex items-center gap-4 mb-8 border-b border-[var(--border)] pb-4">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-inner"
                    style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30`, color: cat.color }}
                  >
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-[var(--t1)] tracking-tight">
                      {cat.label}
                    </h3>
                    <p className="font-mono text-[10px] text-[var(--t3)] uppercase tracking-wider mt-1">
                      {cat.skills.length} Technologies
                    </p>
                  </div>
                </div>

                {/* Skills Cloud */}
                <div className="flex flex-wrap gap-3 mt-auto">
                  {cat.skills.map((skill, index) => (
                    <SkillPill 
                      key={skill.name} 
                      skill={skill} 
                      catColor={cat.color} 
                      index={index}
                    />
                  ))}
                </div>
                
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}