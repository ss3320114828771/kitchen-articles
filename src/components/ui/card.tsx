'use client'

import { useState } from 'react'
import Link from 'next/link'

interface CardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  hoverable?: boolean
  clickable?: boolean
  onClick?: () => void
  href?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  bordered?: boolean
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  gradient?: boolean
}

export default function Card({
  children,
  className = '',
  style = {},
  hoverable = false,
  clickable = false,
  onClick,
  href,
  padding = 'md',
  bordered = true,
  shadow = 'md',
  gradient = false
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Padding styles
  const paddingStyles = {
    none: { padding: 0 },
    sm: { padding: '1rem' },
    md: { padding: '1.5rem' },
    lg: { padding: '2rem' }
  }

  // Shadow styles
  const shadowStyles = {
    none: { boxShadow: 'none' },
    sm: { boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
    md: { boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
    lg: { boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }
  }

  // Base styles
  const baseStyles: React.CSSProperties = {
    background: gradient 
      ? 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(168,85,247,0.1))'
      : 'rgba(255,255,255,0.05)',
    borderRadius: '1rem',
    border: bordered ? '1px solid rgba(255,255,255,0.1)' : 'none',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    cursor: (clickable || href || onClick) ? 'pointer' : 'default',
    ...paddingStyles[padding],
    ...shadowStyles[shadow],
    ...style
  }

  // Hover styles
  const hoverStyles: React.CSSProperties = hoverable || clickable || href || onClick
    ? {
        transform: isHovered ? 'translateY(-4px)' : 'none',
        boxShadow: isHovered ? '0 12px 28px rgba(0,0,0,0.25)' : shadowStyles[shadow].boxShadow,
        background: isHovered && !gradient
          ? 'rgba(255,255,255,0.08)'
          : baseStyles.background
      }
    : {}

  const combinedStyles = { ...baseStyles, ...hoverStyles }

  // If href is provided, render as Link
  if (href) {
    return (
      <Link
        href={href}
        className={className}
        style={combinedStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </Link>
    )
  }

  // Otherwise render as div
  return (
    <div
      className={className}
      style={combinedStyles}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  )
}

// Card Header component
export function CardHeader({
  children,
  className,
  style
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={className}
      style={{
        padding: '1rem 1.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        fontWeight: '600',
        fontSize: '1.125rem',
        color: 'white',
        ...style
      }}
    >
      {children}
    </div>
  )
}

// Card Body component
export function CardBody({
  children,
  className,
  style
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={className}
      style={{
        padding: '1.5rem',
        ...style
      }}
    >
      {children}
    </div>
  )
}

// Card Footer component
export function CardFooter({
  children,
  className,
  style
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={className}
      style={{
        padding: '1rem 1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        ...style
      }}
    >
      {children}
    </div>
  )
}

// Card Title component
export function CardTitle({
  children,
  className,
  style
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <h3
      className={className}
      style={{
        color: 'white',
        fontSize: '1.25rem',
        fontWeight: '600',
        margin: '0 0 0.5rem 0',
        ...style
      }}
    >
      {children}
    </h3>
  )
}

// Card Subtitle component
export function CardSubtitle({
  children,
  className,
  style
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <h4
      className={className}
      style={{
        color: '#9ca3af',
        fontSize: '0.875rem',
        fontWeight: '400',
        margin: '0 0 1rem 0',
        ...style
      }}
    >
      {children}
    </h4>
  )
}

// Card Image component
export function CardImage({
  src,
  alt,
  height = 200,
  className,
  style
}: {
  src: string
  alt: string
  height?: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={className}
      style={{
        height: `${height}px`,
        background: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderTopLeftRadius: '1rem',
        borderTopRightRadius: '1rem',
        ...style
      }}
    />
  )
}

// Card Actions component
export function CardActions({
  children,
  className,
  style
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        gap: '0.5rem',
        marginTop: '1rem',
        ...style
      }}
    >
      {children}
    </div>
  )
}