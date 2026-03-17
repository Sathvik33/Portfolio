import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
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
  const [hoveredNode, setHoveredNode] = useState(null)
  
  // Generate random stable positions for nodes between 10% and 90% of the container
  const nodes = useMemo(() => {
    return flattenedSkills.map((skill) => ({
      ...skill,
      id: skill.name,
      x: 10 + Math.random() * 80, // %
      y: 10 + Math.random() * 80, // %
      size: 14 + Math.random() * 8, // px font size
      delay: Math.random() * 2,
      duration: 10 + Math.random() * 10,
    }))
  }, [])

  // Generate connection lines between nodes of the same category
  const connections = useMemo(() => {
    const lines = []
    skillGroups.forEach(group => {
      const groupNodes = nodes.filter(n => n.category === group.category)
      for (let i = 0; i < groupNodes.length; i++) {
        for (let j = i + 1; j < groupNodes.length; j++) {
          // Only connect some of them to prevent clutter
          if (Math.random() > 0.4) {
            lines.push({ id: `${groupNodes[i].id}-${groupNodes[j].id}`, n1: groupNodes[i], n2: groupNodes[j], color: group.color })
          }
        }
      }
    })
    return lines
  }, [nodes])

  return (
    <div className="relative w-full h-[600px] outline-card rounded-2xl overflow-hidden mt-12 group">
      <div className="absolute inset-0 bg-[var(--panel)] opacity-50" />
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      {/* Title */}
      <div className="absolute top-6 left-6 z-20 pointer-events-none">
        <h3 className="font-mono text-sm uppercase tracking-widest text-[var(--t2)] font-bold">Latent Space Visualization</h3>
        <p className="font-mono text-[10px] text-[var(--t3)] mt-1">Dimensionality Reduction: UMAP | Epochs: 500</p>
      </div>

      {/* SVG for Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {connections.map((line) => {
          const isHighlighted = hoveredNode && (line.n1.id === hoveredNode || line.n2.id === hoveredNode)
          const categoryHovered = hoveredNode && nodes.find(n => n.id === hoveredNode)?.category === line.n1.category
          
          let opacity = 0.05
          if (isHighlighted) opacity = 0.4
          else if (categoryHovered) opacity = 0.15
          else if (hoveredNode) opacity = 0.02

          return (
            <motion.line
              key={line.id}
              x1={`${line.n1.x}%`}
              y1={`${line.n1.y}%`}
              x2={`${line.n2.x}%`}
              y2={`${line.n2.y}%`}
              stroke={line.color}
              strokeWidth={isHighlighted ? 2 : 1}
              initial={{ opacity: 0 }}
              animate={{ opacity }}
              transition={{ duration: 0.3 }}
            />
          )
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node) => {
        const isHovered = hoveredNode === node.id
        const isRelated = hoveredNode && nodes.find(n => n.id === hoveredNode)?.category === node.category
        
        let nodeOpacity = 0.8
        let nodeScale = 1
        if (hoveredNode) {
          if (isHovered) { nodeOpacity = 1; nodeScale = 1.2 }
          else if (isRelated) { nodeOpacity = 0.9; nodeScale = 1.05 }
          else { nodeOpacity = 0.2; nodeScale = 0.9 }
        }

        return (
          <motion.div
            key={node.id}
            className="absolute z-10 flex items-center justify-center cursor-crosshair"
            style={{ 
              left: `${node.x}%`, 
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: nodeOpacity,
              scale: nodeScale,
              y: [0, -15, 0],
              x: [0, 10, 0]
            }}
            transition={{ 
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
              y: { duration: node.duration, repeat: Infinity, ease: "easeInOut", delay: node.delay },
              x: { duration: node.duration * 1.2, repeat: Infinity, ease: "easeInOut", delay: node.delay * 1.5 }
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {/* Glowing dot */}
            <div 
              className="relative rounded-full"
              style={{ 
                width: isHovered ? 12 : 8, 
                height: isHovered ? 12 : 8, 
                backgroundColor: node.color,
                boxShadow: isHovered ? `0 0 20px ${node.color}, 0 0 40px ${node.color}` : `0 0 10px ${node.color}`
              }}
            >
              <div 
                className="absolute inset-0 rounded-full animate-ping opacity-20" 
                style={{ backgroundColor: node.color }} 
              />
            </div>
            
            {/* Label */}
            <div 
              className="absolute top-full mt-2 font-mono whitespace-nowrap px-2 py-0.5 rounded backdrop-blur-md border"
              style={{
                fontSize: `${node.size}px`,
                color: isHovered || isRelated ? '#fff' : 'var(--t2)',
                backgroundColor: isHovered ? `${node.color}22` : 'rgba(10, 15, 37, 0.6)',
                borderColor: isHovered ? node.color : 'var(--border)',
                fontWeight: isHovered ? 700 : (isRelated ? 600 : 400),
                zIndex: isHovered ? 30 : 10,
                pointerEvents: 'none'
              }}
            >
              {node.name}
            </div>
          </motion.div>
        )
      })}

      {/* Legend */}
      <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2 pointer-events-none bg-[var(--surface)]/80 backdrop-blur-md p-4 rounded-xl border border-[var(--border)]">
        {skillGroups.map(group => (
          <div key={group.category} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: group.color, boxShadow: `0 0 8px ${group.color}` }} />
            <span className="font-mono text-xs text-[var(--t2)]">{group.category}</span>
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