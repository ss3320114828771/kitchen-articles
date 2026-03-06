'use client'

import { useState } from 'react'
import Link from 'next/link'

interface NewsletterSignupProps {
  title?: string
  subtitle?: string
  placeholder?: string
  buttonText?: string
  successMessage?: string
  errorMessage?: string
  privacyLink?: string
  termsLink?: string
  onSubscribe?: (email: string) => Promise<boolean> | boolean
  backgroundColor?: string
  compact?: boolean
  showSocialLinks?: boolean
}

export default function NewsletterSignup({
  title = 'Stay Updated',
  subtitle = 'Subscribe to get updates on new products and special offers',
  placeholder = 'Enter your email address',
  buttonText = 'Subscribe',
  successMessage = 'Thanks for subscribing! Check your email for confirmation.',
  errorMessage = 'Something went wrong. Please try again.',
  privacyLink = '/privacy',
  termsLink = '/terms',
  onSubscribe,
  backgroundColor = 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(168,85,247,0.1))',
  compact = false,
  showSocialLinks = true
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
  useState(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768)
      
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
      }
      
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  })

  // Validate email
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate email
    if (!email.trim()) {
      setStatus('error')
      setMessage('Please enter your email address')
      return
    }

    if (!isValidEmail(email)) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      // Call onSubscribe if provided
      if (onSubscribe) {
        const result = await onSubscribe(email)
        if (result) {
          setStatus('success')
          setMessage(successMessage)
          setEmail('')
        } else {
          setStatus('error')
          setMessage(errorMessage)
        }
      } else {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        setStatus('success')
        setMessage(successMessage)
        setEmail('')
      }
    } catch (error) {
      setStatus('error')
      setMessage(errorMessage)
    }
  }

  // Social media links
  const socialLinks = [
    { icon: '📘', name: 'Facebook', url: '#', color: '#3b82f6' },
    { icon: '🐦', name: 'Twitter', url: '#', color: '#1da1f2' },
    { icon: '📸', name: 'Instagram', url: '#', color: '#e4405f' },
    { icon: '🔗', name: 'LinkedIn', url: '#', color: '#0a66c2' }
  ]

  return (
    <section
      style={{
        background: backgroundColor,
        padding: compact ? '3rem 1rem' : '4rem 2rem',
        borderRadius: compact ? '1rem' : '2rem',
        margin: compact ? '1rem' : '2rem auto',
        maxWidth: compact ? '600px' : '800px',
        width: '100%',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
        {/* Icon */}
        <div
          style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            animation: 'float 3s ease-in-out infinite'
          }}
        >
          ✉️
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: compact ? '1.5rem' : '2rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #60a5fa, #c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}
        >
          {title}
        </h2>

        {/* Subtitle */}
        <p
          style={{
            color: '#9ca3af',
            fontSize: compact ? '0.875rem' : '1rem',
            marginBottom: '2rem',
            lineHeight: 1.6
          }}
        >
          {subtitle}
        </p>

        {/* Status Message */}
        {status !== 'idle' && (
          <div
            style={{
              marginBottom: '1rem',
              padding: '1rem',
              background: status === 'success' 
                ? 'rgba(16, 185, 129, 0.1)' 
                : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${status === 'success' ? '#10b981' : '#ef4444'}`,
              borderRadius: '0.5rem',
              color: status === 'success' ? '#10b981' : '#ef4444',
              fontSize: '0.875rem',
              animation: 'fadeIn 0.3s ease'
            }}
          >
            {message || (status === 'success' ? successMessage : errorMessage)}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}
          >
            <div style={{ flex: 1, position: 'relative' }}>
              <span
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af',
                  fontSize: '1.25rem'
                }}
              >
                ✉️
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status !== 'idle') {
                    setStatus('idle')
                    setMessage('')
                  }
                }}
                placeholder={placeholder}
                disabled={status === 'loading' || status === 'success'}
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: `2px solid ${
                    status === 'error' 
                      ? '#ef4444' 
                      : status === 'success'
                      ? '#10b981'
                      : 'rgba(255,255,255,0.2)'
                  }`,
                  borderRadius: '0.5rem',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s',
                  opacity: status === 'success' ? 0.7 : 1
                }}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              style={{
                padding: '1rem 2rem',
                background: status === 'success'
                  ? '#10b981'
                  : 'linear-gradient(135deg, #3b82f6, #a855f7)',
                border: 'none',
                borderRadius: '0.5rem',
                color: 'white',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: status === 'loading' || status === 'success' ? 'not-allowed' : 'pointer',
                opacity: status === 'loading' ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s',
                minWidth: isMobile ? '100%' : '120px'
              }}
              onMouseEnter={(e) => {
                if (status !== 'loading' && status !== 'success') {
                  e.currentTarget.style.transform = 'scale(1.05)'
                }
              }}
              onMouseLeave={(e) => {
                if (status !== 'loading' && status !== 'success') {
                  e.currentTarget.style.transform = 'scale(1)'
                }
              }}
            >
              {status === 'loading' ? (
                <>
                  <span
                    style={{
                      width: '1rem',
                      height: '1rem',
                      border: '2px solid white',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}
                  />
                  Subscribing...
                </>
              ) : status === 'success' ? (
                <>
                  <span>✓</span>
                  Subscribed!
                </>
              ) : (
                buttonText
              )}
            </button>
          </div>
        </form>

        {/* Privacy & Terms */}
        <p
          style={{
            color: '#9ca3af',
            fontSize: '0.75rem',
            marginBottom: showSocialLinks ? '2rem' : 0
          }}
        >
          By subscribing, you agree to our{' '}
          <Link
            href={privacyLink}
            style={{
              color: '#c084fc',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link
            href={termsLink}
            style={{
              color: '#c084fc',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            Terms of Service
          </Link>
          .
        </p>

        {/* Social Links */}
        {showSocialLinks && (
          <div>
            <p
              style={{
                color: '#9ca3af',
                fontSize: '0.875rem',
                marginBottom: '1rem'
              }}
            >
              Or follow us on social media
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1.5rem'
              }}
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = social.color
                    e.currentTarget.style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#9ca3af'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{social.icon}</span>
                  <span style={{ fontSize: '0.7rem' }}>{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Success Animation */}
        {status === 'success' && (
          <div
            style={{
              marginTop: '2rem',
              padding: '1rem',
              background: 'rgba(16, 185, 129, 0.1)',
              borderRadius: '0.5rem',
              border: '1px solid #10b981',
              animation: 'pulse 2s infinite'
            }}
          >
            <p style={{ color: '#10b981', fontSize: '0.875rem', margin: 0 }}>
              🎉 {successMessage}
            </p>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </section>
  )
}