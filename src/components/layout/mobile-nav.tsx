'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  logo?: string
  links?: Array<{
    name: string
    href: string
    icon?: string
  }>
  authLinks?: {
    login: { href: string; text: string }
    register: { href: string; text: string }
  }
  user?: {
    name: string
    email: string
    avatar?: string
    role?: string
  }
  onLogout?: () => void
  cartCount?: number
  showSearch?: boolean
  onSearch?: (query: string) => void
}

export default function MobileNav({
  isOpen,
  onClose,
  logo = 'Kitechn',
  links = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Products', href: '/products', icon: '🛍️' },
    { name: 'Categories', href: '/categories', icon: '📑' },
    { name: 'About', href: '/about', icon: 'ℹ️' },
    { name: 'Contact', href: '/contact', icon: '📞' },
    { name: 'Blog', href: '/blog', icon: '📝' }
  ],
  authLinks = {
    login: { href: '/auth/login', text: 'Login' },
    register: { href: '/auth/register', text: 'Register' }
  },
  user,
  onLogout,
  cartCount = 0,
  showSearch = true,
  onSearch
}: MobileNavProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [animateIn, setAnimateIn] = useState(false)

  // Handle animation on open/close
  useEffect(() => {
    if (isOpen) {
      setAnimateIn(true)
      document.body.style.overflow = 'hidden'
    } else {
      setAnimateIn(false)
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery)
      onClose()
    }
  }

  // Handle link click
  const handleLinkClick = () => {
    onClose()
  }

  // Handle logout
  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
    onClose()
  }

  if (!isOpen && !animateIn) return null

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
          opacity: animateIn ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: animateIn ? 'auto' : 'none'
        }}
        onClick={onClose}
      />

      {/* Mobile Menu */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(300px, 80vw)',
          background: '#0f172a',
          borderLeft: '1px solid rgba(255,255,255,0.1)',
          zIndex: 1001,
          transform: animateIn ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Link
            href="/"
            style={{ textDecoration: 'none' }}
            onClick={handleLinkClick}
          >
            <span
              style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #f472b6, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {logo}
            </span>
          </Link>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none'
            }}
          >
            ✕
          </button>
        </div>

        {/* User Info (if logged in) */}
        {user && (
          <div
            style={{
              padding: '1rem',
              background: 'rgba(168,85,247,0.1)',
              margin: '1rem',
              borderRadius: '0.75rem',
              border: '1px solid rgba(168,85,247,0.2)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}
              >
                {user.avatar || user.name.charAt(0)}
              </div>
              <div>
                <div style={{ color: 'white', fontWeight: '600', fontSize: '0.875rem' }}>
                  {user.name}
                </div>
                <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                  {user.email}
                </div>
                {user.role && (
                  <div
                    style={{
                      display: 'inline-block',
                      padding: '0.125rem 0.5rem',
                      background: 'rgba(168,85,247,0.2)',
                      borderRadius: '1rem',
                      color: '#c084fc',
                      fontSize: '0.625rem',
                      marginTop: '0.25rem'
                    }}
                  >
                    {user.role}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        {showSearch && (
          <div style={{ padding: '0 1rem 1rem' }}>
            <form onSubmit={handleSearchSubmit}>
              <div
                style={{
                  display: 'flex',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '2rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  overflow: 'hidden'
                }}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    outline: 'none',
                    fontSize: '0.875rem'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '0.75rem 1rem',
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    fontSize: '1.1rem'
                  }}
                >
                  🔍
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Cart Info */}
        {cartCount > 0 && (
          <Link
            href="/cart"
            style={{ textDecoration: 'none' }}
            onClick={handleLinkClick}
          >
            <div
              style={{
                margin: '0 1rem 1rem',
                padding: '0.75rem',
                background: 'rgba(59,130,246,0.1)',
                borderRadius: '0.5rem',
                border: '1px solid rgba(59,130,246,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>🛒</span>
              <span style={{ color: 'white', fontSize: '0.875rem' }}>
                {cartCount} {cartCount === 1 ? 'item' : 'items'} in cart
              </span>
            </div>
          </Link>
        )}

        {/* Navigation Links */}
        <nav style={{ flex: 1, padding: '0 1rem' }}>
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              style={{ textDecoration: 'none' }}
              onClick={handleLinkClick}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  color: '#9ca3af',
                  transition: 'all 0.2s',
                  marginBottom: '0.25rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#9ca3af'
                }}
              >
                {link.icon && <span style={{ fontSize: '1.25rem' }}>{link.icon}</span>}
                <span style={{ fontSize: '0.875rem' }}>{link.name}</span>
              </div>
            </Link>
          ))}
        </nav>

        {/* Auth Section */}
        <div
          style={{
            padding: '1rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            marginTop: 'auto'
          }}
        >
          {user ? (
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '0.5rem',
                color: '#ef4444',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.1)'
              }}
            >
              Logout
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link
                href={authLinks.login.href}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  textDecoration: 'none',
                  textAlign: 'center',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}
                onClick={handleLinkClick}
              >
                {authLinks.login.text}
              </Link>
              <Link
                href={authLinks.register.href}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  textDecoration: 'none',
                  textAlign: 'center',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}
                onClick={handleLinkClick}
              >
                {authLinks.register.text}
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}