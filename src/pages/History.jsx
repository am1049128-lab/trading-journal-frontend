import { useState, useEffect } from 'react'
import { getTrades, strategies } from '../services/mockData'
import { ArrowUpDown, Filter, Search } from 'lucide-react'

export default function History() {
  const [trades, setTrades] = useState([])
  const [filteredTrades, setFilteredTrades] = useState([])
  const [filters, setFilters] = useState({
    ticker: '',
    strategy: 'all',
    status: 'all'
  })
  const [sortConfig, setSortConfig] = useState({
    key: 'date',
    direction: 'desc'
  })

  useEffect(() => {
    getTrades().then(data => {
      setTrades(data)
      setFilteredTrades(data)
    })
  }, [])

  useEffect(() => {
    let filtered = [...trades]

    // Filter by ticker
    if (filters.ticker) {
      filtered = filtered.filter(t => 
        t.ticker.toLowerCase().includes(filters.ticker.toLowerCase())
      )
    }

    // Filter by strategy
    if (filters.strategy !== 'all') {
      filtered = filtered.filter(t => t.strategy === filters.strategy)
    }

    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter(t => t.status === filters.status)
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortConfig.key]
      let bVal = b[sortConfig.key]

      if (sortConfig.key === 'date') {
        aVal = new Date(aVal)
        bVal = new Date(bVal)
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })

    setFilteredTrades(filtered)
  }, [filters, sortConfig, trades])

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value)
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Histori Transaksi</h1>
        <div className="text-sm text-gray-400">
          {filteredTrades.length} transaksi
        </div>
      </div>

      {/* Filters */}
      <div className="bg-dark-card border border-dark-border rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 mr-2 text-gray-400" />
          <h2 className="font-semibold">Filter</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Cari Ticker</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={filters.ticker}
                onChange={(e) => setFilters({...filters, ticker: e.target.value})}
                placeholder="BBRI, TLKM..."
                className="w-full pl-10 pr-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-profit"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Strategi</label>
            <select
              value={filters.strategy}
              onChange={(e) => setFilters({...filters, strategy: e.target.value})}
              className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-profit"
            >
              <option value="all">Semua Strategi</option>
              {strategies.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-profit"
            >
              <option value="all">Semua Status</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-dark-card border border-dark-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-bg border-b border-dark-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('date')}
                    className="flex items-center hover:text-white transition-colors"
                  >
                    Tanggal
                    <ArrowUpDown className="w-4 h-4 ml-1" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('ticker')}
                    className="flex items-center hover:text-white transition-colors"
                  >
                    Ticker
                    <ArrowUpDown className="w-4 h-4 ml-1" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Tipe
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Entry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Exit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Lot
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Strategi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('pnl')}
                    className="flex items-center hover:text-white transition-colors"
                  >
                    PnL
                    <ArrowUpDown className="w-4 h-4 ml-1" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {filteredTrades.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-8 text-center text-gray-400">
                    Tidak ada transaksi ditemukan
                  </td>
                </tr>
              ) : (
                filteredTrades.map((trade) => (
                  <tr key={trade.id} className="hover:bg-dark-bg transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {formatDate(trade.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                      {trade.ticker}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        trade.type === 'buy' 
                          ? 'bg-green-900 text-profit' 
                          : 'bg-red-900 text-loss'
                      }`}>
                        {trade.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {trade.entryPrice.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {trade.exitPrice ? trade.exitPrice.toLocaleString('id-ID') : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {trade.lot}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {trade.strategy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                      <span className={trade.pnl >= 0 ? 'text-profit' : 'text-loss'}>
                        {formatCurrency(trade.pnl)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        trade.status === 'open' 
                          ? 'bg-blue-900 text-blue-400' 
                          : 'bg-gray-800 text-gray-400'
                      }`}>
                        {trade.status === 'open' ? 'Open' : 'Closed'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
