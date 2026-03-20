import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import useScrollAnimation from '../hooks/useScrollAnimation'

const certs = [
  {
    id: 1,
    name: 'OCI 2025 AI Foundations Associate',
    issuer: 'Oracle University',
    context: 'Validates core AI/ML concepts, generative AI, and Oracle Cloud AI services.',
    date: 'March 2026',
    category: 'AI/ML',
    link: 'https://drive.google.com/file/d/1tUm8493IhuwboS1aRtFJDg5k-O8f7cm2/view?usp=sharing',
    color: '#ef4444',
  },
  {
    id: 2,
    name: 'Machine Learning Exam Basics',
    issuer: 'AWS Training & Certification',
    context: 'Covers ML fundamentals, model training, and AWS ML stack.',
    date: 'October 2025',
    category: 'AI/ML',
    link: 'https://drive.google.com/file/d/1qtsvlXZa8pmrHZz22AJipZIoHpPA2Y-q/view',
    color: '#f59e0b',
  },
  {
    id: 3,
    name: 'Deep Learning with TensorFlow',
    issuer: 'IBM Cognitive Class',
    context: 'Neural networks, CNNs, RNNs, and deep learning architectures with TensorFlow.',
    date: 'March 2025',
    category: 'AI/ML',
    link: 'https://drive.google.com/file/d/1mCWEFx-TPkMaJkr90CpHypil2BWamNPC/view',
    color: '#3b82f6',
  },
  {
    id: 4,
    name: 'Generative AI, LLM & RAG',
    issuer: 'GeeksforGeeks',
    context: 'LLM architectures, prompt engineering, RAG pipelines, and generative AI applications.',
    date: '2025',
    category: 'AI/ML',
    link: 'https://drive.google.com/file/d/1yVCt4nSr6sNPbkVP7cTLqXDG9gB2V2os/view',
    color: '#22c55e',
  },
  {
    id: 5,
    name: 'Machine Learning & Data Science',
    issuer: 'CipherSchools',
    context: 'End-to-end ML pipeline: data preprocessing, model training, evaluation, and deployment.',
    date: 'July 2025',
    category: 'AI/ML',
    link: 'https://drive.google.com/file/d/1jhU52QZwVoUqO1-vLnADNZQMFK-IkDTn/view',
    color: '#8b5cf6',
  },
]

function CertCard({ cert, index, inView }) {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1])

  return (
    <motion.div ref={cardRef} style={{ y, opacity, scale }}>
      <motion.a
        href={cert.link}
        target="_blank"
        rel="noreferrer"
        className="group glass-card rounded-2xl p-6 flex flex-col h-full relative overflow-hidden block"
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-50 group-hover:opacity-100 transition-opacity"
          style={{ background: cert.color }}
        />

        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: `inset 0 0 40px ${cert.color}08, 0 0 30px ${cert.color}08` }}
        />

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4 relative z-10">
          <motion.div
            className="w-3 h-3 rounded-full mt-1 shrink-0"
            style={{ background: cert.color, opacity: 0.5 }}
            whileHover={{ scale: 1.5, opacity: 1 }}
          />
          <span className="font-mono text-[10px] text-[var(--t3)] uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-[var(--border)] bg-[var(--surface)]">
            {cert.category}
          </span>
        </div>

        {/* Content */}
        <h3 className="font-display text-lg font-bold text-[var(--t1)] mb-1.5 leading-snug group-hover:text-[var(--accent1)] transition-colors duration-300 relative z-10">
          {cert.name}
        </h3>

        <p className="font-mono text-[11px] text-[var(--t3)] uppercase tracking-wider mb-3 font-semibold relative z-10">
          {cert.issuer}
        </p>

        <p className="font-body text-sm text-[var(--t2)] leading-relaxed mb-5 flex-1 relative z-10">
          {cert.context}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)] relative z-10">
          <span className="font-mono text-xs text-[var(--t3)]">{cert.date}</span>
          <motion.span
            className="font-mono text-xs font-semibold text-[var(--t3)] group-hover:text-[var(--accent1)] transition-colors flex items-center gap-1"
            whileHover={{ x: 3 }}
          >
            Verify
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↗
            </motion.span>
          </motion.span>
        </div>
      </motion.a>
    </motion.div>
  )
}

export default function Certificates() {
  const { ref, inView } = useScrollAnimation({ rootMargin: '-80px' })
  const [showAll, setShowAll] = useState(false)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const decoY = useTransform(scrollYProgress, [0, 1], [60, -60])

  const visible = showAll ? certs : certs.slice(0, 4)

  return (
    <section id="certificates" className="section-padding relative overflow-hidden" ref={containerRef}>
      {/* Parallax deco */}
      <motion.div
        className="absolute left-10 top-20 w-20 h-20 rounded-xl border border-[var(--accent3)]/10 opacity-[0.06] pointer-events-none"
        style={{ y: decoY, rotate: useTransform(scrollYProgress, [0, 1], [0, 30]) }}
      />

      <div ref={ref} className="mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-4"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-xs text-[var(--accent1)] tracking-widest uppercase font-bold">
            04 · Certificates
          </span>
          <motion.div
            className="h-[2px] flex-1 max-w-xs rounded-full"
            style={{ background: 'var(--gradient-h)', transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </motion.div>

        <motion.h2
          className="font-display text-3xl md:text-4xl font-extrabold leading-tight mb-3"
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="gradient-text">Verified</span>{' '}
          <span className="text-[var(--t1)]">Credentials</span>
        </motion.h2>

        <motion.p
          className="font-body text-base text-[var(--t3)] max-w-xl mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          Industry certifications that back my skills — from Oracle, AWS, IBM, and more.
        </motion.p>

        {/* Cards grid — scroll reveals per card */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
          {visible.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} inView={inView} />
          ))}
        </div>

        {/* Show more toggle */}
        {certs.length > 4 && (
          <motion.div
            className="flex justify-center mt-10"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              onClick={() => setShowAll(v => !v)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] bg-[var(--panel)] text-[var(--t2)] font-display font-bold text-sm hover:border-[var(--accent1)] hover:text-[var(--accent1)] transition-all"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {showAll ? 'Show less' : `View all ${certs.length} certificates`}
              <motion.span
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ↓
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
