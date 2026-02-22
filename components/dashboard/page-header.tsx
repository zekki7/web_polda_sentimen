// Komponen header untuk halaman dashboard
'use client'

import { motion } from 'framer-motion'
import { fadeInDownVariants } from '@/lib/animations/variants'

export function PageHeader() {
  return (
    <motion.div
      variants={fadeInDownVariants}
      initial="hidden"
      animate="visible"
      className="mb-8"
    >
      <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
      <p className="text-muted-foreground">
        Monitoring real-time sentiment dan isu publik
      </p>
    </motion.div>
  )
}
