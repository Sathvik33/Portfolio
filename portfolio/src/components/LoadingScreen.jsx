import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0)
  const lines = [
    '> initializing neural stack...',
    '> loading ml models...',
    '> compiling portfolio...',
    '> ready.',
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 400)
          return 100
        }
        return prev + 1.8
      })
    }, 28)
    return () => clearInterval(timer)
  }, [onComplete])

  useEffect(() => {
    if (progress > 20) setPhase(1)
    if (progress > 50) setPhase(2)
    if (progress > 80) setPhase(3)
  }, [progress])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-sm px-8">
        {/* Logo mark */}
        <motion.div
          className="mb-10 flex items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 rounded border border-[#00d4ff]/40 animate-spin-slow" />
            <div className="absolute inset-1 rounded-sm bg-[#00d4ff]/10 border border-[#00d4ff]/20" />
          </div>
          <span className="font-mono text-sm text-[#8b8fa8] tracking-widest uppercase">
            Maru Sathvik Reddy.portfolio
          </span>
        </motion.div>

        {/* Terminal lines */}
        <div className="mb-6 space-y-1">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              className="font-mono text-xs"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: phase >= i ? 1 : 0.1, x: 0 }}
              transition={{ delay: i * 0.15 + 0.2 }}
            >
              <span
                className={
                  phase >= i ? (i === 3 ? 'text-[#00d4ff]' : 'text-[#4a4d60]') : 'text-[#1e2130]'
                }
              >
                {line}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-[#1e2130]">
          <motion.div
            className="h-full rounded-full bg-[#00d4ff]"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
          <div
            className="absolute top-0 h-full w-8 blur-sm bg-[#00d4ff]/60"
            style={{ left: `${progress - 4}%` }}
          />
        </div>

        <div className="mt-2 flex justify-between">
          <span className="font-mono text-xs text-[#4a4d60]">loading</span>
          <span className="font-mono text-xs text-[#00d4ff]">{Math.min(100, Math.round(progress))}%</span>
        </div>
      </div>
    </motion.div>
  )
}
