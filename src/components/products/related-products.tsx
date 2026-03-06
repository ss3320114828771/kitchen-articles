'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  rating?: number
}

interface RelatedProductsProps {
  currentProductId: string
  category: string
  products?: Product[]
  title?: string
  maxItems?: number
  onProductClick?: (product: Product) => void
}

// Mock products data
const mockProducts: Product[] = [
  { id: '1', name: 'Quantum Processor X1', price: 999.99, image: '🖥️', category: 'Electronics', rating: 4.5 },
  { id: '2', name: 'Neural Interface Pro', price: 1499.99, image: '🧠', category: 'AI Products', rating: 4.8 },
  { id: '3', name: 'Holographic Display 8K', price: 799.99, image: '📺', category: 'Electronics', rating: 4.3 },
  { id: '4', name: 'AI Assistant Hub', price: 449.99, image: '🤖', category: 'AI Products', rating: 4.4 },
  { id: '5', name: 'Bio-Tech Smart Watch', price: 599.99, image: '⌚', category: 'Wearables', rating: 4.5 },
  { id: '6', name: 'Quantum Security System', price: 2999.99, image: '🔒', category: 'Security', rating: 4.9 },
  { id: '7', name: 'Wireless Earbuds Pro', price: 199.99, image: '🎧', category: 'Accessories', rating: 4.2 },
  { id: '8', name: 'Smart Glasses AR', price: 1299.99, image: '👓', category: 'Wearables', rating: 4.4 },
]

export default function RelatedProducts({
  currentProductId,
  category,
  products = mockProducts,
  title = 'You might also like',
  maxItems = 4,
  onProductClick
}: RelatedProductsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  // Filter related products (same category, exclude current)
  const related = products
    .filter(p => p.category === category && p.id !== currentProductId)
    .slice(0, maxItems)

  // If no related products in same category, show random products
  const displayProducts = related.length > 0 
    ? related 
    : products.filter(p => p.id !== currentProductId).slice(0, maxItems)

  if (displayProducts.length === 0) {
    return null
  }

  return (
    <div style={{ marginTop: '3rem' }}>
      {/* Title */}
      <h2 style={{
        color: 'white',
        fontSize: '1.5rem',
        fontWeight: '600',
        marginBottom: '1.5rem'
      }}>
        {title}
      </h2>

      {/* Products Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem'
      }}>
        {displayProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            style={{ textDecoration: 'none' }}
            onClick={(e) => {
              if (onProductClick) {
                e.preventDefault()
                onProductClick(product)
              }
            }}
          >
            <div
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: hoveredId === product.id 
                  ? 'rgba(255,255,255,0.1)' 
                  : 'rgba(255,255,255,0.05)',
                borderRadius: '1rem',
                padding: '1rem',
                transition: 'all 0.3s',
                transform: hoveredId === product.id ? 'translateY(-4px)' : 'none',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Product Image */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                  borderRadius: '0.75rem',
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  fontSize: '3rem',
                  color: 'white'
                }}
              >
                {product.image}
              </div>

              {/* Product Info */}
              <div style={{ flex: 1 }}>
                <h3 style={{
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '1rem',
                  marginBottom: '0.5rem'
                }}>
                  {product.name}
                </h3>

                {/* Rating */}
                {product.rating && (
                  <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.5rem' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span
                        key={star}
                        style={{
                          color: star <= product.rating! ? '#f59e0b' : '#4b5563',
                          fontSize: '0.875rem'
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                )}

                {/* Price and Category */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    color: '#c084fc',
                    fontWeight: '600',
                    fontSize: '1.125rem'
                  }}>
                    ${product.price.toFixed(2)}
                  </span>
                  <span style={{
                    color: '#9ca3af',
                    fontSize: '0.75rem',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '1rem'
                  }}>
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}