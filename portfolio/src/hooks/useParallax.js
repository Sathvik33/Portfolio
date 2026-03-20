import { useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

/**
 * Hook for parallax scroll effects on any element.
 * @param {number} speed – parallax intensity (0.1 = subtle, 0.5 = strong)
 * @param {string} direction – 'y' or 'x'
 */
export default function useParallax(speed = 0.2, direction = 'y') {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const range = 100 * speed
  const raw = useTransform(scrollYProgress, [0, 1], [range, -range])
  const value = useSpring(raw, { stiffness: 100, damping: 30, mass: 0.5 })

  return { ref, [direction]: value }
}
