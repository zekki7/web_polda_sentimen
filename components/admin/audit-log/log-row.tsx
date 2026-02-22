// Single log row dengan expandable details
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { AuditLog } from '@/lib/data/rbac-data'

interface LogRowProps {
  log: AuditLog
  index: number
}

export function LogRow({ log, index }: LogRowProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getActionColor = (action: string) => {
    if (action.includes('CREATE')) return 'text-green-400'
    if (action.includes('UPDATE')) return 'text-blue-400'
    if (action.includes('DELETE') || action.includes('DEACTIVATE'))
      return 'text-red-400'
    return 'text-yellow-400'
  }

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      UPDATE_USER_ROLE: 'Update Role',
      DEACTIVATE_USER: 'Nonaktifkan User',
      CREATE_USER: 'Buat User',
      VALIDATE_SENTIMENT: 'Validasi Sentiment',
      CREATE_FILTER: 'Buat Filter',
    }
    return labels[action] || action
  }

  return (
    <>
      <motion.tr
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="hover:bg-primary/20 transition-colors cursor-pointer"
      >
        {/* Timestamp */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-foreground">{log.created_at}</div>
        </td>

        {/* User */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-foreground">{log.user_name}</div>
        </td>

        {/* Action */}
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`text-sm font-semibold ${getActionColor(log.action)}`}>
            {getActionLabel(log.action)}
          </span>
        </td>

        {/* Target */}
        <td className="px-6 py-4">
          <div className="text-sm text-muted-foreground">{log.target}</div>
        </td>

        {/* IP Address */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-muted-foreground font-mono">
            {log.ip_address}
          </div>
        </td>

        {/* Expand indicator */}
        <td className="px-6 py-4 whitespace-nowrap text-center">
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-muted-foreground"
          >
            ▼
          </motion.div>
        </td>
      </motion.tr>

      {/* Expandable details row */}
      <AnimatePresence>
        {isExpanded && (
          <motion.tr
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <td colSpan={6} className="px-6 py-4 bg-primary/10">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-sm font-semibold text-muted-foreground min-w-[120px]">
                    User Agent:
                  </span>
                  <span className="text-sm text-foreground font-mono">
                    {log.user_agent}
                  </span>
                </div>

                {log.payload && (
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-semibold text-muted-foreground min-w-[120px]">
                      Payload:
                    </span>
                    <pre className="text-sm text-foreground bg-black/20 px-3 py-2 rounded-md overflow-x-auto">
                      {JSON.stringify(log.payload, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  )
}
