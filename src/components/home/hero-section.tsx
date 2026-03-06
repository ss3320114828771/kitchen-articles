'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface HeroSectionProps {
  title?: string
  subtitle?: string
  description?: string
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  backgroundImage?: string
  overlay?: boolean
  alignment?: 'left' | 'center' | 'right'
  height?: 'small' | 'medium' | 'large' | 'full'
  showSearch?: boolean
  onSearch?: (query: string) => void
  stats?: Array<{
    label: string
    value: string
    icon?: string
  }>
  animated?: boolean
}

export default function HeroSection({
  title = 'Welcome to Kitechn',
  subtitle = 'The Future of Technology',
  description = 'Discover cutting-edge products that transform the way you live and work.',
  primaryButtonText = 'Shop Now',
  primaryButtonLink = '/products',
  secondaryButtonText = 'Learn More',
  secondaryButtonLink = '/about',
  backgroundImage,
  overlay = true,
  alignment = 'center',
  height = 'large',
  showSearch = false,
  onSearch,
  stats = [
    { label: 'Products', value: '1000+', icon: '🛍️' },
    { label: 'Customers', value: '50K+', icon: '👥' },
    { label: 'Countries', value: '30+', icon: '🌍' }
  ],
  animated = true
}: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [currentWord, setCurrentWord] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Rotating words for animation
  const rotatingWords = ['Innovation', 'Quality', 'Performance', 'Future']

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Animation effect
  useEffect(() => {
    setIsVisible(true)
    
    if (animated) {
      const interval = setInterval(() => {
        setCurrentWord((prev) => (prev + 1) % rotatingWords.length)
      }, 3000)
      
      return () => clearInterval(interval)
    }
  }, [animated])

  // Get height style
  const getHeightStyle = () => {
    switch (height) {
      case 'small': return '400px'
      case 'medium': return '500px'
      case 'large': return '600px'
      case 'full': return '100vh'
      default: return '600px'
    }
  }

  // Get alignment style
  const getAlignmentStyle = () => {
    switch (alignment) {
      case 'left': return 'flex-start'
      case 'right': return 'flex-end'
      case 'center':
      default: return 'center'
    }
  }

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery)
    }
  }

  return (
    <section
      style={{
        position: 'relative',
        height: getHeightStyle(),
        minHeight: '400px',
        width: '100%',
        overflow: 'hidden',
        background: backgroundImage 
          ? `url(${backgroundImage})`
          : 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: getAlignmentStyle(),
        color: 'white',
        textAlign: alignment
      }}
    >
      {/* Overlay */}
      {overlay && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)',
            zIndex: 1
          }}
        />
      )}

      {/* Animated background particles */}
      {animated && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          zIndex: 0
        }}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                background: 'rgba(255,255,255,0.3)',
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                opacity: Math.random() * 0.5 + 0.3
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '800px',
          padding: isMobile ? '2rem' : '3rem',
          margin: alignment === 'center' ? '0 auto' : 
                 alignment === 'left' ? '0 auto 0 2rem' : '0 2rem 0 auto',
          width: '100%',
          animation: isVisible ? 'fadeInUp 1s ease' : 'none'
        }}
      >
        {/* Subtitle */}
        {subtitle && (
          <p
            style={{
              color: '#c084fc',
              fontSize: isMobile ? '0.875rem' : '1rem',
              fontWeight: '600',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              animation: isVisible ? 'fadeInUp 1s ease 0.2s both' : 'none'
            }}
          >
            {subtitle}
          </p>
        )}

        {/* Title with rotating words */}
        <h1
          style={{
            fontSize: isMobile ? '2rem' : '3.5rem',
            fontWeight: 'bold',
            lineHeight: 1.2,
            marginBottom: '1.5rem'
          }}
        >
          {title.split(' ').map((word, index, array) => {
            if (word === 'Technology' && animated) {
              return (
                <span key={index}>
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #60a5fa, #c084fc)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'inline-block',
                      minWidth: '200px'
                    }}
                  >
                    {rotatingWords[currentWord]}
                  </span>
                  {index < array.length - 1 ? ' ' : ''}
                </span>
              )
            }
            return (
              <span key={index}>
                <span style={{ color: 'white' }}>{word}</span>
                {index < array.length - 1 ? ' ' : ''}
              </span>
            )
          })}
        </h1>

        {/* Description */}
        {description && (
          <p
            style={{
              color: '#d1d5db',
              fontSize: isMobile ? '1rem' : '1.125rem',
              lineHeight: 1.6,
              marginBottom: '2rem',
              maxWidth: '600px',
              marginLeft: alignment === 'center' ? 'auto' : '0',
              marginRight: alignment === 'center' ? 'auto' : '0',
              animation: isVisible ? 'fadeInUp 1s ease 0.4s both' : 'none'
            }}
          >
            {description}
          </p>
        )}

        {/* Search Bar */}
        {showSearch && (
          <form
            onSubmit={handleSearchSubmit}
            style={{
              marginBottom: '2rem',
              animation: isVisible ? 'fadeInUp 1s ease 0.6s both' : 'none'
            }}
          >
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              maxWidth: '500px',
              margin: alignment === 'center' ? '0 auto' : '0'
            }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                style={{
                  flex: 1,
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  backdropFilter: 'blur(10px)'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                Search
              </button>
            </div>
          </form>
        )}

        {/* Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: alignment === 'center' ? 'center' : 
                           alignment === 'left' ? 'flex-start' : 'flex-end',
            flexWrap: 'wrap',
            marginBottom: stats ? '3rem' : 0,
            animation: isVisible ? 'fadeInUp 1s ease 0.8s both' : 'none'
          }}
        >
          <Link
            href={primaryButtonLink}
            style={{
              padding: isMobile ? '0.75rem 1.5rem' : '1rem 2rem',
              background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
              borderRadius: '2rem',
              color: 'white',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: isMobile ? '0.875rem' : '1rem',
              transition: 'all 0.3s',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(59,130,246,0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {primaryButtonText}
            <span style={{ fontSize: '1.25rem' }}>→</span>
          </Link>

          <Link
            href={secondaryButtonLink}
            style={{
              padding: isMobile ? '0.75rem 1.5rem' : '1rem 2rem',
              background: 'transparent',
              borderRadius: '2rem',
              color: 'white',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: isMobile ? '0.875rem' : '1rem',
              transition: 'all 0.3s',
              border: '2px solid rgba(255,255,255,0.2)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
            }}
          >
            {secondaryButtonText}
          </Link>
        </div>

        {/* Stats */}
        {stats && (
          <div
            style={{
              display: 'flex',
              gap: isMobile ? '1rem' : '2rem',
              justifyContent: alignment === 'center' ? 'center' : 
                             alignment === 'left' ? 'flex-start' : 'flex-end',
              flexWrap: 'wrap',
              marginTop: '2rem',
              animation: isVisible ? 'fadeInUp 1s ease 1s both' : 'none'
            }}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '2rem',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                {stat.icon && <span style={{ fontSize: '1.25rem' }}>{stat.icon}</span>}
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      {height === 'full' && (
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            animation: 'bounce 2s infinite'
          }}
        >
          <div
            style={{
              width: '30px',
              height: '50px',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '15px',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: '4px',
                height: '10px',
                background: 'white',
                borderRadius: '2px',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                top: '8px',
                animation: 'scroll 2s infinite'
              }}
            />
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-10px);
          }
        }

        @keyframes scroll {
          0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
        }
      `}</style>
    </section>
  )
}