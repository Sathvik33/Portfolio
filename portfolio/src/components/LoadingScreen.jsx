import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const lines = [
  '> initializing neural stack...',
  '> loading ml models...',
  '> compiling portfolio...',
  '> ready.',
]

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(timer); setTimeout(onComplete, 400); return 100 }
        return prev + 2.2
      })
    }, 25)
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
      style={{ background: '#030014' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Orbs */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)' }}
        animate={{ x: [0, 60, -30, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', top: '20%', right: '30%' }}
        animate={{ x: [0, -40, 30, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="w-full max-w-sm px-8 relative z-10">
        <motion.div className="mb-10 flex items-center gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="relative h-10 w-10">
            <motion.div
              className="absolute inset-0 rounded-xl"
              style={{ border: '2px solid #06b6d4' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-1.5 rounded-lg"
              style={{ background: 'rgba(6,182,212,0.1)' }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <span className="font-mono text-sm text-[#a0a0c0] tracking-widest uppercase">MSR.portfolio</span>
        </motion.div>

        <div className="mb-6 space-y-1.5">
          {lines.map((line, i) => (
            <motion.div key={i} className="font-mono text-xs" initial={{ opacity: 0, x: -10 }} animate={{ opacity: phase >= i ? 1 : 0.15, x: 0 }} transition={{ delay: i * 0.15 + 0.2 }}>
              <span className={phase >= i ? (i === 3 ? 'gradient-text font-bold' : 'text-[#a0a0c0]') : 'text-[#1a1a3e]'}>
                {line}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="relative h-[3px] w-full overflow-hidden rounded-full" style={{ background: '#1a1a3e' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6)' }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="mt-3 flex justify-between">
          <span className="font-mono text-xs" style={{ color: '#5a5a80' }}>loading</span>
          <span className="font-mono text-xs font-bold gradient-text">{Math.min(100, Math.round(progress))}%</span>
        </div>
      </div>
    </motion.div>
  )
}
