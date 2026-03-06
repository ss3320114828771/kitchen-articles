'use client'

import { useState, useEffect } from 'react'

export default function AdminOrdersPage() {
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<any[]>([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [dateRange, setDateRange] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  // Load orders data
  useEffect(() => {
    setTimeout(() => {
      setOrders([
        {
          id: 'ORD-001',
          orderNumber: 'ORD-2024-001',
          date: '2024-03-05',
          customer: 'Hafiz Sajid Syed',
          email: 'hafizsajidsyed@gmail.com',
          phone: '+92 300 1234567',
          total: 1299.99,
          status: 'delivered',
          paymentStatus: 'paid',
          paymentMethod: 'Credit Card',
          items: 3,
          shipping: {
            address: '123 Tech Street',
            city: 'Innovation City',
            country: 'Pakistan',
            postalCode: '12345'
          },
          notes: 'Leave at front door'
        },
        {
          id: 'ORD-002',
          orderNumber: 'ORD-2024-002',
          date: '2024-03-04',
          customer: 'Ali Ahmed',
          email: 'ali.ahmed@email.com',
          phone: '+92 321 7654321',
          total: 799.99,
          status: 'processing',
          paymentStatus: 'paid',
          paymentMethod: 'Bank Transfer',
          items: 2,
          shipping: {
            address: '456 Digital Avenue',
            city: 'Tech Valley',
            country: 'Pakistan',
            postalCode: '54321'
          },
          notes: ''
        },
        {
          id: 'ORD-003',
          orderNumber: 'ORD-2024-003',
          date: '2024-03-03',
          customer: 'Fatima Khan',
          email: 'fatima.k@email.com',
          phone: '+92 333 9876543',
          total: 2499.99,
          status: 'pending',
          paymentStatus: 'unpaid',
          paymentMethod: 'Cash on Delivery',
          items: 5,
          shipping: {
            address: '789 Quantum Road',
            city: 'Silicon City',
            country: 'Pakistan',
            postalCode: '67890'
          },
          notes: 'Call before delivery'
        },
        {
          id: 'ORD-004',
          orderNumber: 'ORD-2024-004',
          date: '2024-03-02',
          customer: 'Omar Hassan',
          email: 'omar.h@email.com',
          phone: '+92 345 6789012',
          total: 449.99,
          status: 'shipped',
          paymentStatus: 'paid',
          paymentMethod: 'Credit Card',
          items: 1,
          shipping: {
            address: '321 Neural Lane',
            city: 'AI Town',
            country: 'Pakistan',
            postalCode: '13579'
          },
          notes: ''
        },
        {
          id: 'ORD-005',
          orderNumber: 'ORD-2024-005',
          date: '2024-03-01',
          customer: 'Aisha Malik',
          email: 'aisha.m@email.com',
          phone: '+92 312 3456789',
          total: 1899.99,
          status: 'delivered',
          paymentStatus: 'paid',
          paymentMethod: 'PayPal',
          items: 4,
          shipping: {
            address: '654 Byte Street',
            city: 'Digital City',
            country: 'Pakistan',
            postalCode: '24680'
          },
          notes: 'Ring doorbell'
        },
        {
          id: 'ORD-006',
          orderNumber: 'ORD-2024-006',
          date: '2024-02-28',
          customer: 'Bilal Ahmed',
          email: 'bilal.a@email.com',
          phone: '+92 334 5678901',
          total: 3499.99,
          status: 'cancelled',
          paymentStatus: 'refunded',
          paymentMethod: 'Credit Card',
          items: 3,
          shipping: {
            address: '987 Code Lane',
            city: 'Program City',
            country: 'Pakistan',
            postalCode: '11223'
          },
          notes: 'Customer cancelled'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter
    
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm)
    
    let matchesDate = true
    const orderDate = new Date(order.date)
    const today = new Date()
    
    if (dateRange === 'today') {
      matchesDate = orderDate.toDateString() === today.toDateString()
    } else if (dateRange === 'week') {
      const weekAgo = new Date()
      weekAgo.setDate(today.getDate() - 7)
      matchesDate = orderDate >= weekAgo
    } else if (dateRange === 'month') {
      const monthAgo = new Date()
      monthAgo.setMonth(today.getMonth() - 1)
      matchesDate = orderDate >= monthAgo
    }
    
    return matchesFilter && matchesSearch && matchesDate
  })

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortBy === 'oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    } else if (sortBy === 'highest') {
      return b.total - a.total
    } else if (sortBy === 'lowest') {
      return a.total - b.total
    }
    return 0
  })

  // Get status color
  const getStatusColor = (status: string) => {
    const colors: {[key: string]: string} = {
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
    const colors: {[key: string]: string} = {
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

  // Handle view details
  const viewOrderDetails = (order: any) => {
    setSelectedOrder(order)
    setShowDetails(true)
  }

  // Handle status update
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    )
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }
  }

  // Handle delete order
  const deleteOrder = (orderId: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId))
      setShowDetails(false)
    }
  }

  // Calculate totals
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const pendingRevenue = orders.filter(o => o.status === 'pending').reduce((sum, order) => sum + order.total, 0)
  const completedOrders = orders.filter(o => o.status === 'delivered').length
  const pendingOrders = orders.filter(o => o.status === 'pending').length

  if (loading) {
    return (
      <main style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '3px solid rgba(255, 255, 255, 0.1)',
          borderTopColor: '#c084fc',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </main>
    )
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)'
    }}>
      {/* Star Field Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      {/* Bismillah */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        paddingTop: '1rem'
      }}>
        <h1 style={{
          fontSize: 'clamp(1.25rem, 4vw, 2.5rem)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          textAlign: 'center',
          padding: '0.5rem 0',
          background: 'linear-gradient(135deg, #86efac, #60a5fa, #c084fc)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'pulse 2s infinite'
        }}>
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </h1>
      </div>

      {/* Main Content */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        padding: '1rem',
        maxWidth: '1400px',
        margin: '0 auto'
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
              fontSize: '2rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #60a5fa, #c084fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem'
            }}>
              Admin Orders Management
            </h2>
            <p style={{ color: '#d1d5db' }}>
              Total Orders: {orders.length} | Pending: {pendingOrders} | Completed: {completedOrders}
            </p>
          </div>

          {/* Export Button */}
          <button
            onClick={() => alert('Exporting orders...')}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              border: 'none',
              borderRadius: '0.75rem',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span>📥</span>
            Export Orders
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>Total Revenue</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
              {formatCurrency(totalRevenue)}
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>Pending Revenue</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
              {formatCurrency(pendingRevenue)}
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>Avg Order Value</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
              {formatCurrency(orders.length > 0 ? totalRevenue / orders.length : 0)}
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>Conversion Rate</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
              {orders.length > 0 ? ((completedOrders / orders.length) * 100).toFixed(1) : 0}%
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
            <span style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af'
            }}>
              🔍
            </span>
            <input
              type="text"
              placeholder="Search by order, customer, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 3rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '0.75rem',
                color: 'white',
                outline: 'none'
              }}
            />
          </div>

          {/* Status Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '0.75rem',
              color: 'white',
              cursor: 'pointer',
              minWidth: '150px'
            }}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Date Range */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '0.75rem',
              color: 'white',
              cursor: 'pointer',
              minWidth: '150px'
            }}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '0.75rem',
              color: 'white',
              cursor: 'pointer',
              minWidth: '150px'
            }}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Total</option>
            <option value="lowest">Lowest Total</option>
          </select>
        </div>

        {/* Orders Table */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          overflow: 'auto'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
            <thead>
              <tr style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
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
              {sortedOrders.map((order) => (
                <tr 
                  key={order.id} 
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'background 0.3s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                  onClick={() => viewOrderDetails(order)}
                >
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
                      fontWeight: '500'
                    }}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
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
                      fontWeight: '500'
                    }}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        viewOrderDetails(order)
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        background: 'rgba(168, 85, 247, 0.2)',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                        borderRadius: '0.5rem',
                        color: '#c084fc',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Details Modal */}
        {showDetails && selectedOrder && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
          onClick={() => setShowDetails(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
                borderRadius: '1.5rem',
                padding: '2rem',
                maxWidth: '800px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                position: 'relative'
              }}
            >
              <button
                onClick={() => setShowDetails(false)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>

              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                color: 'white'
              }}>
                Order Details - {selectedOrder.orderNumber}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Order Summary */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem'
                }}>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Date</div>
                    <div style={{ color: 'white' }}>{formatDate(selectedOrder.date)}</div>
                  </div>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Total Amount</div>
                    <div style={{ color: 'white', fontWeight: 'bold' }}>
                      {formatCurrency(selectedOrder.total)}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Payment Method</div>
                    <div style={{ color: 'white' }}>{selectedOrder.paymentMethod}</div>
                  </div>
                </div>

                {/* Customer Information */}
                <div>
                  <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '0.75rem' }}>
                    Customer Information
                  </h4>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '1rem',
                    borderRadius: '0.75rem'
                  }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Name</div>
                        <div style={{ color: 'white' }}>{selectedOrder.customer}</div>
                      </div>
                      <div>
                        <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Email</div>
                        <div style={{ color: 'white' }}>{selectedOrder.email}</div>
                      </div>
                      <div>
                        <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Phone</div>
                        <div style={{ color: 'white' }}>{selectedOrder.phone}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '0.75rem' }}>
                    Shipping Address
                  </h4>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '1rem',
                    borderRadius: '0.75rem'
                  }}>
                    <div style={{ color: 'white' }}>{selectedOrder.shipping.address}</div>
                    <div style={{ color: '#9ca3af' }}>
                      {selectedOrder.shipping.city}, {selectedOrder.shipping.country} {selectedOrder.shipping.postalCode}
                    </div>
                    {selectedOrder.notes && (
                      <div style={{ marginTop: '0.5rem', color: '#f59e0b' }}>
                        📝 {selectedOrder.notes}
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Management */}
                <div>
                  <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '0.75rem' }}>
                    Order Status
                  </h4>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '0.5rem 1rem',
                      background: getStatusBg(selectedOrder.status),
                      color: getStatusColor(selectedOrder.status),
                      borderRadius: '2rem',
                      fontWeight: '500'
                    }}>
                      Current: {selectedOrder.status}
                    </span>
                    
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                      style={{
                        padding: '0.5rem 1rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '0.75rem',
                        color: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Payment Status */}
                <div>
                  <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '0.75rem' }}>
                    Payment Status
                  </h4>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{
                      padding: '0.5rem 1rem',
                      background: selectedOrder.paymentStatus === 'paid' || selectedOrder.paymentStatus === 'refunded'
                        ? 'rgba(16, 185, 129, 0.1)' 
                        : 'rgba(239, 68, 68, 0.1)',
                      color: selectedOrder.paymentStatus === 'paid' || selectedOrder.paymentStatus === 'refunded'
                        ? '#10b981' 
                        : '#ef4444',
                      borderRadius: '2rem'
                    }}>
                      {selectedOrder.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button
                    onClick={() => window.print()}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                      border: 'none',
                      borderRadius: '0.75rem',
                      color: 'white',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    🖨️ Print Invoice
                  </button>
                  
                  <button
                    onClick={() => deleteOrder(selectedOrder.id)}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '0.75rem',
                      color: '#ef4444',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    🗑️ Delete Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CSS Animations */}
      <style>{`
        @keyframes animateStars {
          from { transform: translateY(0px); }
          to { transform: translateY(-2000px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .stars, .stars2, .stars3 {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: block;
        }
        
        .stars {
          background: transparent url('data:image/svg+xml;utf8,<svg width="3" height="3" viewBox="0 0 3 3" xmlns="http://www.w3.org/2000/svg"><circle cx="1.5" cy="1.5" r="1" fill="white" opacity="0.5"/></svg>') repeat;
          animation: animateStars 50s linear infinite;
        }
        
        .stars2 {
          background: transparent url('data:image/svg+xml;utf8,<svg width="2" height="2" viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg"><circle cx="1" cy="1" r="0.8" fill="white" opacity="0.3"/></svg>') repeat;
          animation: animateStars 100s linear infinite;
        }
        
        .stars3 {
          background: transparent url('data:image/svg+xml;utf8,<svg width="4" height="4" viewBox="0 0 4 4" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="1.2" fill="white" opacity="0.2"/></svg>') repeat;
          animation: animateStars 150s linear infinite;
        }

        @media (max-width: 768px) {
          .stars { animation-duration: 30s; }
          .stars2 { animation-duration: 60s; }
          .stars3 { animation-duration: 90s; }
        }
      `}</style>
    </main>
  )
}