import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import useScrollAnimation from '../hooks/useScrollAnimation'

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

function AnimatedDivider() {
  const { ref, inView } = useScrollAnimation()
  return (
    <div ref={ref} className="flex items-center gap-4 mb-8">
      <span className="font-mono text-xs gradient-text tracking-widest uppercase font-bold">01 · About</span>
      <motion.div
        className="h-[2px] flex-1 max-w-xs rounded-full"
        style={{ transformOrigin: 'left', background: 'linear-gradient(90deg, #7c5cfc, #ff6b8a, transparent)' }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  )
}

export default function About() {
  const navigate = useNavigate()
  const { ref: titleRef, inView: titleInView } = useScrollAnimation()
  const { ref: leftRef, inView: leftInView } = useScrollAnimation()
  const { ref: rightRef, inView: rightInView } = useScrollAnimation()
  const { ref: navRef, inView: navInView } = useScrollAnimation()

  return (
    <PageWrapper>
      <section className="py-24 max-w-4xl mx-auto px-6 relative z-10">
        <motion.div variants={stagger} initial="hidden" animate="visible">

          <AnimatedDivider />

          <motion.div ref={titleRef}>
            <motion.h2
              className="font-display text-4xl font-extrabold leading-tight mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="gradient-text">Bridging Theory</span> & <br />
              <span className="text-[var(--t1)]">Production AI.</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-12 gap-12">
            {/* Left Column: Slide from left */}
            <motion.div
              ref={leftRef}
              className="md:col-span-7 space-y-6 text-[var(--t2)] leading-relaxed font-body text-lg"
              initial={{ opacity: 0, x: -50 }}
              animate={leftInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.p
                className="glass-card p-5 rounded-xl"
                whileHover={{ scale: 1.01, boxShadow: '0 8px 30px rgba(124,92,252,0.08)' }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                I am a Computer Science undergraduate at <strong className="text-[var(--accent1)]">Lovely Professional University</strong>. My core engineering philosophy is simple: understand what is happening inside the black box before deploying it.
              </motion.p>
              <motion.p
                className="glass-card p-5 rounded-xl"
                whileHover={{ scale: 1.01, boxShadow: '0 8px 30px rgba(255,107,138,0.08)' }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                Recently, I completed an intensive Machine Learning training program at <strong className="text-[var(--accent2)]">Elevate Labs</strong>, where I built automated candidate screening systems using NLP and cosine similarity algorithms.
              </motion.p>
              <motion.p
                className="glass-card p-5 rounded-xl"
                whileHover={{ scale: 1.01, boxShadow: '0 8px 30px rgba(56,189,248,0.08)' }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                Whether I am hand-coding a Transformer's causal self-attention layers in PyTorch or designing a multi-agent LangGraph architecture with Redis semantic caching, my goal is always to engineer robust, mathematically sound, and highly optimized AI systems.
              </motion.p>
            </motion.div>

            {/* Right Column: Slide from right with animated cards */}
            <motion.div
              ref={rightRef}
              className="md:col-span-5 space-y-6 pl-0 md:pl-8 md:border-l-2 border-[var(--border)]"
              initial={{ opacity: 0, x: 50 }}
              animate={rightInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
            >
              <motion.div
                className="glass-card p-6 rounded-xl"
                whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(124,92,252,0.1)' }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <h3 className="font-mono text-xs text-[var(--accent1)] uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent1)]" />
                  Education
                </h3>
                <p className="font-bold text-[var(--t1)] text-base mb-1">B.Tech Computer Science</p>
                <p className="text-sm text-[var(--t2)] mb-2">Lovely Professional University</p>
                <p className="text-xs text-[var(--t3)] font-mono bg-[var(--panel)] inline-block px-3 py-1 rounded-full">CGPA 7.28 · 2023 - Present</p>
              </motion.div>

              <motion.div
                className="glass-card p-6 rounded-xl"
                whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(255,107,138,0.1)' }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <h3 className="font-mono text-xs text-[var(--accent2)] uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent2)]" />
                  Training
                </h3>
                <p className="font-bold text-[var(--t1)] text-base mb-1">Machine Learning</p>
                <p className="text-sm text-[var(--t2)] mb-2">Elevate Labs</p>
                <p className="text-xs text-[var(--t3)] font-mono bg-[var(--panel)] inline-block px-3 py-1 rounded-full">Supervised/Unsupervised ML & NLP</p>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            ref={navRef}
            className="mt-20 flex justify-end border-t-2 border-[var(--border)] pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={navInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              onClick={() => navigate('/stack')}
              className="font-mono text-xs font-bold text-[var(--t3)] hover:text-[var(--accent1)] transition-colors flex items-center gap-2"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              Next: Tech Stack <span className="text-lg">→</span>
            </motion.button>
          </motion.div>

        </motion.div>
      </section>
    </PageWrapper>
  )
}