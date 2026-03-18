import { useRef } from 'react'
import { ChannelId } from '../types'
import CustomVerticalSlider from './CustomVerticalSlider'

interface ChannelControlProps {
  channelId: ChannelId
  channelName: string
  value: number
  onValueChange: (channelId: ChannelId, value: number) => void
  maxPower: number
  step: number
}

/**
 * ChannelControl Component
 *
 * Renders a single amplifier channel with:
 * - Channel label
 * - Vertical slider with blue fill indicator
 * - Numeric text input below slider
 * - Synchronization between slider and input
 *
 * The slider and input always stay in sync. Typing invalid text is allowed during editing
 * and gets parsed to an integer on blur.
 */

export default function ChannelControl({
  channelId,
  channelName,
  value,
  onValueChange,
  maxPower,
  step,
}: ChannelControlProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  /**
   * Handle slider change - update via parent
   */
  const handleSliderChange = (newValue: number) => {
    onValueChange(channelId, newValue)
  }

  /**
   * Handle text input change - allow any text during editing
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    // Allow empty string and non-numeric input during typing (for UX fluidity)
    if (rawValue === '') {
      // Keep the input empty but don't update the value yet
      return
    }
    const parsed = parseInt(rawValue, 10)
    if (!isNaN(parsed)) {
      onValueChange(channelId, parsed)
    }
  }

  /**
   * Handle input blur - parse and validate when user leaves the field
   */
  const handleInputBlur = () => {
    if (inputRef.current) {
      const rawValue = inputRef.current.value.trim()
      if (rawValue === '') {
        // If empty on blur, reset to current value
        inputRef.current.value = String(value)
      } else {
        const parsed = parseInt(rawValue, 10)
        if (isNaN(parsed)) {
          // Invalid number, reset to current value
          inputRef.current.value = String(value)
        } else {
          // Valid number - update parent, which will validate and clamp
          onValueChange(channelId, parsed)
        }
      }
    }
  }

  return (
    <div className="group-box relative p-2 flex flex-col h-full min-h-52">
      <div className="group-box-title text-xs">{channelName}</div>

      {/* Content with title spacing */}
      <div className="mt-2 flex flex-col flex-1 items-center gap-2">
        {/* Custom Vertical Slider */}
        <CustomVerticalSlider
          value={value}
          min={0}
          max={maxPower}
          step={step}
          onChange={handleSliderChange}
          ariaLabel={`${channelName} power allocation`}
        />

        {/* Numeric Input with unit - Below slider */}
        <div className="flex items-center justify-center gap-1 w-full">
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            value={value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="numeric-input w-12 text-xs"
            pattern="\d*"
            placeholder="0"
            size={3}
          />
          <span className="text-xs font-semibold text-gray-700">W</span>
        </div>
      </div>
    </div>
  )
}
