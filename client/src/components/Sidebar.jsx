import { Target, LayoutDashboard, CheckSquare, Clock, Quote } from 'lucide-react'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'habits', label: 'Habits', icon: CheckSquare },
  { id: 'limits', label: 'App Limits', icon: Clock },
]

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <div className="w-64 bg-gray-900 min-h-screen p-6 flex flex-col gap-2">
      <div className="flex items-center gap-2 mb-8">
        <Target className="text-purple-400" size={28} />
        <h1 className="text-xl font-bold text-white">GoalTracker</h1>
      </div>
      {navItems.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActivePage(id)}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
            activePage === id
              ? 'bg-purple-600 text-white'
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <Icon size={20} />
          {label}
        </button>
      ))}
    </div>
  )
}