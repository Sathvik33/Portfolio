import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * Creative visual divider between sections.
 * Uses scroll-driven animated gradient line + floating orbs to connect sections.
 * @param {'cyan'|'blue'|'violet'} accent - color accent for this transition
 * @param {boolean} flip - mirror the transition direction
 */
export default function SectionTransition({ accent = 'cyan', flip = false }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const lineScale = useTransform(scrollYProgress, [0.2, 0.6], [0, 1])
  const orbY = useTransform(scrollYProgress, [0.1, 0.9], [30, -30])
  const orbOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.6, 0.6, 0])

  const accentColors = {
    cyan: { line: '#06b6d4', orb: 'rgba(6,182,212,0.15)' },
    blue: { line: '#3b82f6', orb: 'rgba(59,130,246,0.12)' },
    violet: { line: '#8b5cf6', orb: 'rgba(139,92,246,0.12)' },
  }

  const c = accentColors[accent] || accentColors.cyan

  return (
    <div ref={ref} className="relative h-8 md:h-12 overflow-hidden">
      {/* Animated gradient line */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[1px] w-full max-w-xs md:max-w-md"
        style={{
          background: `linear-gradient(90deg, transparent, ${c.line}, transparent)`,
          scaleX: lineScale,
          opacity: lineScale,
        }}
      />

      {/* Floating orb */}
      <motion.div
        className="absolute rounded-full blur-[60px] pointer-events-none"
        style={{
          width: 200,
          height: 200,
          background: c.orb,
          left: flip ? '25%' : '65%',
          top: '50%',
          translateY: '-50%',
          y: orbY,
          opacity: orbOpacity,
        }}
      />

      {/* Small decorative dot */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
        style={{
          background: c.line,
          opacity: orbOpacity,
        }}
      />
    </div>
  )
}
