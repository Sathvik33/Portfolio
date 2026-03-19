import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import PageWrapper from '../components/PageWrapper'
import useScrollAnimation from '../hooks/useScrollAnimation'

// -- Data --
const skillGroups = [
  { category: 'Languages', color: '#06b6d4', skills: ['Python', 'C++', 'Java', 'SQL', 'JavaScript'] },
  { category: 'Gen-AI & Deep Learning', color: '#3b82f6', skills: ['PyTorch', 'Transformers', 'Auto-encoders', 'Diffusion Models', 'GANs', 'LLMs', 'RAG'] },
  { category: 'Agentic-AI', color: '#8b5cf6', skills: ['LangChain', 'LangGraph', 'Ollama', 'Multi-Agent Systems', 'Tool Calling'] },
  { category: 'Data & Analytics', color: '#10b981', skills: ['Pandas', 'NumPy', 'Scikit-learn', 'XGBoost', 'OpenCV'] },
  { category: 'Backend & Infra', color: '#f59e0b', skills: ['FastAPI', 'Redis', 'Docker', 'PostgreSQL', 'ChromaDB', 'Git'] },
]

// Flatten skills for the embedding space
const flattenedSkills = skillGroups.flatMap((group) => 
  group.skills.map(skill => ({
    name: skill,
    category: group.category,
    color: group.color
  }))
)

// -- Components --

function EmbeddingSpace() {
  const [vantaEffect, setVantaEffect] = useState(null)
  const vantaRef = useRef(null)

  useEffect(() => {
    let effect;
    window.THREE = THREE;
    import('vanta/dist/vanta.globe.min').then((module) => {
      const GLOBE = module.default
      if (!vantaEffect && vantaRef.current) {
        effect = GLOBE({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          backgroundColor: 0xf6f8f7,
          color: 0x000000,
          color2: 0x2beead,
          size: 0.90
        })
        setVantaEffect(effect)
      }
    })

    return () => {
      if (vantaEffect) vantaEffect.destroy()
      if (effect) effect.destroy()
    }
  }, [vantaEffect])

  return (
    <div ref={vantaRef} className="relative w-full h-[600px] outline-card rounded-2xl overflow-hidden mt-12 group border border-[var(--border)] shadow-sm">
      
      {/* Floating Skill Overlay to map them over the globe */}
      {flattenedSkills.map((skill, index) => {
        // Distribute in a pseudo circle mapping to the globe
        const angle = (index / flattenedSkills.length) * Math.PI * 2
        const radX = 30 + Math.random() * 18 // Avoid the exact center to wrap around
        const radY = 30 + Math.random() * 18
        const sX = 50 + Math.cos(angle) * radX
        const sY = 50 + Math.sin(angle) * radY
        
        return (
          <motion.div
            key={skill.name}
            className="absolute z-10 px-3 py-1.5 rounded-full font-mono text-[11px] whitespace-nowrap border bg-white/70 backdrop-blur-md shadow-sm pointer-events-none flex items-center gap-1.5"
            style={{
              borderColor: `${skill.color}55`, // very faint border
              color: '#0f172a',
              left: `${sX}%`,
              top: `${sY}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.05, 1],
              y: [0, -15, 0],
              x: [0, 10, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2
            }}
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: skill.color }} />
            {skill.name}
          </motion.div>
        )
      })}

      {/* Title / Info overlay */}
      <div className="absolute top-6 left-6 z-20 pointer-events-none p-4 rounded-xl backdrop-blur-md bg-white/60 border border-white/20 shadow-sm">
        <h3 className="font-mono text-sm uppercase tracking-widest text-[#0f172a] font-bold">Skills Topology</h3>
        <p className="font-mono text-[10px] text-[#475569] mt-1">Dimensionality Reduction: Vanta.GLOBE</p>
      </div>

      {/* Legend overlay */}
      <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2 pointer-events-none bg-white/60 backdrop-blur-md p-4 rounded-xl border border-white/40 shadow-sm">
        {skillGroups.map(group => (
          <div key={group.category} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: group.color, boxShadow: `0 0 8px ${group.color}` }} />
            <span className="font-mono text-xs text-[#475569] font-medium">{group.category}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProficiencyBar({ label, pct, index, accent }) {
  const { ref, inView } = useScrollAnimation()
  return (
    <div ref={ref}>
      <div className="mb-2 flex justify-between items-center">
        <span className="font-mono text-xs font-bold text-[var(--t2)] uppercase tracking-wider">{label}</span>
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
      <div className="h-1.5 rounded-full bg-[var(--surface)] overflow-hidden border border-[var(--border)]">
        <motion.div
          className="h-full rounded-full relative"
          style={{ background: `linear-gradient(90deg, ${accent}44, ${accent})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ delay: index * 0.15 + 0.3, duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="absolute top-0 right-0 bottom-0 w-4 bg-white opacity-40 blur-[2px]" />
        </motion.div>
      </div>
    </div>
  )
}

export default function TechStack() {
  const navigate = useNavigate()
  const { ref: headerRef, inView: headerInView } = useScrollAnimation()

  const proficiencies = [
    { label: 'PyTorch / Deep Learning', pct: 90, accent: '#3b82f6' },
    { label: 'LangChain / Agentic AI',  pct: 85, accent: '#8b5cf6' },
    { label: 'Python Engine / Scripts', pct: 95, accent: '#06b6d4' },
    { label: 'FastAPI / Production',    pct: 80, accent: '#10b981' },
  ]

  return (
    <PageWrapper>
      <section className="relative min-h-[calc(100vh-72px)] py-24 z-10">
        <div className="mx-auto max-w-6xl px-6">
          
          <motion.div ref={headerRef}>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs text-[var(--accent1)] tracking-widest uppercase font-bold">02 · Technology Stack</span>
              <motion.div
                className="h-[2px] flex-1 max-w-xs rounded-full"
                style={{ background: 'linear-gradient(90deg, var(--accent1), var(--accent2), transparent)', transformOrigin: 'left' }}
                initial={{ scaleX: 0 }}
                animate={headerInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8 }}
              />
            </div>
            
            <motion.h2
              className="font-display text-4xl font-extrabold leading-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-[var(--t1)]">Neural architecture & </span>
              <span className="gradient-text">tooling matrix.</span>
            </motion.h2>
            <motion.p
              className="font-body text-base text-[var(--t2)] max-w-2xl"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              Explore my technical proficiencies mapped into a simulated latent space. Nodes cluster based on technology domain, reflecting the tools I use to build scalable AI systems.
            </motion.p>
          </motion.div>

          {/* Cards come directly after Marquee now */}

          {/* Proficiency Bars underneath */}
          <motion.div 
            className="mt-12 outline-card rounded-2xl p-8 lg:p-10 relative overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent1)]/5 to-[var(--accent2)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {proficiencies.map((item, i) => (
                <ProficiencyBar key={item.label} {...item} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Core Feature: The Embedding Space Animation */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 font-mono text-xs gradient-text uppercase tracking-widest font-bold">
              Latent Space Visualization
            </div>
            <EmbeddingSpace />
          </motion.div>

          {/* Navigation Links */}
          <motion.div className="mt-20 flex justify-between items-center border-t border-[var(--border)] pt-8">
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