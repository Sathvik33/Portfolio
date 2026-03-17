import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import useScrollAnimation from '../hooks/useScrollAnimation'

const skillGroups = [
  { category: 'Languages', icon: '💻', skills: ['Python', 'C++'] },
  { category: 'Gen-AI', icon: '✨', skills: ['Auto-encoders', 'Diffusion Models', 'GANs', 'Transformers', 'LLMs', 'RAG'] },
  { category: 'Agentic-AI', icon: '🤖', skills: ['LangChain', 'LangGraph', 'Ollama', 'Multi-Agent Systems', 'Tool Calling'] },
  { category: 'ML & Deep Learning', icon: '🧠', skills: ['PyTorch', 'Scikit-learn', 'XGBoost', 'Pandas', 'NumPy', 'OpenCV'] },
  { category: 'Backend & Infra', icon: '⚙️', skills: ['FastAPI', 'Redis', 'Nginx', 'Docker', 'PostgreSQL', 'ChromaDB'] },
]

const allSkills = skillGroups.flatMap(g => g.skills)

function RollingMarquee() {
  const doubled = [...allSkills, ...allSkills]
  return (
    <div className="relative overflow-hidden py-6 mb-12">
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10" style={{ background: 'linear-gradient(90deg, var(--bg), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10" style={{ background: 'linear-gradient(270deg, var(--bg), transparent)' }} />
      <div className="marquee-track">
        {doubled.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="mx-2 inline-block rounded-full px-5 py-2 font-mono text-sm font-medium whitespace-nowrap border transition-all hover:scale-110"
            style={{
              background: i % 3 === 0 ? 'rgba(37,99,235,0.06)' : i % 3 === 1 ? 'rgba(14,165,233,0.06)' : 'rgba(16,185,129,0.06)',
              borderColor: i % 3 === 0 ? 'rgba(37,99,235,0.2)' : i % 3 === 1 ? 'rgba(14,165,233,0.2)' : 'rgba(16,185,129,0.2)',
              color: i % 3 === 0 ? '#2563eb' : i % 3 === 1 ? '#0ea5e9' : '#10b981',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

function SkillCard({ group, index }) {
  const { ref, inView } = useScrollAnimation({ rootMargin: '0px 0px -40px 0px' })
  const colors = ['#2563eb', '#0ea5e9', '#10b981']
  const accent = colors[index % 3]
  
  return (
    <motion.div
      ref={ref}
      className={`glass-card gradient-border rounded-xl p-8 ${index === 0 ? 'sm:col-span-2 lg:col-span-3' : ''}`}
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -6, boxShadow: `0 20px 40px ${accent}12` }}
    >
      <div className="mb-6 flex items-center gap-3 border-b border-[var(--border)] pb-4">
        <motion.span
          className="font-mono text-xl"
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
        >
          {group.icon}
        </motion.span>
        <span className="font-display text-lg font-bold text-[var(--t1)]">{group.category}</span>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {group.skills.map((skill, si) => (
          <motion.span
            key={skill}
            className="skill-tag cursor-default"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1 + si * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.1, borderColor: accent, color: accent }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

function ProficiencyBar({ label, pct, index, accent }) {
  const { ref, inView } = useScrollAnimation()
  return (
    <div ref={ref}>
      <div className="mb-2 flex justify-between items-center">
        <span className="font-mono text-xs font-bold text-[var(--t2)]">{label}</span>
        <motion.span
          className="font-mono text-xs font-bold"
          style={{ color: accent }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.5 }}
        >
          {pct}%
        </motion.span>
      </div>
      <div className="h-2 rounded-full bg-[var(--panel)] overflow-hidden border border-[var(--border)]">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${accent}, ${accent}88)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ delay: index * 0.15 + 0.3, duration: 1, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  )
}

export default function TechStack() {
  const navigate = useNavigate()
  const { ref: headerRef, inView: headerInView } = useScrollAnimation()

  const proficiencies = [
    { label: 'PyTorch / Deep Learning', pct: 70, accent: '#2563eb' },
    { label: 'LangChain / Agentic AI',  pct: 80, accent: '#0ea5e9' },
    { label: 'FastAPI / Backend',       pct: 80, accent: '#10b981' },
    { label: 'MLOps / Production',      pct: 60, accent: '#2563eb' },
  ]

  return (
    <PageWrapper>
      <section className="relative min-h-[calc(100vh-72px)] py-24 z-10">
        <div className="mx-auto max-w-6xl px-6">
          
          <motion.div ref={headerRef}>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs gradient-text tracking-widest uppercase font-bold">02 · Stack</span>
              <motion.div
                className="h-[2px] flex-1 max-w-xs rounded-full"
                style={{ background: 'linear-gradient(90deg, #2563eb, #0ea5e9, transparent)', transformOrigin: 'left' }}
                initial={{ scaleX: 0 }}
                animate={headerInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8 }}
              />
            </div>
            
            <motion.h2
              className="font-display text-4xl font-extrabold leading-tight mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="gradient-text">Tech stack</span> <span className="text-[var(--t1)]">& tools.</span>
            </motion.h2>
            <motion.p
              className="font-body text-base text-[var(--t3)] max-w-xl mb-8"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              The architecture and algorithms powering my deployments.
            </motion.p>
          </motion.div>

          <RollingMarquee />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, index) => (
              <SkillCard key={group.category} group={group} index={index} />
            ))}
          </div>

          <motion.div className="mt-10 glass-card rounded-xl p-8">
            <div className="mb-8 font-mono text-xs gradient-text uppercase tracking-widest font-bold">
              Core Proficiency
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {proficiencies.map((item, i) => (
                <ProficiencyBar key={item.label} {...item} index={i} />
              ))}
            </div>
          </motion.div>

          <motion.div className="mt-16 flex justify-between items-center border-t-2 border-[var(--border)] pt-8">
            <motion.button
              onClick={() => navigate('/about')}
              className="font-mono text-xs font-bold text-[var(--t3)] hover:text-[var(--accent1)] transition-colors flex items-center gap-2"
              whileHover={{ x: -5 }}
            >
              <span className="text-lg">←</span> About
            </motion.button>
            <motion.button
              onClick={() => navigate('/projects')}
              className="font-mono text-xs font-bold text-[var(--t3)] hover:text-[var(--accent1)] transition-colors flex items-center gap-2"
              whileHover={{ x: 5 }}
            >
              Projects <span className="text-lg">→</span>
            </motion.button>
          </motion.div>

        </div>
      </section>
    </PageWrapper>
  )
}