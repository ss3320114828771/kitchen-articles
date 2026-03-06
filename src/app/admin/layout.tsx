'use client'

import { useState, useEffect } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifications, setNotifications] = useState(8)
  const [currentTime, setCurrentTime] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and resize
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
      position: 'relative'
    }}>
      {/* Star Field Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      {/* Bismillah - Small at top */}
      <div style={{
        position: 'relative',
        zIndex: 40,
        paddingTop: '0.5rem',
        textAlign: 'center'
      }}>
        <span style={{
          fontSize: '0.875rem',
          background: 'linear-gradient(135deg, #86efac, #60a5fa, #c084fc)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          opacity: 0.8
        }}>
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </span>
      </div>

      {/* Mobile Header - Only show on mobile */}
      {isMobile && (
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '0.5rem',
              padding: '0.5rem',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>☰</span>
          </button>

          {/* Logo */}
          <div style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #f472b6, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Admin Panel
          </div>

          {/* Notifications & Profile */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '1.25rem',
              cursor: 'pointer'
            }}>
              🔔
              {notifications > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: '#ef4444',
                  color: 'white',
                  fontSize: '0.625rem',
                  padding: '0.125rem 0.375rem',
                  borderRadius: '1rem',
                  minWidth: '1rem',
                  textAlign: 'center'
                }}>
                  {notifications}
                </span>
              )}
            </button>
            <div style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}>
              A
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && isMobile && (
        <div
          onClick={() => setSidebarOpen(false)}
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
        background: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        transform: sidebarOpen || !isMobile ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
        zIndex: 50,
        overflowY: 'auto'
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
              fontWeight: 'bold'
            }}>
              HS
            </div>
            <div>
              <div style={{ color: 'white', fontWeight: '600' }}>Hafiz Sajid Syed</div>
              <div style={{ color: '#c084fc', fontSize: '0.75rem' }}>Super Admin</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '1rem' }}>
          {navItems.map((item, index) => {
            // Check if current path matches
            const isActive = typeof window !== 'undefined' && 
              window.location.pathname === item.href
            
            return (
              <a
                key={index}
                href={item.href}
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
                    borderRadius: '1rem'
                  }}>
                    {item.badge}
                  </span>
                )}
              </a>
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
                onClick={action.action}
                style={{
                  padding: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.5rem',
                  color: '#d1d5db',
                  fontSize: '0.875rem',
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
              transition: 'all 0.3s'
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

      {/* Main Content */}
      <main style={{
        position: 'relative',
        zIndex: 20,
        minHeight: '100vh',
        marginLeft: isMobile ? 0 : '280px'
      }}>
        {/* Desktop Header - Only show on desktop */}
        {!isMobile && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 2rem',
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {/* Page Title - Dynamic */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#9ca3af' }}>Pages /</span>
              <span style={{ color: 'white', fontWeight: '500' }}>
                {typeof window !== 'undefined' && window.location.pathname === '/admin' && 'Dashboard'}
                {typeof window !== 'undefined' && window.location.pathname.includes('/orders') && 'Orders'}
                {typeof window !== 'undefined' && window.location.pathname.includes('/products') && 'Products'}
                {typeof window !== 'undefined' && window.location.pathname.includes('/users') && 'Users'}
                {typeof window !== 'undefined' && window.location.pathname.includes('/categories') && 'Categories'}
                {typeof window !== 'undefined' && window.location.pathname.includes('/reviews') && 'Reviews'}
                {typeof window !== 'undefined' && window.location.pathname.includes('/settings') && 'Settings'}
              </span>
            </div>

            {/* Right Section */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {/* Search */}
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af',
                  fontSize: '0.875rem'
                }}>
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Quick search..."
                  style={{
                    padding: '0.5rem 1rem 0.5rem 2.25rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.5rem',
                    color: 'white',
                    width: '200px',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Notifications */}
              <button style={{
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '0.5rem',
                padding: '0.5rem 1rem',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>🔔</span>
                <span>Notifications</span>
                {notifications > 0 && (
                  <span style={{
                    background: '#ef4444',
                    color: 'white',
                    fontSize: '0.625rem',
                    padding: '0.125rem 0.375rem',
                    borderRadius: '1rem'
                  }}>
                    {notifications}
                  </span>
                )}
              </button>
              
              {/* User Menu */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '0.5rem',
                cursor: 'pointer'
              }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  HS
                </div>
                <div>
                  <div style={{ color: 'white', fontSize: '0.875rem', fontWeight: '500' }}>
                    Hafiz Sajid
                  </div>
                  <div style={{ color: '#c084fc', fontSize: '0.75rem' }}>Super Admin</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Page Content */}
        <div style={{
          padding: '1.5rem'
        }}>
          {children}
        </div>
      </main>

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

        @media (max-width: 768px) {
          .stars { animation-duration: 30s; }
          .stars2 { animation-duration: 60s; }
          .stars3 { animation-duration: 90s; }
        }
      `}</style>
    </div>
  )
}