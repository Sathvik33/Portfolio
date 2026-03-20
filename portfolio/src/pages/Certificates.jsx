import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
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
  return (
    <motion.a
      href={cert.link}
      target="_blank"
      rel="noreferrer"
      className="group glass-card rounded-2xl p-6 flex flex-col h-full relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ background: cert.color }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div
          className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
          style={{ background: cert.color }}
        />
        <span className="font-mono text-[10px] text-[var(--t3)] uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-[var(--border)] bg-[var(--surface)]">
          {cert.category}
        </span>
      </div>

      {/* Content */}
      <h3 className="font-display text-lg font-bold text-[var(--t1)] mb-1.5 leading-snug group-hover:text-[var(--accent1)] transition-colors duration-300">
        {cert.name}
      </h3>

      <p className="font-mono text-[11px] text-[var(--t3)] uppercase tracking-wider mb-3 font-semibold">
        {cert.issuer}
      </p>

      <p className="font-body text-sm text-[var(--t2)] leading-relaxed mb-5 flex-1">
        {cert.context}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
        <span className="font-mono text-xs text-[var(--t3)]">{cert.date}</span>
        <span className="font-mono text-xs font-semibold text-[var(--t3)] group-hover:text-[var(--accent1)] transition-colors flex items-center gap-1">
          Verify ↗
        </span>
      </div>
    </motion.a>
  )
}

export default function Certificates() {
  const { ref, inView } = useScrollAnimation({ rootMargin: '-80px' })
  const [showAll, setShowAll] = useState(false)

  const visible = showAll ? certs : certs.slice(0, 4)

  return (
    <section id="certificates" className="section-padding relative">
      <div ref={ref} className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-xs text-[var(--accent1)] tracking-widest uppercase font-bold">
            04 · Certificates
          </span>
          <motion.div
            className="h-[2px] flex-1 max-w-xs rounded-full"
            style={{ background: 'var(--gradient-h)', transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8 }}
          />
        </div>

        <motion.h2
          className="font-display text-3xl md:text-4xl font-extrabold leading-tight mb-3"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="gradient-text">Verified</span>{' '}
          <span className="text-[var(--t1)]">Credentials</span>
        </motion.h2>

        <motion.p
          className="font-body text-base text-[var(--t3)] max-w-xl mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          Industry certifications that back my skills — from Oracle, AWS, IBM, and more.
        </motion.p>

        {/* Cards grid */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          {visible.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} inView={inView} />
          ))}
        </div>

        {/* Show more toggle */}
        {certs.length > 4 && (
          <AnimatePresence>
            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                onClick={() => setShowAll(v => !v)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] bg-[var(--panel)] text-[var(--t2)] font-display font-bold text-sm hover:border-[var(--accent1)] hover:text-[var(--accent1)] transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {showAll ? 'Show less' : `View all ${certs.length} certificates`}
                <motion.span
                  animate={{ rotate: showAll ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg leading-none"
                >
                  ↓
                </motion.span>
              </motion.button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  )
}
