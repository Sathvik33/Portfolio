import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PageWrapper from '../components/PageWrapper'

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }
const item = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }
}
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } } }
const fadeRight = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } } }

function Typewriter({ text, delay = 0 }) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i >= text.length) clearInterval(interval)
      }, 22)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, delay])
  return <>{displayed}<span className="animate-pulse text-[var(--accent1)]">|</span></>
}

// Floating decorative shapes
function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-20 right-[15%] w-16 h-16 rounded-xl opacity-20"
        style={{ background: 'linear-gradient(135deg, #7c5cfc, #ff6b8a)' }}
        animate={{ y: [0, -20, 0], rotate: [0, 45, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[40%] left-[8%] w-10 h-10 rounded-full opacity-15"
        style={{ background: '#38bdf8' }}
        animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-32 right-[25%] w-8 h-8 rounded-lg opacity-15"
        style={{ background: 'linear-gradient(135deg, #ff6b8a, #38bdf8)' }}
        animate={{ y: [0, -12, 0], rotate: [0, -30, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute top-[60%] right-[10%] w-6 h-6 rounded-full opacity-10"
        style={{ background: '#7c5cfc' }}
        animate={{ y: [0, 20, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute top-[20%] left-[40%] w-3 h-3 rounded-full opacity-25"
        style={{ background: '#ff6b8a' }}
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
    </div>
  )
}

export default function Hero() {
  const navigate = useNavigate()
  return (
    <PageWrapper>
      <section className="relative min-h-[calc(100vh-72px)] flex items-center justify-center overflow-hidden py-12 lg:py-0">
        <div className="pointer-events-none absolute inset-0 grid-bg" />
        <FloatingShapes />
        
        <div className="relative z-10 mx-auto max-w-4xl px-6 w-full">
          
          <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col">
            
            {/* Badge */}
            <motion.div variants={fadeRight} className="mb-8 inline-block self-start">
              <motion.div
                className="px-5 py-2 rounded-full shadow-sm"
                style={{ background: 'linear-gradient(135deg, rgba(124,92,252,0.08), rgba(255,107,138,0.08))', border: '1px solid var(--border)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 4px 20px rgba(124,92,252,0.15)' }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <span className="font-mono text-xs text-[var(--accent1)] uppercase tracking-wider font-bold">
                  ● ML / AI Engineer
                </span>
              </motion.div>
            </motion.div>

            {/* Name and Image */}
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 mb-8">
              <div>
                <h1 className="font-display text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl">
                  <motion.span
                    className="inline-block"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <span className="gradient-text">Maru Sathvik</span>
                  </motion.span>
                  <br />
                  <motion.span
                    className="inline-block text-[var(--t1)]"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                  >
                    Reddy
                  </motion.span>
                </h1>
              </div>
              
              {/* Photo with float animation */}
              <motion.div
                className="relative w-48 h-48 md:w-64 md:h-64 shrink-0"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="absolute -inset-1 rounded-2xl opacity-40" style={{ background: 'linear-gradient(135deg, #7c5cfc, #ff6b8a, #38bdf8)', filter: 'blur(16px)' }} />
                <div className="relative glass-card p-2.5 rounded-2xl h-full">
                  <div className="w-full h-full overflow-hidden rounded-xl bg-[var(--panel)]">
                    <img 
                      src="/profile.jpg" 
                      alt="Maru Sathvik Reddy" 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                      style={{ objectPosition: 'center 12%', transform: 'scale(1.2)' }} 
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Description with typewriter */}
            <motion.div variants={fadeUp} className="max-w-2xl glass-card p-5 rounded-xl">
              <p className="font-body text-lg leading-relaxed text-[var(--t2)]">
                <Typewriter
                  text="I don't just consume APIs — I build AI from the inside out. I specialize in translating theoretical math into production-grade systems, from coding GPT-style transformers from scratch to architecting fully local, multi-agent RAG pipelines."
                  delay={800}
                />
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <motion.button
                onClick={() => navigate('/projects')}
                className="px-8 py-3.5 font-display font-bold text-sm text-white rounded-xl shadow-lg cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #7c5cfc, #ff6b8a)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 12px 30px rgba(124,92,252,0.3)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                View Projects →
              </motion.button>
              
              <motion.a
                href="/Sathvik_CV.pdf" download="Sathvik_CV.pdf" target="_blank" rel="noreferrer"
                className="px-8 py-3.5 font-display font-bold text-sm text-[var(--t2)] rounded-xl border border-[var(--border)] hover:border-[var(--accent1)] hover:text-[var(--accent1)] transition-all bg-white/50 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Download Resume
              </motion.a>
            </motion.div>

          </motion.div>

        </div>
      </section>
    </PageWrapper>
  )
}