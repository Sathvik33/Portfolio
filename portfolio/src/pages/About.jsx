import { motion } from 'framer-motion'
import useScrollAnimation from '../hooks/useScrollAnimation'

const stats = [
  { value: '7+', label: 'Projects Built' },
  { value: '15+', label: 'Technologies' },
  { value: 'Top 15%', label: 'Kaggle Rank' },
  { value: '5+', label: 'Certifications' },
]

export default function About() {
  const { ref: sectionRef, inView } = useScrollAnimation({ rootMargin: '-80px' })

  return (
    <section id="about" className="section-padding relative">
      <div ref={sectionRef} className="mx-auto max-w-6xl">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-xs text-[var(--accent1)] tracking-widest uppercase font-bold">
            01 · About
          </span>
          <motion.div
            className="h-[2px] flex-1 max-w-xs rounded-full"
            style={{ background: 'var(--gradient-h)', transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>

        <motion.h2
          className="font-display text-3xl md:text-4xl font-extrabold leading-tight mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="text-[var(--t1)]">About </span>
          <span className="gradient-text">Me</span>
        </motion.h2>

        {/* Split layout */}
        <div className="grid gap-12 lg:grid-cols-5">

          {/* Left — Text (3 cols) */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="font-body text-lg text-[var(--t2)] leading-relaxed">
              I'm a Computer Science undergraduate at Lovely Professional University with a deep focus on 
              <strong className="text-[var(--t1)]"> machine learning</strong>, 
              <strong className="text-[var(--t1)]"> agentic AI systems</strong>, and 
              <strong className="text-[var(--t1)]"> local LLM deployment</strong>. I build from the ground up — not to reinvent wheels, but to understand the engine.
            </p>

            <p className="font-body text-lg text-[var(--t2)] leading-relaxed">
              My stack covers <strong className="text-[var(--t1)]">PyTorch, LangGraph, FastAPI, and Redis</strong> — across transformer architectures, multi-agent pipelines, RAG systems, and the backend infrastructure to deploy them. Whether it's implementing attention from scratch or designing a stateful agent workflow, I care about the <em>internals</em>.
            </p>

            <p className="font-body text-lg text-[var(--t2)] leading-relaxed">
              I focus on building AI systems that are robust, well-reasoned, and production-ready — pushing into the parts of this field that most people still treat as a black box.
            </p>
          </motion.div>

          {/* Right — Stats (2 cols) */}
          <motion.div
            className="lg:col-span-2 grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="glass-card rounded-2xl p-5 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                whileHover={{ y: -4 }}
              >
                <div className="font-display text-2xl font-extrabold gradient-text mb-1">{stat.value}</div>
                <div className="font-mono text-[11px] text-[var(--t3)] uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}