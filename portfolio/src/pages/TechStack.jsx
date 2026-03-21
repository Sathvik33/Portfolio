import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { useState, useRef } from 'react'

const categories = [
  {
    id: 'ai-ml',
    label: '01',
    title: 'AI / ML',
    desc: 'Architectures and pipelines built from the ground up.',
    icon: '⚡',
    color: '#0f172a', /* Professional Slate Black */
    span: 'col-span-1 md:col-span-2 lg:col-span-2',
    skills: [
      { name: 'PyTorch', context: 'Built transformers, autoencoders, and diffusion models from scratch' },
      { name: 'Transformers', context: 'Implemented GPT-style decoder-only architecture (PyPilot)' },
      { name: 'Scikit-learn', context: 'Feature engineering, ensemble methods, Kaggle top 15%' },
      { name: 'HuggingFace', context: 'Datasets, tokenizers, model hub for fine-tuning' },
      { name: 'XGBoost', context: 'Accident risk prediction, Optuna hyperparameter tuning' },
      { name: 'OpenCV', context: 'Image preprocessing, denoising pipeline, video frame extraction' },
      { name: 'CUDA', context: 'GPU-accelerated training, custom CUDA kernel experience' },
      { name: 'Pandas / NumPy', context: 'Data wrangling, feature engineering, analysis' },
      { name: 'CNNs / RNNs', context: 'Classification, sequence modeling, time-series prediction' },
      { name: 'Diffusion Models', context: 'DDPM, DDIM, noise scheduling, image synthesis' },
      { name: 'Attention Mechanisms', context: 'Multi-head self-attention, cross-attention, positional encoding' },
      { name: 'Sentence-Transformers', context: 'Semantic similarity, GPU embeddings, vector search' },
    ],
  },
  {
    id: 'agentic',
    label: '02',
    title: 'Agentic AI',
    desc: 'Stateful, multi-actor systems that plan, reason, and act.',
    icon: '◈',
    color: '#0284c7',
    span: 'col-span-1 md:col-span-2 lg:col-span-2',
    skills: [
      { name: 'LangChain', context: 'Multi-agent orchestration, tool calling, memory management' },
      { name: 'LangGraph', context: 'Stateful agent workflows, research automation pipelines' },
      { name: 'LangSmith', context: 'Tracing, evaluation, and debugging of LLM applications' },
      { name: 'RAG Pipelines', context: 'Semantic chunking, ChromaDB, production retrieval systems' },
      { name: 'Ollama', context: 'Local LLM deployment, model management, API integration' },
      { name: 'Tool Calling', context: 'Custom tool definitions, API integration for agents' },
      { name: 'Multi-Agent', context: 'Planner-researcher-writer pipelines, role-based agents' },
      { name: 'ChromaDB', context: 'Vector store for semantic search, RAG document retrieval' },
    ],
  },
  {
    id: 'backend',
    label: '03',
    title: 'Backend & Infra',
    desc: 'Production systems built to handle real load.',
    icon: '▲',
    color: '#b45309',
    span: 'col-span-1 md:col-span-2 lg:col-span-2',
    skills: [
      { name: 'FastAPI', context: 'REST APIs, streaming responses, WebSocket, async endpoints' },
      { name: 'PostgreSQL', context: 'Schema design, complex queries, SQLAlchemy ORM' },
      { name: 'Docker', context: 'Multi-stage builds, compose, containerized ML pipelines' },
      { name: 'Redis', context: 'Caching layer, semantic cache for RAG systems' },
      { name: 'Nginx', context: 'Reverse proxy, load balancing, SSL termination' },
      { name: 'Linux / Bash', context: 'Server management, automation scripts, deployment pipelines' },
      { name: 'AWS', context: 'EC2, S3, Lambda — cloud deployment and managed services' },
      { name: 'Render', context: 'Fast web service deployments, background workers, cron jobs' },
      { name: 'Vercel', context: 'Frontend deployments, edge functions, CI/CD from GitHub' },
    ],
  },
  {
    id: 'frontend',
    label: '04',
    title: 'Frontend & Languages',
    desc: "The stack behind what you're looking at — and the languages I think in.",
    icon: '{ }',
    color: '#047857',
    span: 'col-span-1 md:col-span-2 lg:col-span-2',
    skills: [
      { name: 'Python', context: 'Primary language — ML, backend, scripting, automation' },
      { name: 'C++', context: 'Data structures, algorithms, competitive programming' },
      { name: 'React', context: 'Component architecture, hooks, Framer Motion, this portfolio' },
      { name: 'Tailwind CSS', context: 'Utility-first styling, responsive design, dark mode' },
      { name: 'Framer Motion', context: 'Scroll animations, layout transitions, gesture-based UI' },
      { name: 'Streamlit', context: 'Rapid prototyping dashboards, interactive ML demos' },
      { name: 'Git', context: 'Version control, branching strategies, collaborative workflows' },
    ],
  },
]

