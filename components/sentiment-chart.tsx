'use client'

import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { date: 'Sen', positif: 240, netral: 180, negatif: 120 },
  { date: 'Sel', positif: 280, netral: 200, negatif: 140 },
  { date: 'Rab', positif: 320, netral: 210, negatif: 160 },
  { date: 'Kam', positif: 350, netral: 220, negatif: 180 },
  { date: 'Jum', positif: 380, netral: 240, negatif: 200 },
  { date: 'Sab', positif: 400, netral: 260, negatif: 210 },
  { date: 'Min', positif: 420, netral: 280, negatif: 230 },
]

export function SentimentChart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-lg p-6"
    >
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Tren Sentimen (7 Hari Terakhir)
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.1)"
          />
          <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
          <YAxis stroke="rgba(255,255,255,0.5)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid #E62815',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#fff' }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="positif"
            stroke="#22c55e"
            strokeWidth={2}
            dot={{ fill: '#22c55e' }}
            name="Positif"
            isAnimationActive={true}
          />
          <Line
            type="monotone"
            dataKey="netral"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6' }}
            name="Netral"
            isAnimationActive={true}
          />
          <Line
            type="monotone"
            dataKey="negatif"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ fill: '#ef4444' }}
            name="Negatif"
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Peak Positif</p>
          <p className="text-2xl font-bold text-green-500">420</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Rata-rata Netral</p>
          <p className="text-2xl font-bold text-blue-500">227</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Peak Negatif</p>
          <p className="text-2xl font-bold text-red-500">230</p>
        </div>
      </div>
    </motion.div>
  )
}
