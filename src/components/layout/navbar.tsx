'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import MobileNav from './mobile-nav'

interface NavbarProps {
  logo?: string
  logoGradient?: string
  links?: Array<{
    name: string
    href: string
    icon?: string
  }>
  user?: {
    name: string
    email: string
    avatar?: string
    role?: string
  } | null
  onLogout?: () => void
  cartCount?: number
  showSearch?: boolean
  onSearch?: (query: string) => void
  sticky?: boolean
  transparent?: boolean
}

export default function Navbar({
  logo = 'Kitechn',
  logoGradient = 'linear-gradient(135deg, #f472b6, #a855f7)',
  links = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Products', href: '/products', icon: '🛍️' },
    { name: 'Categories', href: '/categories', icon: '📑' },
    { name: 'About', href: '/about', icon: 'ℹ️' },
    { name: 'Contact', href: '/contact', icon: '📞' }
  ],
  user = null,
  onLogout,
  cartCount = 0,
  showSearch = false,
  onSearch,
  sticky = true,
  transparent = false
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
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

  // Handle scroll effect
  useEffect(() => {
    if (!sticky) return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sticky])

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery)
      setSearchQuery('')
    }
  }

  // Get navbar styles
  const getNavbarStyle = () => {
    if (transparent && !isScrolled) {
      return {
        background: 'transparent',
        backdropFilter: 'none',
        boxShadow: 'none'
      }
    }
    return {
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }
  }

  return (
    <>
      <nav
        style={{
          position: sticky ? 'sticky' : 'relative',
          top: 0,
          zIndex: 100,
          width: '100%',
          padding: '0.75rem 2rem',
          transition: 'all 0.3s ease',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          ...getNavbarStyle()
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem'
          }}>
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  background: logoGradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.8'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'
                }}
              >
                {logo}
              </span>
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                flex: 1,
                justifyContent: 'center'
              }}>
                {links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    style={{
                      color: '#9ca3af',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      transition: 'color 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#c084fc'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#9ca3af'
                    }}
                  >
                    {link.icon && <span>{link.icon}</span>}
                    {link.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Right Section */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              {/* Search Bar (Desktop) */}
              {showSearch && !isMobile && (
                <form onSubmit={handleSearchSubmit}>
                  <div style={{
                    display: 'flex',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '2rem',
                    border: '1px solid rgba(255,255,255,0.1)',
                    overflow: 'hidden'
                  }}>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      style={{
                        padding: '0.5rem 1rem',
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        outline: 'none',
                        width: '200px',
                        fontSize: '0.875rem'
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        padding: '0.5rem 1rem',
                        background: 'none',
                        border: 'none',
                        color: '#9ca3af',
                        cursor: 'pointer'
                      }}
                    >
                      🔍
                    </button>
                  </div>
                </form>
              )}

              {/* Cart Icon */}
              <Link
                href="/cart"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1.25rem',
                  position: 'relative',
                  padding: '0.25rem'
                }}
              >
                🛒
                {cartCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-4px',
                      background: '#ef4444',
                      color: 'white',
                      fontSize: '0.625rem',
                      fontWeight: '600',
                      padding: '0.125rem 0.375rem',
                      borderRadius: '999px',
                      minWidth: '16px',
                      textAlign: 'center'
                    }}
                  >
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>

              {/* User Menu (Desktop) */}
              {!isMobile && (
                <>
                  {user ? (
                    <div style={{ position: 'relative' }}>
                      <button
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.25rem 0.5rem',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '2rem',
                          cursor: 'pointer'
                        }}
                      >
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '0.75rem'
                          }}
                        >
                          {user.avatar || user.name.charAt(0)}
                        </div>
                        <span style={{ color: 'white', fontSize: '0.875rem' }}>
                          {user.name.split(' ')[0]}
                        </span>
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link
                        href="/auth/login"
                        style={{
                          padding: '0.5rem 1rem',
                          background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                          borderRadius: '2rem',
                          color: 'white',
                          textDecoration: 'none',
                          fontSize: '0.875rem',
                          fontWeight: '600'
                        }}
                      >
                        Login
                      </Link>
                      <Link
                        href="/auth/register"
                        style={{
                          padding: '0.5rem 1rem',
                          background: 'transparent',
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '2rem',
                          color: 'white',
                          textDecoration: 'none',
                          fontSize: '0.875rem',
                          fontWeight: '600'
                        }}
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </>
              )}

              {/* Mobile Menu Button */}
              {isMobile && (
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.5rem',
                    padding: '0.5rem',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ☰
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        logo={logo}
        links={links}
        user={user || undefined}
        onLogout={onLogout}
        cartCount={cartCount}
        showSearch={showSearch}
        onSearch={onSearch}
      />
    </>
  )
}