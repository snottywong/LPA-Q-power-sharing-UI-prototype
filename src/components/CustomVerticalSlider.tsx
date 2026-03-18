import { useRef, useEffect, useState } from 'react'

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
 * - Smooth mouse-based interaction
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
  const [isDragging, setIsDragging] = useState(false)

  // Calculate percentage (0-100)
  const percentage = ((value - min) / (max - min)) * 100

  // Handle mouse down on container or handle
  const handleMouseDown = () => {
    setIsDragging(true)
  }

  // Handle mouse move anywhere on document when dragging
  useEffect(() => {
    if (!isDragging || !containerRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current!.getBoundingClientRect()
      // Calculate position from bottom (0 = bottom, 100 = top)
      const distanceFromBottom = rect.bottom - e.clientY
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

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, min, max, step, onChange])

  return (
    <div
      ref={containerRef}
      className="relative w-6 h-20 bg-gray-300 border border-gray-500 select-none"
      onMouseDown={handleMouseDown}
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      tabIndex={0}
    >
      {/* Fill indicator - dark blue from bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-blue-700 pointer-events-none"
        style={{ height: `${percentage}%`, transition: isDragging ? 'none' : 'height 0.05s linear' }}
      />

      {/* Handle - small rectangle centered horizontally */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-5 h-3 bg-gray-400 border border-gray-600 rounded-sm pointer-events-none"
        style={{
          bottom: `calc(${percentage}% - 6px)`,
          transition: isDragging ? 'none' : 'bottom 0.05s linear',
        }}
      />
    </div>
  )
}
