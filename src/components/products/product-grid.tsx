'use client'

import { useState } from 'react'
import ProductCard from './product-card'

interface Product {
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
}

interface ProductGridProps {
  products: Product[]
  columns?: 2 | 3 | 4 | 5 | 6
  gap?: number
  loading?: boolean
  onAddToCart?: (id: string) => void
  onQuickView?: (id: string) => void
  onWishlist?: (id: string) => void
  layout?: 'grid' | 'list'
  showLoadMore?: boolean
  onLoadMore?: () => void
  hasMore?: boolean
  loadingMore?: boolean
  emptyMessage?: string
}

export default function ProductGrid({
  products,
  columns = 4,
  gap = 24,
  loading = false,
  onAddToCart,
  onQuickView,
  onWishlist,
  layout = 'grid',
  showLoadMore = false,
  onLoadMore,
  hasMore = false,
  loadingMore = false,
  emptyMessage = 'No products found'
}: ProductGridProps) {
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

  // Get grid columns based on layout and screen size
  const getGridColumns = () => {
    if (layout === 'list') return '1fr'
    
    if (isMobile) return '1fr'
    
    switch (columns) {
      case 2: return 'repeat(2, 1fr)'
      case 3: return 'repeat(3, 1fr)'
      case 5: return 'repeat(5, 1fr)'
      case 6: return 'repeat(6, 1fr)'
      case 4:
      default: return 'repeat(4, 1fr)'
    }
  }

  // Loading skeleton
  if (loading) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: getGridColumns(),
          gap: `${gap}px`
        }}
      >
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '1rem',
              overflow: 'hidden',
              animation: 'pulse 1.5s infinite'
            }}
          >
            <div
              style={{
                height: '200px',
                background: 'rgba(255,255,255,0.1)'
              }}
            />
            <div style={{ padding: '1rem' }}>
              <div
                style={{
                  height: '1rem',
                  width: '60%',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '0.25rem',
                  marginBottom: '0.5rem'
                }}
              />
              <div
                style={{
                  height: '1.5rem',
                  width: '80%',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '0.25rem',
                  marginBottom: '0.5rem'
                }}
              />
              <div
                style={{
                  height: '1rem',
                  width: '40%',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '0.25rem'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '1rem',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>🔍</div>
        <h3 style={{ color: 'white', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
          {emptyMessage}
        </h3>
        <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Product Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: getGridColumns(),
          gap: `${gap}px`
        }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            layout={layout}
            onAddToCart={onAddToCart ? () => onAddToCart(product.id) : undefined}
            onQuickView={onQuickView ? () => onQuickView(product.id) : undefined}
            onWishlist={onWishlist ? () => onWishlist(product.id) : undefined}
          />
        ))}
      </div>

      {/* Load More Button */}
      {showLoadMore && hasMore && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            onClick={onLoadMore}
            disabled={loadingMore}
            style={{
              padding: '0.75rem 2rem',
              background: loadingMore
                ? 'rgba(107,114,128,0.3)'
                : 'linear-gradient(135deg, #3b82f6, #a855f7)',
              border: 'none',
              borderRadius: '2rem',
              color: 'white',
              fontWeight: '600',
              fontSize: '0.875rem',
              cursor: loadingMore ? 'not-allowed' : 'pointer',
              opacity: loadingMore ? 0.5 : 1,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (!loadingMore) {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(59,130,246,0.3)'
              }
            }}
            onMouseLeave={(e) => {
              if (!loadingMore) {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }
            }}
          >
            {loadingMore ? (
              <>
                <span
                  style={{
                    width: '1rem',
                    height: '1rem',
                    border: '2px solid white',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}
                />
                Loading...
              </>
            ) : (
              <>
                Load More Products
                <span style={{ fontSize: '1.25rem' }}>↓</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Results Count */}
      <div
        style={{
          marginTop: '2rem',
          textAlign: 'center',
          color: '#9ca3af',
          fontSize: '0.875rem'
        }}
      >
        Showing {products.length} {products.length === 1 ? 'product' : 'products'}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

// Additional layout components for common use cases
export function CompactProductGrid(props: Omit<ProductGridProps, 'columns' | 'gap'>) {
  return <ProductGrid {...props} columns={6} gap={16} />
}

export function WideProductGrid(props: Omit<ProductGridProps, 'columns' | 'gap'>) {
  return <ProductGrid {...props} columns={3} gap={32} />
}

export function ListProductGrid(props: Omit<ProductGridProps, 'layout'>) {
  return <ProductGrid {...props} layout="list" />
}

export function ProductGridWithLoadMore(props: ProductGridProps) {
  return <ProductGrid {...props} showLoadMore={true} />
}