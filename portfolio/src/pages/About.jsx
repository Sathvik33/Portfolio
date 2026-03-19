import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import useScrollAnimation from '../hooks/useScrollAnimation'

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

function AnimatedDivider() {
  const { ref, inView } = useScrollAnimation()
  return (
    <div ref={ref} className="flex items-center gap-4 mb-8">
      <span className="font-display text-xs text-[var(--accent1)] uppercase tracking-widest font-bold">01 · About</span>
      <motion.div
        className="h-[2px] flex-1 max-w-xs rounded-full"
        style={{ transformOrigin: 'left', background: 'var(--gradient-h)' }}
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
              <span className="gradient-text">About</span>{' '}
              <span className="text-[var(--t1)]">Me.</span>
            </motion.h2>
          </motion.div>

          <div className="max-w-3xl space-y-8 text-[var(--t2)] leading-loose font-body text-lg">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            >
              I am a Computer Science undergraduate at{' '}
              <strong className="text-[var(--t1)] bg-[var(--accent-soft)] px-1.5 py-0.5 rounded font-semibold">
                Lovely Professional University
              </strong>
              . My core engineering philosophy is simple: understand what is happening inside the black box before deploying it.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            >
              Recently, I completed an intensive Machine Learning training program at{' '}
              <strong className="text-[var(--t1)] bg-[var(--accent3)] px-1.5 py-0.5 rounded font-semibold">
                Elevate Labs
              </strong>
              , where I built automated candidate screening systems using NLP and cosine similarity algorithms.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
            >
              Whether I am hand-coding a Transformer's causal self-attention layers in PyTorch or designing a multi-agent LangGraph architecture with Redis semantic caching, my goal is always to engineer robust, mathematically sound, and highly optimized AI systems.
            </motion.p>
          </div>

          <motion.div
            ref={navRef}
            className="mt-20 flex justify-end border-t border-[var(--border)] pt-8"
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