import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { label: 'About',    to: '/about'    },
  { label: 'Stack',    to: '/stack'    },
  { label: 'Projects', to: '/projects' },
  { label: 'Certifications', to: '/certifications' },
  { label: 'Resume', to: '/resume' },
  { label: 'Contact',  to: '/contact'  },
]

function ThemeToggle() {
  const { dark, toggle } = useTheme()
  return (
    <motion.button
      onClick={toggle}
      className="relative flex h-8 w-14 items-center rounded-full border border-[var(--border)] bg-[var(--panel)] px-1 transition-all duration-300 hover:border-[#00d4ff]/40"
      aria-label="Toggle theme"
      whileTap={{ scale: 0.95 }}
    >
      {/* Track icons */}
      <span className="absolute left-2 text-[10px]">☀️</span>
      <span className="absolute right-1.5 text-[10px]">🌙</span>
      {/* Thumb */}
      <motion.div
        className="relative z-10 h-5 w-5 rounded-full bg-[#00d4ff] shadow-sm"
        animate={{ x: dark ? 22 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </motion.button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { dark } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleMobileNav = (to) => { setMenuOpen(false); navigate(to) }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-xl border-b border-[var(--border)]'
            : 'bg-transparent'
        }`}
        style={scrolled ? { backgroundColor: dark ? 'rgba(7,8,13,0.85)' : 'rgba(245,246,252,0.85)' } : {}}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="relative h-7 w-7">
              <div className="absolute inset-0 rounded border border-[#00d4ff]/40 group-hover:border-[#00d4ff]/80 transition-colors duration-300 rotate-45" />
              <div className="absolute inset-1 rounded-sm bg-[#00d4ff]/20 rotate-45 group-hover:bg-[#00d4ff]/40 transition-all duration-300" />
            </div>
            <span className="font-display font-bold text-sm text-[var(--t1)] tracking-wide group-hover:text-[#00d4ff] transition-colors duration-300">
              Maru Sathvik Reddy
            </span>
          </NavLink>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative px-4 py-2 font-body text-sm transition-colors duration-200 group ${
                    isActive ? 'text-[#00d4ff]' : 'text-[var(--t2)] hover:text-[var(--t1)]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span className={`absolute bottom-1 left-4 right-4 h-px bg-[#00d4ff] transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                  </>
                )}
              </NavLink>
            ))}

            {/* Theme toggle */}
            <div className="mx-2"><ThemeToggle /></div>

            {/* <a
              href="/resume" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 rounded border border-[#00d4ff]/30 bg-[#00d4ff]/5 px-4 py-2 font-mono text-xs text-[#00d4ff] hover:bg-[#00d4ff]/10 hover:border-[#00d4ff]/60 transition-all duration-200"
            >
              Resume ↗
            </a> */}
          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-[5px] p-2" aria-label="Toggle menu">
              <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}   className="block h-[1.5px] w-5 bg-[var(--t2)]" />
              <motion.span animate={menuOpen ? { opacity: 0 }            : { opacity: 1 }}   className="block h-[1.5px] w-5 bg-[var(--t2)]" />
              <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block h-[1.5px] w-5 bg-[var(--t2)]" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 backdrop-blur-xl flex flex-col items-center justify-center"
            style={{ backgroundColor: dark ? 'rgba(7,8,13,0.97)' : 'rgba(245,246,252,0.97)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 font-mono text-xs text-[var(--t3)] hover:text-[#00d4ff] transition-colors">
              ✕ close
            </button>
            <div className="flex flex-col items-center gap-8">
              {[{ label: 'Home', to: '/' }, ...navLinks].map((link, i) => (
                <motion.button
                  key={link.to}
                  onClick={() => handleMobileNav(link.to)}
                  className="font-display text-3xl font-bold text-[var(--t3)] hover:text-[#00d4ff] transition-colors duration-200"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
            <motion.p className="absolute bottom-10 font-mono text-xs text-[var(--t3)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              marusathvikreddy@gmail.com
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
