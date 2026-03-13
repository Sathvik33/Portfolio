import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const socials = [
  {
    label: 'Email',
    value: 'marusathvikreddy@gmail.com',
    href: 'mailto:marusathvikreddy@gmail.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'maru-sathvik-reddy',
    href: 'https://linkedin.com/in/maru-sathvik-reddy-',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'Sathvik33',
    href: 'https://github.com/Sathvik33',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'sending' | 'sent' | 'error'

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    // In production, wire to a backend or Formspree/EmailJS
    await new Promise((r) => setTimeout(r, 1200))
    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="relative py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-[#00d4ff]/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6" ref={ref}>
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs text-[#00d4ff] tracking-widest uppercase">05 · Contact</span>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-[#00d4ff]/30 to-transparent" />
          </div>
          <h2 className="font-display text-4xl font-extrabold text-[#e8eaf2] leading-tight">
            Let's build something.
          </h2>
          <p className="mt-3 font-body text-base text-[#4a4d60] max-w-xl">
            Actively seeking campus placement opportunities and internships in ML / AI Engineering.
            Open to research roles, backend, or anything at the intersection of ML and systems.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: socials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="space-y-4 mb-10">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-lg border border-[#1e2130] bg-[#0e1017] p-4 hover:border-[#00d4ff]/30 hover:bg-[#0e1017] transition-all duration-200 card-hover"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded border border-[#1e2130] bg-[#13151f] text-[#8b8fa8] group-hover:border-[#00d4ff]/30 group-hover:text-[#00d4ff] transition-all duration-200">
                    {s.icon}
                  </div>
                  <div>
                    <div className="font-mono text-[11px] text-[#4a4d60] uppercase tracking-wider">{s.label}</div>
                    <div className="font-body text-sm text-[#8b8fa8] group-hover:text-[#e8eaf2] transition-colors duration-200">
                      {s.value}
                    </div>
                  </div>
                  <div className="ml-auto font-mono text-xs text-[#4a4d60] group-hover:text-[#00d4ff] transition-colors duration-200">
                    ↗
                  </div>
                </a>
              ))}
            </div>

            {/* Status badge */}
            <div className="rounded-lg border border-[#1e2130] bg-[#0e1017] p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
                </span>
                <span className="font-display text-sm font-bold text-[#e8eaf2]">Available for opportunities</span>
              </div>
              <p className="font-mono text-xs text-[#4a4d60] leading-relaxed">
                Actively applying for campus placements · ML / AI / SWE roles<br />
                📍 Lovely Professional University, Punjab, India
              </p>
            </div>
          </motion.div>

          {/* Right: contact form */}
          {/* <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="gradient-border rounded-xl bg-[#0e1017] p-6">
              <div className="mb-4 font-mono text-xs text-[#4a4d60] uppercase tracking-widest">
                Send a message
              </div>

              {[
                { id: 'name', label: 'Your Name', type: 'text', placeholder: 'Hiring Manager' },
                { id: 'email', label: 'Email Address', type: 'email', placeholder: 'hr@company.com' },
              ].map((field) => (
                <div key={field.id} className="mb-4">
                  <label className="mb-1.5 block font-mono text-[11px] text-[#4a4d60]">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.id}
                    value={form[field.id]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    className="w-full rounded border border-[#1e2130] bg-[#13151f] px-4 py-3 font-body text-sm text-[#e8eaf2] placeholder-[#4a4d60] outline-none focus:border-[#00d4ff]/40 focus:ring-1 focus:ring-[#00d4ff]/20 transition-all duration-200"
                  />
                </div>
              ))}

              <div className="mb-6">
                <label className="mb-1.5 block font-mono text-[11px] text-[#4a4d60]">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="I'd like to discuss an ML engineering role..."
                  required
                  rows={5}
                  className="w-full rounded border border-[#1e2130] bg-[#13151f] px-4 py-3 font-body text-sm text-[#e8eaf2] placeholder-[#4a4d60] outline-none focus:border-[#00d4ff]/40 focus:ring-1 focus:ring-[#00d4ff]/20 transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="group w-full rounded bg-[#00d4ff] py-3.5 font-display font-bold text-sm text-obsidian transition-all duration-300 hover:shadow-glow-cyan disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden"
              >
                <span className="relative z-10">
                  {status === 'sending'
                    ? 'Sending...'
                    : status === 'sent'
                    ? '✓ Message Sent!'
                    : 'Send Message'}
                </span>
                <span className="absolute inset-0 -translate-x-full bg-white/20 group-hover:translate-x-0 transition-transform duration-300 skew-x-12" />
              </button>

              {status === 'sent' && (
                <p className="mt-3 text-center font-mono text-xs text-green-400">
                  Thanks! I'll get back to you soon.
                </p>
              )}
            </form>
          </motion.div> */}
        </div>
      </div>
    </section>
  )
}
