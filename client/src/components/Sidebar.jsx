import { Target, LayoutDashboard, CheckSquare, Clock, LogOut } from 'lucide-react'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'habits', label: 'Habits', icon: CheckSquare },
  { id: 'limits', label: 'App Limits', icon: Clock },
]

export default function Sidebar({ activePage, setActivePage, user, onLogout }) {
  return (
    <div className="w-64 bg-gray-900 min-h-screen p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <Target className="text-purple-400" size={28} />
        <h1 className="text-xl font-bold text-white">GoalTracker</h1>
      </div>

      <div className="flex flex-col gap-2 flex-1">
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

      {/* User info and logout */}
      {user && (
        <div className="border-t border-gray-800 pt-4 mt-4">
          <p className="text-white font-medium text-sm">{user.name}</p>
          <p className="text-gray-500 text-xs mb-3">{user.email}</p>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-all text-sm"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  )
}