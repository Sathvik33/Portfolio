import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import useScrollAnimation from '../hooks/useScrollAnimation'

const socials = [
  { label:'Email',    value:'marusathvikreddy@gmail.com', href:'mailto:marusathvikreddy@gmail.com',
    icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> },
  { label:'LinkedIn', value:'maru-sathvik-reddy',         href:'https://linkedin.com/in/maru-sathvik-reddy-',
    icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label:'GitHub',   value:'Sathvik33',                   href:'https://github.com/Sathvik33', isGithub: true,
    icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg> },
]

export default function Contact() {
  const navigate = useNavigate()
  const { ref: headerRef, inView: headerInView } = useScrollAnimation()
  const { ref: socialsRef, inView: socialsInView } = useScrollAnimation()
  const { ref: availRef, inView: availInView } = useScrollAnimation()

  return (
    <PageWrapper>
      <section className="relative min-h-[calc(100vh-72px)] py-24">
        {/* Ambient glow */}
        <motion.div
          className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 h-[400px] w-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--accent-soft) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.1, 1], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="mx-auto max-w-6xl px-6">
          <motion.div ref={headerRef}>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs text-[var(--accent1)] tracking-widest uppercase font-bold">05 · Contact</span>
              <motion.div
                className="h-[2px] flex-1 max-w-xs rounded-full"
                style={{ background: 'var(--gradient-h)', transformOrigin: 'left' }}
                initial={{ scaleX: 0 }}
                animate={headerInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8 }}
              />
            </div>
            <motion.h2
              className="font-display text-4xl font-extrabold leading-tight mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <span className="text-[var(--accent1)]">Let's build</span> <span className="text-[var(--t1)]">something.</span>
            </motion.h2>
            <motion.p
              className="font-body text-base text-[var(--t3)] max-w-xl mb-12"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              Actively seeking campus placement opportunities in ML / AI Engineering. Open to research roles, backend, or anything at the intersection of ML and systems.
            </motion.p>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left — Social links */}
            <div ref={socialsRef}>
              <div className="space-y-4 mb-8">
                {socials.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 glass-card rounded-xl p-4 transition-all duration-300"
                    initial={{ opacity: 0, x: -40 }}
                    animate={socialsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    whileHover={{ x: 6 }}
                  >
                    <motion.div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-200 ${
                        s.isGithub
                          ? 'border-[var(--border)] bg-[#1a1208] text-white group-hover:bg-[#000000] group-hover:border-[#000000]'
                          : 'border-[var(--border)] bg-[var(--surface)] text-[var(--t2)] group-hover:border-[var(--accent1)] group-hover:text-[var(--accent1)]'
                      }`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      {s.icon}
                    </motion.div>
                    <div>
                      <div className="font-mono text-[11px] text-[var(--t3)] uppercase tracking-wider">{s.label}</div>
                      <div className="font-body text-sm text-[var(--t2)] group-hover:text-[var(--t1)] transition-colors">{s.value}</div>
                    </div>
                    <motion.div
                      className="ml-auto font-mono text-xs text-[var(--t3)] group-hover:text-[var(--accent1)] transition-colors"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ↗
                    </motion.div>
                  </motion.a>
                ))}
              </div>

              {/* Availability badge */}
              <motion.div
                ref={availRef}
                className="glass-card rounded-xl p-5"
                initial={{ opacity: 0, y: 30 }}
                animate={availInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent1)] opacity-75 animate-ping" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--accent1)]" />
                  </span>
                  <span className="font-display text-sm font-bold text-[var(--t1)]">Available for opportunities</span>
                </div>
                <p className="font-mono text-xs text-[var(--t3)] leading-relaxed">
                  Actively applying for campus placements · ML / AI / SWE roles<br/>
                  📍 Lovely Professional University, Punjab, India
                </p>
              </motion.div>
            </div>

            {/* Right — Info card */}
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={socialsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="relative w-full max-w-sm">
                <motion.div
                  className="glass-card rounded-2xl p-10 text-center"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <motion.div
                    className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                    style={{ background: 'var(--accent-soft)' }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <span className="text-3xl">🚀</span>
                  </motion.div>
                  <h3 className="font-display text-xl font-bold text-[var(--t1)] mb-3">Let's Connect!</h3>
                  <p className="text-sm text-[var(--t3)] leading-relaxed mb-6">
                    I'm passionate about building AI systems that solve real-world problems. Reach out via any channel!
                  </p>
                  <motion.a
                    href="mailto:marusathvikreddy@gmail.com"
                    className="inline-block px-6 py-3 rounded-xl font-display font-bold text-sm text-white"
                    style={{ background: 'black' }}
                    whileHover={{ scale: 1.05, boxShadow: '0 12px 30px rgba(4, 4, 4, 0.25)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ✉️ Send Email
                  </motion.a>
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-12 h-12 rounded-xl opacity-15"
                  style={{ background: 'var(--gradient)' }}
                  animate={{ rotate: [0, 90, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-3 -left-3 w-8 h-8 rounded-full opacity-20"
                  style={{ background: 'var(--accent1)' }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}