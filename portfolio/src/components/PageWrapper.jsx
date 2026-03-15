import { motion } from 'framer-motion'

// Direction-aware variants: pages slide in/out horizontally
const variants = {
  initial: { opacity: 0, x: 40, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    x: -40,
    filter: 'blur(4px)',
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
}

export default function PageWrapper({ children, className = '' }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`min-h-[calc(100vh-72px)] ${className}`}
    >
      {children}
    </motion.div>
  )
}
