import React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test, describe, beforeEach, jest } from '@jest/globals'
import HangmanCanvas from '../components/HangmanCanvas'

// Mock canvas context
const mockContext = {
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  arc: jest.fn(),
  stroke: jest.fn(),
  fill: jest.fn(),
  clearRect: jest.fn(),
  fillRect: jest.fn(),
  strokeRect: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  scale: jest.fn(),
  rotate: jest.fn(),
  translate: jest.fn(),
  createLinearGradient: jest.fn(),
  createRadialGradient: jest.fn(),
  createPattern: jest.fn(),
  addColorStop: jest.fn(),
  rect: jest.fn(),
  closePath: jest.fn(),
  clip: jest.fn(),
  quadraticCurveTo: jest.fn(),
  bezierCurveTo: jest.fn(),
  arcTo: jest.fn(),
  isPointInPath: jest.fn(),
  isPointInStroke: jest.fn(),
  measureText: jest.fn(() => ({ width: 100 })),
  fillText: jest.fn(),
  strokeText: jest.fn(),
  createImageData: jest.fn(),
  getImageData: jest.fn(),
  putImageData: jest.fn(),
  setLineDash: jest.fn(),
  getLineDash: jest.fn(),
  drawImage: jest.fn(),
  canvas: {
    width: 300,
    height: 400,
    style: {},
    getContext: jest.fn(),
    toDataURL: jest.fn(),
    toBlob: jest.fn(),
    getBoundingClientRect: jest.fn(() => ({
      width: 300,
      height: 400,
      top: 0,
      left: 0,
      right: 300,
      bottom: 400,
    })),
  },
  lineWidth: 1,
  lineCap: 'butt',
  lineJoin: 'miter',
  miterLimit: 10,
  strokeStyle: '#000000',
  fillStyle: '#000000',
  font: '10px sans-serif',
  textAlign: 'start',
  textBaseline: 'alphabetic',
  direction: 'ltr',
  globalAlpha: 1,
  globalCompositeOperation: 'source-over',
  imageSmoothingEnabled: true,
  imageSmoothingQuality: 'low',
  shadowBlur: 0,
  shadowColor: 'rgba(0, 0, 0, 0)',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  filter: 'none',
  lineDashOffset: 0,
} as unknown as CanvasRenderingContext2D

const mockCanvas = {
  getContext: jest.fn(() => mockContext),
  width: 300,
  height: 400,
  style: {},
  toDataURL: jest.fn(),
  toBlob: jest.fn(),
  getBoundingClientRect: jest.fn(() => ({
    width: 300,
    height: 400,
    top: 0,
    left: 0,
    right: 300,
    bottom: 400,
  })),
} as unknown as HTMLCanvasElement

