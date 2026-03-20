import { motion } from 'framer-motion'
import { useState } from 'react'
import useScrollAnimation from '../hooks/useScrollAnimation'

const socials = [
  {
    label: 'Email', value: 'marusathvikreddy@gmail.com', href: 'mailto:marusathvikreddy@gmail.com',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  },
  {
    label: 'LinkedIn', value: 'maru-sathvik-reddy', href: 'https://linkedin.com/in/maru-sathvik-reddy-',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    label: 'GitHub', value: 'Sathvik33', href: 'https://github.com/Sathvik33',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>,
  },
]

export default function Contact() {
  const { ref: sectionRef, inView } = useScrollAnimation({ rootMargin: '-80px' })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [focused, setFocused] = useState('')

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  return (
    <section id="contact" className="section-padding relative">
      {/* Subtle ambient glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 h-[400px] w-[600px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, var(--accent1) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div ref={sectionRef} className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-xs text-[var(--accent1)] tracking-widest uppercase font-bold">
            05 · Contact
          </span>
          <motion.div
            className="h-[2px] flex-1 max-w-xs rounded-full"
            style={{ background: 'var(--gradient-h)', transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8 }}
          />
        </div>

        <motion.h2
          className="font-display text-3xl md:text-4xl font-extrabold leading-tight mb-3"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="gradient-text">Let's build</span>{' '}
          <span className="text-[var(--t1)]">something.</span>
        </motion.h2>

        <motion.p
          className="font-body text-base text-[var(--t3)] max-w-xl mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          Actively seeking opportunities in ML / AI Engineering. Open to research roles, backend, or anything at the intersection of ML and systems.
        </motion.p>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — Contact form */}
          <motion.form
            className="space-y-5"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={(e) => e.preventDefault()}
          >
            {[
              { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
              { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
            ].map((field) => (
              <div key={field.name} className="relative">
                <label
                  className={`absolute left-4 transition-all duration-300 font-mono text-xs pointer-events-none ${
                    focused === field.name || formData[field.name]
                      ? '-top-2.5 text-[var(--accent1)] bg-[var(--bg)] px-1'
                      : 'top-3.5 text-[var(--t3)]'
                  }`}
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  onFocus={() => setFocused(field.name)}
                  onBlur={() => setFocused('')}
                  placeholder={focused === field.name ? field.placeholder : ''}
                  className="w-full px-4 py-3.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--t1)] font-body text-sm outline-none transition-all duration-300 focus:border-[var(--accent1)] focus:shadow-glow-sm"
                />
              </div>
            ))}

            <div className="relative">
              <label
                className={`absolute left-4 transition-all duration-300 font-mono text-xs pointer-events-none ${
                  focused === 'message' || formData.message
                    ? '-top-2.5 text-[var(--accent1)] bg-[var(--bg)] px-1'
                    : 'top-3.5 text-[var(--t3)]'
                }`}
              >
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused('')}
                placeholder={focused === 'message' ? 'Tell me about your project or opportunity...' : ''}
                rows="4"
                className="w-full px-4 py-3.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--t1)] font-body text-sm outline-none transition-all duration-300 focus:border-[var(--accent1)] focus:shadow-glow-sm resize-none"
              />
            </div>

            <motion.button
              type="submit"
              className="px-8 py-3.5 rounded-xl font-display font-bold text-sm text-white shadow-lg"
              style={{ background: 'var(--gradient)' }}
              whileHover={{ scale: 1.03, boxShadow: '0 12px 30px rgba(6,182,212,0.2)' }}
              whileTap={{ scale: 0.97 }}
            >
              Send Message
            </motion.button>
          </motion.form>

          {/* Right — Social links + availability */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 glass-card rounded-xl p-4"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                whileHover={{ x: 4 }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--t2)] group-hover:border-[var(--accent1)] group-hover:text-[var(--accent1)] transition-all duration-200">
                  {s.icon}
                </div>
                <div className="flex-1">
                  <div className="font-mono text-[11px] text-[var(--t3)] uppercase tracking-wider">{s.label}</div>
                  <div className="font-body text-sm text-[var(--t2)] group-hover:text-[var(--t1)] transition-colors">{s.value}</div>
                </div>
                <span className="font-mono text-xs text-[var(--t3)] group-hover:text-[var(--accent1)] transition-colors">↗</span>
              </motion.a>
            ))}

            {/* Availability badge */}
            <motion.div
              className="glass-card rounded-xl p-5 mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
                </span>
                <span className="font-display text-sm font-bold text-[var(--t1)]">Available for opportunities</span>
              </div>
              <p className="font-mono text-xs text-[var(--t3)] leading-relaxed">
                Actively applying for campus placements · ML / AI / SWE roles<br />
                📍 Lovely Professional University, Punjab, India
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}