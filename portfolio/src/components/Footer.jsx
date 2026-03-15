import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-10 bg-[var(--surface)] transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="relative h-5 w-5">
            <div className="absolute inset-0 rounded border border-[#00d4ff]/30 rotate-45 group-hover:border-[#00d4ff]/60 transition-colors" />
            <div className="absolute inset-[5px] bg-[#00d4ff]/15 rotate-45" />
          </div>
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
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
              className="font-mono text-xs text-[var(--t3)] hover:text-[#00d4ff] transition-colors duration-200">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
