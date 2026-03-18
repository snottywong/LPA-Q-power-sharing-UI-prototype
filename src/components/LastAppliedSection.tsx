import { ChannelValues } from '../types'
import { useState, useEffect } from 'react'

interface LastAppliedSectionProps {
  appliedValues: ChannelValues
}

/**
 * LastAppliedSection Component
 *
 * Q-SYS style panel showing the last successfully committed values.
 * Helps users understand what configuration was actually saved.
 * Animates values when they change via the Apply button.
 */

export default function LastAppliedSection({ appliedValues }: LastAppliedSectionProps) {
  const [displayedValues, setDisplayedValues] = useState<ChannelValues>(appliedValues)

  const channels = [
    { key: 'channel1' as const, label: 'Ch A' },
    { key: 'channel2' as const, label: 'Ch B' },
    { key: 'channel3' as const, label: 'Ch C' },
    { key: 'channel4' as const, label: 'Ch D' },
  ]

  // Animate displayed values when appliedValues change
  useEffect(() => {
    const startValues = displayedValues
    const endValues = appliedValues
    const startTime = Date.now()
    const duration = 500 // 0.5 second animation

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      const newDisplayedValues: ChannelValues = {
        channel1: Math.round(startValues.channel1 + (endValues.channel1 - startValues.channel1) * progress),
        channel2: Math.round(startValues.channel2 + (endValues.channel2 - startValues.channel2) * progress),
        channel3: Math.round(startValues.channel3 + (endValues.channel3 - startValues.channel3) * progress),
        channel4: Math.round(startValues.channel4 + (endValues.channel4 - startValues.channel4) * progress),
      }

      setDisplayedValues(newDisplayedValues)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [appliedValues])

  const totalDisplayed =
    displayedValues.channel1 +
    displayedValues.channel2 +
    displayedValues.channel3 +
    displayedValues.channel4

  return (
    <div className="group-box relative p-2 mb-3">
      <div className="group-box-title">Current Power Allocation</div>

      {/* Content with title spacing */}
      <div className="mt-2">
        <div className="grid grid-cols-4 gap-1 mb-1">
          {channels.map(({ key, label }) => (
            <div key={key} className="bg-gray-100 border border-gray-400 p-1 text-center text-xs">
              <p className="font-semibold text-gray-700">{label}</p>
              <p className="font-mono font-bold text-gray-900 text-sm">
                {displayedValues[key]}W
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-400 pt-1 text-xs text-gray-700">
          Total Power Used: <span className="font-mono font-semibold">{totalDisplayed}W</span>
        </div>
      </div>
    </div>
  )
}
