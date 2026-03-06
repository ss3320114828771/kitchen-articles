'use client'

import { useState } from 'react'
import Link from 'next/link'

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'admin' | 'moderator' | 'user'
  status: 'active' | 'inactive' | 'blocked' | 'pending'
  orders: number
  totalSpent: number
  joined: string
  lastActive: string
  avatar: string
  address?: string
  city?: string
  country?: string
}

interface UserTableProps {
  users: User[]
  onViewDetails: (user: User) => void
  onEditUser: (user: User) => void
  onDeleteUser: (userId: string) => void
  onUpdateStatus: (userId: string, newStatus: string) => void
  loading?: boolean
}

export default function UserTable({ 
  users, 
  onViewDetails, 
  onEditUser, 
  onDeleteUser,
  onUpdateStatus,
  loading = false 
}: UserTableProps) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [expandedUser, setExpandedUser] = useState<string | null>(null)
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
    if (selectedUsers.length === users.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(users.map(u => u.id))
    }
  }

  // Toggle select user
  const toggleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  // Get role badge style
  const getRoleStyle = (role: string) => {
    const styles: { [key: string]: { bg: string; color: string } } = {
      admin: { bg: 'rgba(168, 85, 247, 0.1)', color: '#c084fc' },
      moderator: { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' },
      user: { bg: 'rgba(107, 114, 128, 0.1)', color: '#9ca3af' }
    }
    return styles[role] || { bg: 'rgba(107, 114, 128, 0.1)', color: '#9ca3af' }
  }

  // Get status badge style
  const getStatusStyle = (status: string) => {
    const styles: { [key: string]: { bg: string; color: string } } = {
      active: { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
      inactive: { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' },
      blocked: { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' },
      pending: { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }
    }
    return styles[status] || { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' }
  }

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
        <p style={{ color: '#9ca3af' }}>Loading users...</p>
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '1rem',
        padding: '4rem 2rem',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👥</div>
        <h3 style={{ color: 'white', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
          No users found
        </h3>
        <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>
          There are no users to display at the moment.
        </p>
        <Link href="/admin/users/new" style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
          borderRadius: '0.5rem',
          color: 'white',
          textDecoration: 'none',
          fontWeight: '600'
        }}>
          Add New User
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
      {selectedUsers.length > 0 && (
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
            {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  selectedUsers.forEach(id => onUpdateStatus(id, e.target.value))
                  setSelectedUsers([])
                  e.target.value = ''
                }
              }}
              style={{
                padding: '0.25rem 0.75rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '0.25rem',
                color: 'white',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              <option value="">Change Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blocked">Blocked</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      )}

      {/* Desktop Table View */}
      {!isMobile && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1200px' }}>
            <thead>
              <tr style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <th style={{ padding: '1rem', width: '40px' }}>
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === users.length && users.length > 0}
                    onChange={toggleSelectAll}
                    style={{
                      width: '1rem',
                      height: '1rem',
                      accentColor: '#c084fc',
                      cursor: 'pointer'
                    }}
                  />
                </th>
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
              {users.map((user) => {
                const roleStyle = getRoleStyle(user.role)
                const statusStyle = getStatusStyle(user.status)
                
                return (
                  <tr 
                    key={user.id} 
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      transition: 'background 0.3s',
                      background: selectedUsers.includes(user.id) ? 'rgba(168, 85, 247, 0.05)' : 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      if (!selectedUsers.includes(user.id)) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!selectedUsers.includes(user.id)) {
                        e.currentTarget.style.background = 'transparent'
                      }
                    }}
                  >
                    <td style={{ padding: '1rem' }}>
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleSelectUser(user.id)}
                        style={{
                          width: '1rem',
                          height: '1rem',
                          accentColor: '#c084fc',
                          cursor: 'pointer'
                        }}
                      />
                    </td>
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
                      {user.city && (
                        <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                          {user.city}, {user.country}
                        </div>
                      )}
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
                          onClick={() => onViewDetails(user)}
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
                        <button
                          onClick={() => onEditUser(user)}
                          style={{
                            padding: '0.5rem',
                            background: 'rgba(168, 85, 247, 0.1)',
                            border: '1px solid rgba(168, 85, 247, 0.3)',
                            borderRadius: '0.5rem',
                            color: '#c084fc',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            lineHeight: 1
                          }}
                          title="Edit User"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${user.name}?`)) {
                              onDeleteUser(user.id)
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
                          title="Delete User"
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
      )}

      {/* Mobile Card View */}
      {isMobile && (
        <div style={{ padding: '1rem' }}>
          {users.map((user) => {
            const roleStyle = getRoleStyle(user.role)
            const statusStyle = getStatusStyle(user.status)
            
            return (
              <div
                key={user.id}
                style={{
                  background: selectedUsers.includes(user.id) 
                    ? 'rgba(168, 85, 247, 0.1)' 
                    : 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '1rem',
                  padding: '1rem',
                  marginBottom: '1rem',
                  border: selectedUsers.includes(user.id)
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
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleSelectUser(user.id)}
                      style={{
                        width: '1rem',
                        height: '1rem',
                        accentColor: '#c084fc'
                      }}
                    />
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold'
                    }}>
                      {user.avatar}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      background: roleStyle.bg,
                      color: roleStyle.color,
                      borderRadius: '1rem',
                      fontSize: '0.75rem'
                    }}>
                      {user.role}
                    </span>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      background: statusStyle.bg,
                      color: statusStyle.color,
                      borderRadius: '1rem',
                      fontSize: '0.75rem'
                    }}>
                      {user.status}
                    </span>
                  </div>
                </div>

                {/* User Info */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ color: 'white', fontWeight: '600', marginBottom: '0.25rem' }}>
                    {user.name}
                  </div>
                  <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{user.email}</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{user.phone}</div>
                  {user.city && (
                    <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                      {user.city}, {user.country}
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.75rem',
                  padding: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '0.5rem'
                }}>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Orders</div>
                    <div style={{ color: 'white', fontWeight: '600' }}>{user.orders}</div>
                  </div>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Total Spent</div>
                    <div style={{ color: '#10b981', fontWeight: '600' }}>
                      {formatCurrency(user.totalSpent)}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Joined</div>
                    <div style={{ color: '#d1d5db', fontSize: '0.875rem' }}>
                      {formatDate(user.joined)}
                    </div>
                  </div>
                </div>

                {/* Expandable Section */}
                {expandedUser === user.id && (
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
                        value={user.status}
                        onChange={(e) => {
                          onUpdateStatus(user.id, e.target.value)
                          setExpandedUser(null)
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
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="blocked">Blocked</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => onViewDetails(user)}
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
                        onClick={() => onEditUser(user)}
                        style={{
                          flex: 1,
                          padding: '0.5rem',
                          background: 'rgba(168, 85, 247, 0.1)',
                          border: '1px solid rgba(168, 85, 247, 0.3)',
                          borderRadius: '0.5rem',
                          color: '#c084fc',
                          cursor: 'pointer'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${user.name}?`)) {
                            onDeleteUser(user.id)
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
                {!expandedUser || expandedUser !== user.id ? (
                  <button
                    onClick={() => setExpandedUser(user.id)}
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
                    onClick={() => setExpandedUser(null)}
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
            )
          })}
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