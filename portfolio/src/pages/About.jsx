import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'

const C = { hidden:{}, visible:{ transition:{ staggerChildren:0.1 } } }
const F = { hidden:{ opacity:0, y:20 }, visible:{ opacity:1, y:0 } }

export default function About() {
  const navigate = useNavigate()
  
  return (
    <PageWrapper>
      <section className="py-24 max-w-4xl mx-auto px-6 relative z-10">
        <motion.div variants={C} initial="hidden" animate="visible">
          
          <motion.div variants={F} className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs text-[var(--t1)] tracking-widest uppercase font-bold">01 · About</span>
            <div className="h-px flex-1 max-w-xs bg-[var(--border)]" />
          </motion.div>

          <motion.h2 variants={F} className="font-display text-4xl font-extrabold text-[var(--t1)] mb-12 leading-tight">
            Bridging Theory & <br/> Production AI.
          </motion.h2>
          
          <div className="grid md:grid-cols-12 gap-12">
            {/* Left Column: Main Text */}
            <motion.div variants={F} className="md:col-span-7 space-y-6 text-[var(--t2)] leading-relaxed font-body text-lg">
              <p>
                I am a Computer Science undergraduate at <strong className="text-[var(--t1)]">Lovely Professional University</strong>. My core engineering philosophy is simple: understand what is happening inside the black box before deploying it.
              </p>
              <p>
                Recently, I completed an intensive Machine Learning training program at <strong className="text-[var(--t1)]">Elevate Labs</strong>, where I built automated candidate screening systems using NLP and cosine similarity algorithms.
              </p>
              <p>
                Whether I am hand-coding a Transformer's causal self-attention layers in PyTorch or designing a multi-agent LangGraph architecture with Redis semantic caching, my goal is always to engineer robust, mathematically sound, and highly optimized AI systems.
              </p>
            </motion.div>

            {/* Right Column: Clean List (No boxes) */}
            <motion.div variants={F} className="md:col-span-5 space-y-10 pl-0 md:pl-8 md:border-l border-[var(--border)]">
              <div>
                <h3 className="font-mono text-xs text-[var(--t3)] uppercase tracking-widest font-bold mb-4">Education</h3>
                <p className="font-bold text-[var(--t1)] text-base mb-1">B.Tech Computer Science</p>
                <p className="text-sm text-[var(--t2)] mb-2">Lovely Professional University</p>
                <p className="text-xs text-[var(--t3)] font-mono">CGPA 7.28 · 2023 - Present</p>
              </div>
              
              <div>
                <h3 className="font-mono text-xs text-[var(--t3)] uppercase tracking-widest font-bold mb-4">Training</h3>
                <p className="font-bold text-[var(--t1)] text-base mb-1">Machine Learning</p>
                <p className="text-sm text-[var(--t2)] mb-2">Elevate Labs</p>
                <p className="text-xs text-[var(--t3)] font-mono">Supervised/Unsupervised ML & NLP</p>
              </div>
            </motion.div>
          </div>

          <motion.div variants={F} className="mt-20 flex justify-end border-t border-[var(--border)] pt-8">
            <button onClick={() => navigate('/stack')} className="font-mono text-xs font-bold text-[var(--t3)] hover:text-[var(--t1)] transition-colors">
              Next: Tech Stack →
            </button>
          </motion.div>

        </motion.div>
      </section>
    </PageWrapper>
  )
}