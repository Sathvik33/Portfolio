import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import useScrollAnimation from '../hooks/useScrollAnimation'

const stats = [
  { value: '7+', label: 'Projects Built', icon: '◆' },
  { value: '15+', label: 'Technologies', icon: '⚡' },
  { value: 'Top 15%', label: 'Kaggle Rank', icon: '▲' },
  { value: '5+', label: 'Certifications', icon: '◈' },
]

export default function About() {
  const { ref: sectionRef, inView } = useScrollAnimation({ rootMargin: '-80px' })
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Parallax offsets for decorative elements
  const decoY1 = useTransform(scrollYProgress, [0, 1], [60, -60])
  const decoY2 = useTransform(scrollYProgress, [0, 1], [40, -80])
  const decoRotate = useTransform(scrollYProgress, [0, 1], [0, 45])

  return (
    <section id="about" className="section-padding relative overflow-hidden" ref={containerRef}>
      {/* Floating decorative elements with parallax */}
      <motion.div
        className="absolute top-20 right-10 w-24 h-24 rounded-2xl border border-[var(--border)] opacity-[0.06]"
        style={{ y: decoY1, rotate: decoRotate }}
      />
      <motion.div
        className="absolute bottom-32 left-8 w-16 h-16 rounded-full border border-[var(--accent1)] opacity-[0.08]"
        style={{ y: decoY2 }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-[var(--accent1)] opacity-[0.15]"
        style={{ y: decoY1 }}
      />

      <div ref={sectionRef} className="mx-auto max-w-6xl relative z-10">

        {/* Section label — slides in from left */}
        <motion.div
          className="flex items-center gap-4 mb-4"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="font-mono text-xs text-[var(--accent1)] tracking-widest uppercase font-bold">
            01 · About
          </span>
          <motion.div
            className="h-[2px] flex-1 max-w-xs rounded-full"
            style={{ background: 'var(--gradient-h)', transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          />
        </motion.div>

        <motion.h2
          className="font-display text-3xl md:text-4xl font-extrabold leading-tight mb-12"
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <span className="text-[var(--t1)]">About </span>
          <span className="gradient-text">Me</span>
        </motion.h2>

        {/* Split layout */}
        <div className="grid gap-12 lg:grid-cols-5">

          {/* Left — Text with staggered paragraph reveals */}
          <div className="lg:col-span-3 space-y-6">
            {[
              <p key="p1" className="font-body text-lg text-[var(--t2)] leading-relaxed">
                I'm a Computer Science undergraduate at Lovely Professional University with a deep focus on
                <strong className="text-[var(--t1)]"> machine learning</strong>,
                <strong className="text-[var(--t1)]"> agentic AI systems</strong>, and
                <strong className="text-[var(--t1)]"> local LLM deployment</strong>. I build from the ground up — not to reinvent wheels, but to understand the engine.
              </p>,
              <p key="p2" className="font-body text-lg text-[var(--t2)] leading-relaxed">
                My stack covers <strong className="text-[var(--t1)]">PyTorch, LangGraph, FastAPI, and Redis</strong> — across transformer architectures, multi-agent pipelines, RAG systems, and the backend infrastructure to deploy them.
              </p>,
              <p key="p3" className="font-body text-lg text-[var(--t2)] leading-relaxed">
                I focus on building AI systems that are robust, well-reasoned, and production-ready — pushing into the parts of this field that most people still treat as a black box.
              </p>,
            ].map((paragraph, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30, filter: 'blur(4px)' }}
                animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
              >
                {paragraph}
              </motion.div>
            ))}
          </div>

          {/* Right — Stats grid with stagger + hover depth */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="glass-card rounded-2xl p-5 text-center group cursor-default"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ y: -6, scale: 1.04 }}
              >
                <motion.div
                  className="font-mono text-base text-[var(--t3)] mb-2 opacity-40 group-hover:opacity-100 group-hover:text-[var(--accent1)] transition-all duration-300"
                >
                  {stat.icon}
                </motion.div>
                <div className="font-display text-2xl font-extrabold gradient-text mb-1">{stat.value}</div>
                <div className="font-mono text-[10px] text-[var(--t3)] uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}