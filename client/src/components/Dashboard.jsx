import { useState, useEffect } from 'react'
import { Target, CheckSquare, Clock, TrendingUp } from 'lucide-react'

const quotes = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
]

const stats = [
  { label: 'Active Goals', value: '8', icon: Target, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { label: 'Habits Today', value: '5/7', icon: CheckSquare, color: 'text-green-400', bg: 'bg-green-400/10' },
  { label: 'App Limits', value: '3', icon: Clock, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { label: 'Weekly Progress', value: '72%', icon: TrendingUp, color: 'text-blue-400', bg: 'bg-blue-400/10' },
]

const goals = [
  { title: 'Run 5km every day', category: 'Health', progress: 75, color: 'bg-green-500' },
  { title: 'Save $500 this month', category: 'Finance', progress: 60, color: 'bg-yellow-500' },
  { title: 'Read 2 books', category: 'Education', progress: 40, color: 'bg-blue-500' },
  { title: 'Learn React', category: 'Career', progress: 85, color: 'bg-purple-500' },
]

export default function Dashboard() {
  const [quote, setQuote] = useState(quotes[0])

  useEffect(() => {
    const today = new Date().getDay()
    setQuote(quotes[today % quotes.length])
  }, [])

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Good morning, Nikita! 👋</h2>

      {/* Daily Quote */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 mb-8">
        <p className="text-xs uppercase tracking-widest text-purple-200 mb-2">Daily Quote</p>
        <p className="text-lg font-medium text-white mb-2">"{quote.text}"</p>
        <p className="text-purple-200 text-sm">— {quote.author}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-gray-900 rounded-2xl p-4">
            <div className={`${bg} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
              <Icon className={color} size={20} />
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-gray-400 text-sm">{label}</p>
          </div>
        ))}
      </div>

      {/* Goals */}
      <div className="bg-gray-900 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Your Goals</h3>
        <div className="flex flex-col gap-4">
          {goals.map((goal) => (
            <div key={goal.title} className="bg-gray-800 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-medium text-white">{goal.title}</p>
                  <span className="text-xs text-gray-400">{goal.category}</span>
                </div>
                <span className="text-sm font-bold text-white">{goal.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`${goal.color} h-2 rounded-full transition-all`}
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}