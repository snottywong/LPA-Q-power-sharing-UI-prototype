/**
 * SummaryCard Component
 *
 * Q-SYS style status panel showing power allocation summary
 * with LED-style indicators for status (OK or Over Budget)
 */

interface SummaryCardProps {
  totalAssigned: number
  totalBudget: number
  remainingPower: number
  isOverBudget: boolean
}

export default function SummaryCard({
  totalAssigned,
  totalBudget,
  remainingPower,
  isOverBudget,
}: SummaryCardProps) {
  return (
    <div className="group-box relative p-2 mt-3">
      <div className="group-box-title">Power Summary</div>

      {/* Content with title spacing */}
      <div className="mt-2 space-y-1">
        {/* Power Stats - Monospace for engineering feel */}
        <div className="grid grid-cols-3 gap-2 text-xs font-mono">
          <div>
            <span className="block text-xs font-semibold text-gray-700 mb-0.5">
              Used
            </span>
            <span className="text-sm font-bold text-gray-900">{totalAssigned}W</span>
          </div>
          <div>
            <span className="block text-xs font-semibold text-gray-700 mb-0.5">
              Budget
            </span>
            <span className="text-sm font-bold text-gray-900">{totalBudget}W</span>
          </div>
          <div>
            <span className="block text-xs font-semibold text-gray-700 mb-0.5">
              Remaining
            </span>
            <span
              className={`text-sm font-bold ${
                remainingPower < 0 ? 'text-red-700' : 'text-green-700'
              }`}
            >
              {remainingPower}W
            </span>
          </div>
        </div>

        {/* Status Line with LED indicator */}
        <div className="border-t border-gray-400 pt-1 mt-1 flex items-center gap-1.5">
          <span className={`status-led ${isOverBudget ? 'over-budget' : 'ok'}`} />
          <span className="text-xs font-semibold text-gray-800">
            {isOverBudget ? 'Over' : 'OK'}
          </span>
          {isOverBudget && (
            <span className="text-xs text-red-700 font-semibold ml-auto">
              +{Math.abs(remainingPower)}W
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
