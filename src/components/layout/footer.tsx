'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FooterProps {
  logo?: string
  companyName?: string
  description?: string
  email?: string
  phone?: string
  address?: string
  showNewsletter?: boolean
  onNewsletterSubmit?: (email: string) => void
  socialLinks?: Array<{
    icon: string
    name: string
    url: string
    color?: string
  }>
  navigation?: {
    title: string
    links: Array<{ name: string; href: string }>
  }[]
  copyright?: string
  showAdminInfo?: boolean
  adminName?: string
  adminEmail?: string
}

export default function Footer({
  logo = 'Kitechn',
  companyName = 'Kitechn',
  description = 'Pioneering the future of technology with innovation and integrity.',
  email = 'info@kitechn.com',
  phone = '+92 300 1234567',
  address = '123 Tech Street, Innovation City, Pakistan',
  showNewsletter = true,
  onNewsletterSubmit,
  socialLinks = [
    { icon: '📘', name: 'Facebook', url: '#', color: '#3b82f6' },
    { icon: '🐦', name: 'Twitter', url: '#', color: '#1da1f2' },
    { icon: '📸', name: 'Instagram', url: '#', color: '#e4405f' },
    { icon: '🔗', name: 'LinkedIn', url: '#', color: '#0a66c2' },
    { icon: '📱', name: 'WhatsApp', url: '#', color: '#25d366' },
    { icon: '▶️', name: 'YouTube', url: '#', color: '#ff0000' }
  ],
  navigation = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Blog', href: '/blog' }
      ]
    },
    {
      title: 'Categories',
      links: [
        { name: 'Electronics', href: '/products/categories/Electronics' },
        { name: 'AI Products', href: '/products/categories/AI Products' },
        { name: 'Wearables', href: '/products/categories/Wearables' },
        { name: 'Security', href: '/products/categories/Security' },
        { name: 'Accessories', href: '/products/categories/Accessories' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'FAQs', href: '/faq' },
        { name: 'Shipping', href: '/shipping' },
        { name: 'Returns', href: '/returns' },
        { name: 'Track Order', href: '/track-order' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'GDPR', href: '/gdpr' },
        { name: 'Disclaimer', href: '/disclaimer' }
      ]
    }
  ],
  copyright = '© 2024 Kitechn. All rights reserved.',
  showAdminInfo = true,
  adminName = 'Hafiz Sajid Syed',
  adminEmail = 'hafizsajidsyed@gmail.com'
}: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
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

  // Handle newsletter submit
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterStatus('error')
      return
    }

    setNewsletterStatus('loading')

    try {
      if (onNewsletterSubmit) {
        await onNewsletterSubmit(newsletterEmail)
      } else {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      
      setNewsletterStatus('success')
      setNewsletterEmail('')
      
      setTimeout(() => {
        setNewsletterStatus('idle')
      }, 3000)
    } catch (error) {
      setNewsletterStatus('error')
    }
  }

  return (
    <footer
      style={{
        background: '#0a0f1a',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: isMobile ? '2rem 1rem' : '3rem 2rem',
        color: '#9ca3af'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Main Footer Content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '2fr repeat(4, 1fr)',
            gap: isMobile ? '2rem' : '3rem',
            marginBottom: '3rem'
          }}
        >
          {/* Company Info */}
          <div>
            {/* Logo */}
            <Link
              href="/"
              style={{
                textDecoration: 'none',
                display: 'inline-block',
                marginBottom: '1rem'
              }}
            >
              <span
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #f472b6, #a855f7, #3b82f6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {logo}
              </span>
            </Link>

            {/* Description */}
            <p
              style={{
                fontSize: '0.875rem',
                lineHeight: 1.6,
                marginBottom: '1.5rem',
                color: '#9ca3af'
              }}
            >
              {description}
            </p>

            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.1rem' }}>✉️</span>
                <a
                  href={`mailto:${email}`}
                  style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#c084fc'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#9ca3af'
                  }}
                >
                  {email}
                </a>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.1rem' }}>📞</span>
                <a
                  href={`tel:${phone}`}
                  style={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#c084fc'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#9ca3af'
                  }}
                >
                  {phone}
                </a>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.1rem' }}>📍</span>
                <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>{address}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          {navigation.map((section, index) => (
            <div key={index}>
              <h4
                style={{
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '1rem'
                }}
              >
                {section.title}
              </h4>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      style={{
                        color: '#9ca3af',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        transition: 'color 0.2s, transform 0.2s',
                        display: 'inline-block'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#c084fc'
                        e.currentTarget.style.transform = 'translateX(4px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#9ca3af'
                        e.currentTarget.style.transform = 'translateX(0)'
                      }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        {showNewsletter && (
          <div
            style={{
              marginBottom: '3rem',
              padding: '2rem',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '1rem',
              border: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
              }}
            >
              <div>
                <h4
                  style={{
                    color: 'white',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '0.25rem'
                  }}
                >
                  Subscribe to Our Newsletter
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                  Get the latest updates on new products and offers
                </p>
              </div>

              <form
                onSubmit={handleNewsletterSubmit}
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  width: isMobile ? '100%' : 'auto'
                }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  style={{
                    padding: '0.75rem 1rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.5rem',
                    color: 'white',
                    outline: 'none',
                    width: isMobile ? '100%' : '250px'
                  }}
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading' || newsletterStatus === 'success'}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: newsletterStatus === 'success'
                      ? '#10b981'
                      : 'linear-gradient(135deg, #3b82f6, #a855f7)',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: 'white',
                    fontWeight: '600',
                    cursor: newsletterStatus === 'loading' ? 'wait' : 'pointer',
                    opacity: newsletterStatus === 'loading' ? 0.7 : 1,
                    transition: 'transform 0.2s',
                    minWidth: '100px'
                  }}
                >
                  {newsletterStatus === 'loading' ? '...' :
                   newsletterStatus === 'success' ? '✓' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Social Links */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
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
                e.currentTarget.style.color = social.color || '#c084fc'
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

        {/* Admin Info */}
        {showAdminInfo && (
          <div
            style={{
              marginBottom: '2rem',
              padding: '1rem',
              background: 'rgba(168,85,247,0.05)',
              borderRadius: '0.5rem',
              textAlign: 'center',
              border: '1px solid rgba(168,85,247,0.2)'
            }}
          >
            <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
              👑 Administrator:{' '}
              <span style={{ color: '#c084fc', fontWeight: '600' }}>{adminName}</span>
              {' | '}
              📧{' '}
              <a
                href={`mailto:${adminEmail}`}
                style={{
                  color: '#c084fc',
                  textDecoration: 'none'
                }}
              >
                {adminEmail}
              </a>
            </p>
          </div>
        )}

        {/* Copyright */}
        <div
          style={{
            textAlign: 'center',
            fontSize: '0.875rem',
            color: '#6b7280',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '2rem'
          }}
        >
          <p>{copyright}</p>
          <p style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
            Made with ❤️ in Pakistan
          </p>
        </div>
      </div>
    </footer>
  )
}