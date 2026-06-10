import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar'
import Goals from './components/Goals'
import Habits from './components/Habits'
import AppLimits from './components/AppLimits'

function App() {
  const [activePage, setActivePage] = useState('dashboard')

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />
      case 'goals': return <Goals />
      case 'habits': return <Habits />
      case 'limits': return <AppLimits />
      default: return <Dashboard />
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Toaster position="top-right" />
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 p-6 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
