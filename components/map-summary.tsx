// Component untuk menampilkan sentimen per wilayah Jawa Tengah
// Menampilkan progress bar sentimen untuk setiap kota/kabupaten

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MAIN_CITIES } from '@/lib/constants/cities'

// ====== DATA SENTIMEN PER WILAYAH ======

// Data sentimen untuk kota-kota utama di Jawa Tengah
const regions = [
  { name: 'Semarang', sentiment: 'Positif', percentage: 65, color: 'bg-green-500' },
  { name: 'Surakarta', sentiment: 'Positif', percentage: 58, color: 'bg-green-500' },
  { name: 'Salatiga', sentiment: 'Negatif', percentage: 42, color: 'bg-red-500' },
  { name: 'Pekalongan', sentiment: 'Netral', percentage: 50, color: 'bg-blue-500' },
  { name: 'Purwokerto', sentiment: 'Positif', percentage: 72, color: 'bg-green-500' },
]

export function MapSummary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-card border border-border rounded-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Sentimen per Wilayah
          </h2>
          <p className="text-sm text-muted-foreground">
            Distribusi sentimen di berbagai kabupaten/kota
          </p>
        </div>
        <Link
          href="/analisis"
          className="px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-md text-sm font-medium transition-colors"
        >
          Lihat Detail
        </Link>
      </div>

      {/* Map Placeholder */}
      <div className="mb-6 bg-primary/50 rounded-lg p-8 text-center min-h-64 flex items-center justify-center">
        <div>
          <p className="text-4xl mb-2">🗺️</p>
          <p className="text-muted-foreground">
            Peta Jawa Tengah - Sentimen Real-time
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Klik pada wilayah untuk analisis detail
          </p>
        </div>
      </div>

      {/* Regions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {regions.map((region, index) => (
          <motion.div
            key={region.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="bg-primary/50 border border-border rounded-lg p-4 cursor-pointer hover:border-accent transition-colors"
          >
            <p className="font-semibold text-foreground mb-2">{region.name}</p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">{region.sentiment}</span>
              <span className="text-sm font-bold text-foreground">
                {region.percentage}%
              </span>
            </div>
            <div className="w-full bg-primary rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${region.percentage}%` }}
                transition={{ delay: 0.5 + index * 0.05, duration: 0.8 }}
                className={`h-2 rounded-full ${region.color}`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Color Legend */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-sm font-semibold text-foreground mb-3">Indikator Sentimen</p>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-muted-foreground">Dominan Positif</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm text-muted-foreground">Netral</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm text-muted-foreground">Dominan Negatif</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
