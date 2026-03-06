'use client'

import { useState, useEffect } from 'react'

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState('')

  // User data state
  const [userData, setUserData] = useState({
    name: 'Hafiz Sajid Syed',
    email: 'hafizsajidsyed@gmail.com',
    phone: '+92 300 1234567',
    role: 'Administrator',
    memberSince: 'January 2024',
    avatar: '',
    bio: 'Passionate about technology and innovation. Leading Kitechn to new heights.',
    address: {
      street: '123 Tech Street',
      city: 'Innovation City',
      country: 'Pakistan',
      postalCode: '12345'
    },
    social: {
      twitter: '@hafizsajid',
      facebook: 'hafiz.sajid',
      linkedin: 'hafiz-sajid-syed'
    },
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      darkMode: true,
      language: 'English'
    }
  })

  // Form data for editing
  const [formData, setFormData] = useState({ ...userData })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // Load user data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  // Handle preference change
  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: checked
      }
    }))
  }

  // Handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
  }

  // Handle save profile
  const handleSaveProfile = () => {
    setSaveError('')
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone) {
      setSaveError('Please fill in all required fields')
      return
    }

    if (!formData.email.includes('@')) {
      setSaveError('Please enter a valid email address')
      return
    }

    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      setUserData({ ...formData })
      setEditing(false)
      setLoading(false)
      setSaveSuccess(true)
      
      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 1000)
  }

  // Handle password update
  const handlePasswordUpdate = () => {
    setSaveError('')

    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setSaveError('Please fill in all password fields')
      return
    }

    if (passwordData.newPassword.length < 8) {
      setSaveError('New password must be at least 8 characters')
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSaveError('New passwords do not match')
      return
    }

    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      setLoading(false)
      setSaveSuccess(true)
      
      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 1000)
  }

  // Handle cancel
  const handleCancel = () => {
    setFormData({ ...userData })
    setEditing(false)
    setSaveError('')
  }

  // Get initial for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
  }

  if (loading) {
    return (
      <main style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a8a 100%)',
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
        maxWidth: '1200px',
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
              My Profile
            </h2>
            <p style={{ color: '#d1d5db' }}>
              Manage your account settings and preferences
            </p>
          </div>

          {!editing && activeTab === 'profile' && (
            <button
              onClick={() => setEditing(true)}
              style={{
                padding: '0.75rem 2rem',
                background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                border: 'none',
                borderRadius: '0.75rem',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <div style={{
            marginBottom: '1.5rem',
            padding: '1rem',
            background: 'rgba(16, 185, 129, 0.2)',
            border: '1px solid rgba(16, 185, 129, 0.5)',
            borderRadius: '0.75rem',
            color: '#10b981',
            textAlign: 'center',
            animation: 'pulse 2s infinite'
          }}>
            ✓ Profile updated successfully!
          </div>
        )}

        {/* Error Message */}
        {saveError && (
          <div style={{
            marginBottom: '1.5rem',
            padding: '1rem',
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            borderRadius: '0.75rem',
            color: '#ef4444',
            textAlign: 'center'
          }}>
            {saveError}
          </div>
        )}

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '0.5rem',
          overflowX: 'auto'
        }}>
          {['profile', 'security', 'preferences', 'activity'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab)
                setEditing(false)
                setFormData({ ...userData })
              }}
              style={{
                padding: '0.75rem 1.5rem',
                background: activeTab === tab ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
                border: 'none',
                borderRadius: '0.5rem',
                color: activeTab === tab ? '#c084fc' : '#9ca3af',
                fontWeight: activeTab === tab ? '600' : '400',
                cursor: 'pointer',
                transition: 'all 0.3s',
                textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {/* Left Column - Avatar */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: 'white',
                  boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)'
                }}>
                  {getInitials(userData.name)}
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {userData.name}
                  </div>
                  <div style={{ color: '#c084fc', marginTop: '0.25rem' }}>
                    {userData.role}
                  </div>
                  <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                    Member since {userData.memberSince}
                  </div>
                </div>

                {!editing && (
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginTop: '1rem'
                  }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#10b981',
                      borderRadius: '1rem',
                      fontSize: '0.875rem'
                    }}>
                      Verified
                    </span>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      background: 'rgba(168, 85, 247, 0.1)',
                      color: '#c084fc',
                      borderRadius: '1rem',
                      fontSize: '0.875rem'
                    }}>
                      Premium
                    </span>
                  </div>
                )}
              </div>

              {/* Right Column - Form */}
              <div style={{ flex: 1 }}>
                {editing ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <label style={{
                        display: 'block',
                        color: '#d1d5db',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem'
                      }}>
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
                      <label style={{
                        display: 'block',
                        color: '#d1d5db',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem'
                      }}>
                        Email Address *
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
                      <label style={{
                        display: 'block',
                        color: '#d1d5db',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem'
                      }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
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
                      <label style={{
                        display: 'block',
                        color: '#d1d5db',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem'
                      }}>
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={3}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '0.75rem',
                          color: 'white',
                          outline: 'none',
                          resize: 'vertical'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        color: '#d1d5db',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem'
                      }}>
                        Address
                      </label>
                      <input
                        type="text"
                        name="address.street"
                        value={formData.address.street}
                        onChange={handleInputChange}
                        placeholder="Street"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          marginBottom: '0.5rem',
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '0.75rem',
                          color: 'white',
                          outline: 'none'
                        }}
                      />
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '0.5rem'
                      }}>
                        <input
                          type="text"
                          name="address.city"
                          value={formData.address.city}
                          onChange={handleInputChange}
                          placeholder="City"
                          style={{
                            padding: '0.75rem',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '0.75rem',
                            color: 'white',
                            outline: 'none'
                          }}
                        />
                        <input
                          type="text"
                          name="address.postalCode"
                          value={formData.address.postalCode}
                          onChange={handleInputChange}
                          placeholder="Postal Code"
                          style={{
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

                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      marginTop: '1rem'
                    }}>
                      <button
                        onClick={handleSaveProfile}
                        disabled={loading}
                        style={{
                          flex: 1,
                          padding: '0.75rem',
                          background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                          border: 'none',
                          borderRadius: '0.75rem',
                          color: 'white',
                          fontWeight: '600',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          opacity: loading ? 0.5 : 1
                        }}
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        onClick={handleCancel}
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
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                        Email
                      </div>
                      <div style={{ color: 'white' }}>{userData.email}</div>
                    </div>

                    <div>
                      <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                        Phone
                      </div>
                      <div style={{ color: 'white' }}>{userData.phone}</div>
                    </div>

                    <div>
                      <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                        Bio
                      </div>
                      <div style={{ color: '#d1d5db' }}>{userData.bio}</div>
                    </div>

                    <div>
                      <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                        Address
                      </div>
                      <div style={{ color: '#d1d5db' }}>
                        {userData.address.street}, {userData.address.city}, {userData.address.country} {userData.address.postalCode}
                      </div>
                    </div>

                    <div>
                      <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                        Social Links
                      </div>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <a href="#" style={{ color: '#60a5fa', textDecoration: 'none' }}>Twitter</a>
                        <a href="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>Facebook</a>
                        <a href="#" style={{ color: '#0e76a8', textDecoration: 'none' }}>LinkedIn</a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'white',
              marginBottom: '1.5rem'
            }}>
              Change Password
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
              <div>
                <label style={{
                  display: 'block',
                  color: '#d1d5db',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem'
                }}>
                  Current Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      paddingRight: '2.5rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.75rem',
                      color: 'white',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#9ca3af',
                      cursor: 'pointer',
                      fontSize: '1.25rem'
                    }}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  color: '#d1d5db',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem'
                }}>
                  New Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
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
                <label style={{
                  display: 'block',
                  color: '#d1d5db',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem'
                }}>
                  Confirm New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      paddingRight: '2.5rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.75rem',
                      color: 'white',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: 'absolute',
                      right: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#9ca3af',
                      cursor: 'pointer',
                      fontSize: '1.25rem'
                    }}
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <button
                onClick={handlePasswordUpdate}
                disabled={loading}
                style={{
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                  border: 'none',
                  borderRadius: '0.75rem',
                  color: 'white',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1,
                  marginTop: '1rem'
                }}
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'white',
              marginBottom: '1.5rem'
            }}>
              Notification Preferences
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={formData.preferences.emailNotifications}
                  onChange={handlePreferenceChange}
                  style={{
                    width: '1.25rem',
                    height: '1.25rem',
                    accentColor: '#c084fc'
                  }}
                />
                <span style={{ color: 'white' }}>Email Notifications</span>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  name="smsNotifications"
                  checked={formData.preferences.smsNotifications}
                  onChange={handlePreferenceChange}
                  style={{
                    width: '1.25rem',
                    height: '1.25rem',
                    accentColor: '#c084fc'
                  }}
                />
                <span style={{ color: 'white' }}>SMS Notifications</span>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  name="darkMode"
                  checked={formData.preferences.darkMode}
                  onChange={handlePreferenceChange}
                  style={{
                    width: '1.25rem',
                    height: '1.25rem',
                    accentColor: '#c084fc'
                  }}
                />
                <span style={{ color: 'white' }}>Dark Mode</span>
              </label>

              <div style={{ marginTop: '1rem' }}>
                <label style={{
                  display: 'block',
                  color: '#d1d5db',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem'
                }}>
                  Language
                </label>
                <select
                  name="language"
                  value={formData.preferences.language}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        language: e.target.value
                      }
                    }))
                  }}
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
                  <option value="English">English</option>
                  <option value="Urdu">Urdu</option>
                  <option value="Arabic">Arabic</option>
                </select>
              </div>

              <button
                onClick={handleSaveProfile}
                style={{
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  border: 'none',
                  borderRadius: '0.75rem',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '1rem'
                }}
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'white',
              marginBottom: '1.5rem'
            }}>
              Recent Activity
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { action: 'Profile updated', time: '2 hours ago', icon: '✏️' },
                { action: 'Password changed', time: '1 day ago', icon: '🔒' },
                { action: 'New order placed', time: '3 days ago', icon: '📦' },
                { action: 'Logged in from new device', time: '1 week ago', icon: '💻' }
              ].map((activity, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '0.75rem'
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{activity.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: 'white', fontWeight: '500' }}>{activity.action}</div>
                    <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{activity.time}</div>
                  </div>
                </div>
              ))}
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

        @media (max-width: 768px) {
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