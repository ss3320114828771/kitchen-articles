'use client'

import { useState, useEffect } from 'react'

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)

  // Mock orders data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders([
        {
          id: 'ORD-001',
          orderNumber: 'ORD-2024-001',
          date: '2024-03-05',
          customer: 'Hafiz Sajid Syed',
          email: 'hafizsajidsyed@gmail.com',
          total: 1299.99,
          status: 'delivered',
          paymentStatus: 'paid',
          items: 3,
          shipping: {
            address: '123 Tech Street',
            city: 'Innovation City',
            country: 'Pakistan',
            postalCode: '12345'
          }
        },
        {
          id: 'ORD-002',
          orderNumber: 'ORD-2024-002',
          date: '2024-03-04',
          customer: 'Ali Ahmed',
          email: 'ali.ahmed@email.com',
          total: 799.99,
          status: 'processing',
          paymentStatus: 'paid',
          items: 2,
          shipping: {
            address: '456 Digital Avenue',
            city: 'Tech Valley',
            country: 'Pakistan',
            postalCode: '54321'
          }
        },
        {
          id: 'ORD-003',
          orderNumber: 'ORD-2024-003',
          date: '2024-03-03',
          customer: 'Fatima Khan',
          email: 'fatima.k@email.com',
          total: 2499.99,
          status: 'pending',
          paymentStatus: 'unpaid',
          items: 5,
          shipping: {
            address: '789 Quantum Road',
            city: 'Silicon City',
            country: 'Pakistan',
            postalCode: '67890'
          }
        },
        {
          id: 'ORD-004',
          orderNumber: 'ORD-2024-004',
          date: '2024-03-02',
          customer: 'Omar Hassan',
          email: 'omar.h@email.com',
          total: 449.99,
          status: 'shipped',
          paymentStatus: 'paid',
          items: 1,
          shipping: {
            address: '321 Neural Lane',
            city: 'AI Town',
            country: 'Pakistan',
            postalCode: '13579'
          }
        },
        {
          id: 'ORD-005',
          orderNumber: 'ORD-2024-005',
          date: '2024-03-01',
          customer: 'Aisha Malik',
          email: 'aisha.m@email.com',
          total: 1899.99,
          status: 'delivered',
          paymentStatus: 'paid',
          items: 4,
          shipping: {
            address: '654 Byte Street',
            city: 'Digital City',
            country: 'Pakistan',
            postalCode: '24680'
          }
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  // Filter orders based on status and search
  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
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
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a8a 100%)'
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
              Orders Management
            </h2>
            <p style={{ color: '#d1d5db' }}>
              Total Orders: {filteredOrders.length}
            </p>
          </div>

          {/* Search Bar */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ position: 'relative' }}>
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
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '0.75rem 1rem 0.75rem 3rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.75rem',
                  color: 'white',
                  width: '250px',
                  outline: 'none'
                }}
              />
            </div>

            {/* Filter Dropdown */}
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
                outline: 'none'
              }}
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '3px solid rgba(255, 255, 255, 0.1)',
              borderTopColor: '#c084fc',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
          </div>
        ) : (
          <>
            {/* Desktop Table - Hidden on mobile */}
            <div style={{
              display: 'none',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '1rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              overflow: 'hidden'
            }} className="desktop-table">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Order ID</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Date</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Customer</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Items</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Total</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Status</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Payment</th>
                    <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
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
                          background: order.paymentStatus === 'paid' 
                            ? 'rgba(16, 185, 129, 0.1)' 
                            : 'rgba(239, 68, 68, 0.1)',
                          color: order.paymentStatus === 'paid' ? '#10b981' : '#ef4444',
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

            {/* Mobile Cards - Hidden on desktop */}
            <div style={{
              display: 'block',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '1rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              overflow: 'hidden'
            }} className="mobile-cards">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => viewOrderDetails(order)}
                  style={{
                    padding: '1rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ color: '#c084fc', fontWeight: '500' }}>
                      {order.orderNumber}
                    </span>
                    <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                      {formatDate(order.date)}
                    </span>
                  </div>
                  
                  <div style={{ marginBottom: '0.5rem' }}>
                    <div style={{ color: 'white', fontWeight: '500' }}>{order.customer}</div>
                    <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{order.email}</div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '2rem'
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
              {formatCurrency(orders.reduce((sum, order) => sum + order.total, 0))}
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
              {formatCurrency(orders.reduce((sum, order) => sum + order.total, 0) / (orders.length || 1))}
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>Pending Orders</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
              {orders.filter(o => o.status === 'pending').length}
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>Delivered</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
              {orders.filter(o => o.status === 'delivered').length}
            </div>
          </div>
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
                maxWidth: '600px',
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

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem'
                }}>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Date</div>
                    <div style={{ color: 'white' }}>{formatDate(selectedOrder.date)}</div>
                  </div>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Total</div>
                    <div style={{ color: 'white', fontWeight: 'bold' }}>
                      {formatCurrency(selectedOrder.total)}
                    </div>
                  </div>
                </div>

                <div>
                  <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    Customer Information
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '1rem',
                    borderRadius: '0.75rem'
                  }}>
                    <div style={{ color: 'white', fontWeight: '500' }}>{selectedOrder.customer}</div>
                    <div style={{ color: '#9ca3af' }}>{selectedOrder.email}</div>
                  </div>
                </div>

                <div>
                  <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    Shipping Address
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '1rem',
                    borderRadius: '0.75rem'
                  }}>
                    <div style={{ color: 'white' }}>{selectedOrder.shipping.address}</div>
                    <div style={{ color: '#9ca3af' }}>
                      {selectedOrder.shipping.city}, {selectedOrder.shipping.country} {selectedOrder.shipping.postalCode}
                    </div>
                  </div>
                </div>

                <div>
                  <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    Status
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '0.5rem 1rem',
                      background: getStatusBg(selectedOrder.status),
                      color: getStatusColor(selectedOrder.status),
                      borderRadius: '2rem'
                    }}>
                      {selectedOrder.status}
                    </span>
                    
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => {
                        updateOrderStatus(selectedOrder.id, e.target.value)
                        setSelectedOrder({ ...selectedOrder, status: e.target.value })
                      }}
                      style={{
                        padding: '0.5rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '0.5rem',
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

                <div>
                  <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    Payment Status
                  </div>
                  <span style={{
                    padding: '0.5rem 1rem',
                    background: selectedOrder.paymentStatus === 'paid' 
                      ? 'rgba(16, 185, 129, 0.1)' 
                      : 'rgba(239, 68, 68, 0.1)',
                    color: selectedOrder.paymentStatus === 'paid' ? '#10b981' : '#ef4444',
                    borderRadius: '2rem'
                  }}>
                    {selectedOrder.paymentStatus}
                  </span>
                </div>

                <button
                  onClick={() => {
                    window.print()
                  }}
                  style={{
                    marginTop: '1rem',
                    padding: '0.75rem',
                    background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                    border: 'none',
                    borderRadius: '0.75rem',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Print Invoice
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CSS Styles */}
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

        /* Responsive Design */
        @media (min-width: 768px) {
          .desktop-table {
            display: block !important;
          }
          .mobile-cards {
            display: none !important;
          }
        }

        @media (max-width: 767px) {
          .desktop-table {
            display: none !important;
          }
          .mobile-cards {
            display: block !important;
          }
          
          .stars {
            animation-duration: 30s;
          }
          .stars2 {
            animation-duration: 60s;
          }
          .stars3 {
            animation-duration: 90s;
          }
        }
      `}</style>
    </main>
  )
}