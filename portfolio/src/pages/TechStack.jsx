import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'

const skillGroups = [
  {
    category: 'Languages',
    icon: '💻',
    skills: ['Python', 'C++'],
  },
  {
    category: 'Gen-AI',
    icon: '✨',
    skills: ['Auto-encoders', 'Diffusion Models', 'GANs', 'Transformers', 'LLMs', 'RAG'],
  },
  {
    category: 'Agentic-AI',
    icon: '🤖',
    skills: ['LangChain', 'LangGraph', 'Ollama', 'Multi-Agent Systems', 'Tool Calling'],
  },
  {
    category: 'ML & Deep Learning',
    icon: '🧠',
    skills: ['PyTorch', 'Scikit-learn', 'XGBoost', 'Pandas', 'NumPy', 'OpenCV'],
  },
  {
    category: 'Backend & Infra',
    icon: '⚙️',
    skills: ['FastAPI', 'Redis', 'Nginx', 'Docker', 'PostgreSQL', 'ChromaDB'],
  }
]

const C = { hidden:{}, visible:{ transition:{ staggerChildren:0.08, delayChildren:0.1 } } }
const F = { hidden:{ opacity:0, y:24 }, visible:{ opacity:1, y:0, transition:{ duration:0.55, ease:[0.4,0,0.2,1] } } }

export default function TechStack() {
  const navigate = useNavigate()
  return (
    <PageWrapper>
      <section className="relative min-h-[calc(100vh-72px)] py-24 z-10">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div variants={C} initial="hidden" animate="visible">
            
            <motion.div variants={F} className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs text-[var(--t1)] tracking-widest uppercase font-bold">02 · Stack</span>
              <div className="h-px flex-1 max-w-xs bg-[var(--border)]" />
            </motion.div>
            
            <motion.h2 variants={F} className="font-display text-4xl font-extrabold text-[var(--t1)] leading-tight mb-2">
              Tech stack & tools.
            </motion.h2>
            <motion.p variants={F} className="font-body text-base text-[var(--t3)] max-w-xl mb-12">
              The architecture and algorithms powering my deployments.
            </motion.p>

            {/* Skill Cards Grid - Adjusted for 5 items (Languages spans full width on small screens) */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {skillGroups.map((group, index) => (
                <motion.div 
                  key={group.category} 
                  variants={F} 
                  className={`outline-card rounded-xl p-8 bg-white ${index === 0 ? 'sm:col-span-2 lg:col-span-3' : ''}`}
                >
                  <div className="mb-6 flex items-center gap-3 border-b border-[var(--border)] pb-4">
                    <span className="font-mono text-xl text-[var(--t1)]">{group.icon}</span>
                    <span className="font-display text-lg font-bold text-[var(--t1)]">{group.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {group.skills.map(skill => (
                      <span key={skill} className="skill-tag cursor-default">{skill}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Core Proficiency Bars */}
            <motion.div variants={F} className="mt-10 rounded-xl outline-card p-8 bg-white">
              <div className="mb-8 font-mono text-xs text-[var(--t3)] uppercase tracking-widest font-bold">
                Core Proficiency
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label:'PyTorch / Deep Learning', pct:70 },
                  { label:'LangChain / Agentic AI',  pct:80 },
                  { label:'FastAPI / Backend',       pct:80 },
                  { label:'MLOps / Production',      pct:60 },
                ].map((item, i) => (
                  <div key={item.label}>
                    <div className="mb-2 flex justify-between items-center">
                      <span className="font-mono text-xs font-bold text-[var(--t2)]">{item.label}</span>
                      <span className="font-mono text-xs font-bold text-[var(--t1)]">{item.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[var(--panel)] overflow-hidden border border-[var(--border)]">
                      <motion.div className="h-full rounded-full bg-[var(--t1)]"
                        initial={{ width: 0 }} animate={{ width: `${item.pct}%` }}
                        transition={{ delay: i * 0.1 + 0.5, duration: 0.9, ease: [0.4, 0, 0.2, 1] }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={F} className="mt-16 flex justify-between items-center border-t border-[var(--border)] pt-8">
              <button onClick={() => navigate('/about')} className="font-mono text-xs font-bold text-[var(--t3)] hover:text-[var(--t1)] transition-colors">
                ← About
              </button>
              <button onClick={() => navigate('/projects')} className="font-mono text-xs font-bold text-[var(--t3)] hover:text-[var(--t1)] transition-colors">
                Projects →
              </button>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}