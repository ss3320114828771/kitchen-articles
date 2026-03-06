'use client'

import { useState, useEffect } from 'react'

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [greeting, setGreeting] = useState('')
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalProducts: 0,
    pendingOrders: 0,
    lowStock: 0
  })

  // Load dashboard data
  useEffect(() => {
    // Set greeting based on time
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 18) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')

    // Simulate API call
    setTimeout(() => {
      setStats({
        totalOrders: 156,
        totalRevenue: 45678.90,
        totalCustomers: 89,
        totalProducts: 234,
        pendingOrders: 12,
        lowStock: 5
      })
      setLoading(false)
    }, 1000)
  }, [])

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  // Recent orders data
  const recentOrders = [
    { id: 'ORD-001', customer: 'Ali Ahmed', amount: 1299.99, status: 'delivered', date: '2024-03-05' },
    { id: 'ORD-002', customer: 'Fatima Khan', amount: 799.99, status: 'processing', date: '2024-03-04' },
    { id: 'ORD-003', customer: 'Omar Hassan', amount: 2499.99, status: 'pending', date: '2024-03-03' },
    { id: 'ORD-004', customer: 'Aisha Malik', amount: 449.99, status: 'shipped', date: '2024-03-02' },
    { id: 'ORD-005', customer: 'Bilal Ahmed', amount: 1899.99, status: 'delivered', date: '2024-03-01' },
  ]

  // Top products
  const topProducts = [
    { name: 'Quantum Processor X1', sales: 45, revenue: 44999.55, trend: '+12%' },
    { name: 'Neural Interface Pro', sales: 32, revenue: 47999.68, trend: '+8%' },
    { name: 'Holographic Display', sales: 28, revenue: 22399.72, trend: '+15%' },
    { name: 'AI Assistant Hub', sales: 25, revenue: 11249.75, trend: '+5%' },
  ]

  // Get status color
  const getStatusColor = (status: string) => {
    const colors: {[key: string]: string} = {
      delivered: '#10b981',
      shipped: '#3b82f6',
      processing: '#f59e0b',
      pending: '#ef4444'
    }
    return colors[status] || '#6b7280'
  }

  // Get status background
  const getStatusBg = (status: string) => {
    const colors: {[key: string]: string} = {
      delivered: 'rgba(16, 185, 129, 0.1)',
      shipped: 'rgba(59, 130, 246, 0.1)',
      processing: 'rgba(245, 158, 11, 0.1)',
      pending: 'rgba(239, 68, 68, 0.1)'
    }
    return colors[status] || 'rgba(107, 114, 128, 0.1)'
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: '1rem'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '3px solid rgba(255, 255, 255, 0.1)',
          borderTopColor: '#c084fc',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ color: '#9ca3af' }}>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Welcome Section */}
      <div style={{
        marginBottom: '2rem'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #60a5fa, #c084fc)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          {greeting}, Hafiz Sajid!
        </h1>
        <p style={{ color: '#9ca3af' }}>
          Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Total Revenue */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'transform 0.3s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>💰</span>
            <span style={{
              padding: '0.25rem 0.75rem',
              background: 'rgba(16, 185, 129, 0.1)',
              color: '#10b981',
              borderRadius: '1rem',
              fontSize: '0.75rem'
            }}>+12.5%</span>
          </div>
          <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Revenue</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
            {formatCurrency(stats.totalRevenue)}
          </div>
        </div>

        {/* Total Orders */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'transform 0.3s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>📦</span>
            <span style={{
              padding: '0.25rem 0.75rem',
              background: 'rgba(245, 158, 11, 0.1)',
              color: '#f59e0b',
              borderRadius: '1rem',
              fontSize: '0.75rem'
            }}>+8.2%</span>
          </div>
          <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Orders</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
            {stats.totalOrders}
          </div>
          <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            {stats.pendingOrders} pending
          </div>
        </div>

        {/* Total Customers */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'transform 0.3s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>👥</span>
            <span style={{
              padding: '0.25rem 0.75rem',
              background: 'rgba(59, 130, 246, 0.1)',
              color: '#3b82f6',
              borderRadius: '1rem',
              fontSize: '0.75rem'
            }}>+5.3%</span>
          </div>
          <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Customers</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
            {stats.totalCustomers}
          </div>
        </div>

        {/* Total Products */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'transform 0.3s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>🛍️</span>
            <span style={{
              padding: '0.25rem 0.75rem',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              borderRadius: '1rem',
              fontSize: '0.75rem'
            }}>{stats.lowStock} low stock</span>
          </div>
          <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Products</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
            {stats.totalProducts}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Sales Overview */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
            Sales Overview
          </h3>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Today</div>
              <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>$1,234</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.25rem' }}>This Week</div>
              <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>$8,456</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.25rem' }}>This Month</div>
              <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>$32,890</div>
            </div>
          </div>
          
          {/* Simple Bar Chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', height: '150px' }}>
            {[65, 45, 75, 55, 85, 70, 60].map((value, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '100%',
                  height: `${value}px`,
                  background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                  borderRadius: '0.5rem 0.5rem 0 0',
                  transition: 'height 0.3s'
                }}></div>
                <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600' }}>
              Recent Orders
            </h3>
            <a 
              href="/dashboard/orders" 
              style={{
                color: '#c084fc',
                fontSize: '0.875rem',
                textDecoration: 'none'
              }}
            >
              View All →
            </a>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {recentOrders.slice(0, 4).map((order) => (
              <div key={order.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '0.75rem'
              }}>
                <div>
                  <div style={{ color: 'white', fontWeight: '500' }}>{order.customer}</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{order.id}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: 'white', fontWeight: '600' }}>{formatCurrency(order.amount)}</div>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.125rem 0.5rem',
                    background: getStatusBg(order.status),
                    color: getStatusColor(order.status),
                    borderRadius: '1rem',
                    fontSize: '0.625rem'
                  }}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {/* Top Products */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
            Top Products
          </h3>
          
          {topProducts.map((product, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem 0',
              borderBottom: index < topProducts.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
            }}>
              <div>
                <div style={{ color: 'white', fontWeight: '500' }}>{product.name}</div>
                <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{product.sales} sales</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: 'white', fontWeight: '600' }}>{formatCurrency(product.revenue)}</div>
                <span style={{ color: '#10b981', fontSize: '0.75rem' }}>{product.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
            Quick Actions
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <button
              onClick={() => window.location.href = '/dashboard/orders/new'}
              style={{
                padding: '1rem',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '0.75rem',
                color: '#3b82f6',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'
              }}
            >
              <span style={{ fontSize: '2rem' }}>➕</span>
              <span>New Order</span>
            </button>
            
            <button
              onClick={() => window.location.href = '/dashboard/products/new'}
              style={{
                padding: '1rem',
                background: 'rgba(168, 85, 247, 0.1)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                borderRadius: '0.75rem',
                color: '#c084fc',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)'
              }}
            >
              <span style={{ fontSize: '2rem' }}>📝</span>
              <span>Add Product</span>
            </button>
            
            <button
              onClick={() => window.location.href = '/dashboard/customers'}
              style={{
                padding: '1rem',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: '0.75rem',
                color: '#10b981',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s',
                gridColumn: 'span 2'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'
              }}
            >
              <span style={{ fontSize: '2rem' }}>👥</span>
              <span>Manage Customers</span>
            </button>
          </div>
        </div>

        {/* Activity Feed */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
            Recent Activity
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { action: 'New order received', time: '5 minutes ago', icon: '📦' },
              { action: 'Product stock updated', time: '1 hour ago', icon: '🔄' },
              { action: 'New customer registered', time: '3 hours ago', icon: '👤' },
              { action: 'Payment received', time: '5 hours ago', icon: '💰' },
            ].map((activity, index) => (
              <div key={index} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  background: 'rgba(168, 85, 247, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem'
                }}>
                  {activity.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'white', fontSize: '0.875rem' }}>{activity.action}</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}