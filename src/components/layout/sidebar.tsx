'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  position?: 'left' | 'right'
  width?: string
  title?: string
  logo?: string
  logoGradient?: string
  links?: Array<{
    name: string
    href: string
    icon?: string
    badge?: number
    active?: boolean
  }>
  user?: {
    name: string
    email: string
    avatar?: string
    role?: string
  } | null
  onLogout?: () => void
  footerLinks?: Array<{
    name: string
    href: string
    icon?: string
  }>
  showOverlay?: boolean
  closeOnClickOutside?: boolean
}

export default function Sidebar({
  isOpen,
  onClose,
  position = 'left',
  width = '280px',
  title = 'Menu',
  logo = 'Kitechn',
  logoGradient = 'linear-gradient(135deg, #f472b6, #a855f7)',
  links = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Orders', href: '/dashboard/orders', icon: '📦', badge: 3 },
    { name: 'Products', href: '/dashboard/products', icon: '🛍️' },
    { name: 'Customers', href: '/dashboard/customers', icon: '👥' },
    { name: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
    { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' }
  ],
  user = null,
  onLogout,
  footerLinks = [
    { name: 'Help', href: '/help', icon: '❓' },
    { name: 'Privacy', href: '/privacy', icon: '🔒' },
    { name: 'Terms', href: '/terms', icon: '📜' }
  ],
  showOverlay = true,
  closeOnClickOutside = true
}: SidebarProps) {
  const [animateIn, setAnimateIn] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle animation on open/close
  useEffect(() => {
    if (isOpen) {
      setAnimateIn(true)
      if (isMobile) {
        document.body.style.overflow = 'hidden'
      }
    } else {
      setAnimateIn(false)
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, isMobile])

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

  // Handle link click
  const handleLinkClick = () => {
    if (isMobile) {
      onClose()
    }
  }

  // Get transform style based on position
  const getTransformStyle = () => {
    if (!animateIn) {
      return position === 'left' ? 'translateX(-100%)' : 'translateX(100%)'
    }
    return 'translateX(0)'
  }

  if (!isOpen && !animateIn) return null

  return (
    <>
      {/* Overlay */}
      {showOverlay && (
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
          onClick={closeOnClickOutside ? onClose : undefined}
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          [position]: 0,
          bottom: 0,
          width: isMobile ? 'min(300px, 80vw)' : width,
          background: '#0f172a',
          borderRight: position === 'left' ? '1px solid rgba(255,255,255,0.1)' : 'none',
          borderLeft: position === 'right' ? '1px solid rgba(255,255,255,0.1)' : 'none',
          zIndex: 1001,
          transform: getTransformStyle(),
          transition: 'transform 0.3s ease',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 0 20px rgba(0,0,0,0.3)'
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
          {logo ? (
            <Link
              href="/"
              style={{ textDecoration: 'none' }}
              onClick={handleLinkClick}
            >
              <span
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  background: logoGradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {logo}
              </span>
            </Link>
          ) : (
            <h3 style={{ color: 'white', margin: 0, fontSize: '1.25rem' }}>{title}</h3>
          )}

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

        {/* User Info */}
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
                  <span
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
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav style={{ flex: 1, padding: '1rem' }}>
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
                  color: link.active ? '#c084fc' : '#9ca3af',
                  background: link.active ? 'rgba(168,85,247,0.1)' : 'transparent',
                  transition: 'all 0.2s',
                  marginBottom: '0.25rem',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  if (!link.active) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    e.currentTarget.style.color = 'white'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!link.active) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#9ca3af'
                  }
                }}
              >
                {link.icon && <span style={{ fontSize: '1.25rem' }}>{link.icon}</span>}
                <span style={{ fontSize: '0.875rem', flex: 1 }}>{link.name}</span>
                {link.badge && (
                  <span
                    style={{
                      background: '#ef4444',
                      color: 'white',
                      fontSize: '0.625rem',
                      padding: '0.125rem 0.375rem',
                      borderRadius: '1rem',
                      minWidth: '1.25rem',
                      textAlign: 'center'
                    }}
                  >
                    {link.badge}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </nav>

        {/* Footer Links */}
        <div
          style={{
            padding: '1rem',
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {footerLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                style={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  transition: 'background 0.2s'
                }}
                onClick={handleLinkClick}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#9ca3af'
                }}
              >
                {link.icon && <span>{link.icon}</span>}
                {link.name}
              </Link>
            ))}
          </div>

          {/* Logout Button */}
          {user && onLogout && (
            <button
              onClick={() => {
                onLogout()
                if (isMobile) onClose()
              }}
              style={{
                width: '100%',
                padding: '0.75rem',
                marginTop: '1rem',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '0.5rem',
                color: '#ef4444',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600',
                transition: 'background 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(239,68,68,0.1)'
              }}
            >
              <span>🚪</span>
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  )
}