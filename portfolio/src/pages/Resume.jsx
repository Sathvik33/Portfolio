import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'

// Importing your uploaded certificate images
import awsImg from '../images/AWS ML Exam.png'
import ibmImg from '../images/Deep Learning with TensorFlow.png'
import gfgImg from '../images/Generative AI GFG.png'
import cipherImg from '../images/machine learning for datascience -cipherschools.png'

// NOTE: Take a screenshot of your Oracle PDF, name it exactly "Oracle_AI.png", 
// and put it in the src/images/ folder for this to show up properly!
import oracleImg from '../images/Oracle_AI.png' 

const tabs = ['Education', 'Skills', 'Projects', 'Extracurricular', 'Certificates']

const education = [
  {
    title: 'Lovely Professional University',
    location: 'Punjab, India',
    period: 'Since August 2023',
    detail: 'B.Tech in Computer Science and Engineering',
    score: 'CGPA: 7.28*',
  },
  {
    title: "Sri Chaitanya Junior College",
    location: 'Hyderabad, Telangana',
    period: 'April 2021 - March 2023',
    detail: 'Intermediate',
    score: 'Percentage: 88.9%',
  },
  {
    title: 'Wisdom Spaes School',
    location: 'Metpally, Telangana',
    period: 'March 2021',
    detail: 'High School',
    score: 'Percentage: 100%',
  },
]

const skillsGroups = [
  { title: 'Programming & Foundations', items: ['Python', 'C++', 'Java'] },
  { title: 'AI/ML Libraries', items: ['PyTorch', 'Transformers', 'Scikit-learn', 'NumPy', 'Pandas', 'OpenCV', 'LangChain', 'LangGraph'] },
  { title: 'Tools & Platforms', items: ['MySQL', 'Git', 'GitHub', 'VS Code', 'Docker', 'Redis'] },
  { title: 'Soft Skills', items: ['Problem-Solving', 'Team Work', 'Adaptability'] },
]

const projectItems = [
  {
    title: 'ResearchForge AI',
    subtitle: 'Local multi-agent research assistant',
    description: 'LangGraph + Ollama powered system for semantic caching, hybrid report generation, versioned analytical reports, and agentic chat.',
  },
  {
    title: 'Multi-Modal RAG System',
    subtitle: 'Production-grade multimodal retrieval system',
    description: 'Ingest documents/images/videos, ChromaDB vector indexing, streaming inference, and multi-agent retrieval-first architecture.',
  },
  {
    title: 'Autoregressive Transformer for Python Code Gen',
    subtitle: 'GitHub project · Nov 25',
    description: 'Implemented decoder-only Transformer for autoregressive Python code generation using CodeParrot subset. Built causal self-attention, positional and token embeddings, and greedy decoding pipeline.',
  },
]

const extracurricular = [
  'Machine Learning - Elevate Labs (Apr’ 25 – May’ 25): Gained hands-on experience in Supervised and Unsupervised Machine Learning, with strong understanding of core algorithms, feature engineering, and model evaluation techniques. Built a resume ranking system using cosine similarity to match resumes with job descriptions, automating candidate screening through text preprocessing and relevance scoring. Tech: Python, Pandas, Scikit-learn, NLP.',
  'Kaggle Top 15% in Road Accident Risk competition',
  'Open-source contributor: AI tools and research pipelines',
  'Volunteer mentor for ML study groups and Kaggle teams',
]

// Certificates updated to hold Image variables
const certificates = [
  {
    name: 'OCI 2025 AI Foundations Associate',
    issuer: 'Oracle University',
    image: oracleImg,
  },
  {
    name: 'Machine Learning Exam Basics',
    issuer: 'Amazon Web Services',
    image: awsImg,
  },
  {
    name: 'Deep Learning with TensorFlow',
    issuer: 'IBM',
    image: ibmImg,
  },
  {
    name: 'Generative AI, LLM & RAG',
    issuer: 'GeeksforGeeks',
    image: gfgImg,
  },
  {
    name: 'Machine Learning & Data Science',
    issuer: 'Cipher Schools',
    image: cipherImg,
  },
]

// Animation variants
const tabVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.1 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
}

