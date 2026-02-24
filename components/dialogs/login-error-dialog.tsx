// Dialog untuk menampilkan error saat login
'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface LoginErrorDialogProps {
  isOpen: boolean
  message: string
  onClose: () => void
}

export function LoginErrorDialog({ isOpen, message, onClose }: LoginErrorDialogProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-card border border-border rounded-lg shadow-xl max-w-md w-full p-6"
        >
          {/* Icon Error */}
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-foreground text-center mb-2">
            Login Gagal
          </h3>

          {/* Message */}
          <p className="text-muted-foreground text-center mb-6">
            {message}
          </p>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-accent text-accent-foreground rounded-md font-medium hover:bg-accent/90 transition-colors"
          >
            Coba Lagi
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
