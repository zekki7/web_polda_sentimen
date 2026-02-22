// Header untuk halaman Audit Log
'use client'

import { motion } from 'framer-motion'

export function PageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h1 className="text-4xl font-bold text-foreground mb-2">Audit Log</h1>
      <p className="text-muted-foreground">
        Riwayat aktivitas semua pengguna di sistem
      </p>
    </motion.div>
  )
}