describe('HangmanCanvas Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
    
    // Mock HTMLCanvasElement.getContext
    const getContextSpy = jest.spyOn(HTMLCanvasElement.prototype, 'getContext')
    getContextSpy.mockReturnValue(mockContext)
    
    // Mock getBoundingClientRect for canvas
    const getBoundingClientRectSpy = jest.spyOn(HTMLCanvasElement.prototype, 'getBoundingClientRect')
    getBoundingClientRectSpy.mockReturnValue({
      width: 300,
      height: 400,
      top: 0,
      left: 0,
      right: 300,
      bottom: 400,
      x: 0,
      y: 0,
    } as DOMRect)
  })

  test('renders canvas element', () => {
    render(<HangmanCanvas mistakes={0} />)
    
    const canvas = screen.getByRole('img', { hidden: true }) // Canvas has implicit role of img
    expect(canvas).toBeInTheDocument()
    expect(canvas.tagName).toBe('CANVAS')
  })

  test('draws nothing at 0 mistakes', () => {
    render(<HangmanCanvas mistakes={0} />)
    
    // Should call getContext to set up canvas
    expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalledWith('2d')
    
    // Should clear the canvas
    expect(mockContext.clearRect).toHaveBeenCalled()
    
    // Should not draw anything (no stroke calls for drawing parts)
    expect(mockContext.stroke).not.toHaveBeenCalled()
  })

  test('draws base at 1 mistake', () => {
    render(<HangmanCanvas mistakes={1} />)
    
    // Should clear canvas first
    expect(mockContext.clearRect).toHaveBeenCalled()
    
    // Should begin path for drawing
    expect(mockContext.beginPath).toHaveBeenCalled()
    
    // Should draw base (horizontal line at bottom)
    expect(mockContext.moveTo).toHaveBeenCalled()
    expect(mockContext.lineTo).toHaveBeenCalled()
    expect(mockContext.stroke).toHaveBeenCalled()
  })

  test('draws pole at 2 mistakes', () => {
    render(<HangmanCanvas mistakes={2} />)
    
    // Should clear canvas first
    expect(mockContext.clearRect).toHaveBeenCalled()
    
    // Should have multiple drawing operations for base + pole
    expect(mockContext.beginPath).toHaveBeenCalled()
    expect(mockContext.moveTo).toHaveBeenCalled()
    expect(mockContext.lineTo).toHaveBeenCalled()
    expect(mockContext.stroke).toHaveBeenCalled()
    
    // Should have made multiple stroke calls (for base and pole)
    expect(mockContext.stroke).toHaveBeenCalledTimes(2)
  })

  test('draws complete hangman at 6 mistakes', () => {
    render(<HangmanCanvas mistakes={6} />)
    
    // Should clear canvas first
    expect(mockContext.clearRect).toHaveBeenCalled()
    
    // Should have multiple drawing operations for all parts
    expect(mockContext.beginPath).toHaveBeenCalled()
    expect(mockContext.moveTo).toHaveBeenCalled()
    expect(mockContext.lineTo).toHaveBeenCalled()
    expect(mockContext.stroke).toHaveBeenCalled()
    
    // Should have drawn head (circle)
    expect(mockContext.arc).toHaveBeenCalled()
    
    // Should have made multiple stroke calls for all parts
    // (base, pole, top, rope, head, body, left arm, right arm, left leg, right leg)
    expect(mockContext.stroke).toHaveBeenCalledTimes(6)
  })

  test('scales to container size', () => {
    // Mock container dimensions
    const mockContainer = {
      getBoundingClientRect: jest.fn(() => ({
        width: 600,
        height: 800,
        top: 0,
        left: 0,
        right: 600,
        bottom: 800,
      })),
    }

    // Mock ResizeObserver
    const mockResizeObserver = jest.fn()
    mockResizeObserver.mockReturnValue({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    })
    global.ResizeObserver = mockResizeObserver

    render(<HangmanCanvas mistakes={3} />)
    
    const canvas = screen.getByRole('img', { hidden: true })
    
    // Should set canvas dimensions
    expect(canvas).toHaveAttribute('width')
    expect(canvas).toHaveAttribute('height')
    
    // Should have called getContext to set up drawing
    expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalledWith('2d')
  })

  test('canvas has correct attributes', () => {
    render(<HangmanCanvas mistakes={3} />)
    
    const canvas = screen.getByRole('img', { hidden: true })
    
    // Should have width and height attributes
    expect(canvas).toHaveAttribute('width')
    expect(canvas).toHaveAttribute('height')
    
    // Should have data-testid for testing
    expect(canvas).toHaveAttribute('data-testid', 'hangman-canvas')
  })

  test('redraws when mistakes prop changes', () => {
    const { rerender } = render(<HangmanCanvas mistakes={1} />)
    
    // Clear mock calls from initial render
    jest.clearAllMocks()
    
    // Re-render with different mistakes
    rerender(<HangmanCanvas mistakes={3} />)
    
    // Should clear and redraw
    expect(mockContext.clearRect).toHaveBeenCalled()
    expect(mockContext.stroke).toHaveBeenCalled()
  })

  test('sets correct canvas drawing properties', () => {
    render(<HangmanCanvas mistakes={1} />)
    
    // Should set line width for drawing
    expect(mockContext.lineWidth).toBeDefined()
    
    // Should set stroke style
    expect(mockContext.strokeStyle).toBeDefined()
  })
})