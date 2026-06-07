'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  baseVx: number; baseVy: number
  radius: number; opacity: number
}

export default function ParticleField({ count = 70 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef  = useRef({ x: -9999, y: -9999 })
  const rafRef    = useRef<number>()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      init()
    }

    const init = () => {
      particles = Array.from({ length: count }, () => {
        const vx = (Math.random() - 0.5) * 0.35
        const vy = (Math.random() - 0.5) * 0.35
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx, vy, baseVx: vx, baseVy: vy,
          radius:  Math.random() * 1.8 + 0.4,
          opacity: Math.random() * 0.45 + 0.08,
        }
      })
    }

    const CONNECT = 140
    const REPEL   = 110

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse repulsion
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < REPEL && dist > 0) {
          const f = ((REPEL - dist) / REPEL) * 1.2
          p.vx += (dx / dist) * f
          p.vy += (dy / dist) * f
        }

        // Drift back toward base velocity
        p.vx += (p.baseVx - p.vx) * 0.04
        p.vy += (p.baseVy - p.vy) * 0.04

        // Speed cap
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (spd > 2.5) { p.vx *= 2.5 / spd; p.vy *= 2.5 / spd }

        p.x += p.vx
        p.y += p.vy

        // Wrap edges
        if (p.x < -4)               p.x = canvas.width  + 4
        if (p.x > canvas.width + 4) p.x = -4
        if (p.y < -4)               p.y = canvas.height + 4
        if (p.y > canvas.height + 4) p.y = -4

        // Dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59,142,240,${p.opacity})`
        ctx.fill()

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const q  = particles[j]
          const ex = p.x - q.x
          const ey = p.y - q.y
          const d  = Math.sqrt(ex * ex + ey * ey)
          if (d < CONNECT) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(59,142,240,${(1 - d / CONNECT) * 0.18})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)

    resize()
    tick()

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [prefersReducedMotion, count])

  if (prefersReducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2 }}
    />
  )
}
