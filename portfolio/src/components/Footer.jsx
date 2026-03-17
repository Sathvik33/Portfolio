import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import useScrollAnimation from '../hooks/useScrollAnimation'

export default function Footer() {
  const { ref, inView } = useScrollAnimation({ threshold: 0.3 })

  return (
    <motion.footer
      ref={ref}
      className="border-t border-[var(--border)] py-10 transition-colors duration-300"
      style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--panel) 100%)' }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="relative h-5 w-5">
            <div className="absolute inset-0 rounded-md" style={{ background: 'linear-gradient(135deg, #1e3a5f, #2563eb)', opacity: 0.3 }} />
            <div className="absolute inset-[3px] rounded-sm bg-[var(--bg)] group-hover:bg-[var(--panel)] transition-colors" />
          </div>
          <span className="font-mono text-xs text-[var(--t3)] group-hover:text-[var(--accent1)] transition-colors">MSR · 2026</span>
        </NavLink>
        <p className="font-mono text-xs text-[var(--t3)] text-center">
          Built with React · Tailwind CSS · Framer Motion
        </p>
        <div className="flex gap-4">
          {[
            { label: 'GitHub',   href: 'https://github.com/Sathvik33' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/maru-sathvik-reddy-' },
            { label: 'Email',    href: 'mailto:marusathvikreddy@gmail.com' },
          ].map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-[var(--t3)] hover:text-[var(--accent1)] transition-colors duration-200"
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {l.label}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.footer>
  )
}
