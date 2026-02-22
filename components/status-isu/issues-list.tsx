// Komponen daftar isu dengan filter
'use client'

import { Issue, STATUS_FILTERS } from '@/lib/data/issues-data'
import { StatusFilter } from './status-filter'
import { IssueCard } from './issue-card'

interface IssuesListProps {
  issues: Issue[]
  filterStatus: string
  selectedIssue: number | null
  onFilterChange: (status: string) => void
  onIssueSelect: (id: number | null) => void
  onStatusChange: (id: number, status: Issue['status']) => void
}

export function IssuesList({
  issues,
  filterStatus,
  selectedIssue,
  onFilterChange,
  onIssueSelect,
  onStatusChange,
}: IssuesListProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Daftar Isu</h2>
        <StatusFilter
          filterStatus={filterStatus}
          onFilterChange={onFilterChange}
        />
      </div>

      <div className="space-y-4">
        {issues.map((issue, index) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            index={index}
            isSelected={selectedIssue === issue.id}
            onSelect={() =>
              onIssueSelect(selectedIssue === issue.id ? null : issue.id)
            }
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </div>
  )
}
