import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'

const certs = [
  { 
    id: 1,
    issuer: 'Oracle University', 
    name: 'OCI 2025 AI Foundations Associate', 
    date: 'March 2026', 
    link: 'https://drive.google.com/file/d/1tUm8493IhuwboS1aRtFJDg5k-O8f7cm2/view?usp=sharing',
    logo: <img src="https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" alt="Oracle" className="h-6 w-auto object-contain" />
  },
  { 
    id: 2,
    issuer: 'AWS Training & Certification', 
    name: 'Machine Learning Exam Basics', 
    date: 'October 2025', 
    link: 'https://drive.google.com/file/d/1qtsvlXZa8pmrHZz22AJipZIoHpPA2Y-q/view',
    logo: <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="h-10 w-auto object-contain" />
  },
  { 
    id: 3,
    issuer: 'IBM Cognitive Class', 
    name: 'Deep Learning with TensorFlow', 
    date: 'March 2025', 
    link: 'https://drive.google.com/file/d/1mCWEFx-TPkMaJkr90CpHypil2BWamNPC/view',
    logo: <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-8 w-auto object-contain" />
  },
  { 
    id: 4,
    issuer: 'GeeksforGeeks', 
    name: 'Generative AI, LLM & RAG', 
    date: '2025', 
    link: 'https://drive.google.com/file/d/1yVCt4nSr6sNPbkVP7cTLqXDG9gB2V2os/view',
    logo: <img src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg" alt="GeeksforGeeks" className="h-10 w-auto object-contain" />
  },
  { 
    id: 5,
    issuer: 'CipherSchools', 
    name: 'Machine Learning & Data Science', 
    date: 'July 2025', 
    link: 'https://drive.google.com/file/d/1jhU52QZwVoUqO1-vLnADNZQMFK-IkDTn/view',
    logo: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
  },
]

const C = { hidden:{}, visible:{ transition:{ staggerChildren:0.1 } } }
const F = { hidden:{ opacity:0, y:20 }, visible:{ opacity:1, y:0 } }

export default function Certificates() {
  return (
    <PageWrapper>
      <section className="py-24 max-w-5xl mx-auto px-6 relative z-10">
        <motion.div variants={C} initial="hidden" animate="visible">
          
          <motion.div variants={F} className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs text-[var(--t1)] tracking-widest uppercase font-bold">04 · Certificates</span>
            <div className="h-px flex-1 max-w-xs bg-[var(--border)]" />
          </motion.div>

          <motion.div variants={F} className="mb-12">
            <h2 className="font-display text-4xl font-extrabold text-[var(--t1)] tracking-tight">Verified Credentials.</h2>
            <p className="font-body text-[var(--t2)] mt-3">Official certifications and completion records.</p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 gap-8">
            {certs.map((cert) => (
              <motion.a 
                key={cert.id}
                variants={F}
                href={cert.link} 
                target="_blank" 
                rel="noreferrer"
                className="outline-card p-8 block group relative overflow-hidden bg-white hover:border-[var(--t1)] transition-all duration-300 flex flex-col h-full"
              >
                {/* Logo Box */}
                <div className="h-20 w-20 bg-[var(--surface)] border border-[var(--border)] rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-white group-hover:scale-105 transition-all duration-300">
                  {cert.logo}
                </div>
                
                <div className="font-mono text-[10px] text-[var(--t3)] uppercase tracking-widest mb-3 font-bold group-hover:text-[var(--t1)] transition-colors">
                  {cert.issuer}
                </div>
                
                <h3 className="font-display font-bold text-xl text-[var(--t1)] mb-6 leading-snug flex-1">
                  {cert.name}
                </h3>
                
                <div className="flex items-center justify-between mt-auto border-t border-[var(--border)] pt-5">
                  <span className="font-mono text-xs font-bold text-[var(--t2)]">{cert.date}</span>
                  <span className="font-mono text-xs font-bold text-[var(--t1)] bg-[var(--panel)] px-4 py-2 rounded-full group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                    View Document ↗
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  )
}