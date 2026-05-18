// Badge untuk menampilkan status isu
'use client'

interface StatusBadgeProps {
  status: 'Sedang Ditangani' | 'Perlu Tindak Lanjut' | 'Selesai'
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    'Sedang Ditangani': 'bg-blue-900/30 text-blue-300 border-blue-700',
    'Perlu Tindak Lanjut': 'bg-yellow-900/30 text-yellow-300 border-yellow-700',
    'Selesai': 'bg-green-900/30 text-green-300 border-green-700',
  }

  const dots = {
    'Sedang Ditangani': 'bg-blue-400',
    'Perlu Tindak Lanjut': 'bg-yellow-400',
    'Selesai': 'bg-green-400',
  }

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap border ${styles[status]}`}
    >
      {status}
    </span>
  )
}