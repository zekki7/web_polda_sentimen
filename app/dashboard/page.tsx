// Halaman Dashboard - tampilan utama monitoring sentiment dan isu publik
'use client'

import { TopNav } from '@/components/top-nav'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/dashboard/page-header'
import { StatsGrid } from '@/components/dashboard/stats-grid'
import { ChartsSection } from '@/components/dashboard/charts-section'
import { MapSummary } from '@/components/map-summary'
import { itemVariants } from '@/lib/animations/variants'  // Opsional

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader />
        
        <StatsGrid />
        
        <ChartsSection />

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <MapSummary />
        </motion.div>
      </main>
    </div>
  )
}
