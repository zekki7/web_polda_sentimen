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
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
    >
      {stats.map((stat, index) => (
        <motion.div key={index} variants={itemVariants}>
          <div
            className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 text-white shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium opacity-90">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <span className="text-4xl">{stat.icon}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
