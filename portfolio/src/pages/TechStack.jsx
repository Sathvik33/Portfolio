import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import useScrollAnimation from '../hooks/useScrollAnimation'

// -- Data --
const coreStrengths = [
  { title: "Python Ecosystem", desc: "Advanced proficiency in building scalable ML pipelines and backend services.", icon: "🐍" },
  { title: "LLMs & RAG", desc: "Designing context-aware generative systems with precise semantic retrieval.", icon: "🧠" },
  { title: "LangGraph Agents", desc: "Architecting stateful, multi-actor workflow and autonomous agents.", icon: "🤖" },
  { title: "High-Perf APIs", desc: "Deploying low-latency AI microservices with FastAPI & Redis.", icon: "⚡" },
]

const bentoCategories = [
  {
    title: "Generative AI",
    span: "col-span-1 md:col-span-2 lg:col-span-2",
    icon: "✨",
    bgColor: "from-blue-500/5 to-purple-500/5",
    borderColor: "hover:border-blue-400/50",
    skills: ["Large Language Models (LLMs)", "Retrieval-Augmented Gen (RAG)", "Diffusion Models", "Transformers", "Prompt Engineering", "HuggingFace"]
  },
  {
    title: "Agentic AI",
    span: "col-span-1 md:col-span-2 lg:col-span-2",
    icon: "🌐",
    bgColor: "from-purple-500/5 to-pink-500/5",
    borderColor: "hover:border-purple-400/50",
    skills: ["LangChain", "LangGraph", "Multi-Agent Systems", "Tool Calling APIs", "Autonomous Agents", "Ollama"]
  },
  {
    title: "Backend & APIs",
    span: "col-span-1 md:col-span-1 lg:col-span-1",
    icon: "⚙️",
    bgColor: "from-emerald-500/5 to-teal-500/5",
    borderColor: "hover:border-[var(--accent1)]/50",
    skills: ["FastAPI", "RESTful APIs", "Flask"]
  },
  {
    title: "AI / Machine Learning",
    span: "col-span-1 md:col-span-2 lg:col-span-2",
    icon: "🔬",
    bgColor: "from-orange-500/5 to-red-500/5",
    borderColor: "hover:border-orange-400/50",
    skills: ["PyTorch", "TensorFlow", "Scikit-Learn", "Computer Vision", "XGBoost", "Pandas", "NumPy"]
  },
  {
    title: "Databases & Infra",
    span: "col-span-1 md:col-span-1 lg:col-span-1",
    icon: "🗄️",
    bgColor: "from-cyan-500/5 to-blue-500/5",
    borderColor: "hover:border-cyan-400/50",
    skills: ["PostgreSQL", "Redis", "Vector DBs", "Docker", "Git"]
  },
  {
    title: "Languages & Tools",
    span: "col-span-1 md:col-span-full lg:col-span-4",
    icon: "💻",
    bgColor: "from-gray-500/5 to-slate-500/5",
    borderColor: "hover:border-[var(--accent1)]",
    skills: ["Python (Advanced)", "Java", "C++", "JavaScript", "SQL", "Bash / Linux", "Jupyter"]
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
}

export default function TechStack() {
  const navigate = useNavigate()
  const { ref: headerRef, inView: headerInView } = useScrollAnimation()
  const { ref: bentoRef, inView: bentoInView } = useScrollAnimation({ rootMargin: '-50px' })

  return (
    <PageWrapper>
      <section className="relative min-h-screen py-24 z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          {/* Header */}
          <motion.div ref={headerRef} className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs text-[var(--accent1)] tracking-widest uppercase font-bold">02 · Skills & Expertise</span>
              <motion.div
                className="h-[2px] flex-1 max-w-xs rounded-full"
                style={{ background: 'var(--gradient-h)', transformOrigin: 'left' }}
                initial={{ scaleX: 0 }}
                animate={headerInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8 }}
              />
            </div>
            
            <motion.h2
              className="font-display text-4xl md:text-5xl font-extrabold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-[var(--t1)]">Engineering the </span>
              <span className="gradient-text">future of AI.</span>
            </motion.h2>
            <motion.p
              className="font-body text-lg text-[var(--t2)] max-w-2xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              A premium, recruiter-friendly overview of my technical stack. I specialize in building robust machine learning models, autonomous agentic workflows, and the scalable backend infrastructure required to deploy them.
            </motion.p>
          </motion.div>

          {/* Core Strengths (First Row) */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
          >
            {coreStrengths.map((item) => (
              <motion.div 
                key={item.title}
                variants={itemVariants}
                className="group relative p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent1)] transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent1)]/5 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="text-3xl mb-4 bg-[var(--panel)] border border-[var(--border)] w-14 h-14 flex items-center justify-center rounded-2xl group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold text-[var(--t1)] mb-2 group-hover:text-[var(--accent1)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-[var(--t3)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bento Grid */}
          <div ref={bentoRef}>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate={bentoInView ? "visible" : "hidden"}
            >
              {bentoCategories.map((category) => (
                <motion.div
                  key={category.title}
                  variants={itemVariants}
                  className={`group relative p-8 rounded-3xl glass-card border border-[var(--border)] overflow-hidden transition-all duration-500 hover:shadow-2xl ${category.span} ${category.borderColor}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-3xl filter drop-shadow-sm">{category.icon}</span>
                      <h3 className="font-display tracking-tight font-bold text-2xl text-[var(--t1)]">
                        {category.title}
                      </h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-2.5 mt-auto">
                      {category.skills.map((skill) => (
                        <motion.div
                          key={skill}
                          title={skill}
                          className="px-3.5 py-2 rounded-xl font-mono text-xs font-semibold text-[var(--t2)] bg-[var(--surface)] border border-[var(--border)] shadow-sm hover:text-[var(--t1)] hover:border-[var(--accent1)] hover:bg-[var(--accent1)]/5 transition-all duration-300 cursor-default flex items-center gap-2"
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--t3)] group-hover:bg-[var(--accent1)] transition-colors" />
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Links */}
          <motion.div className="mt-24 flex justify-between items-center border-[var(--border)] pt-8">
            <motion.button
              onClick={() => navigate('/about')}
              className="font-mono text-xs font-bold text-[var(--t3)] hover:text-[var(--accent1)] transition-colors flex items-center gap-2 px-4 py-2 rounded-full border border-transparent hover:border-[var(--accent1)]/30 hover:bg-[var(--accent1)]/5"
              whileHover={{ x: -2 }}
            >
              <span className="text-lg">←</span> About
            </motion.button>
            <motion.button
              onClick={() => navigate('/projects')}
              className="font-mono text-xs font-bold text-[var(--t3)] hover:text-[var(--accent1)] transition-colors flex items-center gap-2 px-4 py-2 rounded-full border border-transparent hover:border-[var(--accent1)]/30 hover:bg-[var(--accent1)]/5"
              whileHover={{ x: 2 }}
            >
              Projects <span className="text-lg">→</span>
            </motion.button>
          </motion.div>

        </div>
      </section>
    </PageWrapper>
  )
}