// Dialog komponen untuk menampilkan error login
// Menggunakan motion dari framer-motion untuk animasi yang halus

'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface LoginErrorDialogProps {
  isOpen: boolean
  message: string
  onClose: () => void
}

export function LoginErrorDialog({
  isOpen,
  message,
  onClose,
}: LoginErrorDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - overlay gelap di belakang dialog */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Dialog Box - kotak error yang muncul di tengah layar */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-card border-2 border-secondary rounded-lg p-6 shadow-xl max-w-sm">
              {/* Header dengan icon error */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-foreground">Login Gagal</h2>
              </div>

              {/* Pesan error */}
              <p className="text-muted-foreground mb-6">{message}</p>

              {/* Tombol tutup */}
              <button
                onClick={onClose}
                className="w-full px-4 py-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-md transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
