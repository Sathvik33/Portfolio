import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import useScrollAnimation from '../hooks/useScrollAnimation'

import oracleImg from '../images/Oracle_AI.png'
import awsImg from '../images/aws_cert.jpg'
import ibmImg from '../images/IBM Deep-Learning_page-0001.jpg'
import gfgImg from '../images/Geeks for geeks_page-0001.jpg'
import cipherImg from '../images/Updated Cipher Schools-ML certificate_page-0001.jpg'

const tabs = ['Education', 'Skills', 'Projects', 'Extracurricular', 'Certificates']

const education = [
  { title: 'Lovely Professional University', location: 'Punjab, India', period: 'Since August 2023', detail: 'B.Tech in Computer Science and Engineering', score: 'CGPA: 7.28*' },
  { title: "Sri Chaitanya Junior College", location: 'Hyderabad, Telangana', period: 'April 2021 - March 2023', detail: 'Intermediate', score: 'Percentage: 88.9%' },
  { title: 'Wisdom Spaes School', location: 'Metpally, Telangana', period: 'March 2021', detail: 'High School', score: 'Percentage: 100%' },
]

const skillsGroups = [
  { title: 'Programming & Foundations', items: ['Python', 'C++', 'Java'] },
  { title: 'AI/ML Libraries', items: ['PyTorch', 'Transformers', 'Scikit-learn', 'NumPy', 'Pandas', 'OpenCV', 'LangChain', 'LangGraph'] },
  { title: 'Tools & Platforms', items: ['MySQL', 'Git', 'GitHub', 'VS Code', 'Docker', 'Redis'] },
  { title: 'Soft Skills', items: ['Problem-Solving', 'Team Work', 'Adaptability'] },
]

const projectItems = [
  { title: 'ResearchForge AI', subtitle: 'Local multi-agent research assistant', description: 'LangGraph + Ollama powered system for semantic caching, hybrid report generation, versioned analytical reports, and agentic chat.' },
  { title: 'Multi-Modal RAG System', subtitle: 'Production-grade multimodal retrieval system', description: 'Ingest documents/images/videos, ChromaDB vector indexing, streaming inference, and multi-agent retrieval-first architecture.' },
  { title: 'Autoregressive Transformer for Python Code Gen', subtitle: 'GitHub project · Nov 25', description: 'Implemented decoder-only Transformer for autoregressive Python code generation using CodeParrot subset. Built causal self-attention, positional and token embeddings, and greedy decoding pipeline.' },
]

const extracurricular = [
  'Kaggle Top 15% in Road Accident Risk competition — Global Rank 588 out of 4000+ teams, achieving R² = 0.886 with an ensemble of 8 XGBoost models and 80+ engineered features.',
]

const certificates = [
  { name: 'OCI 2025 AI Foundations Associate', issuer: 'Oracle University', image: oracleImg },
  { name: 'Machine Learning Exam Basics', issuer: 'Amazon Web Services', image: awsImg },
  { name: 'Deep Learning with TensorFlow', issuer: 'IBM', image: ibmImg },
  { name: 'Generative AI, LLM & RAG', issuer: 'GeeksforGeeks', image: gfgImg },
  { name: 'Machine Learning & Data Science', issuer: 'Cipher Schools', image: cipherImg },
]

const tabColors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#06b6d4', '#3b82f6']

const tabContentVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, staggerChildren: 0.08 } },
  exit: { opacity: 0, y: -15, scale: 0.98, transition: { duration: 0.25 } }
}

