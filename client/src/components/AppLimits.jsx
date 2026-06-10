import { useState } from 'react'
import { Plus, Trash2, AlertTriangle, Clock } from 'lucide-react'
import toast from 'react-hot-toast'

const appIcons = {
  Instagram: '📸',
  YouTube: '▶️',
  Twitter: '🐦',
  TikTok: '🎵',
  Facebook: '👥',
  Reddit: '🤖',
  Netflix: '🎬',
  WhatsApp: '💬',
}

export default function AppLimits() {
  const [limits, setLimits] = useState([
    { id: 1, app: 'Instagram', limitMins: 30, usedMins: 24 },
    { id: 2, app: 'YouTube', limitMins: 60, usedMins: 55 },
    { id: 3, app: 'Twitter', limitMins: 20, usedMins: 8 },
    { id: 4, app: 'TikTok', limitMins: 15, usedMins: 15 },
  ])

  const [showForm, setShowForm] = useState(false)
  const [newLimit, setNewLimit] = useState({ app: 'Instagram', limitMins: 30 })

  const addLimit = () => {
    if (limits.find(l => l.app === newLimit.app)) {
      toast.error('Limit for this app already exists!')
      return
    }
    setLimits([...limits, { ...newLimit, id: Date.now(), usedMins: 0 }])
    setShowForm(false)
    toast.success('App limit set!')
  }

  const deleteLimit = (id) => {
    setLimits(limits.filter(l => l.id !== id))
    toast.success('Limit removed!')
  }

  const updateUsed = (id, value) => {
    setLimits(limits.map(l => l.id === id ? { ...l, usedMins: Number(value) } : l))
  }

  const getStatus = (used, limit) => {
    const pct = (used / limit) * 100
    if (pct >= 100) return { color: 'bg-red-500', text: 'text-red-400', label: 'Limit Reached!' }
    if (pct >= 80) return { color: 'bg-orange-500', text: 'text-orange-400', label: 'Almost there!' }
    return { color: 'bg-green-500', text: 'text-green-400', label: 'On track' }
  }

  const formatTime = (mins) => {
    if (mins < 60) return `${mins}m`
    return `${Math.floor(mins / 60)}h ${mins % 60}m`
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">App Limits</h2>
          <p className="text-gray-400 text-sm mt-1">Control your screen time</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl transition-all"
        >
          <Plus size={18} />
          Add Limit
        </button>
      </div>

      {/* Summary Card */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-white">{limits.length}</p>
          <p className="text-gray-400 text-sm">Apps Limited</p>
        </div>
        <div className="bg-gray-900 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-orange-400">
            {limits.filter(l => (l.usedMins / l.limitMins) >= 0.8).length}
          </p>
          <p className="text-gray-400 text-sm">Near Limit</p>
        </div>
        <div className="bg-gray-900 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-red-400">
            {limits.filter(l => l.usedMins >= l.limitMins).length}
          </p>
          <p className="text-gray-400 text-sm">Limit Reached</p>
        </div>
      </div>

      {/* Add Limit Form */}
      {showForm && (
        <div className="bg-gray-900 rounded-2xl p-5 mb-6">
          <h3 className="font-semibold mb-4">Set App Limit</h3>
          <div className="flex flex-col gap-3">
            <select
              value={newLimit.app}
              onChange={e => setNewLimit({ ...newLimit, app: e.target.value })}
              className="bg-gray-800 rounded-xl px-4 py-3 text-white outline-none"
            >
              {Object.keys(appIcons).map(app => (
                <option key={app}>{app}</option>
              ))}
            </select>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">
                Daily Limit: {newLimit.limitMins} minutes
              </label>
              <input
                type="range"
                min="5"
                max="180"
                step="5"
                value={newLimit.limitMins}
                onChange={e => setNewLimit({ ...newLimit, limitMins: Number(e.target.value) })}
                className="w-full accent-purple-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5 min</span>
                <span>3 hours</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={addLimit}
                className="flex-1 bg-purple-600 hover:bg-purple-700 py-3 rounded-xl transition-all font-medium"
              >
                Set Limit
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

      {/* App Limits List */}
      <div className="flex flex-col gap-4">
        {limits.map(limit => {
          const pct = Math.min((limit.usedMins / limit.limitMins) * 100, 100)
          const status = getStatus(limit.usedMins, limit.limitMins)
          return (
            <div key={limit.id} className="bg-gray-900 rounded-2xl p-5">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{appIcons[limit.app] || '📱'}</span>
                  <div>
                    <h4 className="font-semibold text-white">{limit.app}</h4>
                    <div className="flex items-center gap-1">
                      {pct >= 80 && <AlertTriangle size={12} className={status.text} />}
                      <span className={`text-xs ${status.text}`}>{status.label}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-white font-bold">{formatTime(limit.usedMins)}</p>
                    <p className="text-gray-500 text-xs">of {formatTime(limit.limitMins)}</p>
                  </div>
                  <button
                    onClick={() => deleteLimit(limit.id)}
                    className="text-gray-600 hover:text-red-400 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-800 rounded-full h-3 mb-3">
                <div
                  className={`${status.color} h-3 rounded-full transition-all`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              {/* Manual Time Input */}
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-gray-500" />
                <span className="text-xs text-gray-500">Log time used today:</span>
                <input
                  type="range"
                  min="0"
                  max={limit.limitMins}
                  value={limit.usedMins}
                  onChange={e => updateUsed(limit.id, e.target.value)}
                  className="flex-1 accent-purple-500"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}