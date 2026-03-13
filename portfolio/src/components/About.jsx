import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const principles = [
  {
    icon: '◎',
    title: 'Architecture First',
    desc: 'Every system begins with solid architecture — modular, scalable, and built to last beyond the prototype phase.',
    color: '#00d4ff',
  },
  {
    icon: '⚡',
    title: 'Optimized Inference',
    desc: 'Quantization, batching, VRAM management — deploying AI means making it fast and efficient, not just accurate.',
    color: '#ff8c42',
  },
  {
    icon: '◈',
    title: 'From Scratch Mindset',
    desc: 'Understanding what\'s inside the API before using it. Transformers, attention, embeddings — built by hand.',
    color: '#a78bfa',
  },
  {
    icon: '▲',
    title: 'Production Ready',
    desc: 'FastAPI backends, async DBs, JWT auth, Docker — real systems with real engineering standards.',
    color: '#34d399',
  },
]

function useScrollReveal() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  return { ref, inView }
}

export default function About() {
  const { ref, inView } = useScrollReveal()

  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section label */}
        <motion.div
          ref={ref}
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs text-[#00d4ff] tracking-widest uppercase">01 · About</span>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-[#00d4ff]/30 to-transparent" />
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">
            {/* Left: Main copy */}
            <div>
              <h2 className="font-display text-4xl font-extrabold text-[#e8eaf2] leading-tight mb-6">
                Building AI from
                <br />
                <span className="text-[#00d4ff]">the inside out.</span>
              </h2>
              <div className="space-y-4 font-body text-base text-[#8b8fa8] leading-relaxed">
                <p>
                  I'm a CS undergraduate focused on{' '}
                  <span className="text-[#e8eaf2]">Agentic AI</span>,{' '}
                  <span className="text-[#e8eaf2]">Generative AI</span>,{' '}
                  <span className="text-[#e8eaf2]">Deep Learning</span>, and{' '}
                  <span className="text-[#e8eaf2]">ML Systems</span>. My philosophy: understand
                  what's inside the API before using it.
                </p>
                <p>
                  From building GPT-style transformers from scratch to deploying multi-model
                  GPU-efficient platforms, I design{' '}
                  <span className="text-[#e8eaf2]">end-to-end AI products</span> — architecture to
                  deployment.
                </p>
                <p>
                  Every project is a real, working system engineered with industry-level practices:
                  modular architecture, optimized inference, and production-ready backends.
                </p>
              </div>

              {/* Certs/education */}
              <div className="mt-8 space-y-2">
                {[
                  { label: 'B.Tech CSE · Lovely Professional University', sub: 'CGPA 7.28 · 2023–Present' },
                  { label: 'AWS ML Exam Basics · Foundational ML', sub: 'Oct 2025' },
                  { label: 'Deep Learning with TensorFlow · IBM', sub: 'Mar 2025' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="mt-1 text-[#00d4ff] font-mono text-xs">→</span>
                    <div>
                      <div className="font-body text-sm text-[#e8eaf2]">{item.label}</div>
                      <div className="font-mono text-xs text-[#4a4d60]">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Principles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {principles.map((p, i) => (
                <motion.div
                  key={p.title}
                  className="gradient-border rounded-lg bg-[#0e1017] p-5 card-hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                >
                  <div
                    className="mb-3 font-mono text-xl"
                    style={{ color: p.color }}
                  >
                    {p.icon}
                  </div>
                  <div className="font-display text-sm font-bold text-[#e8eaf2] mb-1.5">{p.title}</div>
                  <div className="font-body text-xs text-[#4a4d60] leading-relaxed">{p.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
