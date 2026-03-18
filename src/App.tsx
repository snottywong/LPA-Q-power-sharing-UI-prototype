import { useState, useEffect } from 'react'
import {
  AppState,
  ChannelValues,
  ChannelId,
  CHANNEL_MAX_POWER,
  TOTAL_BUDGET,
  POWER_STEP,
} from './types'
import ChannelControl from './components/ChannelControl'
import SummaryCard from './components/SummaryCard'
import LastAppliedSection from './components/LastAppliedSection'
import Toast from './components/Toast'

/**
 * Main App Component
 *
 * State Model:
 * - draftValues: Current values being edited. Can temporarily exceed the 500W budget.
 *   The user can modify these freely during editing without validation.
 * - appliedValues: The last successfully committed set of values. Only updated when
 *   the user clicks "Apply Changes" and validation passes.
 * - error: Validation error message shown when commit fails (total > 500W)
 * - successMessage: Brief confirmation shown after successful commit
 *
 * Key Design Decision:
 * Validation happens ONLY on the Commit phase, not during editing. This allows the user
 * to temporarily create an over-budget state while making adjustments, then fix it before
 * committing.
 */

const DEFAULT_VALUES: ChannelValues = {
  channel1: 125,
  channel2: 125,
  channel3: 125,
  channel4: 125,
}

export default function App() {
  const [state, setState] = useState<AppState>({
    draftValues: DEFAULT_VALUES,
    appliedValues: DEFAULT_VALUES,
    error: null,
    successMessage: null,
  })

  // Clear error/success messages after they're shown
  useEffect(() => {
    if (state.error) {
      const timer = setTimeout(() => {
        setState((prev) => ({ ...prev, error: null }))
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [state.error])

  useEffect(() => {
    if (state.successMessage) {
      const timer = setTimeout(() => {
        setState((prev) => ({ ...prev, successMessage: null }))
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [state.successMessage])

  /**
   * Update a single channel's draft value.
   * No validation is performed here - allows temporary over-budget states.
   */
  const updateChannelValue = (channelId: ChannelId, newValue: number) => {
    // Clamp to individual channel limits (0-250W)
    const clampedValue = Math.max(0, Math.min(CHANNEL_MAX_POWER, newValue))

    setState((prev) => ({
      ...prev,
      draftValues: {
        ...prev.draftValues,
        [channelId]: clampedValue,
      },
    }))
  }

  /**
   * Calculate the total of all draft values
   */
  const getTotalPower = (values: ChannelValues): number => {
    return values.channel1 + values.channel2 + values.channel3 + values.channel4
  }

  /**
   * Apply/Commit changes with validation.
   * Validates that total power is within budget before accepting the changes.
   */
  const handleApplyChanges = () => {
    const totalPower = getTotalPower(state.draftValues)

    if (totalPower > TOTAL_BUDGET) {
      const overage = totalPower - TOTAL_BUDGET
      setState((prev) => ({
        ...prev,
        error: `Power budget exceeded by ${overage}W. Total assigned: ${totalPower}W / ${TOTAL_BUDGET}W. Please reduce allocations to apply changes.`,
      }))
      return
    }

    // Validation passed - commit the draft values
    setState((prev) => ({
      ...prev,
      appliedValues: { ...prev.draftValues },
      successMessage: 'Changes applied successfully',
      error: null,
    }))
  }

  /**
   * Reset draft values to 125W for all channels AND commit those as applied values
   */
  const handleReset = () => {
    const defaultValues: ChannelValues = {
      channel1: 125,
      channel2: 125,
      channel3: 125,
      channel4: 125,
    }
    setState((prev) => ({
      ...prev,
      draftValues: defaultValues,
      appliedValues: defaultValues,
      error: null,
      successMessage: 'Reset to default allocations',
    }))
  }

  const totalPower = getTotalPower(state.draftValues)
  const remainingPower = TOTAL_BUDGET - totalPower
  const isOverBudget = totalPower > TOTAL_BUDGET
  const hasChanges = JSON.stringify(state.draftValues) !== JSON.stringify(state.appliedValues)

  return (
    <div className="min-h-screen bg-gray-200 p-2">
      <div className="mx-auto" style={{ maxWidth: '600px' }}>
        {/* Title Bar - Device-like header */}
        <div className="mb-2 border-b-2 border-gray-500 bg-gradient-to-r from-gray-300 to-gray-350 px-3 py-2">
          <h1 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
            AMP POWER ALLOCATION - LPA-Q 4x125
          </h1>
        </div>

        {/* Main Container */}
        <div>
          {/* Current Power Allocation - at TOP */}
          <LastAppliedSection appliedValues={state.appliedValues} />

          {/* New Power Allocation - in MIDDLE */}
          <div className="group-box relative p-3 mt-3">
            <div className="group-box-title">New Power Allocation</div>

            {/* Spacing for title */}
            <div className="mt-3">
              {/* Channel Controls - 4 Column Compact Grid */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                <ChannelControl
                  channelId="channel1"
                  channelName="Ch A"
                  value={state.draftValues.channel1}
                  onValueChange={updateChannelValue}
                  maxPower={CHANNEL_MAX_POWER}
                  step={POWER_STEP}
                />
                <ChannelControl
                  channelId="channel2"
                  channelName="Ch B"
                  value={state.draftValues.channel2}
                  onValueChange={updateChannelValue}
                  maxPower={CHANNEL_MAX_POWER}
                  step={POWER_STEP}
                />
                <ChannelControl
                  channelId="channel3"
                  channelName="Ch C"
                  value={state.draftValues.channel3}
                  onValueChange={updateChannelValue}
                  maxPower={CHANNEL_MAX_POWER}
                  step={POWER_STEP}
                />
                <ChannelControl
                  channelId="channel4"
                  channelName="Ch D"
                  value={state.draftValues.channel4}
                  onValueChange={updateChannelValue}
                  maxPower={CHANNEL_MAX_POWER}
                  step={POWER_STEP}
                />
              </div>

              {/* Control Buttons */}
              <div className="mt-3 flex gap-2 justify-end">
                <button
                  onClick={handleReset}
                  className="btn-hardware text-xs px-3 py-1"
                >
                  Reset
                </button>
                <button
                  onClick={handleApplyChanges}
                  className={`btn-hardware text-xs px-3 py-1 ${isOverBudget || !hasChanges ? '' : 'primary'}`}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Power Summary Panel - at BOTTOM */}
          <SummaryCard
            totalAssigned={totalPower}
            totalBudget={TOTAL_BUDGET}
            remainingPower={remainingPower}
            isOverBudget={isOverBudget}
          />
        </div>

        {/* Validation Error Toast */}
        {state.error && <Toast type="error" message={state.error} />}

        {/* Success Toast */}
        {state.successMessage && <Toast type="success" message={state.successMessage} />}
      </div>
    </div>
  )
}
