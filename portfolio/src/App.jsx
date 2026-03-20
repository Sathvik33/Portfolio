import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'

import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import SectionTransition from './components/SectionTransition'
import Footer from './components/Footer'

import Hero from './pages/Hero'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Certificates from './pages/Certificates'
import Contact from './pages/Contact'
import Resume from './pages/Resume'

/* ── Scroll-based single-page journey ── */
function HomePage() {
  return (
    <>
      <Hero />
      <SectionTransition accent="cyan" />
      <About />
      <SectionTransition accent="blue" flip />
      <Skills />
      <SectionTransition accent="violet" />
      <Projects />
      <SectionTransition accent="cyan" flip />
      <Certificates />
      <SectionTransition accent="blue" />
      <Contact />
    </>
  )
}

function AppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </AnimatePresence>
  )
}

function PortfolioApp() {
  const [loading, setLoading] = useState(true)

  return (
    <BrowserRouter>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <ScrollProgress />
          <Navbar />
          <main>
            <AppRoutes />
          </main>
          <Footer />
        </>
      )}
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  )
}