function ScrollRevealItem({ children, index = 0 }) {
  const { ref, inView } = useScrollAnimation({ rootMargin: '0px 0px -20px 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {children}
    </motion.div>
  )
}

export default function Resume() {
  const [activeTab, setActiveTab] = useState('Education')
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <section className="relative min-h-[calc(100vh-72px)] py-24 z-10">
        <div className="mx-auto max-w-4xl px-6">

          {/* Back button */}
          <motion.button
            onClick={() => navigate('/')}
            className="mb-8 font-mono text-xs font-bold text-[var(--t3)] hover:text-[var(--accent1)] transition-colors flex items-center gap-2"
            whileHover={{ x: -3 }}
          >
            <span className="text-lg">←</span> Back to Portfolio
          </motion.button>

          {/* Header Section */}
          <div className="text-center mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.div
                  className="h-[2px] w-12 rounded-full"
                  style={{ background: 'linear-gradient(90deg, transparent, var(--accent1))' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                />
                <span className="font-mono text-xs text-[var(--accent1)] tracking-widest uppercase font-bold">Curriculum Vitae</span>
                <motion.div
                  className="h-[2px] w-12 rounded-full"
                  style={{ background: 'linear-gradient(90deg, var(--accent1), transparent)' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                />
              </div>
              <motion.h1
                className="font-display text-5xl font-extrabold tracking-tight mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                <span className="gradient-text">Interactive</span>{' '}
                <span className="text-[var(--t1)]">Resume</span>
              </motion.h1>

              {/* Contact Chips */}
              <motion.div
                className="mt-4 flex flex-wrap justify-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {[
                  { text: '✉️ marusathvikreddy@gmail.com', href: 'mailto:marusathvikreddy@gmail.com' },
                  { text: '📱 +91-6305096050', href: 'tel:+916305096050' },
                  { text: '🔗 LinkedIn ↗', href: 'https://www.linkedin.com/in/maru-sathvik-reddy-/' },
                  { text: '💻 GitHub ↗', href: 'https://github.com/Sathvik33' },
                ].map((chip) => (
                  <motion.a
                    key={chip.text}
                    href={chip.href}
                    target={chip.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="glass-card px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[var(--t2)] hover:text-[var(--accent1)] hover:border-[var(--accent1)] transition-all"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {chip.text}
                  </motion.a>
                ))}
              </motion.div>

              {/* Download PDF */}
              <motion.div className="mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                <a
                  href="/Sathvik_CV.pdf"
                  download="Sathvik_CV.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-bold text-sm text-white shadow-md hover:shadow-lg transition-shadow"
                  style={{ background: 'var(--gradient)' }}
                >
                  ↓ Download PDF
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-12 flex flex-wrap justify-center gap-3 border-b border-[var(--border)] pb-6">
            {tabs.map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative rounded-full px-6 py-2.5 text-xs font-mono font-bold transition-all duration-300 ${
                  activeTab === tab
                  ? 'text-white'
                  : 'text-[var(--t2)] border border-[var(--border)] bg-[var(--panel)] hover:border-[var(--accent1)] hover:text-[var(--accent1)]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'var(--gradient)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </motion.button>
            ))}
          </div>

          {/* Dynamic Content Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >

              {/* Education Tab */}
              {activeTab === 'Education' && (
                <div className="space-y-6">
                  {education.map((item, index) => (
                    <ScrollRevealItem key={item.title} index={index}>
                      <motion.div
                        className="glass-card rounded-xl p-8 relative overflow-hidden"
                        whileHover={{ y: -3 }}
                      >
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 rounded-full" style={{ background: tabColors[index % tabColors.length] }} />
                        <div className="pl-4">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4 border-b border-[var(--border)] pb-4">
                            <div>
                              <div className="text-2xl font-display font-bold text-[var(--t1)] mb-1">{item.title}</div>
                              <div className="text-sm font-mono text-[var(--t3)]">{item.location}</div>
                            </div>
                            <span className="inline-block rounded-full px-3 py-1 text-xs font-mono font-bold text-[var(--accent1)] whitespace-nowrap" style={{ background: 'var(--accent-soft)' }}>
                              {item.period}
                            </span>
                          </div>
                          <p className="mt-4 text-base font-bold text-[var(--t2)]">{item.detail}</p>
                          <p className="text-sm text-[var(--t2)] font-mono mt-2 inline-block px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--panel)]">{item.score}</p>
                        </div>
                      </motion.div>
                    </ScrollRevealItem>
                  ))}
                </div>
              )}

              {/* Skills Tab */}
              {activeTab === 'Skills' && (
                <div className="grid gap-6 sm:grid-cols-2">
                  {skillsGroups.map((group, gi) => (
                    <ScrollRevealItem key={group.title} index={gi}>
                      <motion.div
                        className="glass-card rounded-xl p-8"
                        whileHover={{ y: -3 }}
                      >
                        <div className="mb-6 text-sm font-mono font-bold uppercase tracking-widest border-b border-[var(--border)] pb-3" style={{ color: tabColors[gi % tabColors.length] }}>
                          {group.title}
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                          {group.items.map(item => (
                            <motion.span
                              key={item}
                              className="skill-tag cursor-default font-bold"
                              whileHover={{ scale: 1.1, borderColor: tabColors[gi % tabColors.length], color: tabColors[gi % tabColors.length] }}
                            >
                              {item}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    </ScrollRevealItem>
                  ))}
                </div>
              )}

              {/* Projects Tab */}
              {activeTab === 'Projects' && (
                <div className="space-y-6">
                  {projectItems.map((p, pi) => (
                    <ScrollRevealItem key={p.title} index={pi}>
                      <motion.div
                        className="glass-card rounded-xl p-8"
                        whileHover={{ y: -3 }}
                      >
                        <div className="border-b border-[var(--border)] pb-4 mb-4">
                          <div className="text-2xl font-display font-bold text-[var(--accent1)]">{p.title}</div>
                          <p className="text-xs font-mono font-bold text-[var(--t3)] mt-2 uppercase tracking-widest">{p.subtitle}</p>
                        </div>
                        <p className="text-base text-[var(--t2)] leading-relaxed">{p.description}</p>
                      </motion.div>
                    </ScrollRevealItem>
                  ))}
                </div>
              )}

              {/* Extracurricular Tab */}
              {activeTab === 'Extracurricular' && (
                <div className="space-y-6">
                  {extracurricular.map((item, index) => (
                    <ScrollRevealItem key={index} index={index}>
                      <motion.div
                        className="glass-card rounded-xl p-8 flex gap-4"
                        whileHover={{ y: -3 }}
                      >
                        <span className="mt-1 font-bold" style={{ color: tabColors[index % tabColors.length] }}>―</span>
                        <p className="text-base text-[var(--t2)] leading-relaxed">{item}</p>
                      </motion.div>
                    </ScrollRevealItem>
                  ))}
                </div>
              )}

              {/* Certificates Tab */}
              {activeTab === 'Certificates' && (
                <div className="grid gap-6 sm:grid-cols-2">
                  {certificates.map((item, index) => (
                    <ScrollRevealItem key={index} index={index}>
                      <motion.div
                        className="glass-card rounded-xl overflow-hidden flex flex-col group"
                        whileHover={{ y: -4 }}
                      >
                        <div className="h-56 w-full bg-[var(--panel)] border-b border-[var(--border)] overflow-hidden flex items-center justify-center relative">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                            />
                          ) : (
                            <span className="font-mono text-xs text-[var(--t3)]">Certificate</span>
                          )}
                        </div>
                        <div className="p-6 flex flex-col justify-center">
                          <div className="text-lg font-display font-bold text-[var(--t1)] mb-2 group-hover:text-[var(--accent1)] transition-colors">
                            {item.name}
                          </div>
                          <div className="text-xs font-mono font-bold text-[var(--t3)] uppercase tracking-wider">
                            {item.issuer}
                          </div>
                        </div>
                      </motion.div>
                    </ScrollRevealItem>
                  ))}
                </div>
              )}

            </motion.div>
          </AnimatePresence>

        </div>
      </section>
    </motion.div>
  )
}