// Komponen untuk menampilkan daftar laporan dengan filter wilayah
'use client'

import { motion } from 'framer-motion'
import { Report } from '@/lib/data/region-data'
import { RegionFilter } from './region-filter'
import { ReportCard } from './report-card'

interface ReportsListProps {
  reports: Report[]
  selectedRegion: string | null
  onRegionChange: (region: string | null) => void
}

export function ReportsList({
  reports,
  selectedRegion,
  onRegionChange,
}: ReportsListProps) {
  const filteredReports = selectedRegion
    ? reports.filter((r) => r.region === selectedRegion)
    : reports

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-card border border-border rounded-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">
          Daftar Laporan
        </h2>
        <RegionFilter
          selectedRegion={selectedRegion}
          onRegionChange={onRegionChange}
        />
      </div>

      <div className="space-y-4">
        {filteredReports.map((report, index) => (
          <ReportCard key={report.id} report={report} index={index} />
        ))}
      </div>
    </motion.div>
  )
}
