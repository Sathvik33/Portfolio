import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const scrollLinks = [
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'Certificates', to: 'certificates' },
  { label: 'Contact', to: 'contact' },
]

function ThemeToggle() {
  const { dark, toggle } = useTheme()
  return (
    <motion.button
      onClick={toggle}
      className="relative flex h-8 w-14 items-center rounded-full border border-[var(--border)] bg-[var(--panel)] px-1 transition-all duration-300 hover:border-[var(--accent1)]"
      aria-label="Toggle theme"
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute left-2 text-[10px]">☀️</span>
      <span className="absolute right-1.5 text-[10px]">🌙</span>
      <motion.div
        className="relative z-10 h-5 w-5 rounded-full shadow-sm"
        style={{ background: 'var(--gradient)' }}
        animate={{ x: dark ? 22 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </motion.button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { dark } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track active section via Intersection Observer (only on home page)
  useEffect(() => {
    if (!isHome) return
    const sectionIds = ['about', 'skills', 'projects', 'certificates', 'contact']
    const observers = []

    const timer = setTimeout(() => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id)
        if (!el) return
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActiveSection(id)
          },
          { threshold: 0.1, rootMargin: '-72px 0px -20% 0px' }
        )
        observer.observe(el)
        observers.push(observer)
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      observers.forEach((o) => o.disconnect())
    }
  }, [isHome])

  const scrollTo = useCallback((id) => {
    setMenuOpen(false)
    if (!isHome) {
      navigate('/')
      // wait for navigation then scroll
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 72
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }, 300)
    } else {
      const el = document.getElementById(id)
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 72
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }
  }, [isHome, navigate])

  const goHome = useCallback(() => {
    setMenuOpen(false)
    if (!isHome) {
      navigate('/')
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [isHome, navigate])

  const goResume = useCallback(() => {
    setMenuOpen(false)
    navigate('/resume')
  }, [navigate])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-xl border-b border-[var(--border)] shadow-sm'
            : 'bg-transparent'
        }`}
        style={scrolled ? { backgroundColor: dark ? 'rgba(3,0,20,0.85)' : 'rgba(248,250,252,0.92)' } : {}}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <button onClick={goHome} className="flex items-center gap-2.5 group">
            <div className="relative h-8 w-8">
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{ background: 'var(--gradient)' }}
                whileHover={{ rotate: 90, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
              <div className="absolute inset-[3px] rounded-md bg-[var(--bg)] group-hover:bg-[var(--panel)] transition-colors" />
              <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-xs gradient-text">M</span>
            </div>
            <span className="font-display font-bold text-sm text-[var(--t1)] tracking-wide group-hover:text-[var(--accent1)] transition-colors duration-300">
              Sathvik Reddy
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {scrollLinks.map((link) => (
              <button
                key={link.to}
                onClick={() => scrollTo(link.to)}
                className={`relative px-4 py-2 font-body text-sm transition-all duration-300 rounded-lg ${
                  isHome && activeSection === link.to
                    ? 'text-[var(--accent1)]'
                    : 'text-[var(--t2)] hover:text-[var(--t1)]'
                }`}
              >
                {link.label}
                {isHome && activeSection === link.to && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full"
                    style={{ background: 'var(--gradient-h)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
            <button
              onClick={goResume}
              className={`px-4 py-2 font-body text-sm font-medium transition-colors rounded-lg border border-[var(--border)] hover:border-[var(--accent1)] ${
                !isHome ? 'text-[var(--accent1)] border-[var(--accent1)]' : 'text-[var(--t2)] hover:text-[var(--accent1)]'
              }`}
            >
              Resume
            </button>
            <div className="ml-3"><ThemeToggle /></div>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-[5px] p-2" aria-label="Toggle menu">
              <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block h-[1.5px] w-5 bg-[var(--t2)] rounded-full" />
              <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block h-[1.5px] w-5 bg-[var(--t2)] rounded-full" />
              <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block h-[1.5px] w-5 bg-[var(--t2)] rounded-full" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 backdrop-blur-2xl flex flex-col items-center justify-center"
            style={{ backgroundColor: dark ? 'rgba(3,0,20,0.97)' : 'rgba(248,250,252,0.97)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 font-mono text-xs text-[var(--t3)] hover:text-[var(--accent1)] transition-colors">
              ✕ close
            </button>
            <div className="flex flex-col items-center gap-8">
              <motion.button onClick={goHome} className="font-display text-3xl font-bold text-[var(--t3)] hover:text-[var(--accent1)] transition-colors" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                Home
              </motion.button>
              {scrollLinks.map((link, i) => (
                <motion.button
                  key={link.to}
                  onClick={() => scrollTo(link.to)}
                  className="font-display text-3xl font-bold text-[var(--t3)] hover:text-[var(--accent1)] transition-colors duration-200"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i + 1) * 0.07 }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                onClick={goResume}
                className="font-display text-3xl font-bold text-[var(--accent1)] transition-colors duration-200"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Resume
              </motion.button>
            </div>
            <motion.p className="absolute bottom-10 font-mono text-xs text-[var(--t3)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              marusathvikreddy@gmail.com
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
