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
              <span className="text-[var(--t1)]">About </span>
              <span className="text-[var(--accent1)]">Me.</span>
            </motion.h2>
          </motion.div>

          <div className="max-w-3xl space-y-8 text-[var(--t2)] leading-loose font-body text-lg">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            >
              I'm a Computer Science undergraduate at Lovely Professional University,
              with a deep focus on machine learning, agentic AI systems, and local
              LLM deployment. I get uncomfortable using tools I don't fully understand
              — so I build from the ground up instead.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            >
              My stack runs deep through PyTorch, LangGraph, FastAPI, and Redis —
              across transformer architectures, multi-agent pipelines, RAG systems,
              and the backend infrastructure to deploy them. Whether it's implementing
              attention from scratch or designing a stateful agent workflow, I care
              about understanding the internals, not just the output.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
            >
              I'm focused on building AI systems that are robust, well-reasoned, and
              production-ready — and continuously pushing into the parts of this field
              that most people still treat as a black box.
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