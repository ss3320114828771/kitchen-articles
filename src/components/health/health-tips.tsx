'use client'

import { useState } from 'react'
import Link from 'next/link'

interface HealthTip {
  id: string
  title: string
  description: string
  icon: string
  category: 'nutrition' | 'fitness' | 'mental' | 'sleep' | 'general'
  color?: string
  link?: string
}

interface HealthTipsProps {
  title?: string
  subtitle?: string
  tips?: HealthTip[]
  columns?: 2 | 3 | 4
  showViewAll?: boolean
  viewAllLink?: string
  onTipClick?: (tip: HealthTip) => void
}

const defaultTips: HealthTip[] = [
  {
    id: '1',
    title: 'Stay Hydrated',
    description: 'Drink at least 8 glasses of water daily for optimal health and energy levels.',
    icon: '💧',
    category: 'nutrition',
    color: '#3b82f6'
  },
  {
    id: '2',
    title: 'Regular Exercise',
    description: '30 minutes of physical activity daily can boost your immune system and mood.',
    icon: '🏃',
    category: 'fitness',
    color: '#10b981'
  },
  {
    id: '3',
    title: 'Balanced Diet',
    description: 'Include fruits, vegetables, proteins, and whole grains in your meals.',
    icon: '🥗',
    category: 'nutrition',
    color: '#f59e0b'
  },
  {
    id: '4',
    title: 'Quality Sleep',
    description: 'Aim for 7-9 hours of sleep to help your body repair and rejuvenate.',
    icon: '😴',
    category: 'sleep',
    color: '#8b5cf6'
  },
  {
    id: '5',
    title: 'Stress Management',
    description: 'Practice meditation or deep breathing for mental wellness.',
    icon: '🧘',
    category: 'mental',
    color: '#ec4899'
  },
  {
    id: '6',
    title: 'Regular Check-ups',
    description: 'Annual health screenings can prevent potential issues.',
    icon: '🏥',
    category: 'general',
    color: '#6b7280'
  },
  {
    id: '7',
    title: 'Take Breaks',
    description: 'Short breaks during work improve focus and reduce stress.',
    icon: '☕',
    category: 'mental',
    color: '#a855f7'
  },
  {
    id: '8',
    title: 'Wash Hands',
    description: 'Regular hand washing prevents the spread of germs.',
    icon: '🧼',
    category: 'general',
    color: '#ef4444'
  }
]

