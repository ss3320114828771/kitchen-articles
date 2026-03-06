'use client'

import { useState, useEffect } from 'react'

export default function AdminUsersPage() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<any[]>([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState<any>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)

  // Form state for add/edit
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    status: 'active',
    address: '',
    city: '',
    country: 'Pakistan'
  })

  // Load users data
  useEffect(() => {
    setTimeout(() => {
      setUsers([
        {
          id: '1',
          name: 'Hafiz Sajid Syed',
          email: 'hafizsajidsyed@gmail.com',
          phone: '+92 300 1234567',
          role: 'admin',
          status: 'active',
          orders: 45,
          totalSpent: 45678.90,
          joined: '2024-01-15',
          lastActive: '2024-03-05',
          address: '123 Tech Street',
          city: 'Innovation City',
          country: 'Pakistan',
          avatar: 'HS'
        },
        {
          id: '2',
          name: 'Ali Ahmed',
          email: 'ali.ahmed@email.com',
          phone: '+92 321 7654321',
          role: 'user',
          status: 'active',
          orders: 12,
          totalSpent: 12499.99,
          joined: '2024-01-20',
          lastActive: '2024-03-04',
          address: '456 Digital Avenue',
          city: 'Tech Valley',
          country: 'Pakistan',
          avatar: 'AA'
        },
        {
          id: '3',
          name: 'Fatima Khan',
          email: 'fatima.k@email.com',
          phone: '+92 333 9876543',
          role: 'user',
          status: 'active',
          orders: 8,
          totalSpent: 8999.99,
          joined: '2024-01-25',
          lastActive: '2024-03-03',
          address: '789 Quantum Road',
          city: 'Silicon City',
          country: 'Pakistan',
          avatar: 'FK'
        },
        {
          id: '4',
          name: 'Omar Hassan',
          email: 'omar.h@email.com',
          phone: '+92 345 6789012',
          role: 'moderator',
          status: 'active',
          orders: 23,
          totalSpent: 23456.78,
          joined: '2024-02-01',
          lastActive: '2024-03-05',
          address: '321 Neural Lane',
          city: 'AI Town',
          country: 'Pakistan',
          avatar: 'OH'
        },
        {
          id: '5',
          name: 'Aisha Malik',
          email: 'aisha.m@email.com',
          phone: '+92 312 3456789',
          role: 'user',
          status: 'inactive',
          orders: 3,
          totalSpent: 2899.99,
          joined: '2024-02-05',
          lastActive: '2024-02-15',
          address: '654 Byte Street',
          city: 'Digital City',
          country: 'Pakistan',
          avatar: 'AM'
        },
        {
          id: '6',
          name: 'Bilal Ahmed',
          email: 'bilal.a@email.com',
          phone: '+92 334 5678901',
          role: 'user',
          status: 'blocked',
          orders: 1,
          totalSpent: 3499.99,
          joined: '2024-02-10',
          lastActive: '2024-02-10',
          address: '987 Code Lane',
          city: 'Program City',
          country: 'Pakistan',
          avatar: 'BA'
        },
        {
          id: '7',
          name: 'Zainab Ali',
          email: 'zainab.a@email.com',
          phone: '+92 346 7890123',
          role: 'moderator',
          status: 'active',
          orders: 15,
          totalSpent: 15678.90,
          joined: '2024-02-15',
          lastActive: '2024-03-02',
          address: '147 Data Drive',
          city: 'Cloud City',
          country: 'Pakistan',
          avatar: 'ZA'
        },
        {
          id: '8',
          name: 'Usman Khan',
          email: 'usman.k@email.com',
          phone: '+92 357 8901234',
          role: 'user',
          status: 'pending',
          orders: 0,
          totalSpent: 0,
          joined: '2024-03-01',
          lastActive: '2024-03-01',
          address: '258 Web Way',
          city: 'Internet City',
          country: 'Pakistan',
          avatar: 'UK'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  // Filter users
  const filteredUsers = users.filter(user => {
    // Status filter
    const matchesFilter = filter === 'all' || user.status === filter
    
    // Role filter
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    
    // Search filter
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      user.city.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesRole && matchesSearch
  })

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.joined).getTime() - new Date(a.joined).getTime()
    } else if (sortBy === 'oldest') {
      return new Date(a.joined).getTime() - new Date(b.joined).getTime()
    } else if (sortBy === 'name_asc') {
      return a.name.localeCompare(b.name)
    } else if (sortBy === 'name_desc') {
      return b.name.localeCompare(a.name)
    } else if (sortBy === 'orders_high') {
      return b.orders - a.orders
    } else if (sortBy === 'orders_low') {
      return a.orders - b.orders
    } else if (sortBy === 'spent_high') {
      return b.totalSpent - a.totalSpent
    } else if (sortBy === 'spent_low') {
      return a.totalSpent - b.totalSpent
    }
    return 0
  })

  // Get unique roles
  const roles = ['all', ...new Set(users.map(u => u.role))]

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
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

  // Handle delete
  const handleDeleteClick = (user: any) => {
    setUserToDelete(user)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    setUsers(prev => prev.filter(u => u.id !== userToDelete.id))
    setShowDeleteModal(false)
    setUserToDelete(null)
  }

  // Handle edit
  const handleEditClick = (user: any) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      address: user.address,
      city: user.city,
      country: user.country
    })
    setShowEditModal(true)
  }

  // Handle add
  const handleAddClick = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'user',
      status: 'active',
      address: '',
      city: '',
      country: 'Pakistan'
    })
    setShowAddModal(true)
  }

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle save new user
  const handleSaveNew = () => {
    // Validate
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields')
      return
    }

    const newUser = {
      id: Date.now().toString(),
      ...formData,
      orders: 0,
      totalSpent: 0,
      joined: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      avatar: formData.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    }

    setUsers(prev => [...prev, newUser])
    setShowAddModal(false)
  }

  // Handle save edit
  const handleSaveEdit = () => {
    // Validate
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields')
      return
    }

    setUsers(prev => prev.map(u => 
      u.id === editingUser.id 
        ? { 
            ...u, 
            ...formData,
            avatar: formData.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
          } 
        : u
    ))

    setShowEditModal(false)
    setEditingUser(null)
  }

  // Get status badge style
  const getStatusStyle = (status: string) => {
    const styles: {[key: string]: any} = {
      active: { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
      inactive: { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' },
      blocked: { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' },
      pending: { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }
    }
    return styles[status] || { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' }
  }

  // Get role badge style
  const getRoleStyle = (role: string) => {
    const styles: {[key: string]: any} = {
      admin: { bg: 'rgba(168, 85, 247, 0.1)', color: '#c084fc' },
      moderator: { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' },
      user: { bg: 'rgba(107, 114, 128, 0.1)', color: '#9ca3af' }
    }
    return styles[role] || { bg: 'rgba(107, 114, 128, 0.1)', color: '#9ca3af' }
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
              Users Management
            </h2>
            <p style={{ color: '#d1d5db' }}>
              Total Users: {users.length} | Active: {users.filter(u => u.status === 'active').length}
            </p>
          </div>

          {/* Add New Button */}
          <button
            onClick={handleAddClick}
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
            <span>➕</span>
            Add New User
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
            <div style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>Total Users</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
              {users.length}
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>Active Users</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
              {users.filter(u => u.status === 'active').length}
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>Admins</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
              {users.filter(u => u.role === 'admin').length}
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>Total Revenue</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
              {formatCurrency(users.reduce((sum, u) => sum + u.totalSpent, 0))}
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
              placeholder="Search by name, email, phone, city..."
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

          {/* Role Filter */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
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
            {roles.map(role => (
              <option key={role} value={role}>
                {role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>

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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
            <option value="pending">Pending</option>
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
            <option value="name_asc">Name A-Z</option>
            <option value="name_desc">Name Z-A</option>
            <option value="orders_high">Most Orders</option>
            <option value="orders_low">Least Orders</option>
            <option value="spent_high">Highest Spent</option>
            <option value="spent_low">Lowest Spent</option>
          </select>
        </div>

        {/* Users Table */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          overflow: 'auto'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1200px' }}>
            <thead>
              <tr style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>User</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Contact</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Role</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Orders</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Total Spent</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Joined</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Last Active</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user) => {
                const statusStyle = getStatusStyle(user.status)
                const roleStyle = getRoleStyle(user.role)
                return (
                  <tr 
                    key={user.id} 
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      transition: 'background 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '1rem'
                        }}>
                          {user.avatar}
                        </div>
                        <div>
                          <div style={{ color: 'white', fontWeight: '500' }}>{user.name}</div>
                          <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ color: 'white' }}>{user.phone}</div>
                      <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                        {user.city}, {user.country}
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        background: roleStyle.bg,
                        color: roleStyle.color,
                        borderRadius: '1rem',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        textTransform: 'capitalize'
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        background: statusStyle.bg,
                        color: statusStyle.color,
                        borderRadius: '1rem',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        textTransform: 'capitalize'
                      }}>
                        {user.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', color: 'white', fontWeight: '500' }}>{user.orders}</td>
                    <td style={{ padding: '1rem', color: '#10b981', fontWeight: '600' }}>
                      {formatCurrency(user.totalSpent)}
                    </td>
                    <td style={{ padding: '1rem', color: '#d1d5db' }}>{formatDate(user.joined)}</td>
                    <td style={{ padding: '1rem', color: '#d1d5db' }}>{formatDate(user.lastActive)}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleEditClick(user)}
                          style={{
                            padding: '0.5rem',
                            background: 'rgba(59, 130, 246, 0.1)',
                            border: '1px solid rgba(59, 130, 246, 0.3)',
                            borderRadius: '0.5rem',
                            color: '#3b82f6',
                            cursor: 'pointer',
                            fontSize: '1rem'
                          }}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteClick(user)}
                          style={{
                            padding: '0.5rem',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '0.5rem',
                            color: '#ef4444',
                            cursor: 'pointer',
                            fontSize: '1rem'
                          }}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && userToDelete && (
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
            zIndex: 2000,
            padding: '1rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
              borderRadius: '1.5rem',
              padding: '2rem',
              maxWidth: '400px',
              width: '100%',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                Confirm Delete
              </h3>
              <p style={{ color: '#d1d5db', marginBottom: '1.5rem' }}>
                Are you sure you want to delete user <span style={{ color: 'white', fontWeight: '600' }}>{userToDelete.name}</span>? This action cannot be undone.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={confirmDelete}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: '#ef4444',
                    border: 'none',
                    borderRadius: '0.75rem',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '0.75rem',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add User Modal */}
        {showAddModal && (
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
            zIndex: 2000,
            padding: '1rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
              borderRadius: '1.5rem',
              padding: '2rem',
              maxWidth: '500px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                Add New User
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.25rem', display: 'block' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.75rem',
                      color: 'white',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.25rem', display: 'block' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.75rem',
                      color: 'white',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.25rem', display: 'block' }}>
                    Phone *
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.75rem',
                      color: 'white',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.25rem', display: 'block' }}>
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.75rem',
                      color: 'white',
                      outline: 'none'
                    }}
                  >
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.25rem', display: 'block' }}>
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.75rem',
                      color: 'white',
                      outline: 'none'
                    }}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <div>
                  <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.25rem', display: 'block' }}>
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.75rem',
                      color: 'white',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.25rem', display: 'block' }}>
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '0.75rem',
                        color: 'white',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.25rem', display: 'block' }}>
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '0.75rem',
                        color: 'white',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button
                    onClick={handleSaveNew}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      border: 'none',
                      borderRadius: '0.75rem',
                      color: 'white',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Add User
                  </button>
                  <button
                    onClick={() => setShowAddModal(false)}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.75rem',
                      color: 'white',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {showEditModal && editingUser && (
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
            zIndex: 2000,
            padding: '1rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
              borderRadius: '1.5rem',
              padding: '2rem',
              maxWidth: '500px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                Edit User: {editingUser.name}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.25rem', display: 'block' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.75rem',
                      color: 'white',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.25rem', display: 'block' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.75rem',
                      color: 'white',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.25rem', display: 'block' }}>
                    Phone *
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.75rem',
                      color: 'white',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.25rem', display: 'block' }}>
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.75rem',
                      color: 'white',
                      outline: 'none'
                    }}
                  >
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.25rem', display: 'block' }}>
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.75rem',
                      color: 'white',
                      outline: 'none'
                    }}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="blocked">Blocked</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <div>
                  <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.25rem', display: 'block' }}>
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.75rem',
                      color: 'white',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.25rem', display: 'block' }}>
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '0.75rem',
                        color: 'white',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.25rem', display: 'block' }}>
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '0.75rem',
                        color: 'white',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button
                    onClick={handleSaveEdit}
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
                    Save Changes
                  </button>
                  <button
                    onClick={() => setShowEditModal(false)}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.75rem',
                      color: 'white',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
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