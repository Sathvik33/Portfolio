import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import { skillGroups } from '../data/skills'

const C = { hidden:{}, visible:{ transition:{ staggerChildren:0.08, delayChildren:0.1 } } }
const F = { hidden:{ opacity:0, y:24 }, visible:{ opacity:1, y:0, transition:{ duration:0.55, ease:[0.4,0,0.2,1] } } }

export default function TechStack() {
  const navigate = useNavigate()
  return (
    <PageWrapper>
      <section className="relative min-h-[calc(100vh-72px)] py-24">
        <div className="pointer-events-none absolute -right-60 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#a78bfa]/4 blur-[120px]" />
        <div className="mx-auto max-w-6xl px-6">
          <motion.div variants={C} initial="hidden" animate="visible">
            <motion.div variants={F} className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs text-[#00d4ff] tracking-widest uppercase">02 · Stack</span>
              <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-[#00d4ff]/30 to-transparent" />
            </motion.div>
            <motion.h2 variants={F} className="font-display text-4xl font-extrabold text-[var(--t1)] leading-tight mb-2">Tech stack & tools.</motion.h2>
            <motion.p variants={F} className="font-body text-base text-[var(--t3)] max-w-xl mb-12">Every layer of the stack — from CUDA kernels to frontend components.</motion.p>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {skillGroups.map(group => (
                <motion.div key={group.category} variants={F} className="gradient-border rounded-xl bg-[var(--surface)] p-6 card-hover">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-mono text-lg" style={{ color: group.color }}>{group.icon}</span>
                    <span className="font-display text-sm font-bold text-[var(--t1)]">{group.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map(skill => <span key={skill} className="skill-tag cursor-default">{skill}</span>)}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={F} className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="mb-5 font-mono text-xs text-[var(--t3)] uppercase tracking-widest">Core Proficiency</div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label:'PyTorch / Deep Learning', pct:90 },
                  { label:'LangChain / Agentic AI',  pct:88 },
                  { label:'FastAPI / Backend',        pct:82 },
                  { label:'MLOps / Production',       pct:75 },
                ].map((item, i) => (
                  <div key={item.label}>
                    <div className="mb-1.5 flex justify-between">
                      <span className="font-mono text-xs text-[var(--t2)]">{item.label}</span>
                      <span className="font-mono text-xs text-[#00d4ff]">{item.pct}%</span>
                    </div>
                    <div className="h-[3px] rounded-full bg-[var(--border)] overflow-hidden">
                      <motion.div className="h-full rounded-full bg-gradient-to-r from-[#00d4ff] to-[#00d4ff]/60"
                        initial={{ width: 0 }} animate={{ width: `${item.pct}%` }}
                        transition={{ delay: i * 0.1 + 0.5, duration: 0.9, ease: [0.4, 0, 0.2, 1] }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={F} className="mt-12 flex justify-between">
              <button onClick={() => navigate('/about')} className="font-mono text-xs text-[var(--t3)] hover:text-[#00d4ff] transition-colors">← About</button>
              <button onClick={() => navigate('/projects')} className="font-mono text-xs text-[var(--t3)] hover:text-[#00d4ff] transition-colors">Projects →</button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
