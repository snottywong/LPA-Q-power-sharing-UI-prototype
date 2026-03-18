# Quick Start Guide

## 30 Second Setup

1. **Open terminal** in this folder
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start development server:**
   ```bash
   npm run dev
   ```
4. **Open your browser** to `http://localhost:5173`

## What You'll See

A clean, dark-themed power allocation interface with:
- **Header** explaining the purpose
- **Summary Card** showing total assigned (500W), budget (500W), and remaining (0W)
- **4 Channel Cards** each with a slider and numeric input
- **Last Applied Config** section showing the last committed values (starts at 125W each)
- **Apply Changes** and **Reset** buttons

## Try It Out

1. Drag any slider to change a channel's power allocation
2. Type directly into the numeric input fields
3. Watch the totals update in real time
4. Try setting values that exceed 500W total (it's allowed!)
5. Click "Apply Changes" — it will reject if over budget and show the overage
6. Reduce allocations and apply again to succeed
7. Click "Reset" to revert to the last applied configuration

## State Model Summary

```
Editing Flow:
  User moves slider/types input
         ↓
    draftValues update instantly
         ↓
  Totals display live (no blocking)
         ↓
  User clicks "Apply Changes"
         ↓
  System validates total ≤ 500W
         ↓
  ✓ Valid: appliedValues update, success toast
  ✗ Invalid: error message, user must reduce
```

The key insight: **Users can freely make changes without being interrupted, then validate once as a bundle.**

## File Structure

```
src/
├── main.tsx              ← React entry point
├── App.tsx               ← Main state + UI logic
├── types.ts              ← Constants & types
├── index.css             ← Tailwind + custom styles
└── components/
    ├── ChannelControl    ← Slider + input for one channel
    ├── SummaryCard       ← Power budget display
    ├── LastApplied       ← Committed values reference
    └── Toast             ← Success/error notifications
```

## Customization

See **README.md** for detailed customization guide covering:
- Power limits and step sizes
- Default values
- Labels and copy
- Colors and dark/light mode
- And more

## Next Steps

- Run the dev server and explore the UI
- Make edits to customize labels or colors
- Share the prototype with colleagues
- Use as a foundation for your actual product

---

**No build process needed yet—dev server handles everything.**

When ready to share, run `npm run build` to create a production bundle in the `dist/` folder.
