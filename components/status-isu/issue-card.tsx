// Komponen card untuk menampilkan satu isu
'use client'

import { motion } from 'framer-motion'
import { Issue } from '@/lib/data/issues-data'
import { UrgencyBadge } from '@/components/urgency-badge'
import { STATUS_COLORS } from '@/lib/constants/issue-status'
import { IssueActions } from './issue-actions'

interface IssueCardProps {
  issue: Issue
  index: number
  isSelected: boolean
  onSelect: () => void
  onStatusChange: (id: number, status: Issue['status']) => void
}

export function IssueCard({
  issue,
  index,
  isSelected,
  onSelect,
  onStatusChange,
}: IssueCardProps) {
  const getStatusColor = (status: string) => {
    return STATUS_COLORS[status as keyof typeof STATUS_COLORS]
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onSelect}
      className="border border-border rounded-lg p-4 cursor-pointer hover:border-accent transition-all hover:shadow-lg"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-foreground pr-2">{issue.title}</h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap border ${getStatusColor(
            issue.status
          )}`}
        >
          {issue.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-3">{issue.description}</p>

      {/* Footer */}
      <div className="flex items-center gap-3 text-xs flex-wrap">
        <UrgencyBadge urgency={issue.urgency} />
        <span className="text-muted-foreground">{issue.region}</span>
        <span className="text-muted-foreground">{issue.date}</span>
        <span className="ml-auto px-2 py-1 bg-primary/50 rounded text-muted-foreground">
          {issue.reportCount} laporan
        </span>
      </div>

      {/* Expandable Actions */}
      {isSelected && (
        <IssueActions issue={issue} onStatusChange={onStatusChange} />
      )}
    </motion.div>
  )
}
