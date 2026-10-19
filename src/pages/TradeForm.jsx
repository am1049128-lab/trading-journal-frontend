import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addTrade, strategies } from '../services/mockData'
import { Upload, X, Save } from 'lucide-react'

export default function TradeForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    ticker: '',
    type: 'buy',
    entryPrice: '',
    lot: '',
    strategy: strategies[0],
    sl: '',
    tp: '',
    notes: ''
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trade = {
      ...formData,
      entryPrice: parseFloat(formData.entryPrice),
      lot: parseInt(formData.lot),
      sl: parseFloat(formData.sl),
      tp: parseFloat(formData.tp),
      imageUrl: imagePreview
    }
    
    await addTrade(trade)
    navigate('/history')
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Input Transaksi</h1>
      
      <form onSubmit={handleSubmit} className="bg-dark-card border border-dark-border rounded-lg p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Tanggal</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-profit"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Ticker</label>
            <input
              type="text"
              name="ticker"
              value={formData.ticker}
              onChange={handleChange}
              placeholder="BBRI"
              className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-profit uppercase"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tipe</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-profit"
            >
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Entry Price</label>
            <input
              type="number"
              name="entryPrice"
              value={formData.entryPrice}
              onChange={handleChange}
              placeholder="5250"
              className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-profit"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Lot</label>
            <input
              type="number"
              name="lot"
              value={formData.lot}
              onChange={handleChange}
              placeholder="10"
              className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-profit"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Strategi</label>
            <select
              name="strategy"
              value={formData.strategy}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-profit"
            >
              {strategies.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Stop Loss</label>
            <input
              type="number"
              name="sl"
              value={formData.sl}
              onChange={handleChange}
              placeholder="5150"
              className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-profit"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Take Profit</label>
            <input
              type="number"
              name="tp"
              value={formData.tp}
              onChange={handleChange}
              placeholder="5450"
              className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-profit"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            placeholder="Catatan strategi atau observasi..."
            className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-profit resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Chart Screenshot</label>
          
          {!imagePreview ? (
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-dark-border rounded-lg cursor-pointer hover:border-profit transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-semibold">Klik untuk upload</span> atau drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          ) : (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Chart preview"
                className="w-full h-64 object-contain bg-dark-bg rounded-lg border border-dark-border"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-2 bg-loss hover:bg-red-600 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center bg-profit hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <Save className="w-5 h-5 mr-2" />
            Simpan Transaksi
          </button>
          <button
            type="button"
            onClick={() => navigate('/history')}
            className="px-6 py-3 bg-dark-bg border border-dark-border hover:bg-gray-800 rounded-lg transition-colors"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}
