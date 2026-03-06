'use client'

import { useState, useEffect } from 'react'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Check for URL params manually
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('registered') === 'true') {
      setSuccess('Account created successfully! Please login.')
    }
    if (params.get('error') === 'true') {
      setError('Invalid email or password')
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    // Validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    // Simulate login for demo
    setTimeout(() => {
      if (formData.email === 'hafizsajidsyed@gmail.com' && formData.password === 'Hafiz@123456') {
        // Success - redirect manually
        window.location.href = '/dashboard'
      } else {
        setError('Invalid email or password')
        setLoading(false)
      }
    }, 1500)
  }

  // Handle demo login
  const handleDemoLogin = (role: 'admin' | 'user') => {
    setLoading(true)
    setError('')
    
    setTimeout(() => {
      if (role === 'admin') {
        window.location.href = '/admin'
      } else {
        window.location.href = '/dashboard'
      }
    }, 1500)
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #6b21a5 0%, #312e81 50%, #1e3a8a 100%)'
    }}>
      {/* Star Field Background - Pure CSS */}
      <div style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      {/* Bismillah */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        paddingTop: '2rem'
      }}>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 5vw, 3rem)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          textAlign: 'center',
          padding: '1rem 0',
          background: 'linear-gradient(135deg, #86efac, #60a5fa, #c084fc)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'pulse 2s infinite'
        }}>
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </h1>
      </div>

      {/* Login Form */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        padding: '2rem 1rem'
      }}>
        <div style={{
          maxWidth: '28rem',
          margin: '0 auto'
        }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <a href="/" style={{ textDecoration: 'none' }}>
              <span style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #f472b6, #a855f7, #4f46e5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Kitechn
              </span>
            </a>
          </div>

          {/* Main Card */}
          <div style={{
            backdropFilter: 'blur(12px)',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '1.5rem',
            padding: '2rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            animation: 'glow 2s infinite'
          }}>
            
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{
                fontSize: '1.875rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}>
                <span style={{
                  background: 'linear-gradient(135deg, #60a5fa, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Welcome Back
                </span>
              </h2>
              <p style={{ color: '#d1d5db' }}>Login to your account</p>
            </div>

            {/* Success Message */}
            {success && (
              <div style={{
                marginBottom: '1.5rem',
                padding: '1rem',
                background: 'rgba(34, 197, 94, 0.2)',
                border: '1px solid rgba(34, 197, 94, 0.5)',
                borderRadius: '0.75rem',
                color: '#bbf7d0',
                textAlign: 'center',
                animation: 'pulse 2s infinite'
              }}>
                {success}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div style={{
                marginBottom: '1.5rem',
                padding: '1rem',
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.5)',
                borderRadius: '0.75rem',
                color: '#fecaca',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Email Field */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'white',
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
                    color: '#9ca3af'
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
                      paddingLeft: '3rem',
                      paddingRight: '1rem',
                      paddingTop: '0.75rem',
                      paddingBottom: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.75rem',
                      color: 'white',
                      outline: 'none',
                      transition: 'all 0.2s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#c084fc'
                      e.target.style.boxShadow = '0 0 0 2px rgba(192, 132, 252, 0.2)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'white',
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
                    color: '#9ca3af'
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
                      paddingLeft: '3rem',
                      paddingRight: '3rem',
                      paddingTop: '0.75rem',
                      paddingBottom: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.75rem',
                      color: 'white',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#c084fc'
                      e.target.style.boxShadow = '0 0 0 2px rgba(192, 132, 252, 0.2)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                      e.target.style.boxShadow = 'none'
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
                      color: '#9ca3af',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#d1d5db'
                }}>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    disabled={loading}
                    style={{
                      width: '1rem',
                      height: '1rem',
                      accentColor: '#a855f7'
                    }}
                  />
                  <span style={{ fontSize: '0.875rem' }}>Remember me</span>
                </label>
                <a 
                  href="/auth/forgot-password"
                  style={{
                    fontSize: '0.875rem',
                    color: '#d8b4fe',
                    textDecoration: 'none'
                  }}
                >
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  background: 'linear-gradient(135deg, #ec4899, #a855f7, #4f46e5)',
                  border: 'none',
                  borderRadius: '0.75rem',
                  color: 'white',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1,
                  transition: 'all 0.3s',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <span style={{ position: 'relative', zIndex: 10 }}>
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      <span style={{
                        width: '1.25rem',
                        height: '1.25rem',
                        border: '2px solid white',
                        borderTopColor: 'transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></span>
                      Logging in...
                    </span>
                  ) : (
                    'Login'
                  )}
                </span>
              </button>
            </form>

            {/* Demo Login Buttons */}
            <div style={{ marginTop: '1.5rem' }}>
              <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#9ca3af', marginBottom: '0.75rem' }}>
                Or login with demo accounts
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem'
              }}>
                <button
                  onClick={() => handleDemoLogin('admin')}
                  disabled={loading}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'rgba(168, 85, 247, 0.2)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: '0.5rem',
                    color: '#d8b4fe',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  Admin Demo
                </button>
                <button
                  onClick={() => handleDemoLogin('user')}
                  disabled={loading}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'rgba(59, 130, 246, 0.2)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '0.5rem',
                    color: '#93c5fd',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  User Demo
                </button>
              </div>
            </div>

            {/* Social Login */}
            <div style={{ marginTop: '2rem' }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <div style={{ width: '100%', borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}></div>
                </div>
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <span style={{ padding: '0 1rem', color: '#9ca3af', fontSize: '0.875rem' }}>
                    Or continue with
                  </span>
                </div>
              </div>

              <div style={{
                marginTop: '1.5rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '0.75rem'
              }}>
                {['G', 'f', 'X'].map((icon, i) => (
                  <button key={i} style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0.5rem 1rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '0.5rem',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1.25rem'
                  }}>
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Register Link */}
            <p style={{ marginTop: '2rem', textAlign: 'center', color: '#d1d5db' }}>
              Don't have an account?{' '}
              <a 
                href="/auth/register" 
                style={{
                  color: '#c084fc',
                  textDecoration: 'none',
                  fontWeight: '600'
                }}
              >
                Register here
              </a>
            </p>

            {/* Admin Info */}
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '0.75rem',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '0.875rem', color: '#d1d5db' }}>
                Administrator: <span style={{ color: '#c084fc', fontWeight: '600' }}>Hafiz Sajid Syed</span>
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <a 
              href="/" 
              style={{
                color: '#9ca3af',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>←</span> Back to Home
            </a>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style>{`
        @keyframes animateStars {
          from { transform: translateY(0px); }
          to { transform: translateY(-2000px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.3); }
          50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.6); }
        }
        
        .stars, .stars2, .stars3 {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: block;
        }
        
        .stars {
          background: transparent url('data:image/svg+xml;utf8,<svg width="3" height="3" viewBox="0 0 3 3" xmlns="http://www.w3.org/2000/svg"><circle cx="1.5" cy="1.5" r="1" fill="white" opacity="0.5"/></svg>') repeat;
          animation: animateStars 50s linear infinite;
        }
        
        .stars2 {
          background: transparent url('data:image/svg+xml;utf8,<svg width="2" height="2" viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg"><circle cx="1" cy="1" r="0.8" fill="white" opacity="0.3"/></svg>') repeat;
          animation: animateStars 100s linear infinite;
        }
        
        .stars3 {
          background: transparent url('data:image/svg+xml;utf8,<svg width="4" height="4" viewBox="0 0 4 4" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="1.2" fill="white" opacity="0.2"/></svg>') repeat;
          animation: animateStars 150s linear infinite;
        }
        
        @media (max-width: 640px) {
          .stars {
            animation-duration: 30s;
          }
          .stars2 {
            animation-duration: 60s;
          }
          .stars3 {
            animation-duration: 90s;
          }
        }
      `}</style>
    </main>
  )
}