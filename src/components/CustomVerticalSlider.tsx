import { useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'

interface CustomVerticalSliderProps {
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  ariaLabel?: string
}

/**
 * CustomVerticalSlider Component
 *
 * A simple custom vertical slider with:
 * - Single rectangular track
 * - Dark blue fill from bottom up
 * - Small rectangular draggable handle
 * - Smooth pointer-based interaction for mouse and touch devices
 */
export default function CustomVerticalSlider({
  value,
  min,
  max,
  step,
  onChange,
  ariaLabel = 'Slider',
}: CustomVerticalSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const activePointerIdRef = useRef<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Calculate percentage (0-100)
  const percentage = ((value - min) / (max - min)) * 100

  const updateValueFromClientY = (clientY: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    // Calculate position from bottom (0 = bottom, 100 = top)
    const distanceFromBottom = rect.bottom - clientY
    const trackHeight = rect.height
    let newPercentage = (distanceFromBottom / trackHeight) * 100

    // Clamp to 0-100
    newPercentage = Math.max(0, Math.min(100, newPercentage))

    // Convert percentage back to value
    let newValue = min + (newPercentage / 100) * (max - min)

    // Snap to step
    newValue = Math.round(newValue / step) * step

    onChange(newValue)
  }

  const finishDrag = (pointerId: number) => {
    if (activePointerIdRef.current !== pointerId) return

    if (containerRef.current?.hasPointerCapture(pointerId)) {
      containerRef.current.releasePointerCapture(pointerId)
    }

    activePointerIdRef.current = null
    setIsDragging(false)
  }

  // Handle pointer down on container or handle
  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return

    if (event.cancelable) {
      event.preventDefault()
    }

    activePointerIdRef.current = event.pointerId
    containerRef.current?.setPointerCapture(event.pointerId)
    setIsDragging(true)

    if (event.pointerType !== 'mouse') {
      updateValueFromClientY(event.clientY)
    }
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging || activePointerIdRef.current !== event.pointerId) return

    if (event.cancelable) {
      event.preventDefault()
    }

    updateValueFromClientY(event.clientY)
  }

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    finishDrag(event.pointerId)
  }

  const handlePointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    finishDrag(event.pointerId)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-6 h-32 bg-gray-300 border border-gray-500 select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onLostPointerCapture={handlePointerCancel}
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-orientation="vertical"
      tabIndex={0}
      style={{ touchAction: 'none' }}
    >
      {/* Fill indicator - dark blue from bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-blue-700 pointer-events-none"
        style={{ height: `${percentage}%`, transition: isDragging ? 'none' : 'height 0.5s linear' }}
      />

      {/* Handle - small rectangle centered horizontally */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-5 h-3 bg-gray-400 border border-gray-600 rounded-sm pointer-events-none"
        style={{
          bottom: `calc(${percentage}% - 6px)`,
          transition: isDragging ? 'none' : 'bottom 0.5s linear',
        }}
      />
    </div>
  )
}
