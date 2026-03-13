import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { skillGroups } from '../data/skills'

export default function TechStack() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="stack" className="relative py-32">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-60 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#a78bfa]/4 blur-[120px]" />
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
            <span className="font-mono text-xs text-[#00d4ff] tracking-widest uppercase">02 · Stack</span>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-[#00d4ff]/30 to-transparent" />
          </div>
          <h2 className="font-display text-4xl font-extrabold text-[#e8eaf2] leading-tight">
            The full toolkit.
          </h2>
          <p className="mt-3 font-body text-base text-[#4a4d60] max-w-xl">
            Every layer of the stack — from CUDA kernels to frontend components.
          </p>
        </motion.div>

        {/* Skill groups grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              className="gradient-border rounded-xl bg-[#0e1017] p-6 card-hover"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: gi * 0.08 + 0.2, duration: 0.6 }}
            >
              {/* Category header */}
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="font-mono text-lg"
                  style={{ color: group.color }}
                >
                  {group.icon}
                </span>
                <span className="font-display text-sm font-bold text-[#e8eaf2]">
                  {group.category}
                </span>
              </div>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    className="skill-tag cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: gi * 0.08 + si * 0.04 + 0.4, duration: 0.3 }}
                    style={{
                      '--hover-color': group.color,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom row — proficiency bar visual */}
        <motion.div
          className="mt-10 rounded-xl border border-[#1e2130] bg-[#0e1017] p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="mb-4 font-mono text-xs text-[#4a4d60] uppercase tracking-widest">
            Core Proficiency
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'PyTorch / Deep Learning', pct: 90 },
              { label: 'LangChain / Agentic AI', pct: 88 },
              { label: 'FastAPI / Backend', pct: 82 },
              { label: 'MLOps / Production', pct: 75 },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-1.5 flex justify-between">
                  <span className="font-mono text-xs text-[#8b8fa8]">{item.label}</span>
                  <span className="font-mono text-xs text-[#00d4ff]">{item.pct}%</span>
                </div>
                <div className="h-[3px] rounded-full bg-[#1e2130] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#00d4ff] to-[#00d4ff]/60"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${item.pct}%` } : {}}
                    transition={{ delay: 0.8, duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
