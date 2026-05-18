// Komponen header untuk halaman status isu
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
      <h1 className="text-4xl font-bold text-foreground mb-2">Status Isu</h1>
      <p className="text-muted-foreground">
        Manajemen dan pemantauan status penanganan isu publik
      </p>
    </motion.div>
  )
}
