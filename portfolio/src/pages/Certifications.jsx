import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'

const certifications = [
  {
    title: 'AWS ML Exam Basics · Foundational ML',
    org: 'Amazon Web Services',
    date: 'Oct 2025',
    link: 'https://drive.google.com/file/d/1qtsvlXZa8pmrHZz22AJipZIoHpPA2Y-q/view',
    image: new URL('../images/AWS ML Exam.png', import.meta.url).href,
  },
  {
    title: 'Deep Learning with TensorFlow',
    org: 'IBM',
    date: 'Mar 2025',
    link: 'https://drive.google.com/file/d/1mCWEFx-TPkMaJkr90CpHypil2BWamNPC/view',
    image: new URL('../images/Deep Learning with TensorFlow.png', import.meta.url).href,
  },
  {
    title: 'A Guide to ML with Data Science',
    org: 'Cipher Schools',
    date: 'Jul 2025',
    link: 'https://drive.google.com/file/d/1jhU52QZwVoUqO1-vLnADNZQMFK-IkDTn/view',
    image: new URL('../images/machine learning for datascience -cipherschools.png', import.meta.url).href,
  },
  {
    title: 'Generative AI, LLM & RAG',
    org: 'GeeksforGeeks',
    date: '2025',
    link: 'https://drive.google.com/file/d/1yVCt4nSr6sNPbkVP7cTLqXDG9gB2V2os/view',
    image: new URL('../images/Generative AI GFG.png', import.meta.url).href,
  },
]

export default function Certifications() {
  const navigate = useNavigate()
  return (
    <PageWrapper>
      <section className="relative min-h-[calc(100vh-72px)] py-24">
        <div className="pointer-events-none absolute -right-60 top-1/2 h-[500px] w-[500px] rounded-full bg-[#a78bfa]/4 blur-[120px]" />
        <div className="mx-auto max-w-4xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs text-[#00d4ff] tracking-widest uppercase">01 · Certifications</span>
              <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-[#00d4ff]/30 to-transparent" />
            </div>
            <h2 className="font-display text-4xl font-extrabold text-[var(--t1)] leading-tight mb-3">Certifications & credentials</h2>
            <p className="font-body text-base text-[var(--t2)] mb-8">Verified certifications and exams focused on machine learning, deep learning, and data science.</p>

            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
              {certifications.map((cert) => (
                <div key={cert.title} className="rounded-2xl overflow-hidden border border-[#2b2f40] bg-[#0b1226] shadow-xl backdrop-blur">
                  <div className="relative h-40 overflow-hidden bg-[#111a2f]">
                    {cert.image ? (
                      <img src={cert.image} alt={cert.title} className="h-full w-full object-cover opacity-90" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[var(--t3)]">Certificate</div>
                    )}
                    <div className="absolute top-2 left-2 rounded-full bg-[#00d4ff] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black">{cert.org}</div>
                    <div className="absolute top-2 right-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">{cert.date}</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-xl font-bold text-white leading-snug mb-2">{cert.title}</h3>
                    <p className="text-sm text-[#c6d0ff] mb-4">{cert.org} · {cert.date}</p>
                    <div className="flex items-center justify-between">
                      <a href={cert.link} target="_blank" rel="noreferrer" className="rounded-md border border-[#00d4ff]/30 bg-[#00d4ff]/10 px-3 py-1 text-xs font-semibold text-[#00d4ff] hover:bg-[#00d4ff]/20 transition">View credential</a>
                      <span className="text-xs font-mono text-[#8a8db4]">Verified</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-start">
              <button onClick={() => navigate('/about')} className="rounded border border-[var(--border)] px-4 py-2 text-xs font-mono text-[var(--t3)] hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition">← Back to About</button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
