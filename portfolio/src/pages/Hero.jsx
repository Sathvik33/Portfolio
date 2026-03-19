import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import PageWrapper from '../components/PageWrapper'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } } }
const fadeRight = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } } }

/* ── Scroll indicator ── */
function ScrollHint() {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const handler = () => setVisible(window.scrollY < 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 2 }}
        >
          <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--t3)]">scroll</span>
          <motion.div
            className="w-[1px] h-6 rounded-full"
            style={{ background: 'linear-gradient(180deg, var(--accent1), transparent)' }}
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Hero() {
  const navigate = useNavigate()

  return (
    <PageWrapper>
      <section className="relative min-h-[calc(100vh-72px)] flex items-center justify-center overflow-hidden py-12 lg:py-0">
        
        <div className="relative z-10 mx-auto max-w-4xl px-6 w-full mt-10">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col">

            {/* Badge */}
            <motion.div variants={fadeRight} className="mb-6 inline-block self-start">
              <motion.div
                className="px-4 py-1.5 rounded-full"
                style={{ background: 'var(--accent-soft)', border: '1px solid var(--border)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 4px 15px rgba(99,102,241,0.15)' }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <span className="font-display text-xs text-[var(--accent1)] uppercase tracking-widest font-bold">
                  ● Student &amp; Developer
                </span>
              </motion.div>
            </motion.div>

            {/* Name and Tagline */}
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 mb-10">
              <div className="flex-1">
                <h1 className="font-display text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl">
                  <motion.span
                    className="inline-block text-[var(--t1)]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                  >
                    Building robust
                  </motion.span>
                  <br />
                  <motion.span
                    className="inline-block text-[var(--t1)]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                  >
                    AI systems <span className="gradient-text font-black">from scratch.</span>
                  </motion.span>
                </h1>

                {/* Description */}
                <motion.p
                  className="mt-6 font-body text-lg text-[var(--t2)] leading-relaxed max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.7 }}
                >
                  Hi, I'm <strong className="text-[var(--t1)] font-semibold">Maru Sathvik Reddy</strong>, an aspiring machine learning engineer and computer science student. I engineer AI solutions tailored to complex problems.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  className="mt-8 flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <motion.button
                    onClick={() => navigate('/about')}
                    className="px-8 py-3.5 font-display font-bold text-sm text-white rounded-xl shadow-lg cursor-pointer"
                    style={{ background: 'var(--gradient)' }}
                    whileHover={{ scale: 1.05, boxShadow: '0 12px 30px rgba(99,102,241,0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    About Me
                  </motion.button>

                  <motion.a
                    href="/Sathvik_CV.pdf" download="Sathvik_CV.pdf" target="_blank" rel="noreferrer"
                    className="px-8 py-3.5 font-display font-bold text-sm text-[var(--t1)] bg-[var(--panel)] rounded-xl border border-[var(--border)] hover:border-[var(--accent1)] transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Download Resume
                  </motion.a>
                </motion.div>
              </div>

              {/* Profile photo */}
              <motion.div
                className="relative w-48 h-48 md:w-64 md:h-64 shrink-0 -mt-8 md:-mt-16"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="absolute -inset-2 rounded-full opacity-20 blur-xl" style={{ background: 'var(--gradient)' }} />
                <div className="relative p-2 rounded-full h-full border border-[var(--border)] backdrop-blur-md">
                  <div className="w-full h-full overflow-hidden rounded-full bg-[var(--surface)]">
                    <img
                      src="/profile.jpg"
                      alt="Maru Sathvik Reddy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      style={{ objectPosition: 'center 12%', transform: 'scale(1.15)' }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </motion.div>
        </div>

        <ScrollHint />
      </section>
    </PageWrapper>
  )
}