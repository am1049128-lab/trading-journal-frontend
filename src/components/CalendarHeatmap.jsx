import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths } from 'date-fns'
import { id } from 'date-fns/locale'

export default function CalendarHeatmap({ data }) {
  const today = new Date()
  const months = []
  
  // Generate 3 bulan terakhir
  for (let i = 2; i >= 0; i--) {
    const monthDate = addMonths(today, -i)
    const start = startOfMonth(monthDate)
    const end = endOfMonth(monthDate)
    const days = eachDayOfInterval({ start, end })
    
    months.push({
      name: format(monthDate, 'MMMM yyyy', { locale: id }),
      days
    })
  }

  const getColorForValue = (value) => {
    if (!value || value === 0) return 'bg-dark-bg'
    if (value > 0) {
      if (value > 200000) return 'bg-profit'
      if (value > 100000) return 'bg-green-700'
      return 'bg-green-900'
    } else {
      if (value < -200000) return 'bg-loss'
      if (value < -100000) return 'bg-red-700'
      return 'bg-red-900'
    }
  }

  const formatPnL = (value) => {
    if (!value || value === 0) return 'Tidak ada transaksi'
    const formatted = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value)
    return value > 0 ? `Profit: ${formatted}` : `Loss: ${formatted}`
  }

  return (
    <div className="space-y-6">
      {months.map((month, monthIdx) => (
        <div key={monthIdx}>
          <h3 className="text-sm font-semibold mb-3 text-gray-400">{month.name}</h3>
          <div className="grid grid-cols-7 gap-2">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
              <div key={day} className="text-center text-xs text-gray-500 font-medium">
                {day}
              </div>
            ))}
            
            {/* Empty cells untuk hari pertama bulan */}
            {Array.from({ length: getDay(month.days[0]) === 0 ? 6 : getDay(month.days[0]) - 1 }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            
            {month.days.map((day) => {
              const dateStr = format(day, 'yyyy-MM-dd')
              const value = data[dateStr] || 0
              const colorClass = getColorForValue(value)
              
              return (
                <div
                  key={dateStr}
                  className={`aspect-square rounded ${colorClass} border border-dark-border flex items-center justify-center text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity`}
                  title={formatPnL(value)}
                >
                  {format(day, 'd')}
                </div>
              )
            })}
          </div>
        </div>
      ))}
      
      <div className="flex items-center justify-center space-x-4 text-sm">
        <span className="text-gray-400">Legend:</span>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded bg-dark-bg border border-dark-border" />
          <span className="text-gray-400">Tidak ada</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded bg-profit" />
          <span className="text-gray-400">Profit</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded bg-loss" />
          <span className="text-gray-400">Loss</span>
        </div>
      </div>
    </div>
  )
}
