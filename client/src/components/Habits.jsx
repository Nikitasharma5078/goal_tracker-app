import { useState } from 'react'
import { Plus, Trash2, Flame, Check } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Habits() {
  const [habits, setHabits] = useState([
    { id: 1, title: 'Morning Walk', streak: 7, checkedToday: false, logs: [1,1,1,1,1,1,1,0,0,0,0,0,0,0] },
    { id: 2, title: 'Drink 8 glasses of water', streak: 4, checkedToday: false, logs: [1,1,1,1,0,0,1,0,1,0,0,0,0,0] },
    { id: 3, title: 'Read for 20 mins', streak: 12, checkedToday: true, logs: [1,1,1,1,1,1,1,1,1,1,1,1,0,0] },
    { id: 4, title: 'No social media before 9am', streak: 3, checkedToday: false, logs: [1,1,1,0,0,1,0,0,1,0,0,0,0,0] },
  ])

  const [showForm, setShowForm] = useState(false)
  const [newHabit, setNewHabit] = useState('')

  const checkIn = (id) => {
    setHabits(habits.map(h => {
      if (h.id === id) {
        if (h.checkedToday) {
          toast.error('Already checked in today!')
          return h
        }
        toast.success(`🔥 ${h.streak + 1} day streak!`)
        return { ...h, checkedToday: true, streak: h.streak + 1, logs: [1, ...h.logs.slice(0, 13)] }
      }
      return h
    }))
  }

  const deleteHabit = (id) => {
    setHabits(habits.filter(h => h.id !== id))
    toast.success('Habit deleted!')
  }

  const addHabit = () => {
    if (!newHabit.trim()) {
      toast.error('Please enter a habit name!')
      return
    }
    setHabits([...habits, {
      id: Date.now(),
      title: newHabit,
      streak: 0,
      checkedToday: false,
      logs: Array(14).fill(0)
    }])
    setNewHabit('')
    setShowForm(false)
    toast.success('Habit added!')
  }

  const completed = habits.filter(h => h.checkedToday).length

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">My Habits</h2>
          <p className="text-gray-400 text-sm mt-1">
            {completed}/{habits.length} completed today
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl transition-all"
        >
          <Plus size={18} />
          Add Habit
        </button>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-900 rounded-2xl p-4 mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Today's Progress</span>
          <span className="text-white font-bold">
            {Math.round((completed / habits.length) * 100) || 0}%
          </span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-purple-500 to-green-500 h-3 rounded-full transition-all"
            style={{ width: `${(completed / habits.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Add Habit Form */}
      {showForm && (
        <div className="bg-gray-900 rounded-2xl p-5 mb-6">
          <h3 className="font-semibold mb-3">New Habit</h3>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="e.g. Meditate for 10 mins..."
              value={newHabit}
              onChange={e => setNewHabit(e.target.value)}
              className="flex-1 bg-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={addHabit}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl transition-all"
            >
              Save
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-xl transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Habits List */}
      <div className="flex flex-col gap-4">
        {habits.map(habit => (
          <div key={habit.id} className={`bg-gray-900 rounded-2xl p-5 border-2 transition-all ${
            habit.checkedToday ? 'border-green-500/40' : 'border-transparent'
          }`}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => checkIn(habit.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    habit.checkedToday
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-800 text-gray-500 hover:bg-gray-700'
                  }`}
                >
                  <Check size={18} />
                </button>
                <div>
                  <h4 className={`font-semibold ${habit.checkedToday ? 'text-green-400' : 'text-white'}`}>
                    {habit.title}
                  </h4>
                  <div className="flex items-center gap-1 mt-1">
                    <Flame className="text-orange-400" size={14} />
                    <span className="text-orange-400 text-sm font-bold">{habit.streak} day streak</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => deleteHabit(habit.id)}
                className="text-gray-600 hover:text-red-400 transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* 14 Day Log */}
            <div>
              <p className="text-xs text-gray-500 mb-2">Last 14 days</p>
              <div className="flex gap-1">
                {habit.logs.map((day, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-6 rounded-md ${
                      day ? 'bg-green-500' : 'bg-gray-800'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}