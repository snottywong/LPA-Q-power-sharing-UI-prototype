/**
 * Type definitions for the amplifier power allocation app
 */

export interface ChannelValues {
  channel1: number
  channel2: number
  channel3: number
  channel4: number
}

export type ChannelId = 'channel1' | 'channel2' | 'channel3' | 'channel4'

export interface AppState {
  // Current draft values being edited (can exceed 500W total)
  draftValues: ChannelValues
  
  // Last successfully committed values
  appliedValues: ChannelValues
  
  // Error message if validation fails on commit
  error: string | null
  
  // Success message after successful commit
  successMessage: string | null
}

export const CHANNEL_MAX_POWER = 250 // watts per channel
export const TOTAL_BUDGET = 500 // watts total
export const POWER_STEP = 1 // watts minimum increment
