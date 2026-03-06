'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function AdminSidebar({ isOpen, onClose }: SidebarProps) {
  const [currentTime, setCurrentTime] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Update time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token')
    sessionStorage.clear()
    window.location.href = '/auth/login'
  }

  // Navigation items
  const navItems = [
    { name: 'Dashboard', icon: '📊', href: '/admin', active: false },
    { name: 'Orders', icon: '📦', href: '/admin/orders', active: false, badge: 3 },
    { name: 'Products', icon: '🛍️', href: '/admin/products', active: false },
    { name: 'Users', icon: '👥', href: '/admin/users', active: false },
    { name: 'Categories', icon: '📑', href: '/admin/categories', active: false },
    { name: 'Reviews', icon: '⭐', href: '/admin/reviews', active: false, badge: 5 },
    { name: 'Settings', icon: '⚙️', href: '/admin/settings', active: false },
  ]

  // Quick actions
  const quickActions = [
    { name: 'New Order', icon: '➕', action: () => window.location.href = '/admin/orders/new' },
    { name: 'Add Product', icon: '📝', action: () => window.location.href = '/admin/products/new' },
    { name: 'Add User', icon: '👤', action: () => window.location.href = '/admin/users/new' },
    { name: 'Export', icon: '📥', action: () => alert('Exporting data...') },
  ]

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 40
          }}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '280px',
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        transform: isOpen || !isMobile ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
        zIndex: 50,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Sidebar Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #f472b6, #a855f7, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            Kitechn Admin
          </div>
          <div style={{
            fontSize: '0.875rem',
            color: '#9ca3af',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>🕒</span>
            {currentTime}
          </div>
        </div>

        {/* Admin Info */}
        <div style={{
          padding: '1rem 1.5rem',
          background: 'rgba(168, 85, 247, 0.1)',
          margin: '1rem',
          borderRadius: '0.75rem',
          border: '1px solid rgba(168, 85, 247, 0.2)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}>
              HS
            </div>
            <div>
              <div style={{ color: 'white', fontWeight: '600', fontSize: '0.875rem' }}>Hafiz Sajid Syed</div>
              <div style={{ color: '#c084fc', fontSize: '0.75rem' }}>Super Admin</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '0 1rem', flex: 1 }}>
          {navItems.map((item, index) => {
            // Check if current path matches (client-side only)
            const isActive = typeof window !== 'undefined' && 
              window.location.pathname === item.href
            
            return (
              <Link
                key={index}
                href={item.href}
                onClick={isMobile ? onClose : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  marginBottom: '0.25rem',
                  borderRadius: '0.5rem',
                  color: isActive ? '#c084fc' : '#9ca3af',
                  background: isActive ? 'rgba(168, 85, 247, 0.1)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                    e.currentTarget.style.color = 'white'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#9ca3af'
                  }
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.name}</span>
                {item.badge && (
                  <span style={{
                    background: '#ef4444',
                    color: 'white',
                    fontSize: '0.625rem',
                    padding: '0.125rem 0.375rem',
                    borderRadius: '1rem',
                    minWidth: '1.25rem',
                    textAlign: 'center'
                  }}>
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Quick Actions */}
        <div style={{
          padding: '1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          marginTop: 'auto'
        }}>
          <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
            QUICK ACTIONS
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  action.action()
                  if (isMobile) onClose()
                }}
                style={{
                  padding: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.5rem',
                  color: '#d1d5db',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.25rem',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.3)'
                  e.currentTarget.style.color = '#c084fc'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.color = '#d1d5db'
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>{action.icon}</span>
                <span>{action.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* System Info */}
        <div style={{
          padding: '1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem',
            color: '#9ca3af',
            fontSize: '0.75rem'
          }}>
            <span>💻</span>
            <span>System Status</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#10b981',
            fontSize: '0.875rem'
          }}>
            <span>●</span>
            <span>All systems operational</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '0.25rem',
            color: '#9ca3af',
            fontSize: '0.75rem'
          }}>
            <span>📊</span>
            <span>v2.0.1 • 99.9% uptime</span>
          </div>
        </div>

        {/* Logout Button */}
        <div style={{ padding: '1rem' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '0.5rem',
              color: '#ef4444',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s',
              fontSize: '0.875rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'
            }}
          >
            <span>🚪</span>
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}