// Komponen pie chart untuk menampilkan distribusi laporan per wilayah
'use client'

import { motion } from 'framer-motion'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface RegionData {
  region: string
  laporan: number
  positif: number
  netral: number
  negatif: number
}

interface RegionDistributionChartProps {
  data: RegionData[]
}

const COLORS = ['#ef4444', '#f97316', '#3b82f6', '#22c55e', '#8b5cf6']

export function RegionDistributionChart({ data }: RegionDistributionChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="bg-card border border-border rounded-lg p-6"
    >
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Distribusi per Wilayah
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="laporan"
            nameKey="region"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
