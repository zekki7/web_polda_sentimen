// Halaman Analisis Wilayah - analisis mendalam per kota/kabupaten di Jawa Tengah
'use client'

import { useState } from 'react'
import { TopNav } from '@/components/top-nav'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/analisis/page-header'
import { RegionReportsChart } from '@/components/analisis/region-reports-chart'
import { RegionDistributionChart } from '@/components/analisis/region-distribution-chart'
import { DominantKeywords } from '@/components/analisis/dominant-keywords'
import { ReportsList } from '@/components/analisis/reports-list'
import { regionData, reports } from '@/lib/data/region-data'

export default function AnalisisPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RegionReportsChart data={regionData} />
          <RegionDistributionChart data={regionData} />
        </div>

        <DominantKeywords />

        <ReportsList
          reports={reports}
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
        />
      </main>
    </div>
  )
}