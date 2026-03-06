'use client'

import { useState } from 'react'
import Link from 'next/link'

interface RegisterFormProps {
  onSuccess?: () => void
  redirectUrl?: string
}

export default function RegisterForm({ 
  onSuccess, 
  redirectUrl = '/auth/login?registered=true' 
}: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  })
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [registerError, setRegisterError] = useState('')
  const [registerSuccess, setRegisterSuccess] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Check password strength
    if (name === 'password') {
      checkPasswordStrength(value)
    }
    
    // Clear field error
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
    
    // Clear register error
    if (registerError) {
      setRegisterError('')
    }
  }

  // Check password strength
  const checkPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.match(/[a-z]+/)) strength++
    if (password.match(/[A-Z]+/)) strength++
    if (password.match(/[0-9]+/)) strength++
    if (password.match(/[$@#&!]+/)) strength++
    setPasswordStrength(strength)
  }

  // Get strength color
  const getStrengthColor = () => {
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981']
    return colors[passwordStrength - 1] || '#9ca3af'
  }

  // Get strength text
  const getStrengthText = () => {
    const texts = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong']
    return texts[passwordStrength - 1] || 'Enter password'
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    // Phone validation (optional)
    if (formData.phone && !/^[\d\s\+\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter'
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter'
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number'
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    // Terms validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle register
  const handleRegister = async () => {
    // Check if email already exists (demo)
    const existingEmails = ['hafizsajidsyed@gmail.com', 'admin@kitechn.com', 'user@demo.com']
    
    if (existingEmails.includes(formData.email.toLowerCase())) {
      return { success: false, error: 'Email already registered. Please login instead.' }
    }

    // Simulate successful registration
    return { 
      success: true, 
      message: 'Registration successful! Please check your email to verify your account.' 
    }
  }

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setRegisterError('')
    setRegisterSuccess('')

    try {
      const result = await handleRegister()
      
      if (result.success) {
        setRegisterSuccess(result.message || 'Registration successful!')
        
        // Call success callback
        if (onSuccess) {
          onSuccess()
        }
        
        // Redirect after delay
        setTimeout(() => {
          window.location.href = redirectUrl
        }, 2000)
      } else {
        setRegisterError(result.error || 'Registration failed')
      }
    } catch (error) {
      setRegisterError('An error occurred. Please try again.')
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
      maxWidth: '500px'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #4ade80, #3b82f6, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          Create Account
        </h2>
        <p style={{ color: '#9ca3af' }}>Join Kitechn today</p>
      </div>

      {/* Success Message */}
      {registerSuccess && (
        <div style={{
          marginBottom: '1.5rem',
          padding: '1rem',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '0.75rem',
          color: '#10b981',
          textAlign: 'center',
          fontSize: '0.875rem',
          animation: 'pulse 2s infinite'
        }}>
          ✓ {registerSuccess}
        </div>
      )}

      {/* Error Message */}
      {registerError && (
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
          {registerError}
        </div>
      )}

      {/* Register Form */}
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            color: '#d1d5db',
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            Full Name <span style={{ color: '#ef4444' }}>*</span>
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
              👤
            </span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Hafiz Sajid Syed"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 3rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: `1px solid ${errors.name ? '#ef4444' : 'rgba(255, 255, 255, 0.2)'}`,
                borderRadius: '0.75rem',
                color: 'white',
                outline: 'none',
                fontSize: '0.875rem'
              }}
            />
          </div>
          {errors.name && (
            <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            color: '#d1d5db',
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            Email Address <span style={{ color: '#ef4444' }}>*</span>
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

        {/* Phone Field */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            color: '#d1d5db',
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            Phone Number <span style={{ color: '#9ca3af' }}>(optional)</span>
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
              📱
            </span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+92 300 1234567"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 3rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: `1px solid ${errors.phone ? '#ef4444' : 'rgba(255, 255, 255, 0.2)'}`,
                borderRadius: '0.75rem',
                color: 'white',
                outline: 'none',
                fontSize: '0.875rem'
              }}
            />
          </div>
          {errors.phone && (
            <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
              {errors.phone}
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
            Password <span style={{ color: '#ef4444' }}>*</span>
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
          
          {/* Password Strength Meter */}
          {formData.password && (
            <div style={{ marginTop: '0.5rem' }}>
              <div style={{
                height: '4px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '2px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(passwordStrength / 5) * 100}%`,
                  height: '100%',
                  background: getStrengthColor(),
                  transition: 'width 0.3s'
                }} />
              </div>
              <p style={{
                fontSize: '0.75rem',
                marginTop: '0.25rem',
                color: getStrengthColor()
              }}>
                {getStrengthText()}
              </p>
            </div>
          )}
          
          {errors.password && (
            <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            color: '#d1d5db',
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            Confirm Password <span style={{ color: '#ef4444' }}>*</span>
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
              🔐
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem 3rem 0.75rem 3rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: `1px solid ${errors.confirmPassword ? '#ef4444' : 'rgba(255, 255, 255, 0.2)'}`,
                borderRadius: '0.75rem',
                color: 'white',
                outline: 'none',
                fontSize: '0.875rem'
              }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
              {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {errors.confirmPassword && (
            <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#d1d5db',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              disabled={loading}
              style={{
                width: '1rem',
                height: '1rem',
                accentColor: '#c084fc',
                cursor: 'pointer'
              }}
            />
            <span style={{ fontSize: '0.875rem' }}>
              I accept the <Link href="/terms" style={{ color: '#c084fc', textDecoration: 'none' }}>Terms of Service</Link> and <Link href="/privacy" style={{ color: '#c084fc', textDecoration: 'none' }}>Privacy Policy</Link>
            </span>
          </label>
          {errors.acceptTerms && (
            <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
              {errors.acceptTerms}
            </p>
          )}
        </div>

        {/* Register Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '1rem',
            background: 'linear-gradient(135deg, #22c55e, #3b82f6, #a855f7)',
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
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      {/* Login Link */}
      <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>
        Already have an account?{' '}
        <Link 
          href="/auth/login" 
          style={{
            color: '#c084fc',
            textDecoration: 'none',
            fontWeight: '600'
          }}
        >
          Login here
        </Link>
      </p>

      {/* Admin Info */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '0.75rem',
        textAlign: 'center'
      }}>
        <p style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
          Administrator: <span style={{ color: '#c084fc', fontWeight: '600' }}>Hafiz Sajid Syed</span>
        </p>
        <p style={{ color: '#4b5563', fontSize: '0.7rem', marginTop: '0.25rem' }}>
          Demo: Use any email (except existing ones)
        </p>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}