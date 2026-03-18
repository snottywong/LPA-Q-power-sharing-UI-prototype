import { ChannelValues } from '../types'

interface LastAppliedSectionProps {
  appliedValues: ChannelValues
}

/**
 * LastAppliedSection Component
 *
 * Q-SYS style panel showing the last successfully committed values.
 * Helps users understand what configuration was actually saved.
 */

export default function LastAppliedSection({ appliedValues }: LastAppliedSectionProps) {
  const channels = [
    { key: 'channel1' as const, label: 'Ch A' },
    { key: 'channel2' as const, label: 'Ch B' },
    { key: 'channel3' as const, label: 'Ch C' },
    { key: 'channel4' as const, label: 'Ch D' },
  ]

  const totalApplied =
    appliedValues.channel1 +
    appliedValues.channel2 +
    appliedValues.channel3 +
    appliedValues.channel4

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
                {appliedValues[key]}W
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-400 pt-1 text-xs text-gray-700">
          Total: <span className="font-mono font-semibold">{totalApplied}W</span>
        </div>
      </div>
    </div>
  )
}
