'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type Product = {
  id: string
  name: string
  price: number
  description: string
  category: string
  subCategory: string
  stock: number
  image: string
  rating: number
  reviews: number
  featured: boolean
}

export default function CategoryPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState<string>('')
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([])
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

  // Get category from URL
  useEffect(() => {
    const path = window.location.pathname
    const categoryName = path.split('/').pop() || ''
    setCategory(decodeURIComponent(categoryName))
  }, [])

  // Load products
  useEffect(() => {
    if (!category) return

    setLoading(true)

    // Mock products data
    setTimeout(() => {
      const allProducts: Product[] = [
        // Electronics
        {
          id: '1',
          name: 'Quantum Processor X1',
          price: 999.99,
          description: 'Next-gen quantum processor with AI acceleration',
          category: 'Electronics',
          subCategory: 'Processors',
          stock: 50,
          image: '/n1.jpeg',
          rating: 4.5,
          reviews: 128,
          featured: true
        },
        {
          id: '3',
          name: 'Holographic Display 8K',
          price: 799.99,
          description: '8K holographic display with 3D capability',
          category: 'Electronics',
          subCategory: 'Displays',
          stock: 30,
          image: '/n3.jpeg',
          rating: 4.3,
          reviews: 89,
          featured: true
        },
        {
          id: '7',
          name: 'Quantum Router X2',
          price: 299.99,
          description: 'High-speed quantum router for home',
          category: 'Electronics',
          subCategory: 'Networking',
          stock: 75,
          image: '/n7.jpeg',
          rating: 4.2,
          reviews: 56,
          featured: false
        },
        
        // AI Products
        {
          id: '2',
          name: 'Neural Interface Pro',
          price: 1499.99,
          description: 'Advanced brain-computer interface',
          category: 'AI Products',
          subCategory: 'Interfaces',
          stock: 25,
          image: '/n2.jpeg',
          rating: 4.8,
          reviews: 95,
          featured: true
        },
        {
          id: '6',
          name: 'AI Assistant Hub',
          price: 449.99,
          description: 'Central AI hub for smart home',
          category: 'AI Products',
          subCategory: 'Hubs',
          stock: 75,
          image: '/n6.jpeg',
          rating: 4.4,
          reviews: 112,
          featured: false
        },
        {
          id: '9',
          name: 'Neural Headset',
          price: 899.99,
          description: 'Premium neural interface headset',
          category: 'AI Products',
          subCategory: 'Headsets',
          stock: 15,
          image: '/n9.jpeg',
          rating: 4.6,
          reviews: 67,
          featured: true
        },

        // Wearables
        {
          id: '5',
          name: 'Bio-Tech Smart Watch',
          price: 599.99,
          description: 'Health monitoring smart watch',
          category: 'Wearables',
          subCategory: 'Watches',
          stock: 100,
          image: '/n5.jpeg',
          rating: 4.5,
          reviews: 203,
          featured: true
        },
        {
          id: '8',
          name: 'Neural Headset',
          price: 899.99,
          description: 'Premium neural interface headset',
          category: 'Wearables',
          subCategory: 'Headsets',
          stock: 15,
          image: '/n8.jpeg',
          rating: 4.6,
          reviews: 67,
          featured: true
        },
        {
          id: '10',
          name: 'Smart Glasses AR',
          price: 1299.99,
          description: 'Augmented reality smart glasses',
          category: 'Wearables',
          subCategory: 'Glasses',
          stock: 20,
          image: '/n10.jpeg',
          rating: 4.4,
          reviews: 42,
          featured: false
        },

        // Security
        {
          id: '4',
          name: 'Quantum Security System',
          price: 2999.99,
          description: 'Unhackable quantum encryption',
          category: 'Security',
          subCategory: 'Systems',
          stock: 10,
          image: '/n4.jpeg',
          rating: 4.9,
          reviews: 45,
          featured: true
        },
        {
          id: '11',
          name: 'Biometric Lock Pro',
          price: 399.99,
          description: 'Advanced biometric door lock',
          category: 'Security',
          subCategory: 'Locks',
          stock: 60,
          image: '/n11.jpeg',
          rating: 4.3,
          reviews: 78,
          featured: false
        },
        {
          id: '12',
          name: 'Surveillance Drone',
          price: 899.99,
          description: 'AI-powered security drone',
          category: 'Security',
          subCategory: 'Drones',
          stock: 25,
          image: '/n12.jpeg',
          rating: 4.5,
          reviews: 34,
          featured: true
        }
      ]

      // Filter by category
      const categoryProducts = allProducts.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      )

      setProducts(categoryProducts)
      setFilteredProducts(categoryProducts)
      
      // Set max price based on products
      const maxPrice = Math.max(...categoryProducts.map(p => p.price))
      setPriceRange([0, maxPrice])
      
      setLoading(false)
    }, 1000)
  }, [category])

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...products]

    // Apply price filter
    filtered = filtered.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    // Apply subcategory filter
    if (selectedSubCategories.length > 0) {
      filtered = filtered.filter(p => 
        selectedSubCategories.includes(p.subCategory)
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return a.price - b.price
        case 'price_high':
          return b.price - a.price
        case 'name_asc':
          return a.name.localeCompare(b.name)
        case 'name_desc':
          return b.name.localeCompare(a.name)
        case 'rating':
          return b.rating - a.rating
        case 'featured':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      }
    })

    setFilteredProducts(filtered)
  }, [products, sortBy, priceRange, selectedSubCategories])

  // Get unique subcategories
  const subCategories = [...new Set(products.map(p => p.subCategory))]

  // Toggle subcategory
  const toggleSubCategory = (sub: string) => {
    setSelectedSubCategories(prev =>
      prev.includes(sub)
        ? prev.filter(s => s !== sub)
        : [...prev, sub]
    )
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  // Category icons
  const categoryIcons: { [key: string]: string } = {
    'Electronics': '💻',
    'AI Products': '🤖',
    'Wearables': '⌚',
    'Security': '🔒'
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
      {/* Header */}
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
          <Link href="/products" style={{
            color: '#9ca3af',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>←</span> All Categories
          </Link>
        </div>
      </div>

      {/* Category Hero */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(168,85,247,0.1))',
        padding: '3rem 2rem',
        textAlign: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
          {categoryIcons[category] || '📦'}
        </div>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #60a5fa, #c084fc)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          {category}
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '1.125rem' }}>
          {filteredProducts.length} products available
        </p>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Mobile Filter Toggle */}
        {isMobile && (
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              width: '100%',
              padding: '1rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '0.5rem',
              color: 'white',
              marginBottom: '1rem',
              cursor: 'pointer'
            }}
          >
            {showFilters ? 'Hide Filters ↑' : 'Show Filters ↓'}
          </button>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '280px 1fr',
          gap: '2rem'
        }}>
          {/* Filters Sidebar */}
          {(!isMobile || showFilters) && (
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: '1px solid rgba(255,255,255,0.1)',
              height: 'fit-content'
            }}>
              <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '1.5rem' }}>
                Filters
              </h3>

              {/* Price Range */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  Price Range
                </h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                    {formatCurrency(priceRange[0])}
                  </span>
                  <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                    {formatCurrency(priceRange[1])}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.max(...products.map(p => p.price))}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  style={{ width: '100%' }}
                />
              </div>

              {/* Subcategories */}
              {subCategories.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '1rem' }}>
                    Subcategories
                  </h4>
                  {subCategories.map(sub => (
                    <label
                      key={sub}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.5rem',
                        cursor: 'pointer'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSubCategories.includes(sub)}
                        onChange={() => toggleSubCategory(sub)}
                        style={{
                          width: '1rem',
                          height: '1rem',
                          accentColor: '#c084fc'
                        }}
                      />
                      <span style={{ color: '#d1d5db', fontSize: '0.875rem' }}>{sub}</span>
                      <span style={{ color: '#9ca3af', fontSize: '0.75rem', marginLeft: 'auto' }}>
                        ({products.filter(p => p.subCategory === sub).length})
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setPriceRange([0, Math.max(...products.map(p => p.price))])
                  setSelectedSubCategories([])
                  setSortBy('featured')
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  borderRadius: '0.5rem',
                  color: '#ef4444',
                  cursor: 'pointer'
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Products Grid */}
          <div>
            {/* Sort Bar */}
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: isMobile ? 'stretch' : 'center',
              gap: '1rem',
              marginBottom: '2rem',
              background: 'rgba(255,255,255,0.05)',
              padding: '1rem',
              borderRadius: '0.5rem'
            }}>
              <span style={{ color: '#9ca3af' }}>
                Showing {filteredProducts.length} of {products.length} products
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '0.5rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  cursor: 'pointer',
                  width: isMobile ? '100%' : 'auto'
                }}
              >
                <option value="featured">Featured</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="name_asc">Name: A to Z</option>
                <option value="name_desc">Name: Z to A</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '1rem',
                padding: '4rem 2rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
                <h3 style={{ color: 'white', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                  No products found
                </h3>
                <p style={{ color: '#9ca3af' }}>
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1.5rem'
              }}>
                {filteredProducts.map(product => (
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
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    }}>
                      {/* Product Image */}
                      <div style={{
                        background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                        borderRadius: '0.75rem',
                        aspectRatio: '1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem',
                        position: 'relative'
                      }}>
                        {product.featured && (
                          <span style={{
                            position: 'absolute',
                            top: '0.5rem',
                            right: '0.5rem',
                            background: '#f59e0b',
                            color: 'white',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '1rem',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                          }}>
                            Featured
                          </span>
                        )}
                        <span style={{ fontSize: '3rem', color: 'white' }}>🖼️</span>
                      </div>

                      {/* Product Info */}
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '0.5rem'
                        }}>
                          <h3 style={{
                            color: 'white',
                            fontWeight: '600',
                            fontSize: '1rem',
                            margin: 0
                          }}>
                            {product.name}
                          </h3>
                          <span style={{
                            color: '#c084fc',
                            fontWeight: '600'
                          }}>
                            {formatCurrency(product.price)}
                          </span>
                        </div>

                        <p style={{
                          color: '#9ca3af',
                          fontSize: '0.875rem',
                          marginBottom: '0.5rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {product.description}
                        </p>

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.5rem'
                        }}>
                          <div style={{ display: 'flex', gap: '0.25rem' }}>
                            {[1, 2, 3, 4, 5].map(star => (
                              <span key={star} style={{
                                color: star <= product.rating ? '#f59e0b' : '#4b5563',
                                fontSize: '0.875rem'
                              }}>
                                ★
                              </span>
                            ))}
                          </div>
                          <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                            ({product.reviews})
                          </span>
                        </div>

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <span style={{
                            padding: '0.25rem 0.5rem',
                            background: product.stock > 0 
                              ? 'rgba(16,185,129,0.1)'
                              : 'rgba(239,68,68,0.1)',
                            color: product.stock > 0 ? '#10b981' : '#ef4444',
                            borderRadius: '1rem',
                            fontSize: '0.75rem'
                          }}>
                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                          </span>
                          <span style={{
                            padding: '0.25rem 0.5rem',
                            background: 'rgba(168,85,247,0.1)',
                            color: '#c084fc',
                            borderRadius: '1rem',
                            fontSize: '0.75rem'
                          }}>
                            {product.subCategory}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

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