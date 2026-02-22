// Komponen badge untuk menampilkan status urgency (Darurat/Tidak Darurat)
// Mengganti sistem Tinggi/Sedang/Rendah dengan sistem biner yang lebih jelas

'use client'

interface UrgencyBadgeProps {
  // Status urgency: 'Darurat' atau 'Tidak Darurat'
  urgency: 'Darurat' | 'Tidak Darurat'
  // className opsional untuk custom styling
  className?: string
}

export function UrgencyBadge({ urgency, className = '' }: UrgencyBadgeProps) {
  // Tentukan warna berdasarkan status urgency
  const getUrgencyStyles = (status: string) => {
    switch (status) {
      // Darurat: warna merah yang mencolok
      case 'Darurat':
        return 'bg-red-900/30 text-red-300 border-red-700'
      // Tidak Darurat: warna hijau yang tenang
      default:
        return 'bg-green-900/30 text-green-300 border-green-700'
    }
  }

  return (
    <span
      className={`px-2 py-1 rounded border text-xs font-semibold ${getUrgencyStyles(urgency)} ${className}`}
    >
      {urgency}
    </span>
  )
}