export default function Resume() {
  const [activeTab, setActiveTab] = useState('Education')

  return (
    <PageWrapper>
      <section className="relative min-h-[calc(100vh-72px)] py-24 z-10">
        <div className="mx-auto max-w-4xl px-6">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-12 bg-[var(--border)]" />
                <span className="font-mono text-xs text-[var(--t1)] tracking-widest uppercase font-bold">05 · Curriculum Vitae</span>
                <div className="h-px w-12 bg-[var(--border)]" />
              </div>
              <h1 className="font-display text-5xl font-extrabold text-[var(--t1)] tracking-tight mb-6">Interactive Resume</h1>
              
              {/* Contact Chips */}
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <a href="mailto:marusathvikreddy@gmail.com" className="outline-card px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[var(--t2)] bg-white hover:text-[var(--t1)] hover:border-[var(--t1)] transition-colors">✉️ marusathvikreddy@gmail.com</a>
                <a href="tel:+916305096050" className="outline-card px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[var(--t2)] bg-white hover:text-[var(--t1)] hover:border-[var(--t1)] transition-colors">📱 +91-6305096050</a>
                <a href="https://www.linkedin.com/in/maru-sathvik-reddy-/" target="_blank" rel="noreferrer" className="outline-card px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[var(--t2)] bg-white hover:text-[var(--t1)] hover:border-[var(--t1)] transition-colors">🔗 LinkedIn ↗</a>
                <a href="https://github.com/Sathvik33" target="_blank" rel="noreferrer" className="outline-card px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[var(--t2)] bg-white hover:text-[var(--t1)] hover:border-[var(--t1)] transition-colors">💻 GitHub ↗</a>
              </div>
            </motion.div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-12 flex flex-wrap justify-center gap-3 border-b border-[var(--border)] pb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-6 py-2.5 text-xs font-mono font-bold transition-all duration-300 shadow-sm ${
                  activeTab === tab 
                  ? 'bg-[var(--t1)] text-white border border-[var(--t1)]' 
                  : 'bg-white text-[var(--t2)] border border-[var(--border)] hover:border-[var(--t1)] hover:text-[var(--t1)]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Dynamic Content Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            >
              
              {/* Education Tab */}
              {activeTab === 'Education' && (
                <div className="space-y-6">
                  {education.map((item) => (
                    <motion.div variants={itemVariants} key={item.title} className="outline-card rounded-xl p-8 bg-white">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4 border-b border-[var(--border)] pb-4">
                        <div>
                          <div className="text-2xl font-display font-bold text-[var(--t1)] mb-1">{item.title}</div>
                          <div className="text-sm font-mono text-[var(--t3)]">{item.location}</div>
                        </div>
                        <span className="inline-block rounded-full bg-[var(--panel)] border border-[var(--border)] px-3 py-1 text-xs font-mono font-bold text-[var(--t1)] whitespace-nowrap">
                          {item.period}
                        </span>
                      </div>
                      <p className="mt-4 text-base font-bold text-[var(--t2)]">{item.detail}</p>
                      <p className="text-sm text-[var(--t2)] font-mono mt-2 bg-[var(--surface)] inline-block px-3 py-1 rounded border border-[var(--border)]">{item.score}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Skills Tab */}
              {activeTab === 'Skills' && (
                <div className="grid gap-6 sm:grid-cols-2">
                  {skillsGroups.map((group) => (
                    <motion.div variants={itemVariants} key={group.title} className="outline-card rounded-xl p-8 bg-white">
                      <div className="mb-6 text-sm font-mono font-bold text-[var(--t1)] uppercase tracking-widest border-b border-[var(--border)] pb-3">
                        {group.title}
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {group.items.map(item => (
                          <span key={item} className="skill-tag cursor-default text-[var(--t2)] font-bold shadow-sm">
                            {item}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Projects Tab */}
              {activeTab === 'Projects' && (
                <div className="space-y-6">
                  {projectItems.map((p) => (
                    <motion.div variants={itemVariants} key={p.title} className="outline-card rounded-xl p-8 bg-white">
                      <div className="border-b border-[var(--border)] pb-4 mb-4">
                        <div className="text-2xl font-display font-bold text-[var(--t1)]">{p.title}</div>
                        <p className="text-xs font-mono font-bold text-[var(--t3)] mt-2 uppercase tracking-widest">{p.subtitle}</p>
                      </div>
                      <p className="text-base text-[var(--t2)] leading-relaxed">{p.description}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Extracurricular Tab */}
              {activeTab === 'Extracurricular' && (
                <div className="space-y-6">
                  {extracurricular.map((item, index) => (
                    <motion.div variants={itemVariants} key={index} className="outline-card rounded-xl p-8 bg-white flex gap-4">
                      <span className="text-[var(--t1)] mt-1 font-bold">―</span>
                      <p className="text-base text-[var(--t2)] leading-relaxed">{item}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Certificates Tab (Now displaying images!) */}
              {activeTab === 'Certificates' && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                  {certificates.map((item, index) => (
                    <motion.div variants={itemVariants} key={index} className="outline-card rounded-xl overflow-hidden bg-white flex flex-col group border border-[var(--border)] hover:border-[var(--t1)] transition-colors duration-300">
                      
                      {/* Image Preview Box */}
                      <div className="h-56 w-full bg-[var(--surface)] border-b border-[var(--border)] overflow-hidden flex items-center justify-center relative">
                        {item.image ? (
                           <img 
                             src={item.image} 
                             alt={item.name} 
                             className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                           />
                         ) : (
                           <span className="font-mono text-xs text-[var(--t3)]">Screenshot Missing</span>
                         )}
                      </div>

                      {/* Text details below the image */}
                      <div className="p-6 flex flex-col justify-center bg-white">
                        <div className="text-lg font-display font-bold text-[var(--t1)] mb-2 group-hover:underline decoration-[var(--border)] underline-offset-4">
                          {item.name}
                        </div>
                        <div className="text-xs font-mono font-bold text-[var(--t3)] uppercase tracking-wider">
                          {item.issuer}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

            </motion.div>
          </AnimatePresence>
          
        </div>
      </section>
    </PageWrapper>
  )
}