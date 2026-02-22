// Komponen actions untuk mengubah status dan download PDF
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Issue } from '@/lib/data/issues-data'

interface IssueActionsProps {
  issue: Issue
  onStatusChange: (id: number, status: Issue['status']) => void
}

export function IssueActions({ issue, onStatusChange }: IssueActionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="mt-4 pt-4 border-t border-border"
    >
      <div className="space-y-3">
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2">
            Ubah Status:
          </p>
          <div className="flex gap-2 flex-wrap">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onStatusChange(issue.id, 'Sedang Ditangani')}
              className="text-xs"
            >
              Sedang Ditangani
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onStatusChange(issue.id, 'Perlu Tindak Lanjut')}
              className="text-xs"
            >
              Perlu Tindak Lanjut
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onStatusChange(issue.id, 'Selesai')}
              className="text-xs"
            >
              Selesai
            </Button>
          </div>
        </div>
        <div>
          <Button size="sm" className="w-full bg-accent hover:bg-accent/90">
            Unduh Laporan PDF
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
