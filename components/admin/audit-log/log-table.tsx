// Table untuk menampilkan audit logs
'use client'

import { motion } from 'framer-motion'
import { LogRow } from './log-row'
import type { AuditLog } from '@/lib/data/rbac-data'

interface LogTableProps {
  logs: AuditLog[]
}

export function LogTable({ logs }: LogTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card border border-border rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">
          Riwayat Aktivitas
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Menampilkan {logs.length} log aktivitas
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Waktu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Aksi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Target
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                IP Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {logs.map((log, index) => (
              <LogRow key={log.id} log={log} index={index} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {logs.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-muted-foreground">Tidak ada log yang ditemukan</p>
        </div>
      )}
    </motion.div>
  )
}
