'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviewCount: number
  badge?: 'new' | 'sale' | 'bestseller'
  discount?: number
  inStock?: boolean
  onAddToCart?: (id: string) => void
  onQuickView?: (id: string) => void
  onWishlist?: (id: string) => void
  layout?: 'grid' | 'list'
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  rating,
  reviewCount,
  badge,
  discount,
  inStock = true,
  onAddToCart,
  onQuickView,
  onWishlist,
  layout = 'grid'
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Handle add to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsAdded(true)
    if (onAddToCart) onAddToCart(id)
    
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }

  // Handle wishlist
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsWishlisted(!isWishlisted)
    if (onWishlist) onWishlist(id)
  }

  // Handle quick view
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onQuickView) onQuickView(id)
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  // Get badge color
  const getBadgeColor = () => {
    switch (badge) {
      case 'new': return '#3b82f6'
      case 'sale': return '#ef4444'
      case 'bestseller': return '#f59e0b'
      default: return '#6b7280'
    }
  }

  // Grid Layout
  if (layout === 'grid') {
    return (
      <Link
        href={`/products/${id}`}
        style={{ textDecoration: 'none' }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '1rem',
            overflow: 'hidden',
            border: `1px solid ${isHovered ? 'rgba(168,85,247,0.3)' : 'rgba(255,255,255,0.1)'}`,
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: isHovered ? '0 8px 24px rgba(0,0,0,0.2)' : 'none'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Badge */}
          {badge && (
            <div
              style={{
                position: 'absolute',
                top: '0.75rem',
                left: '0.75rem',
                background: getBadgeColor(),
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '2rem',
                fontSize: '0.7rem',
                fontWeight: '600',
                zIndex: 2,
                textTransform: 'uppercase'
              }}
            >
              {badge}
            </div>
          )}

          {/* Discount Badge */}
          {discount && (
            <div
              style={{
                position: 'absolute',
                top: '0.75rem',
                right: '0.75rem',
                background: '#ef4444',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '2rem',
                fontSize: '0.7rem',
                fontWeight: '600',
                zIndex: 2
              }}
            >
              -{discount}%
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            style={{
              position: 'absolute',
              top: '0.75rem',
              right: badge ? '5rem' : '0.75rem',
              background: 'rgba(0,0,0,0.5)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 3,
              color: isWishlisted ? '#ef4444' : 'white',
              fontSize: '1.25rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.7)'
              e.currentTarget.style.transform = 'scale(1.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.5)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            {isWishlisted ? '❤️' : '🤍'}
          </button>

          {/* Image */}
          <div
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4rem',
              color: 'white',
              position: 'relative',
              transition: 'transform 0.3s',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            {imageError ? '📦' : image}

            {/* Quick View Overlay */}
            {isHovered && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  animation: 'fadeIn 0.3s ease'
                }}
              >
                <button
                  onClick={handleQuickView}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'white',
                    border: 'none',
                    borderRadius: '2rem',
                    color: '#333',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    cursor: 'pointer'
                  }}
                >
                  Quick View
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          <div style={{ padding: '1rem', flex: 1 }}>
            {/* Category */}
            <div style={{ color: '#c084fc', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
              {category}
            </div>

            {/* Name */}
            <h3
              style={{
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                lineHeight: 1.4,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {name}
            </h3>

            {/* Rating */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}
            >
              <div style={{ display: 'flex', gap: '0.125rem' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{
                      color: star <= rating ? '#f59e0b' : '#4b5563',
                      fontSize: '0.875rem'
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                ({reviewCount})
              </span>
            </div>

            {/* Price */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}
            >
              <span style={{ color: 'white', fontWeight: '600', fontSize: '1.125rem' }}>
                {formatCurrency(price)}
              </span>
              {originalPrice && (
                <span
                  style={{
                    color: '#9ca3af',
                    fontSize: '0.875rem',
                    textDecoration: 'line-through'
                  }}
                >
                  {formatCurrency(originalPrice)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div
              style={{
                marginBottom: '1rem',
                color: inStock ? '#10b981' : '#ef4444',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <span>{inStock ? '●' : '○'}</span>
              {inStock ? 'In Stock' : 'Out of Stock'}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!inStock || isAdded}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: !inStock
                  ? 'rgba(107,114,128,0.3)'
                  : isAdded
                  ? '#10b981'
                  : isHovered
                  ? 'linear-gradient(135deg, #3b82f6, #a855f7)'
                  : 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '0.5rem',
                color: !inStock ? '#9ca3af' : 'white',
                fontWeight: '600',
                fontSize: '0.875rem',
                cursor: !inStock || isAdded ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {!inStock
                ? 'Out of Stock'
                : isAdded
                ? '✓ Added to Cart'
                : 'Add to Cart'}
            </button>
          </div>
        </div>
      </Link>
    )
  }

  // List Layout
  return (
    <Link
      href={`/products/${id}`}
      style={{ textDecoration: 'none' }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '1rem',
          border: `1px solid ${isHovered ? 'rgba(168,85,247,0.3)' : 'rgba(255,255,255,0.1)'}`,
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          display: 'flex',
          gap: '1.5rem',
          padding: '1rem',
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
          boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.2)' : 'none'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div
          style={{
            width: '150px',
            height: '150px',
            background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            color: 'white',
            flexShrink: 0
          }}
        >
          {imageError ? '📦' : image}
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ color: '#c084fc', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                {category}
              </div>
              <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>
                {name}
              </h3>
            </div>

            {/* Badges */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {badge && (
                <span
                  style={{
                    background: getBadgeColor(),
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '2rem',
                    fontSize: '0.7rem',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}
                >
                  {badge}
                </span>
              )}
              {discount && (
                <span
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '2rem',
                    fontSize: '0.7rem',
                    fontWeight: '600'
                  }}
                >
                  -{discount}%
                </span>
              )}
            </div>
          </div>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '0.125rem' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    color: star <= rating ? '#f59e0b' : '#4b5563',
                    fontSize: '1rem'
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
              ({reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'white', fontWeight: '600', fontSize: '1.25rem' }}>
              {formatCurrency(price)}
            </span>
            {originalPrice && (
              <span
                style={{
                  color: '#9ca3af',
                  fontSize: '1rem',
                  textDecoration: 'line-through'
                }}
              >
                {formatCurrency(originalPrice)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div
            style={{
              color: inStock ? '#10b981' : '#ef4444',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <span>{inStock ? '●' : '○'}</span>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button
              onClick={handleAddToCart}
              disabled={!inStock || isAdded}
              style={{
                padding: '0.75rem 1.5rem',
                background: !inStock
                  ? 'rgba(107,114,128,0.3)'
                  : isAdded
                  ? '#10b981'
                  : 'linear-gradient(135deg, #3b82f6, #a855f7)',
                border: 'none',
                borderRadius: '0.5rem',
                color: 'white',
                fontWeight: '600',
                cursor: !inStock || isAdded ? 'not-allowed' : 'pointer'
              }}
            >
              {!inStock
                ? 'Out of Stock'
                : isAdded
                ? '✓ Added'
                : 'Add to Cart'}
            </button>
            
            <button
              onClick={handleWishlist}
              style={{
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '0.5rem',
                color: isWishlisted ? '#ef4444' : 'white',
                cursor: 'pointer',
                fontSize: '1.25rem'
              }}
            >
              {isWishlisted ? '❤️' : '🤍'}
            </button>
            
            <button
              onClick={handleQuickView}
              style={{
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '0.5rem',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              🔍
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}