import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import useScrollAnimation from '../hooks/useScrollAnimation'

const certs = [
  { 
    id: 1, issuer: 'Oracle University', name: 'OCI 2025 AI Foundations Associate', date: 'March 2026', 
    link: 'https://drive.google.com/file/d/1tUm8493IhuwboS1aRtFJDg5k-O8f7cm2/view?usp=sharing',
    logo: <img src="https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" alt="Oracle" className="h-6 w-auto object-contain" />
  },
  { 
    id: 2, issuer: 'AWS Training & Certification', name: 'Machine Learning Exam Basics', date: 'October 2025', 
    link: 'https://drive.google.com/file/d/1qtsvlXZa8pmrHZz22AJipZIoHpPA2Y-q/view',
    logo: <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="h-10 w-auto object-contain" />
  },
  { 
    id: 3, issuer: 'IBM Cognitive Class', name: 'Deep Learning with TensorFlow', date: 'March 2025', 
    link: 'https://drive.google.com/file/d/1mCWEFx-TPkMaJkr90CpHypil2BWamNPC/view',
    logo: <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-8 w-auto object-contain" />
  },
  { 
    id: 4, issuer: 'GeeksforGeeks', name: 'Generative AI, LLM & RAG', date: '2025', 
    link: 'https://drive.google.com/file/d/1yVCt4nSr6sNPbkVP7cTLqXDG9gB2V2os/view',
    logo: <img src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg" alt="GeeksforGeeks" className="h-10 w-auto object-contain" />
  },
  { 
    id: 5, issuer: 'CipherSchools', name: 'Machine Learning & Data Science', date: 'July 2025', 
    link: 'https://drive.google.com/file/d/1jhU52QZwVoUqO1-vLnADNZQMFK-IkDTn/view',
    logo: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
  },
]

function CertCard({ cert, index }) {
  const { ref, inView } = useScrollAnimation({ rootMargin: '0px 0px -40px 0px' })
  
  return (
    <motion.a 
      ref={ref}
      href={cert.link} 
      target="_blank" 
      rel="noreferrer"
      className="glass-card p-8 block group relative overflow-hidden flex flex-col h-full cursor-pointer"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(99,102,241,0.18)' }}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ background: 'linear-gradient(135deg, var(--accent-soft) 0%, transparent 100%)' }} />

      <motion.div
        className="h-20 w-20 bg-[var(--surface)] border border-[var(--border)] rounded-xl flex items-center justify-center mb-6 shadow-sm relative z-10"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        {cert.logo}
      </motion.div>
      
      <div className="font-mono text-[10px] uppercase tracking-widest mb-3 font-bold text-[var(--t3)] group-hover:text-[var(--accent1)] transition-colors relative z-10">
        {cert.issuer}
      </div>
      
      <h3 className="font-display font-bold text-xl text-[var(--t1)] mb-6 leading-snug flex-1 group-hover:text-[var(--accent1)] transition-colors duration-300 relative z-10">
        {cert.name}
      </h3>
      
      <div className="flex items-center justify-between mt-auto border-t border-[var(--border)] pt-5 relative z-10">
        <span className="font-mono text-xs font-bold text-[var(--t2)]">{cert.date}</span>
        <motion.span
          className="font-mono text-xs font-bold text-white px-4 py-2 rounded-full flex items-center gap-2"
          style={{ background: 'var(--gradient)' }}
          whileHover={{ scale: 1.05 }}
        >
          View Document
          <motion.span
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ↗
          </motion.span>
        </motion.span>
      </div>
    </motion.a>
  )
}

export default function Certifications() {
  const { ref: headerRef, inView: headerInView } = useScrollAnimation()

  return (
    <PageWrapper>
      <section className="py-24 max-w-5xl mx-auto px-6 relative z-10">
        <motion.div ref={headerRef}>
          
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs gradient-text tracking-widest uppercase font-bold">04 · Certificates</span>
            <motion.div
              className="h-[2px] flex-1 max-w-xs rounded-full"
              style={{ background: 'var(--gradient-h)', transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              animate={headerInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8 }}
            />
          </div>

          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="font-display text-4xl font-extrabold tracking-tight">
              <span className="gradient-text">Verified</span> <span className="text-[var(--t1)]">Credentials.</span>
            </h2>
            <p className="font-body text-[var(--t2)] mt-3">Official certifications and completion records.</p>
          </motion.div>
        </motion.div>
          
        <div className="grid sm:grid-cols-2 gap-8">
          {certs.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </section>
    </PageWrapper>
  )
}