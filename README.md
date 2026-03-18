# Amplifier Power Allocation UI Prototype

A modern, polished React + TypeScript web application demonstrating a professional UX pattern for allocating a shared power budget across multiple channels with deferred validation.

## Overview

This prototype showcases an amplifier power allocation screen where users can:
- Allocate power across 4 channels (0–250W each)
- Maintain a 500W total budget
- Edit freely without immediate validation (allowing temporary over-budget states)
- Review changes before applying them
- See real-time totals and remaining power

### Key Design Feature

**Deferred Validation Pattern**: Instead of validating and blocking edits immediately when the total exceeds the budget, this UI allows users to temporarily create an over-budget draft state, then validates only when clicking "Apply Changes." This provides a better UX for making coordinated adjustments across multiple interdependent fields.

## State Model

The app uses three separate value states:

### `draftValues`
- Current values being edited by the user
- Can temporarily exceed the 500W total budget without blocking or error messages
- Updated whenever the user adjusts a slider or types in an input
- Not persisted until the user clicks "Apply Changes"

### `appliedValues`
- The last successfully committed configuration
- Only updated when:
  1. User clicks "Apply Changes"
  2. Total power ≤ 500W (validation passes)
- Shown in the "Last Applied Configuration" section for reference
- Clicking "Reset" reverts `draftValues` to these values

### `error` and `successMessage`
- Validation error shown when commit fails (total > 500W)
- Success confirmation shown after successful commit
- Both auto-dismiss after a few seconds

## Architecture

```
src/
├── main.tsx                      # React entry point
├── App.tsx                       # Main component with state management
├── types.ts                      # TypeScript type definitions
├── index.css                     # Tailwind CSS + custom styles
└── components/
    ├── ChannelControl.tsx        # Individual channel (slider + input)
    ├── SummaryCard.tsx           # Power budget summary display
    ├── LastAppliedSection.tsx    # Shows last committed values
    └── Toast.tsx                 # Notification messages
```

### Core Flow

1. **User edits**: Adjusts sliders/inputs → `draftValues` update instantly
2. **Draft state**: Totals display live; over-budget state is visual but not blocking
3. **Click Apply**: 
   - Validates total ≤ 500W
   - If valid: `appliedValues` ← `draftValues`, success toast shown
   - If invalid: Error toast with overage amount, user must reduce to proceed
4. **Click Reset**: `draftValues` ← `appliedValues` (revert to last applied)

## Setup & Run

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development Server

```bash
# Start dev server with hot reload
npm run dev
```

This opens the app in your browser (typically http://localhost:5173).

### Build for Production

```bash
# Build optimized bundle
npm run build

# Preview production build
npm run preview
```

## Customization Guide

### Configuration Values

Edit the `src/types.ts` file to adjust core parameters:

```typescript
export const CHANNEL_MAX_POWER = 250    // Max watts per channel
export const TOTAL_BUDGET = 500         // Total watts available
export const POWER_STEP = 1             // Increment step (watts)
```

### Default Values

Edit `src/App.tsx` to change initial power allocation:

```typescript
const DEFAULT_VALUES: ChannelValues = {
  channel1: 125,
  channel2: 125,
  channel3: 125,
  channel4: 125,
}
```

### Text Labels & Copy

- Page title, subtitle: `src/App.tsx` (render section)
- Channel names: `src/App.tsx` (ChannelControl components)
- Button text: `src/App.tsx` (handleApplyChanges, handleReset buttons)
- Toast messages: `src/App.tsx` (setState calls)

### Colors & Styling

- **Theme**: Modify Tailwind config in `tailwind.config.js`
- **Component colors**: Edit className strings in each component
  - Over-budget colors: Search for `amber` and `red` classes
  - Success colors: Search for `emerald` classes
  - Primary accent: `cyan` classes
  - Background: `slate` classes

### Dark/Light Mode

Currently uses dark theme (slate-900 background). To switch to light theme:
1. In `src/App.tsx`, change `bg-gradient-to-br from-slate-900 ...` to `from-white`/`from-slate-50`
2. Update text colors: `text-white` → `text-slate-900`, etc.
3. Invert border colors similarly

## Features

✓ **Responsive Design** – Works on desktop and tablets
✓ **Real-time Totals** – See power allocation update live
✓ **Draft State Visualization** – Over-budget state is clear but non-blocking
✓ **Slider & Input Sync** – Drag slider or type value, always in sync
✓ **Input Validation** – Handles invalid input gracefully (empty/non-numeric text)
✓ **Status Badges** – Visual indicator of over-budget or in-budget state
✓ **Progress Bar** – Budget utilization visualization
✓ **Last Applied Config** – Reference section showing committed values
✓ **Toast Notifications** – Polished success/error messages with auto-dismiss
✓ **Accessible** – Proper labels, semantic HTML, ARIA roles for toasts
✓ **TypeScript** – Full type safety throughout

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Supports touch and mouse input

## Future Enhancements

- Preset configurations (e.g., "Equal Distribution", "Balanced")
- Keyboard shortcuts (e.g., Ctrl+R to reset)
- Channel disabling/enabling
- Historical change log
- Export/import settings
- Persistent storage (localStorage)
- A/B comparison mode between applied and draft

## Code Quality

- Clean, well-commented TypeScript
- Separation of concerns (state mgmt, UI components)
- Reusable components
- No external component libraries (built with HTML + Tailwind)
- Accessible form inputs and labels

## Notes

- The page title and overall copy are written for a professional prototype context
- All validation happens on commit, in line with the deferred validation pattern
- Error/success messages auto-dismiss after 3–5 seconds
- Slider styling is custom CSS to ensure cross-browser consistency
- The gradient background and card styling create visual depth without verbosity

---

**Built with React 18, TypeScript, Tailwind CSS, and Vite.**
