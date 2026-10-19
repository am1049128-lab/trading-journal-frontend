import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp } from 'lucide-react'

export default function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <TrendingUp className="w-12 h-12 text-profit mr-3" />
          <h1 className="text-3xl font-bold">Trading Journal</h1>
        </div>
        
        <div className="bg-dark-card border border-dark-border rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            {isSignup ? 'Buat Akun' : 'Masuk'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="block text-sm font-medium mb-2">Nama</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-profit"
                  required={isSignup}
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-profit"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-profit"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-profit hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {isSignup ? 'Daftar' : 'Masuk'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {isSignup ? 'Sudah punya akun? Masuk' : 'Belum punya akun? Daftar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
