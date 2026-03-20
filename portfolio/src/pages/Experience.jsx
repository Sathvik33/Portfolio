import { motion } from 'framer-motion'
import useScrollAnimation from '../hooks/useScrollAnimation'

const timeline = [
  {
    year: '2026',
    title: 'Multi-Modal RAG System',
    type: 'Project',
    description: 'Built a production-grade RAG platform with semantic chunking, GPU embeddings, ChromaDB indexing, and real-time streaming responses.',
    accent: '#06b6d4',
  },
  {
    year: '2026',
    title: 'Financial Helper Agent · ResearchForge AI',
    type: 'Project',
    description: 'Shipped two agentic AI systems — a financial analysis agent and a multi-agent research automation platform.',
    accent: '#8b5cf6',
  },
  {
    year: '2026',
    title: 'PyPilot — GPT-style Code LLM',
    type: 'Project',
    description: 'Implemented a decoder-only Transformer from scratch in PyTorch for Python code generation — no APIs, just math.',
    accent: '#3b82f6',
  },
  {
    year: '2025',
    title: 'Kaggle — Road Accident Risk (Top 15%)',
    type: 'Achievement',
    description: 'XGBoost ensemble with 80+ engineered features. Ranked Global #588 (Top 15%) with a real-time Streamlit dashboard.',
    accent: '#eab308',
  },
  {
    year: '2025',
    title: 'Oracle AI · AWS · IBM Deep Learning',
    type: 'Certifications',
    description: 'Earned certifications in Oracle AI Foundations, AWS Cloud, IBM Deep Learning, and Cipher Schools ML.',
    accent: '#34d399',
  },
  {
    year: '2024',
    title: 'B.Tech Computer Science — LPU',
    type: 'Education',
    description: 'Started undergraduate studies at Lovely Professional University, Punjab. Focus: ML, AI Systems, Backend Engineering.',
    accent: '#f472b6',
  },
]

function TimelineItem({ item, index, inView }) {
  const isLeft = index % 2 === 0

  return (
    <motion.div
      className={`relative flex items-start gap-6 md:gap-8 ${index !== timeline.length - 1 ? 'pb-12' : ''}`}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center shrink-0">
        <motion.div
          className="w-3.5 h-3.5 rounded-full border-2 z-10"
          style={{ borderColor: item.accent, background: 'var(--bg)' }}
          whileHover={{ scale: 1.4 }}
        />
        {index !== timeline.length - 1 && (
          <div className="w-[1px] flex-1 mt-2" style={{ background: 'var(--border)' }} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 -mt-1">
        <div className="flex items-center gap-3 mb-1.5 flex-wrap">
          <span className="font-mono text-[11px] font-bold tracking-wider" style={{ color: item.accent }}>
            {item.year}
          </span>
          <span className="font-mono text-[10px] text-[var(--t3)] uppercase tracking-widest px-2 py-0.5 rounded-full border border-[var(--border)]">
            {item.type}
          </span>
        </div>
        <h3 className="font-display text-lg font-bold text-[var(--t1)] mb-1.5">
          {item.title}
        </h3>
        <p className="font-body text-sm text-[var(--t2)] leading-relaxed max-w-lg">
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const { ref, inView } = useScrollAnimation({ rootMargin: '-60px' })

  return (
    <section id="experience" className="section-padding relative">
      <div ref={ref} className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-xs text-[var(--accent1)] tracking-widest uppercase font-bold">
            04 · Experience
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
          className="font-display text-3xl md:text-4xl font-extrabold leading-tight mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="text-[var(--t1)]">Journey </span>
          <span className="gradient-text">so far</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {timeline.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
