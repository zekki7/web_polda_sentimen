'use client'

import { motion } from 'framer-motion'
import { itemVariants } from '@/lib/animations/variants'

interface StatsGridProps {
  dynamicStats?: {
    total: number
    positif: number
    negatif: number
    darurat: number
  }
}

export function StatsGrid({ dynamicStats }: StatsGridProps) {
  // Gunakan data dinamis jika ada, jika tidak fallback ke 0
  const stats = [
    {
      label: 'Total Laporan',
      value: dynamicStats ? dynamicStats.total : 0,
      icon: '📊',
      color: 'from-blue-600 to-blue-700',
    },
    {
      label: 'Sentimen Positif',
      value: dynamicStats ? dynamicStats.positif : 0,
      icon: '😊',
      color: 'from-green-600 to-green-700',
    },
    {
      label: 'Sentimen Negatif',
      value: dynamicStats ? dynamicStats.negatif : 0,
      icon: '😠',
      color: 'from-red-600 to-red-700',
    },
    {
      label: 'Isu Darurat',
      value: dynamicStats ? dynamicStats.darurat : 0,
      icon: '🚨',
      color: 'from-orange-600 to-orange-700',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          variants={itemVariants}
          className="bg-card border border-border rounded-xl p-6 shadow-sm flex items-center space-x-4"
        >
          <div className={`p-4 rounded-lg bg-gradient-to-br ${stat.color} text-white text-2xl`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
