import { useState } from 'react'
import { Target, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handle = async () => {
    if (!form.email || !form.password) {
      toast.error('Please fill in all fields!')
      return
    }
    if (!isLogin && !form.name) {
      toast.error('Please enter your name!')
      return
    }

    setLoading(true)
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password }

      const res = await axios.post(`${API}${endpoint}`, payload)
      const { token, user } = res.data

      // Save token to localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      toast.success(isLogin ? 'Welcome back!' : 'Account created!')
      onLogin(user)

    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Target className="text-purple-400" size={36} />
          <h1 className="text-3xl font-bold text-white">GoalTracker</h1>
        </div>

        {/* Card */}
        <div className="bg-gray-900 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-1">
            {isLogin ? 'Welcome back 👋' : 'Create account 🚀'}
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            {isLogin ? 'Login to continue your journey' : 'Start tracking your goals today'}
          </p>

          <div className="flex flex-col gap-4">
            {!isLogin && (
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Full Name</label>
                <input
                  type="text"
                  placeholder="Nikita Sharma"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}

            <div>
              <label className="text-gray-400 text-sm mb-1 block">Email</label>
              <input
                type="email"
                placeholder="nikita@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full bg-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-1 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500 pr-12"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              onClick={handle}
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 py-3 rounded-xl font-semibold transition-all mt-2"
            >
              {loading ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}
            </button>
          </div>

          <p className="text-center text-gray-400 text-sm mt-6">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>

        <p className="text-center text-gray-600 text-sm mt-6">
          "A goal without a plan is just a wish."
        </p>
      </div>
    </div>
  )
}