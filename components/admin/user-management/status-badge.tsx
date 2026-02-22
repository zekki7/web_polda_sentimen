// Badge untuk menampilkan status user (active/inactive)
'use client'

interface StatusBadgeProps {
  status: 'active' | 'inactive'
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    active: 'bg-green-900/30 text-green-300 border-green-700',
    inactive: 'bg-red-900/30 text-red-300 border-red-700',
  }

  const labels = {
    active: 'Aktif',
    inactive: 'Non-Aktif',
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}
    >
      <span className={`w-2 h-2 rounded-full mr-2 ${status === 'active' ? 'bg-green-400' : 'bg-red-400'}`} />
      {labels[status]}
    </span>
  )
}