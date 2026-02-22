// Komponen header untuk halaman analisis wilayah
'use client'

import { motion } from 'framer-motion'

export function PageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h1 className="text-4xl font-bold text-foreground mb-2">
        Analisis Wilayah
      </h1>
      <p className="text-muted-foreground">
        Analisis mendalam sentimen per wilayah dan topik dominan
      </p>
    </motion.div>
  )
}
