'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Order {
  id: string
  orderNumber: string
  date: string
  customer: string
  email: string
  phone: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  items: number
}

interface OrderTableProps {
  orders: Order[]
  onViewDetails: (order: Order) => void
  onUpdateStatus: (orderId: string, newStatus: string) => void
  onDeleteOrder: (orderId: string) => void
  loading?: boolean
}

export default function OrderTable({ 
  orders, 
  onViewDetails, 
  onUpdateStatus, 
  onDeleteOrder,
  loading = false 
}: OrderTableProps) {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount
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

  // Toggle select all
  const toggleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(orders.map(o => o.id))
    }
  }

  // Toggle select order
  const toggleSelectOrder = (orderId: string) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId))
    } else {
      setSelectedOrders([...selectedOrders, orderId])
    }
  }

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
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  if (loading) {
    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '1rem',
        padding: '4rem',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(255,255,255,0.1)',
          borderTopColor: '#c084fc',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 1rem'
        }}></div>
        <p style={{ color: '#9ca3af' }}>Loading orders...</p>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '1rem',
        padding: '4rem 2rem',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
        <h3 style={{ color: 'white', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
          No orders found
        </h3>
        <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>
          There are no orders to display at the moment.
        </p>
        <Link href="/admin/orders/new" style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
          borderRadius: '0.5rem',
          color: 'white',
          textDecoration: 'none',
          fontWeight: '600'
        }}>
          Create New Order
        </Link>
      </div>
    )
  }

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '1rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      overflow: 'hidden'
    }}>
      {/* Bulk Actions Bar */}
      {selectedOrders.length > 0 && (
        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <span style={{ color: '#3b82f6' }}>
            {selectedOrders.length} order{selectedOrders.length > 1 ? 's' : ''} selected
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => {
                selectedOrders.forEach(id => onUpdateStatus(id, 'processing'))
                setSelectedOrders([])
              }}
              style={{
                padding: '0.25rem 0.75rem',
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '0.25rem',
                color: '#f59e0b',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Mark Processing
            </button>
            <button
              onClick={() => {
                selectedOrders.forEach(id => onUpdateStatus(id, 'shipped'))
                setSelectedOrders([])
              }}
              style={{
                padding: '0.25rem 0.75rem',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '0.25rem',
                color: '#3b82f6',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Mark Shipped
            </button>
            <button
              onClick={() => {
                selectedOrders.forEach(id => onUpdateStatus(id, 'delivered'))
                setSelectedOrders([])
              }}
              style={{
                padding: '0.25rem 0.75rem',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '0.25rem',
                color: '#10b981',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Mark Delivered
            </button>
          </div>
        </div>
      )}

      {/* Desktop Table View */}
      {!isMobile && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
            <thead>
              <tr style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <th style={{ padding: '1rem', width: '40px' }}>
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === orders.length && orders.length > 0}
                    onChange={toggleSelectAll}
                    style={{
                      width: '1rem',
                      height: '1rem',
                      accentColor: '#c084fc',
                      cursor: 'pointer'
                    }}
                  />
                </th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Order ID</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Date</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Customer</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Contact</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Items</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Total</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Payment</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr 
                  key={order.id} 
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'background 0.3s',
                    background: selectedOrders.includes(order.id) ? 'rgba(168, 85, 247, 0.05)' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!selectedOrders.includes(order.id)) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!selectedOrders.includes(order.id)) {
                      e.currentTarget.style.background = 'transparent'
                    }
                  }}
                >
                  <td style={{ padding: '1rem' }}>
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => toggleSelectOrder(order.id)}
                      style={{
                        width: '1rem',
                        height: '1rem',
                        accentColor: '#c084fc',
                        cursor: 'pointer'
                      }}
                    />
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ color: '#c084fc', fontWeight: '500' }}>
                      {order.orderNumber}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: '#d1d5db' }}>
                    {formatDate(order.date)}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ color: 'white', fontWeight: '500' }}>{order.customer}</div>
                    <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{order.email}</div>
                  </td>
                  <td style={{ padding: '1rem', color: '#d1d5db', fontSize: '0.875rem' }}>
                    {order.phone}
                  </td>
                  <td style={{ padding: '1rem', color: '#d1d5db' }}>{order.items}</td>
                  <td style={{ padding: '1rem', color: 'white', fontWeight: '600' }}>
                    {formatCurrency(order.total)}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      background: getStatusBg(order.status),
                      color: getStatusColor(order.status),
                      borderRadius: '1rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      textTransform: 'capitalize'
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      background: order.paymentStatus === 'paid' || order.paymentStatus === 'refunded'
                        ? 'rgba(16, 185, 129, 0.1)' 
                        : 'rgba(239, 68, 68, 0.1)',
                      color: order.paymentStatus === 'paid' || order.paymentStatus === 'refunded'
                        ? '#10b981' 
                        : '#ef4444',
                      borderRadius: '1rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      textTransform: 'capitalize'
                    }}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => onViewDetails(order)}
                        style={{
                          padding: '0.5rem',
                          background: 'rgba(59, 130, 246, 0.1)',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          borderRadius: '0.5rem',
                          color: '#3b82f6',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          lineHeight: 1
                        }}
                        title="View Details"
                      >
                        👁️
                      </button>
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                        style={{
                          padding: '0.5rem',
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '0.5rem',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this order?')) {
                            onDeleteOrder(order.id)
                          }
                        }}
                        style={{
                          padding: '0.5rem',
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          borderRadius: '0.5rem',
                          color: '#ef4444',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          lineHeight: 1
                        }}
                        title="Delete Order"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Card View */}
      {isMobile && (
        <div style={{ padding: '1rem' }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                background: selectedOrders.includes(order.id) 
                  ? 'rgba(168, 85, 247, 0.1)' 
                  : 'rgba(255, 255, 255, 0.03)',
                borderRadius: '1rem',
                padding: '1rem',
                marginBottom: '1rem',
                border: selectedOrders.includes(order.id)
                  ? '1px solid #c084fc'
                  : '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Card Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => toggleSelectOrder(order.id)}
                    style={{
                      width: '1rem',
                      height: '1rem',
                      accentColor: '#c084fc'
                    }}
                  />
                  <span style={{ color: '#c084fc', fontWeight: '500' }}>
                    {order.orderNumber}
                  </span>
                </div>
                <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                  {formatDate(order.date)}
                </span>
              </div>

              {/* Customer Info */}
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ color: 'white', fontWeight: '500' }}>{order.customer}</div>
                <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{order.email}</div>
                <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  {order.phone}
                </div>
              </div>

              {/* Order Stats */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem'
              }}>
                <div>
                  <span style={{ color: '#d1d5db' }}>{order.items} items • </span>
                  <span style={{ color: 'white', fontWeight: '600' }}>
                    {formatCurrency(order.total)}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    background: getStatusBg(order.status),
                    color: getStatusColor(order.status),
                    borderRadius: '1rem',
                    fontSize: '0.75rem'
                  }}>
                    {order.status}
                  </span>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    background: order.paymentStatus === 'paid' || order.paymentStatus === 'refunded'
                      ? 'rgba(16, 185, 129, 0.1)' 
                      : 'rgba(239, 68, 68, 0.1)',
                    color: order.paymentStatus === 'paid' || order.paymentStatus === 'refunded'
                      ? '#10b981' 
                      : '#ef4444',
                    borderRadius: '1rem',
                    fontSize: '0.75rem'
                  }}>
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Expandable Section */}
              {expandedOrder === order.id && (
                <div style={{
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ color: '#9ca3af', fontSize: '0.75rem', display: 'block', marginBottom: '0.25rem' }}>
                      Update Status
                    </label>
                    <select
                      value={order.status}
                      onChange={(e) => {
                        onUpdateStatus(order.id, e.target.value)
                        setExpandedOrder(null)
                      }}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '0.5rem',
                        color: 'white',
                        marginBottom: '0.5rem'
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => onViewDetails(order)}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        background: 'rgba(59, 130, 246, 0.1)',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: '0.5rem',
                        color: '#3b82f6',
                        cursor: 'pointer'
                      }}
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this order?')) {
                          onDeleteOrder(order.id)
                        }
                      }}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '0.5rem',
                        color: '#ef4444',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}

              {/* Expand/Collapse Button */}
              {!expandedOrder || expandedOrder !== order.id ? (
                <button
                  onClick={() => setExpandedOrder(order.id)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.5rem',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    marginTop: '0.5rem'
                  }}
                >
                  More Options ↓
                </button>
              ) : (
                <button
                  onClick={() => setExpandedOrder(null)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.5rem',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    marginTop: '0.5rem'
                  }}
                >
                  Show Less ↑
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}