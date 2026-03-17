import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }
const item = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }
}

export default function Hero() {
  const navigate = useNavigate()
  return (
    <PageWrapper>
      <section className="relative min-h-[calc(100vh-72px)] flex items-center justify-center overflow-hidden py-12 lg:py-0">

        <div className="pointer-events-none absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-float glow-effect" />
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/15 rounded-full blur-[100px] animate-float glow-effect" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 mx-auto max-w-4xl px-6 w-full">

          <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col">

            <motion.div variants={item} className="mb-8 inline-block self-start">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-full blur-sm group-hover:blur-md transition-all" />
                <div className="relative border border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-sm px-5 py-2 rounded-full shadow-lg">
                  <span className="font-mono text-xs text-[var(--t1)] uppercase tracking-wider font-bold flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                    </span>
                    ML / AI Engineer
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={item} className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 mb-8">
              <h1 className="font-display text-5xl font-extrabold leading-tight tracking-tight text-[var(--t1)] sm:text-6xl md:text-7xl">
                <span className="inline-block hover:text-gradient transition-all duration-300">Maru Sathvik</span>
                <br />
                <span className="inline-block hover:text-gradient transition-all duration-300">Reddy</span>
              </h1>

              <motion.div
                className="relative w-48 h-48 md:w-64 md:h-64 shrink-0 group"
                whileHover={{ scale: 1.05, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-violet-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative outline-card p-2.5 rounded-2xl rotate-3 group-hover:rotate-0 transition-all duration-500">
                  <div className="w-full h-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel)] relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <img
                      src="/profile.jpg"
                      alt="Maru Sathvik Reddy"
                      className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 relative z-10"
                      style={{
                        objectPosition: 'center 12%',
                        transform: 'scale(1.2)'
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.p variants={item} className="max-w-2xl font-body text-lg leading-relaxed text-[var(--t2)] relative group">
              <div className="outline-card p-6 rounded-xl hover:border-cyan-500/30 transition-all duration-500">
                <span className="relative z-10">
                  I don't just consume APIs — I build AI from the inside out. I specialize in translating theoretical math into production-grade systems, from coding GPT-style transformers from scratch to architecting fully local, multi-agent RAG pipelines.
                </span>
              </div>
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
              <motion.button
                onClick={() => navigate('/projects')}
                className="relative group overflow-hidden px-8 py-3.5 font-display font-bold text-sm text-[var(--t1)] cursor-pointer rounded-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-600 opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-500 blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>

              <motion.a
                href="/Sathvik_CV.pdf"
                download="Sathvik_CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="relative group px-8 py-3.5 font-display font-bold text-sm text-[var(--t2)] hover:text-[var(--t1)] border border-[var(--border)] hover:border-cyan-500/50 transition-all rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-[var(--surface)] group-hover:bg-[var(--panel)] transition-colors" />
                <span className="relative z-10">Download Resume</span>
              </motion.a>
            </motion.div>

          </motion.div>

        </div>
      </section>
    </PageWrapper>
  )
}