// ── Pill with zoom + frosted-light tooltip (dark text, no bleed) ──
function SkillPill({ skill, catColor }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{ position: 'relative', zIndex: hovered ? 999 : 1, overflow: 'visible' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Pill */}
      <motion.span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '8px 14px',
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '12px',
          fontWeight: 600,
          cursor: 'default',
          userSelect: 'none',
          border: '1px solid var(--border)',
          color: 'var(--t2)',
          background: 'var(--panel)',
          whiteSpace: 'nowrap',
        }}
        animate={
          hovered
            ? {
                scale: 1.12,
                y: -4,
                color: catColor,
                borderColor: catColor,
                backgroundColor: `${catColor}0f`,
                boxShadow: `0 8px 28px ${catColor}30`,
              }
            : {
                scale: 1,
                y: 0,
                boxShadow: '0 0 0 0 transparent',
              }
        }
        transition={{ type: 'spring', stiffness: 460, damping: 28 }}
      >
        {skill.name}
      </motion.span>

      {/* Tooltip — frosted white/light glass, dark text */}
      <AnimatePresence>
        {hovered && skill.context && (
          <motion.div
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 14px)',
              left: '50%',
              translateX: '-50%',
              width: '232px',
              zIndex: 9999,
              pointerEvents: 'none',
              overflow: 'visible',
            }}
            initial={{ opacity: 0, y: 8, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.88 }}
            transition={{ duration: 0.2, ease: [0.34, 1.2, 0.64, 1] }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                border: `1px solid rgba(0,0,0,0.08)`,
                boxShadow: `
                  0 20px 60px rgba(0,0,0,0.18),
                  0 4px 16px rgba(0,0,0,0.10),
                  0 0 0 1px rgba(255,255,255,0.7) inset
                `,
              }}
            >
              {/* Solid opaque white base — blocks ALL background bleed */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.97)',
                  zIndex: 0,
                }}
              />
              {/* Frosted glass layer for depth */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backdropFilter: 'blur(20px) saturate(1.8)',
                  WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
                  zIndex: 1,
                }}
              />

              {/* Content */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  padding: '13px 16px',
                  textAlign: 'center',
                }}
              >
                {/* Thin top accent line */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2.5px',
                    background: catColor,
                    borderRadius: '12px 12px 0 0',
                  }}
                />

                {/* Skill name */}
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'monospace',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: catColor,
                    marginTop: '4px',
                    marginBottom: '6px',
                  }}
                >
                  {skill.name}
                </span>

                {/* Context */}
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                    fontSize: '12px',
                    lineHeight: '1.6',
                    color: 'rgba(15, 20, 30, 0.82)',
                    fontWeight: 400,
                  }}
                >
                  {skill.context}
                </span>
              </div>
            </div>

            {/* Arrow */}
            <div
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: '50%',
                transform: 'translateX(-50%) rotate(45deg)',
                width: '11px',
                height: '11px',
                backgroundColor: 'rgba(255,255,255,0.97)',
                borderRight: '1px solid rgba(0,0,0,0.08)',
                borderBottom: '1px solid rgba(0,0,0,0.08)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

export default function TechStack() {
  const containerRef = useRef(null)

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
      style={{ overflow: 'visible' }}
      ref={containerRef}
    >
      {/* Subtle ambient glows */}
      <motion.div
        className="absolute right-[-80px] top-1/4 w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0f172a18 0%, transparent 70%)', y: bgY }}
      />
      <motion.div
        className="absolute left-[-60px] bottom-1/4 w-[280px] h-[280px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0284c714 0%, transparent 70%)', y: bgY }}
      />

      <motion.div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10" style={{ overflow: 'visible', y: contentY }}>

        {/* ── Header — professional rewrite ── */}
        <div className="mb-16">
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[11px] text-[var(--accent1)] tracking-[0.18em] uppercase font-bold">
              02 · Tech Stack
            </span>
            <motion.div
              className="h-px flex-1 max-w-[120px]"
              style={{ background: 'var(--border)', transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          <motion.h2
            className="font-display font-extrabold leading-[1.12] mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <span className="text-[var(--t1)]">The stack I've </span>
            <span className="text-[var(--accent1)]">actually shipped with</span>
          </motion.h2>

          <motion.p
            className="font-body text-base text-[var(--t3)] max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.5 }}
          >
            Each tool here represents real production use — not tutorials, not demos.
            Hover any skill to see what I've built with it.
          </motion.p>
        </div>

        {/* ── Cards ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          style={{ overflow: 'visible' }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              variants={cardVariants}
              className={`
                group relative rounded-2xl border border-[var(--border)]
                bg-[var(--surface)]
                transition-all duration-400
                hover:border-[var(--border)] hover:shadow-lg
                ${cat.span} p-6
              `}
              style={{ overflow: 'visible' }}
              whileHover={{ y: -3, transition: { duration: 0.25 } }}
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: cat.color }}
              />

              <div className="relative z-10 h-full flex flex-col" style={{ overflow: 'visible' }}>

                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[13px] shrink-0"
                    style={{
                      background: `${cat.color}12`,
                      color: cat.color,
                      border: `1px solid ${cat.color}25`,
                    }}
                  >
                    {cat.icon}
                  </div>
                  <div>
                    <p className="font-mono text-[9px] text-[var(--t3)] tracking-widest uppercase mb-0.5">
                      {cat.label}
                    </p>
                    <h3
                      className="font-display font-bold text-[15px] text-[var(--t1)] leading-tight"
                    >
                      {cat.title}
                    </h3>
                  </div>
                </div>

                <p className="font-body text-[13px] text-[var(--t3)] mb-5 leading-relaxed pl-0">
                  {cat.desc}
                </p>

                {/* Divider */}
                <div
                  className="mb-5 h-px"
                  style={{ background: 'var(--border)' }}
                />

                {/* Pills */}
                <div
                  className="flex flex-wrap gap-2 mt-auto"
                  style={{ overflow: 'visible' }}
                >
                  {cat.skills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.035, duration: 0.28 }}
                      style={{ overflow: 'visible' }}
                    >
                      <SkillPill skill={skill} catColor={cat.color} />
                    </motion.div>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  )
}