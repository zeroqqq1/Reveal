'use client'

import { useEffect, useRef } from 'react'

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}0101101010'
    const charArray = chars.split('')

    const fontSize = 14
    const columns = canvas.width / fontSize

    const drops: number[] = []
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * canvas.height
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.04)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00ffff'
      ctx.font = fontSize + 'px monospace'

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 35)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-10"
    />
  )
}

export default MatrixRain 