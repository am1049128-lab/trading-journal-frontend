import { useState, useEffect } from 'react'
import { getStats, getCalendarData } from '../services/mockData'
import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react'
import CalendarHeatmap from '../components/CalendarHeatmap'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalEquity: 0,
    floatingPnL: 0,
    realizedPnL: 0,
    winRate: 0
  })
  const [calendarData, setCalendarData] = useState({})

  useEffect(() => {
    setStats(getStats())
    setCalendarData(getCalendarData())
  }, [])

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value)
  }

  const statCards = [
    {
      title: 'Total Ekuitas',
      value: formatCurrency(stats.totalEquity),
      icon: DollarSign,
      color: 'text-blue-400'
    },
    {
      title: 'Floating PnL',
      value: formatCurrency(stats.floatingPnL),
      icon: stats.floatingPnL >= 0 ? TrendingUp : TrendingDown,
      color: stats.floatingPnL >= 0 ? 'text-profit' : 'text-loss'
    },
    {
      title: 'Realized PnL',
      value: formatCurrency(stats.realizedPnL),
      icon: stats.realizedPnL >= 0 ? TrendingUp : TrendingDown,
      color: stats.realizedPnL >= 0 ? 'text-profit' : 'text-loss'
    },
    {
      title: 'Win Rate',
      value: `${stats.winRate}%`,
      icon: Target,
      color: 'text-purple-400'
    }
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon
          return (
            <div key={index} className="bg-dark-card border border-dark-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">{card.title}</span>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <div className={`text-2xl font-bold ${card.color}`}>
                {card.value}
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-dark-card border border-dark-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Kalender Trading</h2>
        <CalendarHeatmap data={calendarData} />
      </div>
    </div>
  )
}
