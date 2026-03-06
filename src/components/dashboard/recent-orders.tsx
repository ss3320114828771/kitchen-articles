'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Order {
  id: string
  orderNumber: string
  date: string
  customer: string
  email: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: number
}

interface RecentOrdersProps {
  orders: Order[]
  title?: string
  viewAllLink?: string
  maxItems?: number
  showViewAll?: boolean
  onViewOrder?: (orderId: string) => void
  loading?: boolean
}

export default function RecentOrders({
  orders,
  title = 'Recent Orders',
  viewAllLink = '/dashboard/orders',
  maxItems = 5,
  showViewAll = true,
  onViewOrder,
  loading = false
}: RecentOrdersProps) {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
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

  // Limit orders
  const displayedOrders = orders.slice(0, maxItems)

  // Get status color
  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      delivered: '#10b981',
      shipped: '#3b82f6',
      processing: '#f59e0b',
      pending: '#ef4444',
      cancelled: '#6b7280'
    }
    return colors[status] || '#6b7280'
  }

  // Get status background
  const getStatusBg = (status: string) => {
    const colors: { [key: string]: string } = {
      delivered: 'rgba(16, 185, 129, 0.1)',
      shipped: 'rgba(59, 130, 246, 0.1)',
      processing: 'rgba(245, 158, 11, 0.1)',
      pending: 'rgba(239, 68, 68, 0.1)',
      cancelled: 'rgba(107, 114, 128, 0.1)'
    }
    return colors[status] || 'rgba(107, 114, 128, 0.1)'
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      return 'Today'
    } else if (diffDays === 1) {
      return 'Yesterday'
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  // Handle view order
  const handleViewOrder = (orderId: string) => {
    if (onViewOrder) {
      onViewOrder(orderId)
    } else {
      window.location.href = `/dashboard/orders/${orderId}`
    }
  }

  if (loading) {
    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '1rem',
        padding: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>
            {title}
          </h3>
        </div>
        
        {/* Loading Skeletons */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              padding: '1rem',
              marginBottom: i < 5 ? '0.5rem' : 0,
              borderBottom: i < 5 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              animation: 'pulse 1.5s infinite'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  width: '120px',
                  height: '1rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.25rem',
                  marginBottom: '0.5rem'
                }} />
                <div style={{
                  width: '80px',
                  height: '0.875rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.25rem'
                }} />
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  width: '80px',
                  height: '1rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.25rem',
                  marginBottom: '0.5rem'
                }} />
                <div style={{
                  width: '60px',
                  height: '0.875rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.25rem',
                  marginLeft: 'auto'
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '1rem',
        padding: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>📦</div>
        <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
          No orders yet
        </h3>
        <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          When you place orders, they will appear here.
        </p>
        <Link
          href="/products"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
            borderRadius: '0.5rem',
            color: 'white',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '0.875rem'
          }}
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '1rem',
      padding: '1.5rem',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>
          {title}
        </h3>
        {showViewAll && orders.length > maxItems && (
          <Link
            href={viewAllLink}
            style={{
              color: '#c084fc',
              fontSize: '0.875rem',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            View All
            <span style={{ fontSize: '1.1rem' }}>→</span>
          </Link>
        )}
      </div>

      {/* Desktop View */}
      {!isMobile && (
        <div>
          {displayedOrders.map((order, index) => (
            <div
              key={order.id}
              onClick={() => handleViewOrder(order.id)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                cursor: 'pointer',
                borderBottom: index < displayedOrders.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                transition: 'background 0.2s',
                borderRadius: index === 0 ? '0.5rem 0.5rem 0 0' : 
                           index === displayedOrders.length - 1 ? '0 0 0.5rem 0.5rem' : '0'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {/* Order Info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: '#c084fc', fontWeight: '500', fontSize: '0.875rem' }}>
                    {order.orderNumber}
                  </span>
                  <span style={{
                    padding: '0.125rem 0.5rem',
                    background: getStatusBg(order.status),
                    color: getStatusColor(order.status),
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: '500'
                  }}>
                    {order.status}
                  </span>
                </div>
                <div style={{ color: 'white', fontWeight: '500', marginBottom: '0.25rem' }}>
                  {order.customer}
                </div>
                <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                  {order.items} {order.items === 1 ? 'item' : 'items'} • {formatDate(order.date)}
                </div>
              </div>

              {/* Total */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: 'white', fontWeight: '600', fontSize: '1.1rem' }}>
                  {formatCurrency(order.total)}
                </div>
                <div style={{ color: '#9ca3af', fontSize: '0.7rem' }}>
                  {order.email}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile View */}
      {isMobile && (
        <div>
          {displayedOrders.map((order, index) => (
            <div
              key={order.id}
              onClick={() => handleViewOrder(order.id)}
              style={{
                padding: '1rem',
                cursor: 'pointer',
                background: expandedOrder === order.id ? 'rgba(168, 85, 247, 0.05)' : 'transparent',
                borderBottom: index < displayedOrders.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                borderRadius: index === 0 ? '0.5rem 0.5rem 0 0' : 
                           index === displayedOrders.length - 1 ? '0 0 0.5rem 0.5rem' : '0'
              }}
            >
              {/* Order Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <span style={{ color: '#c084fc', fontWeight: '500', fontSize: '0.875rem' }}>
                  {order.orderNumber}
                </span>
                <span style={{
                  padding: '0.125rem 0.5rem',
                  background: getStatusBg(order.status),
                  color: getStatusColor(order.status),
                  borderRadius: '1rem',
                  fontSize: '0.7rem'
                }}>
                  {order.status}
                </span>
              </div>

              {/* Customer & Date */}
              <div style={{ marginBottom: '0.5rem' }}>
                <div style={{ color: 'white', fontWeight: '500', fontSize: '1rem' }}>
                  {order.customer}
                </div>
                <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                  {formatDate(order.date)}
                </div>
              </div>

              {/* Items & Total */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                  {order.items} {order.items === 1 ? 'item' : 'items'}
                </span>
                <span style={{ color: 'white', fontWeight: '600' }}>
                  {formatCurrency(order.total)}
                </span>
              </div>

              {/* Expand for email */}
              {expandedOrder === order.id && (
                <div style={{
                  marginTop: '0.75rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#9ca3af',
                  fontSize: '0.75rem'
                }}>
                  📧 {order.email}
                </div>
              )}

              {/* Expand/Collapse Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setExpandedOrder(expandedOrder === order.id ? null : order.id)
                }}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  marginTop: '0.5rem',
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.5rem',
                  color: '#9ca3af',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                {expandedOrder === order.id ? 'Show less ↑' : 'Show details ↓'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* CSS Animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}