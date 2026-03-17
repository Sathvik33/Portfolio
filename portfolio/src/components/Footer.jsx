import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--border)] py-10 bg-[var(--surface)]/50 backdrop-blur-sm transition-colors duration-300 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <NavLink to="/" className="flex items-center gap-2 group">
          <motion.div
            className="relative h-5 w-5"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className="absolute inset-0 rounded border border-[#00d4ff]/30 rotate-45 group-hover:border-[#00d4ff]/80 transition-colors" />
            <div className="absolute inset-[5px] bg-[#00d4ff]/15 rotate-45 group-hover:bg-[#00d4ff]/30 transition-all" />
          </motion.div>
          <span className="font-mono text-xs text-[var(--t3)] group-hover:text-[#00d4ff] transition-colors">MSR · 2026</span>
        </NavLink>
        <p className="font-mono text-xs text-[var(--t3)] text-center">
          Built with React · Tailwind CSS · Framer Motion
        </p>
        <div className="flex gap-4">
          {[
            { label: 'GitHub',   href: 'https://github.com/Sathvik33' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/maru-sathvik-reddy-' },
            { label: 'Email',    href: 'mailto:marusathvikreddy@gmail.com' },
          ].map(l => (
            <motion.a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-[var(--t3)] hover:text-[#00d4ff] transition-colors duration-200"
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {l.label}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  )
}
