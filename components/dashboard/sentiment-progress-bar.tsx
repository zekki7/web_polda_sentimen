// Komponen progress bar untuk sentimen
'use client'

interface SentimentProgressBarProps {
  label: string
  percentage: number
  color: string
}

export function SentimentProgressBar({
  label,
  percentage,
  color,
}: SentimentProgressBarProps) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold text-foreground">{percentage}%</span>
      </div>
      <div className="w-full bg-primary/50 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
