import { motion } from 'framer-motion'

const variants = {
  initial: { opacity: 0, y: 30, scale: 0.98, filter: 'blur(6px)' },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    filter: 'blur(6px)',
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
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
