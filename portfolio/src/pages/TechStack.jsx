import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { useState, useRef } from 'react'

const tabs = [
  {
    id: 'languages',
    label: '01',
    title: 'Programming Languages',
    desc: 'The core syntaxes I use to communicate with machines.',
    color: '#8b5cf6', // Violet
    skills: [
      { name: 'Python', context: 'Primary language for ML, backend, and scripting', progress: 95 },
      { name: 'C++', context: 'Data structures, algorithms, compiled performance', progress: 85 },
      { name: 'SQL', context: 'Database querying, aggregations, schema design', progress: 90 },
    ]
  },
  {
    id: 'ai-ml',
    label: '02',
    title: 'AI & ML',
    desc: 'Neural architectures and stateful agentic workflows.',
    color: '#0ea5e9', // Sky blue
    skills: [
      { name: 'PyTorch / CUDA', context: 'Custom model training and GPU acceleration', progress: 92 },
      { name: 'Transformers', context: 'Decoder-only architectures, attention mechanisms', progress: 90 },
      { name: 'LangChain / LangGraph', context: 'Multi-agent orchestration, state workflows', progress: 88 },
      { name: 'LangSmith', context: 'Tracing, evaluation, and debugging of LLM applications', progress: 85 },
      { name: 'RAG / ChromaDB', context: 'Semantic retrieval, chunking, vector operations', progress: 85 },
      { name: 'Scikit-learn', context: 'Ensemble methods, classical ML algorithms', progress: 90 },
      { name: 'HuggingFace', context: 'Datasets, tokenizers, model pipelines', progress: 85 },
      { name: 'Computer Vision', context: 'OpenCV, CNNs, image processing pipelines', progress: 80 },
      { name: 'Pandas / NumPy', context: 'Data wrangling, feature engineering, arrays', progress: 95 },
    ]
  },
  {
    id: 'fullstack',
    label: '03',
    title: 'Frontend & Backend',
    desc: 'Building and connecting the interfaces and APIs.',
    color: '#10b981', // Emerald
    skills: [
      { name: 'FastAPI', context: 'REST APIs, async endpoints, WebSockets', progress: 90 },
      { name: 'Streamlit', context: 'Rapid prototyping dashboards, interactive ML demos', progress: 85 },
      { name: 'PostgreSQL', context: 'Relational data, SQLAlchemy ORM, migrations', progress: 85 },
      { name: 'Tailwind CSS', context: 'Utility-first styling, responsive design', progress: 92 },
      { name: 'Git', context: 'Version control, branching, collaborative workflows', progress: 90 },
    ]
  },
  {
    id: 'cloud-infra',
    label: '04',
    title: 'Cloud & Infrastructure',
    desc: 'Deploying, scaling, and maintaining production environments.',
    color: '#f59e0b', // Amber
    skills: [
      { name: 'Docker', context: 'Containerization, multi-stage builds, compose', progress: 88 },
      { name: 'Linux / Bash', context: 'Server administration, shell scripting', progress: 85 },
      { name: 'Redis', context: 'In-memory caching, message brokering, semantic cache', progress: 80 },
      { name: 'Nginx', context: 'Reverse proxy, load balancing, SSL termination', progress: 85 },
      { name: 'AWS', context: 'EC2, S3, RDS, remote deployments', progress: 80 },
      { name: 'Render & Vercel', context: 'PaaS deployments, CD pipelines, edge functions', progress: 85 },
    ]
  }
]

