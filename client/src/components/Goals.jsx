import { useState } from 'react'
import { Plus, Trash2, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const categories = ['All', 'Health', 'Finance', 'Career', 'Personal', 'Education']

const categoryColors = {
  Health: 'bg-green-500/20 text-green-400',
  Finance: 'bg-yellow-500/20 text-yellow-400',
  Career: 'bg-purple-500/20 text-purple-400',
  Personal: 'bg-pink-500/20 text-pink-400',
  Education: 'bg-blue-500/20 text-blue-400',
}

export default function Goals() {
  const [goals, setGoals] = useState([
    { id: 1, title: 'Run 5km every day', category: 'Health', progress: 75, deadline: '2026-07-01' },
    { id: 2, title: 'Save $500 this month', category: 'Finance', progress: 60, deadline: '2026-06-30' },
    { id: 3, title: 'Read 2 books', category: 'Education', progress: 40, deadline: '2026-08-01' },
    { id: 4, title: 'Learn React', category: 'Career', progress: 85, deadline: '2026-07-15' },
  ])

  const [activeCategory, setActiveCategory] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: '', category: 'Health', progress: 0, deadline: ''
  })

  const filtered = activeCategory === 'All'
    ? goals
    : goals.filter(g => g.category === activeCategory)

  const addGoal = () => {
    if (!newGoal.title) {
      toast.error('Please enter a goal title!')
      return
    }
    setGoals([...goals, { ...newGoal, id: Date.now() }])
    setNewGoal({ title: '', category: 'Health', progress: 0, deadline: '' })
    setShowForm(false)
    toast.success('Goal added!')
  }

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id))
    toast.success('Goal deleted!')
  }

  const updateProgress = (id, value) => {
    setGoals(goals.map(g => g.id === id ? { ...g, progress: Number(value) } : g))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Goals</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl transition-all"
        >
          <Plus size={18} />
          Add Goal
        </button>
      </div>

      {/* Add Goal Form */}
      {showForm && (
        <div className="bg-gray-900 rounded-2xl p-6 mb-6">
          <h3 className="font-semibold mb-4">New Goal</h3>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Goal title..."
              value={newGoal.title}
              onChange={e => setNewGoal({ ...newGoal, title: e.target.value })}
              className="bg-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex gap-3">
              <select
                value={newGoal.category}
                onChange={e => setNewGoal({ ...newGoal, category: e.target.value })}
                className="bg-gray-800 rounded-xl px-4 py-3 text-white outline-none flex-1"
              >
                {categories.filter(c => c !== 'All').map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <input
                type="date"
                value={newGoal.deadline}
                onChange={e => setNewGoal({ ...newGoal, deadline: e.target.value })}
                className="bg-gray-800 rounded-xl px-4 py-3 text-white outline-none flex-1"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={addGoal}
                className="flex-1 bg-purple-600 hover:bg-purple-700 py-3 rounded-xl transition-all font-medium"
              >
                Save Goal
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 py-3 rounded-xl transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm transition-all ${
              activeCategory === cat
                ? 'bg-purple-600 text-white'
                : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Goals List */}
      <div className="flex flex-col gap-4">
        {filtered.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No goals yet. Click "Add Goal" to get started!
          </div>
        )}
        {filtered.map(goal => (
          <div key={goal.id} className="bg-gray-900 rounded-2xl p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-white mb-1">{goal.title}</h4>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-lg ${categoryColors[goal.category]}`}>
                    {goal.category}
                  </span>
                  {goal.deadline && (
                    <span className="text-xs text-gray-500">Due: {goal.deadline}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {goal.progress === 100 && (
                  <CheckCircle className="text-green-400" size={20} />
                )}
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="text-gray-600 hover:text-red-400 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Progress Slider */}
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="100"
                value={goal.progress}
                onChange={e => updateProgress(goal.id, e.target.value)}
                className="flex-1 accent-purple-500"
              />
              <span className="text-sm font-bold text-white w-10 text-right">
                {goal.progress}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}