'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ProductDetailsProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  features: string[]
  specifications: { [key: string]: string }
  images: string[]
  category: string
  tags: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  stockQuantity?: number
  sku?: string
  brand?: string
  warranty?: string
  onAddToCart: (id: string, quantity: number) => void
  onBuyNow: (id: string, quantity: number) => void
  onWishlist?: (id: string) => void
  onShare?: () => void
}

export default function ProductDetails({
  id,
  name,
  price,
  originalPrice,
  description,
  features,
  specifications,
  images,
  category,
  tags,
  rating,
  reviewCount,
  inStock,
  stockQuantity = 0,
  sku,
  brand,
  warranty,
  onAddToCart,
  onBuyNow,
  onWishlist,
  onShare
}: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description')
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
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

  // Handle quantity change
  const increaseQuantity = () => {
    if (quantity < (stockQuantity || 10)) {
      setQuantity(prev => prev + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value >= 1 && value <= (stockQuantity || 10)) {
      setQuantity(value)
    }
  }

  // Handle add to cart
  const handleAddToCart = () => {
    setAddedToCart(true)
    onAddToCart(id, quantity)
    
    setTimeout(() => {
      setAddedToCart(false)
    }, 2000)
  }

  // Handle buy now
  const handleBuyNow = () => {
    onBuyNow(id, quantity)
  }

  // Handle wishlist
  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    if (onWishlist) onWishlist(id)
  }

  // Handle share
  const handleShare = () => {
    if (onShare) {
      onShare()
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      {/* Breadcrumb */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        color: '#9ca3af',
        fontSize: '0.875rem',
        flexWrap: 'wrap'
      }}>
        <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</Link>
        <span>/</span>
        <Link href="/products" style={{ color: '#9ca3af', textDecoration: 'none' }}>Products</Link>
        <span>/</span>
        <Link href={`/products/categories/${category}`} style={{ color: '#9ca3af', textDecoration: 'none' }}>
          {category}
        </Link>
        <span>/</span>
        <span style={{ color: '#c084fc' }}>{name}</span>
      </div>

      {/* Main Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '3rem',
        marginBottom: '3rem'
      }}>
        {/* Image Gallery */}
        <div>
          {/* Main Image */}
          <div
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
              borderRadius: '1rem',
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <span style={{ fontSize: '8rem', color: 'white' }}>
              {images[selectedImage] || '🖼️'}
            </span>
            
            {/* Sale Badge */}
            {originalPrice && (
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: '#ef4444',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '2rem',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                  borderRadius: '0.5rem',
                  border: selectedImage === index ? '2px solid #c084fc' : '1px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  color: 'white',
                  flexShrink: 0
                }}
              >
                {img}
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Category */}
          <div style={{ marginBottom: '1rem' }}>
            <Link
              href={`/products/categories/${category}`}
              style={{
                display: 'inline-block',
                padding: '0.25rem 1rem',
                background: 'rgba(168,85,247,0.1)',
                borderRadius: '2rem',
                color: '#c084fc',
                textDecoration: 'none',
                fontSize: '0.875rem'
              }}
            >
              {category}
            </Link>
          </div>

          {/* Title */}
          <h1 style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            {name}
          </h1>

          {/* Rating */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  style={{
                    color: star <= rating ? '#f59e0b' : '#4b5563',
                    fontSize: '1.25rem'
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <span style={{ color: '#9ca3af' }}>
              {rating} out of 5 ({reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: 'white', fontSize: '2.5rem', fontWeight: 'bold' }}>
                {formatCurrency(price)}
              </span>
              {originalPrice && (
                <span style={{ color: '#9ca3af', fontSize: '1.25rem', textDecoration: 'line-through' }}>
                  {formatCurrency(originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Stock Status */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: inStock ? '#10b981' : '#ef4444'
            }}>
              <span>{inStock ? '●' : '○'}</span>
              <span>{inStock ? 'In Stock' : 'Out of Stock'}</span>
              {inStock && stockQuantity && stockQuantity < 10 && (
                <span style={{
                  marginLeft: '1rem',
                  color: '#f59e0b',
                  fontSize: '0.875rem'
                }}>
                  Only {stockQuantity} left!
                </span>
              )}
            </div>
          </div>

          {/* Short Description */}
          <p style={{ color: '#d1d5db', lineHeight: 1.6, marginBottom: '2rem' }}>
            {description}
          </p>

          {/* Quantity Selector */}
          {inStock && (
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', color: '#d1d5db', marginBottom: '0.5rem' }}>
                Quantity
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '0.5rem'
                }}>
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    style={{
                      width: '3rem',
                      height: '3rem',
                      background: 'none',
                      border: 'none',
                      color: 'white',
                      fontSize: '1.5rem',
                      cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                      opacity: quantity <= 1 ? 0.5 : 1
                    }}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max={stockQuantity || 10}
                    style={{
                      width: '4rem',
                      textAlign: 'center',
                      background: 'transparent',
                      border: 'none',
                      color: 'white',
                      fontWeight: '600',
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={increaseQuantity}
                    disabled={quantity >= (stockQuantity || 10)}
                    style={{
                      width: '3rem',
                      height: '3rem',
                      background: 'none',
                      border: 'none',
                      color: 'white',
                      fontSize: '1.5rem',
                      cursor: quantity >= (stockQuantity || 10) ? 'not-allowed' : 'pointer',
                      opacity: quantity >= (stockQuantity || 10) ? 0.5 : 1
                    }}
                  >
                    +
                  </button>
                </div>
                <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                  {stockQuantity || 10} available
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            flexDirection: isMobile ? 'column' : 'row'
          }}>
            <button
              onClick={handleAddToCart}
              disabled={!inStock || addedToCart}
              style={{
                flex: 2,
                padding: '1rem',
                background: !inStock
                  ? 'rgba(107,114,128,0.3)'
                  : addedToCart
                  ? '#10b981'
                  : 'linear-gradient(135deg, #3b82f6, #a855f7)',
                border: 'none',
                borderRadius: '0.75rem',
                color: 'white',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: !inStock || addedToCart ? 'not-allowed' : 'pointer',
                opacity: !inStock ? 0.5 : 1
              }}
            >
              {!inStock
                ? 'Out of Stock'
                : addedToCart
                ? '✓ Added to Cart!'
                : 'Add to Cart'}
            </button>
            
            <button
              onClick={handleBuyNow}
              disabled={!inStock}
              style={{
                flex: 1,
                padding: '1rem',
                background: !inStock
                  ? 'rgba(107,114,128,0.3)'
                  : 'linear-gradient(135deg, #10b981, #059669)',
                border: 'none',
                borderRadius: '0.75rem',
                color: 'white',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: !inStock ? 'not-allowed' : 'pointer',
                opacity: !inStock ? 0.5 : 1
              }}
            >
              Buy Now
            </button>

            <button
              onClick={handleWishlist}
              style={{
                width: '3rem',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '0.75rem',
                color: isWishlisted ? '#ef4444' : 'white',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              {isWishlisted ? '❤️' : '🤍'}
            </button>

            <button
              onClick={handleShare}
              style={{
                width: '3rem',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '0.75rem',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              📤
            </button>
          </div>

          {/* Product Meta */}
          <div style={{
            padding: '1rem',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '0.75rem'
          }}>
            {sku && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                <span style={{ color: '#9ca3af' }}>SKU:</span>
                <span style={{ color: 'white' }}>{sku}</span>
              </div>
            )}
            {brand && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                <span style={{ color: '#9ca3af' }}>Brand:</span>
                <span style={{ color: 'white' }}>{brand}</span>
              </div>
            )}
            {warranty && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                <span style={{ color: '#9ca3af' }}>Warranty:</span>
                <span style={{ color: 'white' }}>{warranty}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
              <span style={{ color: '#9ca3af' }}>Availability:</span>
              <span style={{ color: inStock ? '#10b981' : '#ef4444' }}>
                {inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '1rem',
        border: '1px solid rgba(255,255,255,0.1)',
        overflow: 'hidden',
        marginBottom: '2rem'
      }}>
        {/* Tab Headers */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(0,0,0,0.2)',
          overflowX: 'auto'
        }}>
          {['description', 'specifications', 'reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              style={{
                flex: 1,
                padding: '1rem',
                background: activeTab === tab ? 'rgba(168,85,247,0.2)' : 'transparent',
                border: 'none',
                color: activeTab === tab ? '#c084fc' : '#9ca3af',
                fontWeight: activeTab === tab ? '600' : '400',
                cursor: 'pointer',
                textTransform: 'capitalize',
                whiteSpace: 'nowrap'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ padding: '2rem' }}>
          {activeTab === 'description' && (
            <div>
              <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                Product Description
              </h3>
              <p style={{ color: '#d1d5db', lineHeight: 1.8, marginBottom: '2rem' }}>
                {description}
              </p>
              
              <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                Key Features
              </h3>
              <ul style={{ color: '#d1d5db', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
                {features.map((feature, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div>
              <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                Technical Specifications
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                {Object.entries(specifications).map(([key, value]) => (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.75rem',
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: '0.5rem'
                    }}
                  >
                    <span style={{ color: '#9ca3af', textTransform: 'capitalize' }}>{key}:</span>
                    <span style={{ color: 'white', fontWeight: '500' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                Customer Reviews
              </h3>
              
              {/* Rating Summary */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                padding: '1rem',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '0.5rem',
                marginBottom: '2rem',
                flexWrap: 'wrap'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'white', fontSize: '3rem', fontWeight: 'bold' }}>{rating}</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>out of 5</div>
                </div>
                <div>
                  <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.5rem' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} style={{ color: star <= rating ? '#f59e0b' : '#4b5563', fontSize: '1.5rem' }}>
                        ★
                      </span>
                    ))}
                  </div>
                  <div style={{ color: '#9ca3af' }}>Based on {reviewCount} reviews</div>
                </div>
              </div>

              {/* Sample Reviews */}
              {[1, 2, 3].map(review => (
                <div
                  key={review}
                  style={{
                    padding: '1rem',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'white', fontWeight: '600' }}>John Doe</span>
                    <div style={{ display: 'flex', gap: '0.125rem' }}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <span key={star} style={{ color: star <= 4 ? '#f59e0b' : '#4b5563' }}>★</span>
                      ))}
                    </div>
                  </div>
                  <p style={{ color: '#d1d5db', fontSize: '0.875rem' }}>
                    Great product! Highly recommended. The quality is excellent and it performs exactly as described.
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {tags.map((tag, index) => (
          <Link
            key={index}
            href={`/products/tags/${tag}`}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '2rem',
              color: '#9ca3af',
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(168,85,247,0.1)'
              e.currentTarget.style.color = '#c084fc'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              e.currentTarget.style.color = '#9ca3af'
            }}
          >
            #{tag}
          </Link>
        ))}
      </div>
    </div>
  )
}