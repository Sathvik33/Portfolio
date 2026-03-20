import { useRef, useCallback } from 'react'

/**
 * Provides 3D tilt on mouse hover.
 * Returns { ref, onMouseMove, onMouseLeave } to attach to a card.
 * @param {number} intensity – tilt angle (default 8 degrees)
 */
export default function useTilt(intensity = 8) {
  const ref = useRef(null)

  const onMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.02,1.02,1.02)`
  }, [intensity])

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (el) el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
