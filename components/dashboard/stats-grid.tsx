// Komponen grid untuk menampilkan stats cards
'use client'

import { motion } from 'framer-motion'
import { StatsCard } from '@/components/stats-card'
import { dashboardStats } from '@/lib/data/dashboard-data'
import { containerVariants, itemVariants } from '@/lib/animations/variants'

export function StatsGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
    >
      {dashboardStats.map((stat, index) => (
        <motion.div key={index} variants={itemVariants}>
          <StatsCard {...stat} />
        </motion.div>
      ))}
    </motion.div>
  )
}
