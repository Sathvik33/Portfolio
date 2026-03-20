import { useRef } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({ children, className = '', ...props }) {
  const ref = useRef(null)

  const handleMouse = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }

  return (
    <motion.button
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      whileTap={{ scale: 0.97 }}
      style={{ transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
