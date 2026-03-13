import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'About', path: '/about' },
  { label: 'Stack', path: '/techstack' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-obsidian/80 backdrop-blur-xl border-b border-[#1e2130]'
            : 'bg-transparent'
        }`}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <div className="relative h-7 w-7">
              <div className="absolute inset-0 rounded border border-[#00d4ff]/40 group-hover:border-[#00d4ff]/80 transition-colors duration-300 rotate-45" />
              <div className="absolute inset-[6px] bg-[#00d4ff]/20 rotate-45 group-hover:bg-[#00d4ff]/40 transition-all duration-300" />
            </div>
            <span className="font-display font-bold text-sm text-[#e8eaf2] tracking-wide group-hover:text-[#00d4ff] transition-colors duration-300">
              MARU SATHVIK REDDY
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-4 py-2 font-body text-sm text-[#8b8fa8] hover:text-[#e8eaf2] transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-px scale-x-0 bg-[#00d4ff] group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
            <a
              href="/Sathvik_CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="ml-3 flex items-center gap-2 rounded border border-[#00d4ff]/30 bg-[#00d4ff]/5 px-4 py-2 font-mono text-xs text-[#00d4ff] hover:bg-[#00d4ff]/10 hover:border-[#00d4ff]/60 transition-all duration-200"
            >
              Resume ↗
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block h-[1.5px] w-5 bg-[#8b8fa8]"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-[1.5px] w-5 bg-[#8b8fa8]"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block h-[1.5px] w-5 bg-[#8b8fa8]"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-obsidian/95 backdrop-blur-xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-3xl font-bold text-[#4a4d60] hover:text-[#00d4ff] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
