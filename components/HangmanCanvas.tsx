'use client'

import React, { useEffect, useRef } from 'react'

interface HangmanCanvasProps {
  mistakes: number
  width?: number
  height?: number
}

export default function HangmanCanvas({ mistakes, width = 300, height = 400 }: HangmanCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = width
    canvas.height = height

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set drawing properties
    ctx.lineWidth = 3
    ctx.strokeStyle = '#8B4513'
    ctx.lineCap = 'round'

    // Draw hangman parts based on mistakes
    drawHangmanParts(ctx, mistakes, width, height)
  }, [mistakes, width, height])

  return (
    <canvas
      ref={canvasRef}
      data-testid="hangman-canvas"
      className="hangman-canvas"
      role="img"
      aria-label={`Hangman drawing with ${mistakes} mistakes`}
      width={width}
      height={height}
    />
  )
}

function drawHangmanParts(ctx: CanvasRenderingContext2D, mistakes: number, canvasWidth: number, canvasHeight: number) {
  // Calculate proportional coordinates based on canvas size
  const scale = Math.min(canvasWidth / 300, canvasHeight / 400)
  const baseX = 50 * scale
  const baseY = canvasHeight - 50 * scale
  const poleHeight = 250 * scale
  const armLength = 100 * scale
  const ropeLength = 50 * scale
  const headRadius = 25 * scale
  const bodyLength = 80 * scale

  if (mistakes >= 1) {
    drawBase(ctx, baseX, baseY, scale)
  }
  
  if (mistakes >= 2) {
    drawPole(ctx, baseX, baseY, poleHeight)
  }
  
  if (mistakes >= 3) {
    drawTop(ctx, baseX, baseY, poleHeight, armLength)
  }
  
  if (mistakes >= 4) {
    drawRope(ctx, baseX, baseY, poleHeight, armLength, ropeLength)
  }
  
  if (mistakes >= 5) {
    drawHead(ctx, baseX, baseY, poleHeight, armLength, ropeLength, headRadius)
  }
  
  if (mistakes >= 6) {
    drawBody(ctx, baseX, baseY, poleHeight, armLength, ropeLength, headRadius, bodyLength)
  }
}

function drawBase(ctx: CanvasRenderingContext2D, baseX: number, baseY: number, scale: number) {
  ctx.beginPath()
  ctx.moveTo(baseX - 20 * scale, baseY)
  ctx.lineTo(baseX + 120 * scale, baseY)
  ctx.stroke()
}

function drawPole(ctx: CanvasRenderingContext2D, baseX: number, baseY: number, poleHeight: number) {
  ctx.beginPath()
  ctx.moveTo(baseX, baseY)
  ctx.lineTo(baseX, baseY - poleHeight)
  ctx.stroke()
}

function drawTop(ctx: CanvasRenderingContext2D, baseX: number, baseY: number, poleHeight: number, armLength: number) {
  ctx.beginPath()
  ctx.moveTo(baseX, baseY - poleHeight)
  ctx.lineTo(baseX + armLength, baseY - poleHeight)
  ctx.stroke()
}

function drawRope(ctx: CanvasRenderingContext2D, baseX: number, baseY: number, poleHeight: number, armLength: number, ropeLength: number) {
  ctx.beginPath()
  ctx.moveTo(baseX + armLength, baseY - poleHeight)
  ctx.lineTo(baseX + armLength, baseY - poleHeight + ropeLength)
  ctx.stroke()
}

function drawHead(ctx: CanvasRenderingContext2D, baseX: number, baseY: number, poleHeight: number, armLength: number, ropeLength: number, headRadius: number) {
  ctx.beginPath()
  ctx.arc(
    baseX + armLength,
    baseY - poleHeight + ropeLength + headRadius,
    headRadius,
    0,
    Math.PI * 2
  )
  ctx.stroke()
}

function drawBody(ctx: CanvasRenderingContext2D, baseX: number, baseY: number, poleHeight: number, armLength: number, ropeLength: number, headRadius: number, bodyLength: number) {
  ctx.beginPath()
  ctx.moveTo(
    baseX + armLength,
    baseY - poleHeight + ropeLength + headRadius * 2
  )
  ctx.lineTo(
    baseX + armLength,
    baseY - poleHeight + ropeLength + headRadius * 2 + bodyLength
  )
  ctx.stroke()
}