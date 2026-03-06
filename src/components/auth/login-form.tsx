'use client'

import { useState } from 'react'
import Link from 'next/link'

interface LoginFormProps {
  onSuccess?: () => void
  redirectUrl?: string
  showDemoButtons?: boolean
}

export default function LoginForm({ 
  onSuccess, 
  redirectUrl = '/dashboard',
  showDemoButtons = true 
}: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear field error
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
    
    // Clear login error
    if (loginError) {
      setLoginError('')
    }
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle login
  const handleLogin = async (email: string, password: string) => {
    // Demo credentials
    const demoUsers = [
      { email: 'hafizsajidsyed@gmail.com', password: 'Hafiz@123456', role: 'admin', name: 'Hafiz Sajid Syed' },
      { email: 'admin@kitechn.com', password: 'Admin@123', role: 'admin', name: 'Admin User' },
      { email: 'user@demo.com', password: 'Demo@123456', role: 'user', name: 'Demo User' },
      { email: 'moderator@demo.com', password: 'Mod@123456', role: 'moderator', name: 'Moderator User' }
    ]

    // Find user
    const user = demoUsers.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )

    if (user) {
      // Store auth data
      localStorage.setItem('token', 'demo-token-' + Date.now())
      localStorage.setItem('user', JSON.stringify({
        id: Date.now().toString(),
        name: user.name,
        email: user.email,
        role: user.role
      }))
      
      // Set session cookie (simplified)
      document.cookie = `next-auth.session-token=demo-session; path=/; max-age=${30 * 24 * 60 * 60}`
      
      return { success: true, user }
    }

    return { success: false, error: 'Invalid email or password' }
  }

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setLoginError('')

    try {
      const result = await handleLogin(formData.email, formData.password)
      
      if (result.success) {
        // Call success callback
        if (onSuccess) {
          onSuccess()
        }
        
        // Redirect
        const storedRedirect = sessionStorage.getItem('redirectAfterLogin')
        window.location.href = storedRedirect || redirectUrl
        sessionStorage.removeItem('redirectAfterLogin')
      } else {
        setLoginError(result.error || 'Login failed')
      }
    } catch (error) {
      setLoginError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Handle demo login
  const handleDemoLogin = async (role: 'admin' | 'user' | 'moderator') => {
    setLoading(true)
    setLoginError('')
    
    const demoCredentials = {
      admin: { email: 'hafizsajidsyed@gmail.com', password: 'Hafiz@123456' },
      user: { email: 'user@demo.com', password: 'Demo@123456' },
      moderator: { email: 'moderator@demo.com', password: 'Mod@123456' }
    }

    try {
      const result = await handleLogin(
        demoCredentials[role].email,
        demoCredentials[role].password
      )
      
      if (result.success) {
        window.location.href = role === 'admin' ? '/admin' : '/dashboard'
      } else {
        setLoginError('Demo login failed')
      }
    } catch (error) {
      setLoginError('Demo login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '1.5rem',
      padding: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      width: '100%',
      maxWidth: '400px'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #60a5fa, #c084fc)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          Welcome Back
        </h2>
        <p style={{ color: '#9ca3af' }}>Login to your account</p>
      </div>

      {/* Error Message */}
      {loginError && (
        <div style={{
          marginBottom: '1.5rem',
          padding: '1rem',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '0.75rem',
          color: '#ef4444',
          textAlign: 'center',
          fontSize: '0.875rem'
        }}>
          {loginError}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            color: '#d1d5db',
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            Email Address
          </label>
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af',
              fontSize: '1.25rem'
            }}>
              ✉️
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="hafizsajidsyed@gmail.com"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 3rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: `1px solid ${errors.email ? '#ef4444' : 'rgba(255, 255, 255, 0.2)'}`,
                borderRadius: '0.75rem',
                color: 'white',
                outline: 'none',
                fontSize: '0.875rem'
              }}
            />
          </div>
          {errors.email && (
            <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            color: '#d1d5db',
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af',
              fontSize: '1.25rem'
            }}>
              🔒
            </span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem 3rem 0.75rem 3rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: `1px solid ${errors.password ? '#ef4444' : 'rgba(255, 255, 255, 0.2)'}`,
                borderRadius: '0.75rem',
                color: 'white',
                outline: 'none',
                fontSize: '0.875rem'
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#9ca3af',
                fontSize: '1.25rem',
                cursor: 'pointer'
              }}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {errors.password && (
            <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
              {errors.password}
            </p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem'
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#d1d5db', cursor: 'pointer' }}>
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              disabled={loading}
              style={{
                width: '1rem',
                height: '1rem',
                accentColor: '#c084fc',
                cursor: 'pointer'
              }}
            />
            <span style={{ fontSize: '0.875rem' }}>Remember me</span>
          </label>
          <Link 
            href="/auth/forgot-password"
            style={{
              fontSize: '0.875rem',
              color: '#c084fc',
              textDecoration: 'none'
            }}
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '1rem',
            background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
            border: 'none',
            borderRadius: '0.75rem',
            color: 'white',
            fontWeight: '600',
            fontSize: '1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}
        >
          {loading ? (
            <>
              <span style={{
                width: '1rem',
                height: '1rem',
                border: '2px solid white',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></span>
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </button>
      </form>

      {/* Demo Login Buttons */}
      {showDemoButtons && (
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{
            textAlign: 'center',
            color: '#9ca3af',
            fontSize: '0.875rem',
            marginBottom: '1rem'
          }}>
            Or login with demo accounts
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '0.5rem'
          }}>
            <button
              onClick={() => handleDemoLogin('admin')}
              disabled={loading}
              style={{
                padding: '0.5rem',
                background: 'rgba(168, 85, 247, 0.1)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                borderRadius: '0.5rem',
                color: '#c084fc',
                fontSize: '0.75rem',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1
              }}
            >
              Admin
            </button>
            <button
              onClick={() => handleDemoLogin('moderator')}
              disabled={loading}
              style={{
                padding: '0.5rem',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '0.5rem',
                color: '#3b82f6',
                fontSize: '0.75rem',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1
              }}
            >
              Moderator
            </button>
            <button
              onClick={() => handleDemoLogin('user')}
              disabled={loading}
              style={{
                padding: '0.5rem',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '0.5rem',
                color: '#10b981',
                fontSize: '0.75rem',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1
              }}
            >
              User
            </button>
          </div>
        </div>
      )}

      {/* Register Link */}
      <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>
        Don't have an account?{' '}
        <Link 
          href="/auth/register" 
          style={{
            color: '#c084fc',
            textDecoration: 'none',
            fontWeight: '600'
          }}
        >
          Register here
        </Link>
      </p>

      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}