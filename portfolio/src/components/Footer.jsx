import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer
      className="border-t border-[var(--border)] py-10 transition-colors duration-300"
      style={{ background: 'var(--bg)' }}
    >
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group"
        >
          <div className="relative h-5 w-5">
            <div className="absolute inset-0 rounded-md" style={{ background: 'var(--gradient)', opacity: 0.3 }} />
            <div className="absolute inset-[3px] rounded-sm bg-[var(--bg)] group-hover:bg-[var(--panel)] transition-colors" />
          </div>
          <span className="font-mono text-xs text-[var(--t3)] group-hover:text-[var(--accent1)] transition-colors">
            MSR · 2026
          </span>
        </button>

        <p className="font-mono text-xs text-[var(--t3)] text-center">
          Built with React · Tailwind CSS · Framer Motion
        </p>

        <div className="flex gap-4">
          {[
            { label: 'GitHub', href: 'https://github.com/Sathvik33' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/maru-sathvik-reddy-' },
            { label: 'Email', href: 'mailto:marusathvikreddy@gmail.com' },
          ].map((l) => (
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
    </footer>
  )
}
