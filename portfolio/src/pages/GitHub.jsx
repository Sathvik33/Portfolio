import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'

const repos = [
  { name:'multi-modal-rag',        desc:'Production RAG with doc/image/video ingestion',              lang:'Python', color:'#ff8c42' },
  { name:'financial-helper-agent', desc:'Multi-agent AI for investment analysis',                     lang:'Python', color:'#00d4ff' },
  { name:'pypilot',                desc:'GPT-style code generation transformer from scratch',         lang:'Python', color:'#a78bfa' },
  { name:'multimodal-ai-platform', desc:'Full-stack: text chat, image gen, VQA with Model Registry', lang:'Python', color:'#34d399' },
  { name:'Road_Accident_Risk',     desc:'XGBoost ensemble — Kaggle Top 15% (Rank 588)',              lang:'Python', color:'#f472b6' },
  { name:'AutoEncoders',           desc:'Convolutional autoencoder for CIFAR-10 compression',        lang:'Python', color:'#fbbf24' },
]

function ContribGrid() {
  const seed  = (x, y) => { const n = Math.sin(x*127.1+y*311.7)*43758.5453; return n-Math.floor(n) }
  const level = (w, d) => { const r=seed(w,d); if(r<0.28)return 0; if(r<0.50)return 1; if(r<0.70)return 2; if(r<0.87)return 3; return 4 }
  const darkColors  = ['#1e2130','#0d3d2e','#0a5c40','#00a86b','#00d4ff']
  const lightColors = ['#e8eaf2','#d4f5e5','#9ce8c4','#3dcf8a','#00a86b']

  return (
    <div className="flex gap-[3px] overflow-x-auto scroll-x py-1">
      {Array.from({ length: 52 }, (_, w) => (
        <div key={w} className="flex flex-col gap-[3px]">
          {Array.from({ length: 7 }, (_, d) => {
            const l = level(w, d)
            return (
              <div key={d}
                className="h-[10px] w-[10px] rounded-sm transition-all duration-150 hover:ring-1 hover:ring-[#00d4ff]/40"
                style={{
                  '--dc': darkColors[l],
                  '--lc': lightColors[l],
                  backgroundColor: 'var(--dc)',
                }}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

const C = { hidden:{}, visible:{ transition:{ staggerChildren:0.07, delayChildren:0.05 } } }
const F = { hidden:{ opacity:0, y:22 }, visible:{ opacity:1, y:0, transition:{ duration:0.55, ease:[0.4,0,0.2,1] } } }

const GH_ICON = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

export default function GitHub() {
  const navigate = useNavigate()
  return (
    <PageWrapper>
      <section className="relative min-h-[calc(100vh-72px)] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div variants={C} initial="hidden" animate="visible">
            <motion.div variants={F} className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs text-[#00d4ff] tracking-widest uppercase">04 · GitHub</span>
              <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-[#00d4ff]/30 to-transparent" />
            </motion.div>
            <motion.div variants={F} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <h2 className="font-display text-4xl font-extrabold text-[var(--t1)] leading-tight">Code in the open.</h2>
              <a href="https://github.com/Sathvik33" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded border border-[var(--border)] px-4 py-2 font-mono text-xs text-[var(--t2)] hover:border-[#00d4ff]/30 hover:text-[#00d4ff] transition-all duration-200">
                {GH_ICON} @Sathvik33 ↗
              </a>
            </motion.div>

            {/* Contribution graph */}
            <motion.div variants={F} className="gradient-border rounded-xl bg-[var(--surface)] p-6 mb-6">
              <div className="mb-3 flex items-center justify-between flex-wrap gap-2">
                <span className="font-mono text-xs text-[var(--t3)]">Contribution activity · github.com/Sathvik33</span>
                <div className="flex items-center gap-1.5">
                  {['var(--border)','#0d3d2e','#0a5c40','#00a86b','#00d4ff'].map((c,i) => (
                    <div key={i} className="h-3 w-3 rounded-sm" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
              <ContribGrid />
            </motion.div>

            {/* Repos */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {repos.map(repo => (
                <motion.a key={repo.name} variants={F}
                  href={`https://github.com/Sathvik33/${repo.name}`} target="_blank" rel="noreferrer"
                  className="group gradient-border rounded-lg bg-[var(--surface)] p-5 card-hover block">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: repo.color }} />
                      <span className="font-mono text-xs text-[var(--t3)]">{repo.lang}</span>
                    </div>
                    <span className="font-mono text-xs text-[var(--t3)] group-hover:text-[#00d4ff] transition-colors">↗</span>
                  </div>
                  <div className="font-display text-sm font-bold text-[var(--t1)] mb-1.5 group-hover:text-[#00d4ff] transition-colors">{repo.name}</div>
                  <div className="font-body text-xs text-[var(--t3)] leading-relaxed">{repo.desc}</div>
                </motion.a>
              ))}
            </div>

            <motion.div variants={F} className="mt-12 flex justify-between">
              <button onClick={() => navigate('/projects')} className="font-mono text-xs text-[var(--t3)] hover:text-[#00d4ff] transition-colors">← Projects</button>
              <button onClick={() => navigate('/contact')} className="font-mono text-xs text-[var(--t3)] hover:text-[#00d4ff] transition-colors">Contact →</button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