export default function HealthTips({
  title = 'Health Tips',
  subtitle = 'Simple ways to improve your well-being',
  tips = defaultTips,
  columns = 3,
  showViewAll = true,
  viewAllLink = '/health',
  onTipClick
}: HealthTipsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [expandedTip, setExpandedTip] = useState<string | null>(null)
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

  // Get unique categories
  const categories = ['all', ...new Set(tips.map(tip => tip.category))]

  // Filter tips by category
  const filteredTips = activeCategory === 'all'
    ? tips
    : tips.filter(tip => tip.category === activeCategory)

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      nutrition: '#10b981',
      fitness: '#3b82f6',
      mental: '#a855f7',
      sleep: '#8b5cf6',
      general: '#6b7280',
      all: '#c084fc'
    }
    return colors[category] || '#c084fc'
  }

  // Get column style
  const getGridColumns = () => {
    if (isMobile) return '1fr'
    switch (columns) {
      case 2: return 'repeat(2, 1fr)'
      case 4: return 'repeat(4, 1fr)'
      case 3:
      default: return 'repeat(3, 1fr)'
    }
  }

  return (
    <section style={{
      background: 'rgba(255, 255, 255, 0.02)',
      borderRadius: '2rem',
      padding: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #10b981, #3b82f6, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            {title}
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
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
              gap: '0.25rem',
              fontSize: '0.875rem',
              padding: '0.5rem 1rem',
              background: 'rgba(168, 85, 247, 0.1)',
              borderRadius: '2rem',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)'
            }}
          >
            View All Tips
            <span>→</span>
          </Link>
        )}
      </div>

      {/* Category Filter */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        overflowX: 'auto',
        paddingBottom: '0.5rem'
      }}>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            style={{
              padding: '0.5rem 1rem',
              background: activeCategory === category
                ? getCategoryColor(category)
                : 'rgba(255, 255, 255, 0.05)',
              border: 'none',
              borderRadius: '2rem',
              color: activeCategory === category ? 'white' : '#9ca3af',
              fontSize: '0.875rem',
              fontWeight: activeCategory === category ? '600' : '400',
              cursor: 'pointer',
              textTransform: 'capitalize',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              if (activeCategory !== category) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
              }
            }}
            onMouseLeave={(e) => {
              if (activeCategory !== category) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
              }
            }}
          >
            {category === 'all' ? 'All Tips' : category}
          </button>
        ))}
      </div>

      {/* Tips Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: getGridColumns(),
        gap: '1.5rem'
      }}>
        {filteredTips.map((tip) => {
          const isExpanded = expandedTip === tip.id
          const tipColor = tip.color || getCategoryColor(tip.category)

          return (
            <div
              key={tip.id}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '1.5rem',
                padding: '1.5rem',
                border: `1px solid ${tipColor}20`,
                transition: 'all 0.3s ease',
                cursor: onTipClick ? 'pointer' : 'default',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = `0 8px 24px ${tipColor}30`
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                }
              }}
              onClick={() => {
                if (onTipClick) {
                  onTipClick(tip)
                } else {
                  setExpandedTip(isExpanded ? null : tip.id)
                }
              }}
            >
              {/* Background decoration */}
              <div
                style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '100px',
                  height: '100px',
                  background: `radial-gradient(circle, ${tipColor}20, transparent 70%)`,
                  borderRadius: '50%',
                  zIndex: 0
                }}
              />

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Icon */}
                <div
                  style={{
                    fontSize: '2.5rem',
                    marginBottom: '1rem',
                    filter: `drop-shadow(0 4px 8px ${tipColor}40)`
                  }}
                >
                  {tip.icon}
                </div>

                {/* Title */}
                <h3 style={{
                  color: 'white',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}>
                  {tip.title}
                </h3>

                {/* Description */}
                <p style={{
                  color: '#d1d5db',
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  marginBottom: '1rem',
                  display: '-webkit-box',
                  WebkitLineClamp: isExpanded ? 'none' : 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: isExpanded ? 'visible' : 'hidden'
                }}>
                  {tip.description}
                </p>

                {/* Category Badge */}
                <div
                  style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    background: `${tipColor}20`,
                    borderRadius: '2rem',
                    fontSize: '0.7rem',
                    color: tipColor,
                    textTransform: 'capitalize',
                    marginBottom: '1rem'
                  }}
                >
                  {tip.category}
                </div>

                {/* Read More/Less Indicator */}
                {!isMobile && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      color: tipColor,
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      opacity: 0.7
                    }}
                  >
                    {isExpanded ? 'Show less' : 'Click to read more'}
                    <span>{isExpanded ? '↑' : '↓'}</span>
                  </div>
                )}

                {/* Link if provided */}
                {tip.link && (
                  <Link
                    href={tip.link}
                    style={{
                      display: 'inline-block',
                      marginTop: '1rem',
                      color: tipColor,
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Learn more →
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredTips.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '1rem'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>🏥</div>
          <p style={{ color: '#9ca3af' }}>
            No tips found for this category.
          </p>
        </div>
      )}

      {/* Footer Quote */}
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))',
        borderRadius: '1rem',
        textAlign: 'center'
      }}>
        <p style={{
          color: '#d1d5db',
          fontSize: '0.875rem',
          fontStyle: 'italic',
          margin: 0
        }}>
          "Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship."
        </p>
        <p style={{ color: '#c084fc', fontSize: '0.75rem', marginTop: '0.5rem' }}>
          — Buddha
        </p>
      </div>
    </section>
  )
}