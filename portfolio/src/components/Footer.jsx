export default function Footer() {
  return (
    <footer className="border-t border-[#1e2130] py-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative h-5 w-5">
            <div className="absolute inset-0 rounded border border-[#00d4ff]/30 rotate-45" />
            <div className="absolute inset-[5px] bg-[#00d4ff]/15 rotate-45" />
          </div>
          <span className="font-mono text-xs text-[#4a4d60]">Maru Sathvik Reddy · 2026</span>
        </div>
        <p className="font-mono text-xs text-[#4a4d60] text-center">
          Built with React, Tailwind CSS & Framer Motion
        </p>
        <div className="flex gap-4">
          {[
            { label: 'GitHub', href: 'https://github.com/Sathvik33' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/maru-sathvik-reddy-' },
            { label: 'Email', href: 'mailto:marusathvikreddy@gmail.com' },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-[#4a4d60] hover:text-[#00d4ff] transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
