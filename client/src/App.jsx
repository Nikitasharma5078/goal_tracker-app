import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar'

function App() {
  const [activePage, setActivePage] = useState('dashboard')

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Toaster position="top-right" />
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 p-6">
        <Dashboard />
      </main>
    </div>
  )
}

export default App