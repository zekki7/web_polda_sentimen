// Komponen untuk menampilkan summary jumlah isu per status
'use client'

import { Issue } from '@/lib/data/issues-data'

interface StatusSummaryProps {
  issues: Issue[]
}

export function StatusSummary({ issues }: StatusSummaryProps) {
  const summaryData = [
    {
      label: 'Sedang Ditangani',
      count: issues.filter((i) => i.status === 'Sedang Ditangani').length,
      color: 'text-blue-400',
    },
    {
      label: 'Perlu Tindak Lanjut',
      count: issues.filter((i) => i.status === 'Perlu Tindak Lanjut').length,
      color: 'text-yellow-400',
    },
    {
      label: 'Selesai',
      count: issues.filter((i) => i.status === 'Selesai').length,
      color: 'text-green-400',
    },
  ]

  return (
    <div className="mt-6 pt-6 border-t border-border space-y-3">
      {summaryData.map((item, index) => (
        <div key={index} className="bg-primary/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
          <p className={`text-2xl font-bold ${item.color}`}>{item.count}</p>
        </div>
      ))}
    </div>
  )
}
