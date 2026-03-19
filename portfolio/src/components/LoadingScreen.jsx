import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const lines = [
  '> initializing neural stack...',
  '> loading ml models...',
  '> compiling portfolio...',
  '> ready.',
]

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase]       = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(timer); setTimeout(onComplete, 400); return 100 }
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
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'var(--bg)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated orbs */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{ background: 'radial-gradient(circle, var(--accent-soft) 0%, transparent 70%)' }}
        animate={{ x: [0, 60, -30, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full"
        style={{ background: 'radial-gradient(circle, var(--accent2) 0%, transparent 70%)', top: '20%', right: '30%' }}
        animate={{ x: [0, -40, 30, 0], y: [0, 30, -20, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="w-full max-w-sm px-8 relative z-10">
        <motion.div className="mb-10 flex items-center gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="relative h-10 w-10">
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-[var(--accent1)]"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-1.5 rounded-lg"
              style={{ background: 'var(--accent-soft)' }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <span className="font-mono text-sm text-[var(--t2)] tracking-widest uppercase">MSR.portfolio</span>
        </motion.div>

        <div className="mb-6 space-y-1.5">
          {lines.map((line, i) => (
            <motion.div key={i} className="font-mono text-xs" initial={{ opacity: 0, x: -10 }} animate={{ opacity: phase >= i ? 1 : 0.15, x: 0 }} transition={{ delay: i * 0.15 + 0.2 }}>
              <span className={phase >= i ? (i === 3 ? 'gradient-text font-bold' : 'text-[var(--t2)]') : 'text-[var(--border)]'}>
                {line}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-[var(--border)]">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'var(--gradient-h)' }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
          <motion.div
            className="absolute top-0 h-full w-12 blur-sm"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(239,68,68,0.5), transparent)', left: `${progress - 6}%` }}
          />
        </div>
        <div className="mt-3 flex justify-between">
          <span className="font-mono text-xs text-[var(--t3)]">loading</span>
          <span className="font-mono text-xs font-bold gradient-text">{Math.min(100, Math.round(progress))}%</span>
        </div>
      </div>
    </motion.div>
  )
}
