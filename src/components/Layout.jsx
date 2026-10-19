import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, FileText, History, TrendingUp } from 'lucide-react'

export default function Layout() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/trade', icon: FileText, label: 'Input Trade' },
    { path: '/history', icon: History, label: 'Histori' }
  ]

  return (
    <div className="min-h-screen bg-dark-bg">
      <nav className="bg-dark-card border-b border-dark-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-profit mr-2" />
              <span className="text-xl font-bold">Trading Journal</span>
            </div>
            
            <div className="flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-profit text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-dark-bg'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
