import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'

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
    location: ' Metpally, Telangana ',
    period: 'March 2021',
    detail: 'High School',
    score: 'Percentage: 100%',
  },
]

const skillsGroups = [
  { title: 'Programming & Foundations', items: ['Python', 'C++','Java'] },
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
    title: 'Autoregressive Transformer for Python Code Generation',
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

const certificates = [
  'AWS ML Exam Basics Foundational ML (Amazon Web Services)',
  'Deep Learning with TensorFlow (IBM)',
  'A Guide to ML with Data Science (Cipher Schools)',
  'Generative AI, LLM & RAG (GeeksforGeeks)',
]

export default function Resume() {
  const [activeTab, setActiveTab] = useState('Education')

  return (
    <PageWrapper>
      <section className="relative min-h-[calc(100vh-72px)] py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-8">
            <h1 className="font-display text-5xl font-extrabold text-white tracking-tight mt-2">My Resume</h1>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <span className="rounded-full bg-[#0f172a] px-3 py-1 text-xs font-mono text-[#dbeafe]">✉️ marusathvikreddy@gmail.com </span>
              <span className="rounded-full bg-[#0f172a] px-3 py-1 text-xs font-mono text-[#dbeafe]">📱 +91-6305096050</span>
              <a href="https://www.linkedin.com/in/maru-sathvik-reddy-/" className="rounded-full bg-[#0f172a] px-3 py-1 text-xs font-mono text-[#dbeafe]">🔗 LinkedIn</a>
              <a href="https://github.com/Sathvik33" className="rounded-full bg-[#0f172a] px-3 py-1 text-xs font-mono text-[#dbeafe]">💻 GitHub</a>
            </div>
          </div>

          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeTab === tab ? 'bg-[#1d4ed8] text-white' : 'bg-transparent text-[#cbd5e1] border border-[#334155]'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'Education' && (
            <div className="space-y-3">
              {education.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#334155] bg-[#0f172a] p-4">
                  <div className="flex flex-wrap justify-between gap-2">
                    <div>
                      <div className="text-2xl font-bold text-[#bfdbfe]">{item.title}</div>
                      <div className="text-sm text-[#94a3b8]">{item.location}</div>
                    </div>
                    <span className="rounded-full bg-[#1d4ed8] px-3 py-1 text-xs font-semibold text-white">{item.period}</span>
                  </div>
                  <p className="mt-2 text-base text-[#cbd5e1]">{item.detail}</p>
                  <p className="text-sm text-[#f8fafc] mt-1">{item.score}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Skills' && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
              {skillsGroups.map((group) => (
                <div key={group.title} className="rounded-xl border border-[#334155] bg-[#0f172a] p-4">
                  <div className="mb-2 text-sm font-semibold text-[#bfdbfe]">{group.title}</div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map(item => (
                      <span key={item} className="rounded-full border border-[#334155] bg-[#111827] px-2 py-1 text-xs text-[#cbd5e1]">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Projects' && (
            <div className="space-y-3">
              {projectItems.map((p) => (
                <div key={p.title} className="rounded-2xl border border-[#334155] bg-[#0f172a] p-4">
                  <div className="text-xl font-bold text-[#bfdbfe]">{p.title}</div>
                  <p className="text-sm text-[#94a3b8]">{p.subtitle}</p>
                  <p className="mt-2 text-[#e2e8f0]">{p.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Extracurricular' && (
            <div className="space-y-3">
              {extracurricular.map((item) => (
                <div key={item} className="rounded-xl border border-[#334155] bg-[#0f172a] p-4">
                  <p className="text-sm text-[#cbd5e1]">{item}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Certificates' && (
            <div className="space-y-3">
              {certificates.map((item) => (
                <div key={item} className="rounded-xl border border-[#334155] bg-[#0f172a] p-3">
                  <div className="text-sm text-[#bfdbfe] font-semibold">{item.split('(')[0].trim()}</div>
                  <div className="text-xs text-[#94a3b8]">{item.includes('(') ? item.slice(item.indexOf('(')) : ''}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}
