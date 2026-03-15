import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'

const principles = [
  { icon:'◎', title:'Architecture First',   desc:'Every system begins with solid architecture — modular, scalable, and built to last beyond the prototype phase.',                color:'#00d4ff' },
  { icon:'⚡', title:'Optimized Inference',  desc:'Quantization, batching, VRAM management — deploying AI means making it fast and efficient, not just accurate.',              color:'#ff8c42' },
  { icon:'◈', title:'From Scratch Mindset', desc:"Understanding what's inside the API before using it. Transformers, attention, embeddings — built by hand.",                  color:'#a78bfa' },
  { icon:'▲', title:'Production Ready',     desc:'FastAPI backends, async DBs, JWT auth, Docker — real systems with real engineering standards.',                              color:'#34d399' },
]

const C = { hidden:{}, visible:{ transition:{ staggerChildren:0.1, delayChildren:0.1 } } }
const F = { hidden:{ opacity:0, y:24 }, visible:{ opacity:1, y:0, transition:{ duration:0.6, ease:[0.4,0,0.2,1] } } }

export default function About() {
  const navigate = useNavigate()
  return (
    <PageWrapper>
      <section className="relative min-h-[calc(100vh-72px)] py-24">
        <div className="pointer-events-none absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-[#a78bfa]/5 blur-[100px]" />
        <div className="mx-auto max-w-6xl px-6">
          <motion.div variants={C} initial="hidden" animate="visible">
            <motion.div variants={F} className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs text-[#00d4ff] tracking-widest uppercase">01 · About</span>
              <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-[#00d4ff]/30 to-transparent" />
            </motion.div>

            <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 items-start">
              <div>
                <motion.h2 variants={F} className="font-display text-4xl font-extrabold text-[var(--t1)] leading-tight mb-6">
                  Building AI from<br /><span className="text-[#00d4ff]">the inside out.</span>
                </motion.h2>
                <motion.div variants={F} className="space-y-4 font-body text-base text-[var(--t2)] leading-relaxed">
                  <p>I'm a CS undergraduate focused on <span className="text-[var(--t1)]">Agentic AI</span>, <span className="text-[var(--t1)]">Generative AI</span>, <span className="text-[var(--t1)]">Deep Learning</span>, and <span className="text-[var(--t1)]">ML Systems</span>. My philosophy: understand what's inside the API before using it.</p>
                  <p>From building GPT-style transformers from scratch to deploying multi-model GPU-efficient platforms, I design <span className="text-[var(--t1)]">end-to-end AI products</span> — architecture to deployment.</p>
                  <p>Every project is a real, working system engineered with industry-level practices: modular architecture, optimized inference, and production-ready backends.</p>
                </motion.div>

                <motion.div variants={F} className="mt-8 space-y-3">
                  {[
                    { label:'B.Tech CSE · Lovely Professional University',       sub:'CGPA 7.28 · Punjab, India · 2023–Present' },
                    // { label:'AWS ML Exam Basics · Foundational ML Concepts',     sub:'Oct 2025' },
                    // { label:'Deep Learning with TensorFlow · IBM Cognitive',     sub:'Mar 2025' },
                    // { label:'A Guide to ML with Data Science · Cipher Schools',  sub:'Jul 2025' },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-3">
                      <span className="mt-1 text-[#00d4ff] font-mono text-xs">→</span>
                      <div>
                        <div className="font-body text-sm text-[var(--t1)]">{item.label}</div>
                        <div className="font-mono text-xs text-[var(--t3)]">{item.sub}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>

                <motion.div variants={F} className="mt-8 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-400">🏆</span>
                    <span className="font-display text-sm font-bold text-yellow-400">Kaggle Achievement</span>
                  </div>
                  <p className="font-mono text-xs text-[var(--t2)]">Global Rank 588 · Top 15% · "Predicting Road Accident Risk" competition · Nov 2025</p>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {principles.map((p, i) => (
                  <motion.div key={p.title} variants={F} className="gradient-border rounded-lg bg-[var(--surface)] p-5 card-hover" transition={{ delay: i * 0.08 }}>
                    <div className="mb-3 font-mono text-xl" style={{ color: p.color }}>{p.icon}</div>
                    <div className="font-display text-sm font-bold text-[var(--t1)] mb-1.5">{p.title}</div>
                    <div className="font-body text-xs text-[var(--t3)] leading-relaxed">{p.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div variants={F} className="mt-16 flex justify-end">
              <button onClick={() => navigate('/stack')} className="font-mono text-xs text-[var(--t3)] hover:text-[#00d4ff] transition-colors">Next: Tech Stack →</button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
