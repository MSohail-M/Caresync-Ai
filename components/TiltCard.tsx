'use client'

import { useRef, useState } from 'react'
import { motion, useSpring, useReducedMotion } from 'framer-motion'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  glowColor?: string
}

export default function TiltCard({
  children,
  className = '',
  intensity = 12,
  glowColor = 'rgba(59,142,240,0.15)',
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const rotateX = useSpring(0, { stiffness: 150, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 })
  const scale = useSpring(1, { stiffness: 200, damping: 25 })
  const glowX = useSpring(50, { stiffness: 100, damping: 20 })
  const glowY = useSpring(50, { stiffness: 100, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || prefersReducedMotion) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    rotateX.set(-(y - 0.5) * intensity)
    rotateY.set((x - 0.5) * intensity)
    glowX.set(x * 100)
    glowY.set(y * 100)
  }

  const handleMouseEnter = () => {
    if (prefersReducedMotion) return
    setIsHovered(true)
    scale.set(1.02)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
    glowX.set(50)
    glowY.set(50)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        scale: prefersReducedMotion ? 1 : scale,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`relative cursor-pointer ${className}`}
    >
      {/* Dynamic inner glow that follows cursor */}
      {isHovered && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor} 0%, transparent 60%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  )
}
