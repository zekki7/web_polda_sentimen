// Komponen bar chart untuk menampilkan laporan per wilayah
'use client'

import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface RegionData {
  region: string
  laporan: number
  positif: number
  netral: number
  negatif: number
}

interface RegionReportsChartProps {
  data: RegionData[]
}

export function RegionReportsChart({ data }: RegionReportsChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card border border-border rounded-lg p-6"
    >
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Laporan per Wilayah
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="region" stroke="rgba(255,255,255,0.5)" />
          <YAxis stroke="rgba(255,255,255,0.5)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid #E62815',
            }}
          />
          <Legend />
          <Bar dataKey="laporan" fill="#3b82f6" name="Total Laporan" />
          <Bar dataKey="positif" fill="#22c55e" name="Positif" />
          <Bar dataKey="negatif" fill="#ef4444" name="Negatif" />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
