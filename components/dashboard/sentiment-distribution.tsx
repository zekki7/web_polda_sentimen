// Komponen untuk menampilkan distribusi sentimen dan aktivitas terakhir
'use client'

import { sentimentDistribution, recentActivities } from '@/lib/data/dashboard-data'
import { SentimentProgressBar } from './sentiment-progress-bar'
import { RecentActivity } from './recent-activity'

export function SentimentDistribution() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Distribusi Sentimen
      </h2>
      
      <div className="space-y-4">
        {sentimentDistribution.map((item, index) => (
          <SentimentProgressBar
            key={index}
            label={item.label}
            percentage={item.percentage}
            color={item.color}
          />
        ))}
      </div>

      <RecentActivity activities={recentActivities} />
    </div>
  )
}
