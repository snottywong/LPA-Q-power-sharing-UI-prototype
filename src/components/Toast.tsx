/**
 * Toast Component
 *
 * Displays brief notification messages (error or status) inline.
 * Q-SYS style: utilitarian, industrial appearance.
 */

interface ToastProps {
  type: 'success' | 'error'
  message: string
}

export default function Toast({ type, message }: ToastProps) {
  const isError = type === 'error'

  return (
    <div
      className={`toast-animation fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm border-2 p-3 ${
        isError
          ? 'border-red-600 bg-red-100 text-red-900'
          : 'border-green-600 bg-green-100 text-green-900'
      }`}
      role={isError ? 'alert' : 'status'}
    >
      <div className="flex items-start gap-3">
        {isError ? (
          <svg
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-700"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-700"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        )}
        <p className="text-sm font-medium leading-relaxed">{message}</p>
      </div>
    </div>
  )
}
