// Action buttons untuk approve, reject, dan edit sentiment
'use client'

import { useState } from 'react'

interface ValidationActionsProps {
  currentSentiment: 'Positif' | 'Negatif' | 'Netral'
  onApprove: () => void
  onReject: () => void
  onEdit: (sentiment: 'Positif' | 'Negatif' | 'Netral') => void
}

export function ValidationActions({
  currentSentiment,
  onApprove,
  onReject,
  onEdit,
}: ValidationActionsProps) {
  const [showEditMenu, setShowEditMenu] = useState(false)

  const sentimentOptions: Array<'Positif' | 'Negatif' | 'Netral'> = [
    'Positif',
    'Negatif',
    'Netral',
  ]

  const handleEdit = (sentiment: 'Positif' | 'Negatif' | 'Netral') => {
    onEdit(sentiment)
    setShowEditMenu(false)
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        {/* Approve Button */}
        <button
          onClick={onApprove}
          className="flex-1 px-4 py-3 bg-green-900/30 text-green-300 border border-green-700 rounded-md font-medium hover:bg-green-900/50 transition-colors flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Approve
        </button>

        {/* Reject Button */}
        <button
          onClick={onReject}
          className="flex-1 px-4 py-3 bg-red-900/30 text-red-300 border border-red-700 rounded-md font-medium hover:bg-red-900/50 transition-colors flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Reject
        </button>

        {/* Edit Button */}
        <button
          onClick={() => setShowEditMenu(!showEditMenu)}
          className="px-4 py-3 bg-blue-900/30 text-blue-300 border border-blue-700 rounded-md font-medium hover:bg-blue-900/50 transition-colors flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit
        </button>
      </div>

      {/* Edit Menu */}
      {showEditMenu && (
        <div className="bg-primary/50 border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-3">
            Ubah sentiment menjadi:
          </p>
          <div className="flex gap-2">
            {sentimentOptions.map((sentiment) => (
              <button
                key={sentiment}
                onClick={() => handleEdit(sentiment)}
                disabled={sentiment === currentSentiment}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  sentiment === currentSentiment
                    ? 'bg-primary/30 text-muted-foreground cursor-not-allowed'
                    : sentiment === 'Positif'
                    ? 'bg-green-900/30 text-green-300 border border-green-700 hover:bg-green-900/50'
                    : sentiment === 'Negatif'
                    ? 'bg-red-900/30 text-red-300 border border-red-700 hover:bg-red-900/50'
                    : 'bg-blue-900/30 text-blue-300 border border-blue-700 hover:bg-blue-900/50'
                }`}
              >
                {sentiment}
                {sentiment === currentSentiment && ' (Current)'}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
