'use client'

import { motion } from 'framer-motion'

interface StatsCardProps {
  label: string
  value: string
  icon: string
  color: string
}

export function StatsCard({ label, value, icon, color }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-gradient-to-br ${color} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium opacity-90">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
      <div className="mt-4 pt-4 border-t border-white/20">
        <p className="text-xs opacity-75">↑ 12% dari minggu lalu</p>
      </div>
    </motion.div>
  )
}