function ProgressBar({ skill, color, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="mb-7 flex flex-col"
    >
      <div className="flex justify-between items-end mb-2">
        <div className="pr-4">
          <h4 className="font-display font-bold text-[14px] text-[var(--t1)] tracking-tight leading-none mb-1.5">{skill.name}</h4>
          <p className="font-body text-[12px] text-[var(--t3)] leading-relaxed truncate sm:whitespace-normal">{skill.context}</p>
        </div>
        <span className="font-mono text-[11px] font-bold tracking-wider mb-0.5" style={{ color }}>{skill.progress}%</span>
      </div>
      <div className="h-2 w-full bg-[var(--border)] rounded-full overflow-hidden relative shadow-inner">
        <motion.div 
          className="absolute left-0 top-0 bottom-0 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${skill.progress}%` }}
          transition={{ duration: 1.2, delay: delay + 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle gradient shimmer on the progress bar */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full -skew-x-12 opacity-50" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function TechStack() {
  const containerRef = useRef(null)
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const activeContent = tabs.find(t => t.id === activeTab)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const bgY = useTransform(smoothProgress, [0, 1], [80, -80])
  const contentY = useTransform(smoothProgress, [0, 1], [40, -40])

  return (
    <section
      id="skills"
      className="section-padding relative"
      style={{ overflow: 'hidden' }}
      ref={containerRef}
    >
      {/* Subtle ambient glows */}
      <motion.div
        className="absolute right-[-80px] top-1/4 w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0ea5e912 0%, transparent 70%)', y: bgY }}
      />
      <motion.div
        className="absolute left-[-60px] bottom-1/4 w-[280px] h-[280px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8b5cf612 0%, transparent 70%)', y: bgY }}
      />

      <motion.div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10" style={{ y: contentY }}>

        {/* ── Header ── */}
        <div className="mb-14">
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[11px] text-[var(--accent1)] tracking-[0.18em] uppercase font-bold">
              02 · Tech Stack
            </span>
            <motion.div
              className="h-px flex-1 max-w-[120px]"
              style={{ background: 'var(--border)', transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          <motion.h2
            className="font-display font-extrabold leading-[1.12] mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <span className="text-[var(--t1)]">My Technical </span>
            <span className="text-[var(--accent1)]">Arsenal</span>
          </motion.h2>

          <motion.p
            className="font-body text-base text-[var(--t3)] max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.28, duration: 0.5 }}
          >
            Everything here represents hands-on experience—from building neural networks from scratch to assembling agentic workflows. Click a section to view proficiency details.
          </motion.p>
        </div>

        {/* ── Interactive Tabs & Progress Layout ── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Tabs Sidebar */}
          <div className="flex flex-col gap-3 lg:w-[320px] shrink-0">
            {tabs.map((tab, i) => (
              <motion.button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
                className={`
                  text-left px-6 py-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group
                  ${activeTab === tab.id 
                    ? 'bg-[var(--surface)] border-[var(--border)] shadow-md' 
                    : 'bg-transparent border-transparent hover:bg-[var(--surface)] hover:border-[var(--border)]'}
                `}
              >
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className="absolute left-0 top-0 bottom-0 w-[4px]"
                    style={{ backgroundColor: tab.color }}
                  />
                )}
                
                {/* Border hover effect for non-active tabs */}
                {activeTab !== tab.id && (
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-[4px] opacity-0 group-hover:opacity-40 transition-opacity"
                    style={{ backgroundColor: tab.color }}
                  />
                )}
                
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--t3)]">{tab.label}</span>
                </div>
                <h3 className={`font-display font-bold text-[17px] tracking-tight mb-1.5 transition-colors ${activeTab === tab.id ? 'text-[var(--t1)]' : 'text-[var(--t2)]'}`}>
                  {tab.title}
                </h3>
                <p className="font-body text-[13px] text-[var(--t3)] pr-2 leading-relaxed">
                  {tab.desc}
                </p>
              </motion.button>
            ))}
          </div>

          {/* Progress Bars Content View */}
          <motion.div 
            className="flex-1 glass-card p-6 sm:p-8 lg:p-10 relative overflow-hidden min-h-[500px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Very faint background tint for active tab */}
            <motion.div 
              className="absolute inset-0 opacity-[0.03] transition-colors duration-500"
              style={{ backgroundColor: activeContent.color }} 
            />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative z-10"
              >
                {/* Active Section Header */}
                <div className="mb-8 pb-6 border-b border-[var(--border)] flex items-center gap-4">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{ backgroundColor: `${activeContent.color}15`, borderColor: `${activeContent.color}30` }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeContent.color }} />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-extrabold text-[var(--t1)] tracking-tight">
                      {activeContent.title}
                    </h3>
                    <p className="font-mono text-[10px] text-[var(--t3)] uppercase tracking-widest mt-1.5">
                      {activeContent.skills.length} Technologies
                    </p>
                  </div>
                </div>

                {/* Grid of Progress Bars */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1 mt-6">
                  {activeContent.skills.map((skill, index) => (
                    <ProgressBar 
                      key={skill.name} 
                      skill={skill} 
                      color={activeContent.color} 
                      delay={0.1 + (index * 0.06)} 
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}