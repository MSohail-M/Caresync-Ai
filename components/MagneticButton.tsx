'use client'

import { useRef, ReactNode } from 'react'
import { motion, useSpring, useReducedMotion } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  strength?: number
  className?: string
}

export default function MagneticButton({
  children,
  strength = 0.28,
  className = '',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const x = useSpring(0, { stiffness: 180, damping: 18 })
  const y = useSpring(0, { stiffness: 180, damping: 18 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width  / 2)) * strength)
    y.set((e.clientY - (rect.top  + rect.height / 2)) * strength)
  }

  const handleMouseLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      style={{ x: prefersReducedMotion ? 0 : x, y: prefersReducedMotion ? 0 : y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  )
}
