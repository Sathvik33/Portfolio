import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'

import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Hero     from './pages/Hero'
import About    from './pages/About'
import TechStack from './pages/TechStack'
import Projects from './pages/Projects'
import GitHub   from './pages/GitHub'
import Contact  from './pages/Contact'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"         element={<Hero />} />
        <Route path="/about"    element={<About />} />
        <Route path="/stack"    element={<TechStack />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/github"   element={<GitHub />} />
        <Route path="/contact"  element={<Contact />} />
      </Routes>
    </AnimatePresence>
  )
}

function PortfolioApp() {
  const [loading, setLoading] = useState(true)

  return (
    <BrowserRouter>
      <div className="noise-overlay" />
      <div className="gradient-mesh" />

      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
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
