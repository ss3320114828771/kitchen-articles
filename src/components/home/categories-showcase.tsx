'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Category {
  id: string
  name: string
  slug: string
  icon: string
  description: string
  productCount: number
  color: string
  image?: string
  featured?: boolean
}

interface CategoriesShowcaseProps {
  title?: string
  subtitle?: string
  categories?: Category[]
  columns?: 2 | 3 | 4 | 6
  showViewAll?: boolean
  viewAllLink?: string
  onCategoryClick?: (category: Category) => void
  layout?: 'grid' | 'carousel'
}

const defaultCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    icon: '💻',
    description: 'Cutting-edge gadgets and devices',
    productCount: 124,
    color: '#3b82f6',
    featured: true
  },
  {
    id: '2',
    name: 'AI Products',
    slug: 'ai-products',
    icon: '🤖',
    description: 'Artificial intelligence solutions',
    productCount: 89,
    color: '#a855f7',
    featured: true
  },
  {
    id: '3',
    name: 'Wearables',
    slug: 'wearables',
    icon: '⌚',
    description: 'Smart watches and fitness trackers',
    productCount: 56,
    color: '#10b981',
    featured: true
  },
  {
    id: '4',
    name: 'Security',
    slug: 'security',
    icon: '🔒',
    description: 'Protect what matters most',
    productCount: 42,
    color: '#ef4444',
    featured: false
  },
  {
    id: '5',
    name: 'Accessories',
    slug: 'accessories',
    icon: '🎧',
    description: 'Complete your setup',
    productCount: 78,
    color: '#f59e0b',
    featured: false
  },
  {
    id: '6',
    name: 'Gaming',
    slug: 'gaming',
    icon: '🎮',
    description: 'Level up your experience',
    productCount: 63,
    color: '#ec4899',
    featured: false
  }
]

