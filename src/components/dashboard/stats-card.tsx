'use client'

import { useState } from 'react'
import Link from 'next/link'

interface StatsCardProps {
  title: string
  value: string | number
  icon: string
  description?: string
  trend?: {
    value: number
    isPositive: boolean
    label?: string
  }
  color?: 'blue' | 'purple' | 'green' | 'red' | 'yellow' | 'pink'
  link?: string
  onClick?: () => void
  loading?: boolean
  formatter?: (value: number) => string
  precision?: number
}

export default function StatsCard({
  title,
  value,
  icon,
  description,
  trend,
  color = 'blue',
  link,
  onClick,
  loading = false,
  formatter,
  precision = 2
}: StatsCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Color gradients
  const colorGradients: { [key: string]: { from: string; to: string; light: string } } = {
    blue: { from: '#3b82f6', to: '#2563eb', light: 'rgba(59, 130, 246, 0.1)' },
    purple: { from: '#a855f7', to: '#9333ea', light: 'rgba(168, 85, 247, 0.1)' },
    green: { from: '#10b981', to: '#059669', light: 'rgba(16, 185, 129, 0.1)' },
    red: { from: '#ef4444', to: '#dc2626', light: 'rgba(239, 68, 68, 0.1)' },
    yellow: { from: '#f59e0b', to: '#d97706', light: 'rgba(245, 158, 11, 0.1)' },
    pink: { from: '#ec4899', to: '#db2777', light: 'rgba(236, 72, 153, 0.1)' }
  }

  const gradient = colorGradients[color]

  // Format value
  const formatValue = (val: string | number): string => {
    if (typeof val === 'string') return val
    if (formatter) return formatter(val)
    
    // Default formatting for numbers
    if (val >= 1000000) {
      return (val / 1000000).toFixed(1) + 'M'
    }
    if (val >= 1000) {
      return (val / 1000).toFixed(1) + 'K'
    }
    return val.toLocaleString(undefined, {
      maximumFractionDigits: precision,
      minimumFractionDigits: 0
    })
  }

  // Handle click
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (link) {
      window.location.href = link
    }
  }

  // Card content
  const CardContent = () => (
    <div
      style={{
        background: isHovered ? gradient.light : 'rgba(255, 255, 255, 0.05)',
        borderRadius: '1rem',
        padding: '1.5rem',
        border: `1px solid ${isHovered ? gradient.from + '40' : 'rgba(255, 255, 255, 0.1)'}`,
        transition: 'all 0.3s ease',
        cursor: link || onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '120px',
          height: '120px',
          background: `linear-gradient(135deg, ${gradient.from}20, ${gradient.to}10)`,
          borderRadius: '50%',
          zIndex: 0
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header with icon and title */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem'
        }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              color: 'white',
              boxShadow: `0 4px 12px ${gradient.from}40`
            }}
          >
            {icon}
          </div>

          {/* Trend indicator */}
          {trend && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.25rem 0.75rem',
                background: trend.isPositive 
                  ? 'rgba(16, 185, 129, 0.1)' 
                  : 'rgba(239, 68, 68, 0.1)',
                borderRadius: '2rem',
                color: trend.isPositive ? '#10b981' : '#ef4444',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
              {trend.label && (
                <span style={{ fontSize: '0.75rem', opacity: 0.7, marginLeft: '0.25rem' }}>
                  {trend.label}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Title */}
        <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
          {title}
        </div>

        {/* Value */}
        <div style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: 'white',
          lineHeight: 1.2,
          marginBottom: description ? '0.5rem' : 0
        }}>
          {loading ? (
            <div
              style={{
                width: '100px',
                height: '2rem',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '0.25rem',
                animation: 'pulse 1.5s infinite'
              }}
            />
          ) : (
            formatValue(value)
          )}
        </div>

        {/* Description */}
        {description && (
          <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
            {description}
          </div>
        )}

        {/* Hover indicator for clickable cards */}
        {(link || onClick) && isHovered && (
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              color: gradient.from,
              fontSize: '1.25rem',
              animation: 'slideRight 0.3s ease'
            }}
          >
            →
          </div>
        )}
      </div>
    </div>
  )

  // Wrap with Link if link is provided
  if (link && !onClick) {
    return (
      <Link href={link} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        <CardContent />
      </Link>
    )
  }

  return <CardContent />
}

// Variants for common use cases
export function RevenueCard({ value, trend, loading }: { value: number; trend?: any; loading?: boolean }) {
  return (
    <StatsCard
      title="Total Revenue"
      value={value}
      icon="💰"
      trend={trend}
      color="green"
      link="/admin/orders"
      formatter={(val) => `$${val.toLocaleString()}`}
      loading={loading}
    />
  )
}

export function OrdersCard({ value, pending, loading }: { value: number; pending?: number; loading?: boolean }) {
  return (
    <StatsCard
      title="Total Orders"
      value={value}
      icon="📦"
      description={pending ? `${pending} pending` : undefined}
      color="blue"
      link="/admin/orders"
      loading={loading}
    />
  )
}

export function CustomersCard({ value, new_, loading }: { value: number; new_?: number; loading?: boolean }) {
  return (
    <StatsCard
      title="Total Customers"
      value={value}
      icon="👥"
      description={new_ ? `${new_} new this month` : undefined}
      color="purple"
      link="/admin/users"
      loading={loading}
    />
  )
}

export function ProductsCard({ value, lowStock, loading }: { value: number; lowStock?: number; loading?: boolean }) {
  return (
    <StatsCard
      title="Total Products"
      value={value}
      icon="🛍️"
      description={lowStock ? `${lowStock} low in stock` : undefined}
      color="yellow"
      link="/admin/products"
      loading={loading}
    />
  )
}