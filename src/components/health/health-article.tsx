'use client'

import { useState } from 'react'
import Link from 'next/link'

interface HealthArticleProps {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  authorRole?: string
  date: string
  readTime: string
  category: string
  image?: string
  tags?: string[]
  likes?: number
  comments?: number
  featured?: boolean
  onShare?: () => void
  onLike?: () => void
  onBookmark?: () => void
}

export default function HealthArticle({
  id,
  title,
  excerpt,
  content,
  author,
  authorRole = 'Health Expert',
  date,
  readTime,
  category,
  image,
  tags = [],
  likes = 0,
  comments = 0,
  featured = false,
  onShare,
  onLike,
  onBookmark
}: HealthArticleProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)
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

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Handle like
  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
    if (onLike) onLike()
  }

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: excerpt,
        url: window.location.href
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
    if (onShare) onShare()
  }

  // Category colors
  const categoryColors: { [key: string]: { bg: string; color: string } } = {
    nutrition: { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
    fitness: { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' },
    mental: { bg: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' },
    wellness: { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' },
    sleep: { bg: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' },
    general: { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' }
  }

  const categoryStyle = categoryColors[category.toLowerCase()] || categoryColors.general

  return (
    <article
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '1.5rem',
        border: `1px solid ${featured ? categoryStyle.color + '40' : 'rgba(255, 255, 255, 0.1)'}`,
        overflow: 'hidden',
        position: 'relative',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={(e) => {
        if (!isMobile) {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = `0 12px 24px ${categoryStyle.color}20`
        }
      }}
      onMouseLeave={(e) => {
        if (!isMobile) {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }
      }}
    >
      {/* Featured Badge */}
      {featured && (
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: categoryStyle.color,
            color: 'white',
            padding: '0.25rem 1rem',
            borderRadius: '2rem',
            fontSize: '0.75rem',
            fontWeight: '600',
            zIndex: 1,
            boxShadow: `0 2px 8px ${categoryStyle.color}60`
          }}
        >
          Featured
        </div>
      )}

      {/* Image Section */}
      {image ? (
        <div
          style={{
            width: '100%',
            height: '200px',
            background: `linear-gradient(135deg, ${categoryStyle.color}, ${categoryStyle.color}80)`,
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer'
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.3s',
              color: 'white',
              fontSize: '3rem'
            }}
            className="image-overlay"
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0'
            }}
          >
            🔍
          </div>
          <div
            style={{
              width: '100%',
              height: '100%',
              background: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            height: '200px',
            background: `linear-gradient(135deg, ${categoryStyle.color}, ${categoryStyle.color}80)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '4rem',
            color: 'white'
          }}
        >
          🏥
        </div>
      )}

      {/* Content Section */}
      <div style={{ padding: '1.5rem', flex: 1 }}>
        {/* Meta Info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem',
            flexWrap: 'wrap'
          }}
        >
          <span
            style={{
              padding: '0.25rem 0.75rem',
              background: categoryStyle.bg,
              color: categoryStyle.color,
              borderRadius: '2rem',
              fontSize: '0.75rem',
              fontWeight: '600',
              textTransform: 'capitalize'
            }}
          >
            {category}
          </span>
          <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
            📅 {formatDate(date)}
          </span>
          <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
            ⏱️ {readTime}
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            color: 'white',
            fontSize: '1.25rem',
            fontWeight: '600',
            marginBottom: '0.75rem',
            lineHeight: 1.4,
            cursor: 'pointer'
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {title}
        </h2>

        {/* Excerpt/Content */}
        <div
          style={{
            color: '#d1d5db',
            fontSize: '0.875rem',
            lineHeight: 1.6,
            marginBottom: '1rem'
          }}
        >
          {isExpanded ? content : excerpt}
        </div>

        {/* Read More Button */}
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            style={{
              background: 'none',
              border: 'none',
              color: categoryStyle.color,
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              padding: 0,
              marginBottom: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            Read More
            <span style={{ fontSize: '1.1rem' }}>→</span>
          </button>
        )}

        {/* Show Less Button */}
        {isExpanded && (
          <button
            onClick={() => setIsExpanded(false)}
            style={{
              background: 'none',
              border: 'none',
              color: categoryStyle.color,
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              padding: 0,
              marginBottom: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            Show Less
            <span style={{ fontSize: '1.1rem' }}>↑</span>
          </button>
        )}

        {/* Author Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${categoryStyle.color}, ${categoryStyle.color}80)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
            >
              {author.charAt(0)}
            </div>
            <div>
              <div style={{ color: 'white', fontWeight: '500', fontSize: '0.875rem' }}>
                {author}
              </div>
              <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                {authorRole}
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              marginBottom: '1rem'
            }}
          >
            {tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  padding: '0.25rem 0.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '0.25rem',
                  color: '#9ca3af',
                  fontSize: '0.7rem'
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Interaction Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            paddingTop: '0.5rem'
          }}
        >
          <button
            onClick={handleLike}
            style={{
              background: 'none',
              border: 'none',
              color: isLiked ? '#ef4444' : '#9ca3af',
              fontSize: '1.1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              transition: 'color 0.2s'
            }}
          >
            <span>{isLiked ? '❤️' : '🤍'}</span>
            <span style={{ fontSize: '0.875rem' }}>{likeCount}</span>
          </button>

          <button
            onClick={() => {}}
            style={{
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              fontSize: '1.1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <span>💬</span>
            <span style={{ fontSize: '0.875rem' }}>{comments}</span>
          </button>

          <button
            onClick={handleShare}
            style={{
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              fontSize: '1.1rem',
              cursor: 'pointer',
              marginLeft: 'auto'
            }}
          >
            📤
          </button>

          <button
            onClick={() => {
              setIsBookmarked(!isBookmarked)
              if (onBookmark) onBookmark()
            }}
            style={{
              background: 'none',
              border: 'none',
              color: isBookmarked ? '#f59e0b' : '#9ca3af',
              fontSize: '1.1rem',
              cursor: 'pointer'
            }}
          >
            {isBookmarked ? '🔖' : '📑'}
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        .image-overlay {
          transition: opacity 0.3s;
        }
      `}</style>
    </article>
  )
}