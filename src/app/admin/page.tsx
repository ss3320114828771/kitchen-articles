'use client'

import { useState, useEffect } from 'react'

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [greeting, setGreeting] = useState('')
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    pendingOrders: 0,
    lowStock: 0,
    newUsers: 0,
    conversionRate: 0
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
        totalRevenue: 125678.90,
        totalOrders: 1245,
        totalProducts: 234,
        totalUsers: 856,
        pendingOrders: 23,
        lowStock: 12,
        newUsers: 45,
        conversionRate: 3.6
      })
      setLoading(false)
    }, 1000)
  }, [])

  // Recent orders data
  const recentOrders = [
    { id: 'ORD-001', customer: 'Ali Ahmed', amount: 1299.99, status: 'delivered', date: '2024-03-05', items: 3 },
    { id: 'ORD-002', customer: 'Fatima Khan', amount: 799.99, status: 'processing', date: '2024-03-04', items: 2 },
    { id: 'ORD-003', customer: 'Omar Hassan', amount: 2499.99, status: 'pending', date: '2024-03-03', items: 5 },
    { id: 'ORD-004', customer: 'Aisha Malik', amount: 449.99, status: 'shipped', date: '2024-03-02', items: 1 },
    { id: 'ORD-005', customer: 'Bilal Ahmed', amount: 1899.99, status: 'delivered', date: '2024-03-01', items: 4 },
  ]

  // Top products
  const topProducts = [
    { name: 'Quantum Processor X1', sales: 45, revenue: 44999.55, stock: 50, trend: '+12%' },
    { name: 'Neural Interface Pro', sales: 32, revenue: 47999.68, stock: 25, trend: '+8%' },
    { name: 'Holographic Display', sales: 28, revenue: 22399.72, stock: 30, trend: '+15%' },
    { name: 'AI Assistant Hub', sales: 25, revenue: 11249.75, stock: 75, trend: '+5%' },
    { name: 'Quantum Security', sales: 18, revenue: 53999.82, stock: 10, trend: '+20%' },
  ]

  // Recent users
  const recentUsers = [
    { name: 'Hafiz Sajid Syed', email: 'hafizsajidsyed@gmail.com', role: 'admin', joined: '2024-01-15' },
    { name: 'Ali Ahmed', email: 'ali.ahmed@email.com', role: 'user', joined: '2024-02-20' },
    { name: 'Fatima Khan', email: 'fatima.k@email.com', role: 'user', joined: '2024-02-25' },
    { name: 'Omar Hassan', email: 'omar.h@email.com', role: 'moderator', joined: '2024-03-01' },
  ]

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  // Format number with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

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
          {greeting}, Admin!
        </h1>
        <p style={{ color: '#9ca3af' }}>
          Welcome to your admin dashboard. Here's what's happening with your store today.
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
            }}>+15.3%</span>
          </div>
          <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Revenue</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
            {formatCurrency(stats.totalRevenue)}
          </div>
          <div style={{ color: '#10b981', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            ↑ +12.5% from last month
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
            {formatNumber(stats.totalOrders)}
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>
              {stats.pendingOrders} pending
            </span>
            <span style={{ color: '#10b981', fontSize: '0.875rem' }}>
              {stats.totalOrders - stats.pendingOrders} completed
            </span>
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
            {formatNumber(stats.totalProducts)}
          </div>
          <div style={{ color: '#f59e0b', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            ⚠️ {stats.lowStock} products need restocking
          </div>
        </div>

        {/* Total Users */}
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
            }}>+{stats.newUsers} new</span>
          </div>
          <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Users</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
            {formatNumber(stats.totalUsers)}
          </div>
          <div style={{ color: '#3b82f6', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            ↑ +{stats.newUsers} new this month
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600' }}>
              Sales Overview
            </h3>
            <select style={{
              padding: '0.25rem 0.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '0.5rem',
              color: 'white',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Today</div>
              <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>$4,567</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.25rem' }}>This Week</div>
              <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>$28,456</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.25rem' }}>This Month</div>
              <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>$98,765</div>
            </div>
          </div>
          
          {/* Simple Bar Chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', height: '150px' }}>
            {[65, 45, 75, 55, 85, 70, 95].map((value, i) => (
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
              href="/admin/orders" 
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
            {recentOrders.map((order) => (
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
                  <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{order.id} • {order.items} items</div>
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600' }}>
              Top Products
            </h3>
            <a 
              href="/admin/products" 
              style={{
                color: '#c084fc',
                fontSize: '0.875rem',
                textDecoration: 'none'
              }}
            >
              Manage →
            </a>
          </div>
          
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
                <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                  {product.sales} sales • {product.stock} in stock
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: 'white', fontWeight: '600' }}>{formatCurrency(product.revenue)}</div>
                <span style={{ color: '#10b981', fontSize: '0.75rem' }}>{product.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Users */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600' }}>
              Recent Users
            </h3>
            <a 
              href="/admin/users" 
              style={{
                color: '#c084fc',
                fontSize: '0.875rem',
                textDecoration: 'none'
              }}
            >
              View All →
            </a>
          </div>
          
          {recentUsers.map((user, index) => {
            const roleColor = user.role === 'admin' ? '#c084fc' : user.role === 'moderator' ? '#3b82f6' : '#9ca3af'
            return (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 0',
                borderBottom: index < recentUsers.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
              }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.75rem'
                }}>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'white', fontWeight: '500', fontSize: '0.875rem' }}>{user.name}</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{user.email}</div>
                </div>
                <span style={{
                  padding: '0.125rem 0.5rem',
                  background: `${roleColor}20`,
                  color: roleColor,
                  borderRadius: '1rem',
                  fontSize: '0.625rem',
                  textTransform: 'capitalize'
                }}>
                  {user.role}
                </span>
              </div>
            )
          })}
        </div>

        {/* Quick Actions & System Health */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
            System Health
          </h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Server Load</span>
              <span style={{ color: 'white', fontSize: '0.875rem' }}>45%</span>
            </div>
            <div style={{
              width: '100%',
              height: '0.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '1rem',
              overflow: 'hidden'
            }}>
              <div style={{
                width: '45%',
                height: '100%',
                background: 'linear-gradient(90deg, #10b981, #3b82f6)',
                borderRadius: '1rem'
              }}></div>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Memory Usage</span>
              <span style={{ color: 'white', fontSize: '0.875rem' }}>2.4/8 GB</span>
            </div>
            <div style={{
              width: '100%',
              height: '0.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '1rem',
              overflow: 'hidden'
            }}>
              <div style={{
                width: '30%',
                height: '100%',
                background: 'linear-gradient(90deg, #3b82f6, #a855f7)',
                borderRadius: '1rem'
              }}></div>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Disk Space</span>
              <span style={{ color: 'white', fontSize: '0.875rem' }}>156/500 GB</span>
            </div>
            <div style={{
              width: '100%',
              height: '0.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '1rem',
              overflow: 'hidden'
            }}>
              <div style={{
                width: '31%',
                height: '100%',
                background: 'linear-gradient(90deg, #f59e0b, #ef4444)',
                borderRadius: '1rem'
              }}></div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1rem' }}>
            <div style={{
              padding: '1rem',
              background: 'rgba(16, 185, 129, 0.1)',
              borderRadius: '0.75rem',
              textAlign: 'center'
            }}>
              <div style={{ color: '#10b981', fontSize: '1.25rem', fontWeight: 'bold' }}>99.9%</div>
              <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Uptime</div>
            </div>
            <div style={{
              padding: '1rem',
              background: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '0.75rem',
              textAlign: 'center'
            }}>
              <div style={{ color: '#3b82f6', fontSize: '1.25rem', fontWeight: 'bold' }}>250ms</div>
              <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Response</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button
              onClick={() => window.location.href = '/admin/orders/new'}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                border: 'none',
                borderRadius: '0.75rem',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              ➕ New Order
            </button>
            <button
              onClick={() => window.location.href = '/admin/products/new'}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: 'linear-gradient(135deg, #a855f7, #9333ea)',
                border: 'none',
                borderRadius: '0.75rem',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              📝 Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Admin Info Footer */}
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>
            HS
          </div>
          <div>
            <div style={{ color: 'white', fontWeight: '600' }}>Hafiz Sajid Syed</div>
            <div style={{ color: '#c084fc', fontSize: '0.875rem' }}>Super Administrator</div>
          </div>
        </div>
        <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
          Last login: Today at {new Date().toLocaleTimeString()}
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