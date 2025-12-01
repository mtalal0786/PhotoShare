'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface AuthFormProps {
  isLogin?: boolean
}

export function AuthForm({ isLogin = false }: AuthFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [role, setRole] = useState<'CREATOR' | 'CONSUMER'>('CONSUMER')
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name === 'role') setRole(value as 'CREATOR' | 'CONSUMER')
    else setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const payload = isLogin
        ? formData
        : { ...formData, role }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Authentication failed')

      if (data.user.role === 'CREATOR') {
        router.push('/creator/dashboard')
      } else {
        router.push('/')
      }

      router.refresh()

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
      <div>
        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          name="email"
          required
          className="w-full border px-4 py-2 rounded-lg"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Password</label>
        <input
          type="password"
          name="password"
          required
          className="w-full border px-4 py-2 rounded-lg"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      {!isLogin && (
        <div>
          <label className="block mb-2 font-medium">Account Type</label>
          <select
            name="role"
            value={role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="CONSUMER">Consumer</option>
            <option value="CREATOR">Creator</option>
          </select>
        </div>
      )}

      {error && <p className="text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
      >
        {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
      </button>

      <div className="text-center">
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <Link
          href={isLogin ? '/register' : '/login'}
          className="text-blue-600 font-semibold"
        >
          {isLogin ? 'Register' : 'Login'}
        </Link>
      </div>
    </form>
  )
}