export default function CategoriesShowcase({
  title = 'Shop by Category',
  subtitle = 'Browse our wide range of products',
  categories = defaultCategories,
  columns = 4,
  showViewAll = true,
  viewAllLink = '/products',
  onCategoryClick,
  layout = 'grid'
}: CategoriesShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
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

  // Get column style
  const getGridColumns = () => {
    if (isMobile) return '1fr'
    switch (columns) {
      case 2: return 'repeat(2, 1fr)'
      case 6: return 'repeat(6, 1fr)'
      case 3: return 'repeat(3, 1fr)'
      case 4:
      default: return 'repeat(4, 1fr)'
    }
  }

  // Carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(categories.length / 4))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? Math.ceil(categories.length / 4) - 1 : prev - 1
    )
  }

  // Render category card
  const renderCategoryCard = (category: Category, index: number) => {
    const isHovered = hoveredId === category.id

    return (
      <Link
        key={category.id}
        href={`/products/categories/${category.slug}`}
        style={{ textDecoration: 'none' }}
        onClick={(e) => {
          if (onCategoryClick) {
            e.preventDefault()
            onCategoryClick(category)
          }
        }}
      >
        <div
          style={{
            background: isHovered 
              ? `linear-gradient(135deg, ${category.color}20, ${category.color}10)`
              : 'rgba(255, 255, 255, 0.05)',
            borderRadius: '1.5rem',
            padding: '2rem 1rem',
            border: `1px solid ${isHovered ? category.color + '40' : 'rgba(255, 255, 255, 0.1)'}`,
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: isHovered ? `0 8px 24px ${category.color}30` : 'none'
          }}
          onMouseEnter={() => setHoveredId(category.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Background decoration */}
          <div
            style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '120px',
              height: '120px',
              background: `radial-gradient(circle, ${category.color}20, transparent 70%)`,
              borderRadius: '50%',
              zIndex: 0,
              transition: 'transform 0.3s',
              transform: isHovered ? 'scale(1.2)' : 'scale(1)'
            }}
          />

          {/* Icon */}
          <div
            style={{
              fontSize: '3.5rem',
              marginBottom: '1rem',
              position: 'relative',
              zIndex: 1,
              filter: isHovered ? `drop-shadow(0 4px 12px ${category.color})` : 'none',
              transition: 'filter 0.3s'
            }}
          >
            {category.icon}
          </div>

          {/* Name */}
          <h3
            style={{
              color: 'white',
              fontSize: '1.125rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              position: 'relative',
              zIndex: 1
            }}
          >
            {category.name}
          </h3>

          {/* Description */}
          <p
            style={{
              color: '#9ca3af',
              fontSize: '0.875rem',
              marginBottom: '0.75rem',
              position: 'relative',
              zIndex: 1
            }}
          >
            {category.description}
          </p>

          {/* Product Count */}
          <div
            style={{
              display: 'inline-block',
              padding: '0.25rem 1rem',
              background: `${category.color}20`,
              borderRadius: '2rem',
              color: category.color,
              fontSize: '0.75rem',
              fontWeight: '600',
              position: 'relative',
              zIndex: 1
            }}
          >
            {category.productCount} Products
          </div>

          {/* Featured Badge */}
          {category.featured && (
            <div
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
                background: category.color,
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '2rem',
                fontSize: '0.7rem',
                fontWeight: '600',
                zIndex: 2
              }}
            >
              Featured
            </div>
          )}

          {/* Hover Arrow */}
          {isHovered && (
            <div
              style={{
                position: 'absolute',
                bottom: '0.5rem',
                right: '0.5rem',
                color: category.color,
                fontSize: '1.25rem',
                animation: 'slideRight 0.3s ease'
              }}
            >
              →
            </div>
          )}
        </div>
      </Link>
    )
  }

  return (
    <section style={{
      padding: '4rem 2rem',
      background: 'linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.3))'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '3rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #60a5fa, #c084fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem'
            }}>
              {title}
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '1rem' }}>
              {subtitle}
            </p>
          </div>

          {showViewAll && (
            <Link
              href={viewAllLink}
              style={{
                color: '#c084fc',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'rgba(168, 85, 247, 0.1)',
                borderRadius: '2rem',
                transition: 'all 0.2s',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)'
                e.currentTarget.style.transform = 'translateX(4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)'
                e.currentTarget.style.transform = 'translateX(0)'
              }}
            >
              Browse All Categories
              <span style={{ fontSize: '1.25rem' }}>→</span>
            </Link>
          )}
        </div>

        {/* Grid Layout */}
        {layout === 'grid' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: getGridColumns(),
            gap: '1.5rem'
          }}>
            {categories.map((category, index) => renderCategoryCard(category, index))}
          </div>
        )}

        {/* Carousel Layout */}
        {layout === 'carousel' && !isMobile && (
          <div style={{ position: 'relative' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.5rem',
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: 'transform 0.5s ease'
            }}>
              {categories.map((category, index) => renderCategoryCard(category, index))}
            </div>

            {/* Carousel Controls */}
            {categories.length > 4 && (
              <>
                <button
                  onClick={prevSlide}
                  style={{
                    position: 'absolute',
                    left: '-1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '3rem',
                    height: '3rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    color: 'white',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(4px)',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  ←
                </button>
                <button
                  onClick={nextSlide}
                  style={{
                    position: 'absolute',
                    right: '-1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '3rem',
                    height: '3rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    color: 'white',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(4px)',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  →
                </button>

                {/* Dots */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginTop: '2rem'
                }}>
                  {Array.from({ length: Math.ceil(categories.length / 4) }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      style={{
                        width: '0.5rem',
                        height: '0.5rem',
                        background: currentSlide === i ? '#c084fc' : 'rgba(255, 255, 255, 0.2)',
                        border: 'none',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'all 0.3s',
                        transform: currentSlide === i ? 'scale(1.2)' : 'scale(1)'
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Mobile Carousel (simplified) */}
        {layout === 'carousel' && isMobile && (
          <div style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '1rem',
            paddingBottom: '1rem',
            scrollSnapType: 'x mandatory'
          }}>
            {categories.map((category) => (
              <div
                key={category.id}
                style={{
                  minWidth: '250px',
                  scrollSnapAlign: 'start'
                }}
              >
                {renderCategoryCard(category, 0)}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  )
}