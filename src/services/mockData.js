// Mock data service untuk development
export const mockTrades = [
  {
    id: 1,
    date: '2024-10-15',
    ticker: 'BBRI',
    type: 'buy',
    entryPrice: 5250,
    exitPrice: 5400,
    lot: 10,
    strategy: 'Breakout',
    sl: 5150,
    tp: 5450,
    notes: 'Breakout dari resistance weekly',
    imageUrl: null,
    pnl: 150000,
    status: 'closed'
  },
  {
    id: 2,
    date: '2024-10-16',
    ticker: 'TLKM',
    type: 'buy',
    entryPrice: 3580,
    exitPrice: 3520,
    lot: 15,
    strategy: 'Support/Resistance',
    sl: 3500,
    tp: 3700,
    notes: 'Bounce dari support kuat',
    imageUrl: null,
    pnl: -90000,
    status: 'closed'
  },
  {
    id: 3,
    date: '2024-10-17',
    ticker: 'ASII',
    type: 'buy',
    entryPrice: 4890,
    exitPrice: 5100,
    lot: 8,
    strategy: 'Trend Following',
    sl: 4800,
    tp: 5150,
    notes: 'Uptrend kuat dengan volume tinggi',
    imageUrl: null,
    pnl: 168000,
    status: 'closed'
  },
  {
    id: 4,
    date: '2024-10-18',
    ticker: 'BBCA',
    type: 'buy',
    entryPrice: 9250,
    exitPrice: null,
    lot: 5,
    strategy: 'Breakout',
    sl: 9100,
    tp: 9500,
    notes: 'Breakout dengan konfirmasi volume',
    imageUrl: null,
    pnl: 0,
    status: 'open'
  },
  {
    id: 5,
    date: '2024-10-14',
    ticker: 'BMRI',
    type: 'sell',
    entryPrice: 6250,
    exitPrice: 6100,
    lot: 12,
    strategy: 'Reversal',
    sl: 6350,
    tp: 6000,
    notes: 'Rejection dari resistance, indikasi reversal',
    imageUrl: null,
    pnl: 180000,
    status: 'closed'
  }
]

export const strategies = [
  'Breakout',
  'Support/Resistance',
  'Trend Following',
  'Reversal',
  'Scalping',
  'Swing Trading'
]

export const getTrades = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockTrades]), 100)
  })
}

export const addTrade = (trade) => {
  return new Promise((resolve) => {
    const newTrade = {
      ...trade,
      id: mockTrades.length + 1,
      status: 'open',
      pnl: 0
    }
    mockTrades.push(newTrade)
    setTimeout(() => resolve(newTrade), 100)
  })
}

export const getStats = () => {
  const closedTrades = mockTrades.filter(t => t.status === 'closed')
  const totalPnL = closedTrades.reduce((sum, t) => sum + t.pnl, 0)
  const winningTrades = closedTrades.filter(t => t.pnl > 0)
  const winRate = closedTrades.length > 0 
    ? (winningTrades.length / closedTrades.length * 100).toFixed(1)
    : 0
  
  const openTrades = mockTrades.filter(t => t.status === 'open')
  const floatingPnL = openTrades.reduce((sum, t) => sum + (t.pnl || 0), 0)
  
  const totalEquity = 100000000 + totalPnL + floatingPnL

  return {
    totalEquity,
    floatingPnL,
    realizedPnL: totalPnL,
    winRate
  }
}

export const getCalendarData = () => {
  const data = {}
  mockTrades.filter(t => t.status === 'closed').forEach(trade => {
    if (!data[trade.date]) {
      data[trade.date] = 0
    }
    data[trade.date] += trade.pnl
  })
  return data
}
