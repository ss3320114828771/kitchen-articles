'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [greeting, setGreeting] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // ✅ FIXED: Removed the comma inside the string
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Set greeting based on time
  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 18) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')
    
    setLoading(false)
  }, [])

  // Featured products
  const featuredProducts = [
    { id: 1, name: 'Quantum Processor X1', price: 999.99, image: '🖥️', category: 'Electronics' },
    { id: 2, name: 'Neural Interface Pro', price: 1499.99, image: '🧠', category: 'AI Products' },
    { id: 3, name: 'Holographic Display', price: 799.99, image: '📺', category: 'Electronics' },
    { id: 4, name: 'AI Assistant Hub', price: 449.99, image: '🤖', category: 'AI Products' },
  ]

  // Categories
  const categories = [
    { name: 'Electronics', icon: '💻', count: 24, color: '#3b82f6' },
    { name: 'AI Products', icon: '🤖', count: 18, color: '#a855f7' },
    { name: 'Wearables', icon: '⌚', count: 12, color: '#10b981' },
    { name: 'Security', icon: '🔒', count: 8, color: '#ef4444' },
  ]

  // Benefits
  const benefits = [
    { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $100' },
    { icon: '🔒', title: 'Secure Payment', desc: '100% secure transactions' },
    { icon: '↩️', title: '30-Day Returns', desc: 'Easy return policy' },
    { icon: '💬', title: '24/7 Support', desc: 'Dedicated customer service' },
  ]

  // Testimonials
  const testimonials = [
    { name: 'Ali Ahmed', role: 'Tech Enthusiast', text: 'Best quantum processor I have ever used!', rating: 5 },
    { name: 'Fatima Khan', role: 'Developer', text: 'The AI interface is revolutionary.', rating: 5 },
    { name: 'Omar Hassan', role: 'Business Owner', text: 'Great products and excellent support.', rating: 4 },
  ]

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  if (loading) {
    return (
      <main style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a, #1e1b4b)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '3px solid rgba(255,255,255,0.1)',
          borderTopColor: '#c084fc',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </main>
    )
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a, #1e1b4b)'
    }}>
      {/* Header/Navbar */}
      <div style={{
        background: 'rgba(15,23,42,0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #f472b6, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Kitechn
            </span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav style={{ display: 'flex', gap: '2rem' }}>
              <Link href="/" style={{ color: '#c084fc', textDecoration: 'none' }}>Home</Link>
              <Link href="/products" style={{ color: '#9ca3af', textDecoration: 'none' }}>Products</Link>
              <Link href="/about" style={{ color: '#9ca3af', textDecoration: 'none' }}>About</Link>
              <Link href="/contact" style={{ color: '#9ca3af', textDecoration: 'none' }}>Contact</Link>
            </nav>
          )}

          {/* Right Section */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link href="/cart" style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '1.25rem',
              position: 'relative'
            }}>
              🛒
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-10px',
                background: '#ef4444',
                color: 'white',
                fontSize: '0.625rem',
                padding: '0.125rem 0.375rem',
                borderRadius: '1rem'
              }}>3</span>
            </Link>
            <Link href="/auth/login" style={{
              padding: '0.5rem 1rem',
              background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
              borderRadius: '0.5rem',
              color: 'white',
              textDecoration: 'none',
              fontSize: '0.875rem'
            }}>
              Login
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobile && (
          <nav style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '0.5rem 0',
            marginTop: '0.5rem',
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}>
            <Link href="/" style={{ color: '#c084fc', textDecoration: 'none' }}>Home</Link>
            <Link href="/products" style={{ color: '#9ca3af', textDecoration: 'none' }}>Products</Link>
            <Link href="/about" style={{ color: '#9ca3af', textDecoration: 'none' }}>About</Link>
            <Link href="/contact" style={{ color: '#9ca3af', textDecoration: 'none' }}>Contact</Link>
          </nav>
        )}
      </div>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(168,85,247,0.1))',
        padding: isMobile ? '3rem 1rem' : '5rem 2rem',
        textAlign: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h1 style={{
          fontSize: isMobile ? '2rem' : '3.5rem',
          fontWeight: 'bold',
          marginBottom: '1rem'
        }}>
          <span style={{ color: 'white' }}>Welcome to </span>
          <span style={{
            background: 'linear-gradient(135deg, #60a5fa, #c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Kitechn
          </span>
        </h1>
        <p style={{ color: '#9ca3af', fontSize: isMobile ? '1rem' : '1.25rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Discover the future of technology with our cutting-edge products.
          {greeting}, and welcome to the revolution!
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/products" style={{
            padding: '0.75rem 2rem',
            background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
            borderRadius: '2rem',
            color: 'white',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Shop Now
          </Link>
          <Link href="/about" style={{
            padding: '0.75rem 2rem',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '2rem',
            color: 'white',
            textDecoration: 'none',
            fontWeight: '600',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            Learn More
          </Link>
        </div>
      </div>

      {/* Benefits Section */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? '150px' : '200px'}, 1fr))`,
          gap: '2rem'
        }}>
          {benefits.map((benefit, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{benefit.icon}</div>
              <h3 style={{ color: 'white', fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {benefit.title}
              </h3>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '600' }}>Featured Products</h2>
          <Link href="/products" style={{ color: '#c084fc', textDecoration: 'none' }}>View All →</Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? '150px' : '250px'}, 1fr))`,
          gap: '1.5rem'
        }}>
          {featuredProducts.map(product => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '1rem',
                padding: '1rem',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'transform 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                  borderRadius: '0.75rem',
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  fontSize: '3rem'
                }}>
                  {product.image}
                </div>
                <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '0.25rem' }}>{product.name}</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{product.category}</p>
                <span style={{ color: '#c084fc', fontWeight: '600' }}>{formatCurrency(product.price)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        padding: '4rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '600', textAlign: 'center', marginBottom: '2rem' }}>
            Shop by Category
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? '150px' : '200px'}, 1fr))`,
            gap: '1.5rem'
          }}>
            {categories.map((cat, index) => (
              <Link
                key={index}
                href={`/products/categories/${cat.name}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'transform 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                  e.currentTarget.style.background = `rgba(${parseInt(cat.color.slice(1,3), 16)}, ${parseInt(cat.color.slice(3,5), 16)}, ${parseInt(cat.color.slice(5,7), 16)}, 0.1)`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{cat.icon}</div>
                  <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '0.25rem' }}>{cat.name}</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{cat.count} products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '600', textAlign: 'center', marginBottom: '2rem' }}>
          What Our Customers Say
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? '250px' : '300px'}, 1fr))`,
          gap: '2rem'
        }}>
          {testimonials.map((testimonial, index) => (
            <div key={index} style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} style={{
                    color: star <= testimonial.rating ? '#f59e0b' : '#4b5563',
                    fontSize: '1rem'
                  }}>★</span>
                ))}
              </div>
              <p style={{ color: '#d1d5db', marginBottom: '1rem', fontStyle: 'italic' }}>"{testimonial.text}"</p>
              <div>
                <p style={{ color: 'white', fontWeight: '600' }}>{testimonial.name}</p>
                <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(168,85,247,0.1))',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
            Stay Updated
          </h2>
          <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
            Subscribe to get updates on new products and special offers
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexDirection: isMobile ? 'column' : 'row' }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '0.5rem',
                color: 'white',
                outline: 'none'
              }}
            />
            <button style={{
              padding: '0.75rem 2rem',
              background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
              border: 'none',
              borderRadius: '0.5rem',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: '#0a0f1a',
        padding: '3rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? '150px' : '200px'}, 1fr))`,
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div>
              <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '1rem' }}>Kitechn</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                Pioneering the future of technology with innovation and integrity.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '1rem' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}><Link href="/about" style={{ color: '#9ca3af', textDecoration: 'none' }}>About</Link></li>
                <li style={{ marginBottom: '0.5rem' }}><Link href="/products" style={{ color: '#9ca3af', textDecoration: 'none' }}>Products</Link></li>
                <li style={{ marginBottom: '0.5rem' }}><Link href="/contact" style={{ color: '#9ca3af', textDecoration: 'none' }}>Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '1rem' }}>Support</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}><Link href="/faq" style={{ color: '#9ca3af', textDecoration: 'none' }}>FAQ</Link></li>
                <li style={{ marginBottom: '0.5rem' }}><Link href="/shipping" style={{ color: '#9ca3af', textDecoration: 'none' }}>Shipping</Link></li>
                <li style={{ marginBottom: '0.5rem' }}><Link href="/returns" style={{ color: '#9ca3af', textDecoration: 'none' }}>Returns</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '1rem' }}>Contact</h4>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>123 Tech Street</p>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Innovation City</p>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>info@kitechn.com</p>
            </div>
          </div>
          
          {/* Admin Info */}
          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '0.5rem',
            textAlign: 'center'
          }}>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
              Administrator: <span style={{ color: '#c084fc', fontWeight: '600' }}>Hafiz Sajid Syed</span> | 
              Email: <span style={{ color: '#c084fc' }}>hafizsajidsyed@gmail.com</span>
            </p>
          </div>

          {/* Copyright */}
          <div style={{
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center',
            color: '#6b7280',
            fontSize: '0.875rem'
          }}>
            © 2024 Kitechn. All rights reserved.
          </div>
        </div>
      </footer>

      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  )
}