import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

export default function Hero() {
  const navigate = useNavigate()
  return (
    <PageWrapper>
      <section className="relative min-h-[calc(100vh-72px)] flex items-center justify-center overflow-hidden py-12 lg:py-0">
        {/* The White Grid Background */}
        <div className="pointer-events-none absolute inset-0 grid-bg" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-6 w-full">
          
          <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col">
            
            <motion.div variants={item} className="mb-8 inline-block self-start border border-[var(--border)] bg-white px-4 py-1.5 rounded-full shadow-sm">
              <span className="font-mono text-xs text-[var(--t2)] uppercase tracking-wider font-bold">
                ● ML / AI Engineer
              </span>
            </motion.div>

            {/* Name and Image Side-by-Side */}
            <motion.div variants={item} className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 mb-8">
              <h1 className="font-display text-5xl font-extrabold leading-tight tracking-tight text-[var(--t1)] sm:text-6xl md:text-7xl">
                Maru Sathvik <br /> Reddy
              </h1>
              
              {/* Photo placed right next to the name - Size increased significantly here */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 shrink-0 outline-card p-2.5 bg-white rotate-3 hover:rotate-0 transition-transform duration-500 rounded-2xl">
                <div className="w-full h-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel)]">
                  <img 
                    src="/profile.jpg" 
                    alt="Maru Sathvik Reddy" 
                    className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700"
                    style={{ 
                      objectPosition: 'center 12%', 
                      transform: 'scale(1.2)' 
                    }} 
                  />
                </div>
              </div>
            </motion.div>

            <motion.p variants={item} className="max-w-2xl font-body text-lg leading-relaxed text-[var(--t2)] bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-[var(--border)]">
              I don't just consume APIs — I build AI from the inside out. I specialize in translating theoretical math into production-grade systems, from coding GPT-style transformers from scratch to architecting fully local, multi-agent RAG pipelines.
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
              <button onClick={() => navigate('/projects')}
                className="outline-card px-8 py-3.5 font-display font-bold text-sm text-[var(--t1)] bg-white shadow-sm cursor-pointer hover:bg-[var(--t1)] hover:text-white transition-colors duration-300">
                View Projects →
              </button>
              
              {/* Download Resume Button - Forcing PDF download */}
              <a href="/Sathvik_CV.pdf" download="Sathvik_CV.pdf" target="_blank" rel="noreferrer"
                className="px-8 py-3.5 font-display font-bold text-sm text-[var(--t2)] hover:text-[var(--t1)] border border-transparent hover:border-[var(--border)] transition-all bg-white/50">
                Download Resume
              </a>
            </motion.div>

          </motion.div>

        </div>
      </section>
    </PageWrapper>
  )
}