'use client'

import { useState, useEffect } from 'react'

interface ProfileFormProps {
  initialData?: {
    name: string
    email: string
    phone: string
    bio: string
    address: {
      street: string
      city: string
      country: string
      postalCode: string
    }
    social: {
      twitter: string
      facebook: string
      linkedin: string
    }
    preferences: {
      emailNotifications: boolean
      smsNotifications: boolean
      darkMode: boolean
      language: string
    }
  }
  onSubmit: (data: any) => void
  onCancel: () => void
  loading?: boolean
}

export default function ProfileForm({
  initialData,
  onSubmit,
  onCancel,
  loading = false
}: ProfileFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    address: {
      street: '',
      city: '',
      country: '',
      postalCode: ''
    },
    social: {
      twitter: '',
      facebook: '',
      linkedin: ''
    },
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      darkMode: true,
      language: 'English'
    }
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [activeTab, setActiveTab] = useState('profile')
  const [isMobile, setIsMobile] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Load initial data
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        bio: initialData.bio || '',
        address: {
          street: initialData.address?.street || '',
          city: initialData.address?.city || '',
          country: initialData.address?.country || '',
          postalCode: initialData.address?.postalCode || ''
        },
        social: {
          twitter: initialData.social?.twitter || '',
          facebook: initialData.social?.facebook || '',
          linkedin: initialData.social?.linkedin || ''
        },
        preferences: {
          emailNotifications: initialData.preferences?.emailNotifications ?? true,
          smsNotifications: initialData.preferences?.smsNotifications ?? false,
          darkMode: initialData.preferences?.darkMode ?? true,
          language: initialData.preferences?.language || 'English'
        }
      })
    }
  }, [initialData])

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: checked
      }
    }))
  }

  // Handle avatar change
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (formData.phone && !/^[\d\s\+\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>
          Edit Profile
        </h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '0.5rem',
              color: 'white',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
              border: 'none',
              borderRadius: '0.5rem',
              color: 'white',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
              fontSize: '0.875rem'
            }}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        paddingBottom: '0.5rem',
        overflowX: 'auto',
        flexWrap: 'nowrap'
      }}>
        {['profile', 'address', 'social', 'preferences'].map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.5rem 1rem',
              background: activeTab === tab ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
              border: 'none',
              borderRadius: '0.5rem',
              color: activeTab === tab ? '#c084fc' : '#9ca3af',
              fontWeight: activeTab === tab ? '600' : '400',
              cursor: 'pointer',
              textTransform: 'capitalize',
              fontSize: '0.875rem',
              whiteSpace: 'nowrap'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '1rem',
        padding: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '250px 1fr',
            gap: '2rem'
          }}>
            {/* Avatar Section */}
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '150px',
                  height: '150px',
                  margin: '0 auto 1rem',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '3px solid rgba(255, 255, 255, 0.2)'
                }}
                onClick={() => document.getElementById('avatar-upload')?.click()}
              >
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <span style={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    color: 'white'
                  }}>
                    {getInitials(formData.name || 'User')}
                  </span>
                )}
                
                {/* Upload Overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'rgba(0, 0, 0, 0.5)',
                  padding: '0.5rem',
                  fontSize: '0.75rem',
                  color: 'white'
                }}>
                  Change
                </div>
              </div>
              
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
              
              <p style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                Click to upload new photo
              </p>
            </div>

            {/* Profile Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Name */}
              <div>
                <label style={{
                  display: 'block',
                  color: '#d1d5db',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem'
                }}>
                  Full Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Hafiz Sajid Syed"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: `1px solid ${errors.name ? '#ef4444' : 'rgba(255, 255, 255, 0.2)'}`,
                    borderRadius: '0.5rem',
                    color: 'white',
                    outline: 'none'
                  }}
                />
                {errors.name && (
                  <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label style={{
                  display: 'block',
                  color: '#d1d5db',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem'
                }}>
                  Email Address <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hafizsajidsyed@gmail.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: `1px solid ${errors.email ? '#ef4444' : 'rgba(255, 255, 255, 0.2)'}`,
                    borderRadius: '0.5rem',
                    color: 'white',
                    outline: 'none'
                  }}
                />
                {errors.email && (
                  <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label style={{
                  display: 'block',
                  color: '#d1d5db',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem'
                }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+92 300 1234567"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: `1px solid ${errors.phone ? '#ef4444' : 'rgba(255, 255, 255, 0.2)'}`,
                    borderRadius: '0.5rem',
                    color: 'white',
                    outline: 'none'
                  }}
                />
                {errors.phone && (
                  <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Bio */}
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
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about yourself..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '0.5rem',
                    color: 'white',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Address Tab */}
        {activeTab === 'address' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '1.5rem'
          }}>
            {/* Street */}
            <div style={{ gridColumn: isMobile ? 'auto' : '1 / -1' }}>
              <label style={{
                display: 'block',
                color: '#d1d5db',
                marginBottom: '0.5rem',
                fontSize: '0.875rem'
              }}>
                Street Address
              </label>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                placeholder="123 Tech Street"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  outline: 'none'
                }}
              />
            </div>

            {/* City */}
            <div>
              <label style={{
                display: 'block',
                color: '#d1d5db',
                marginBottom: '0.5rem',
                fontSize: '0.875rem'
              }}>
                City
              </label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                placeholder="Innovation City"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  outline: 'none'
                }}
              />
            </div>

            {/* Country */}
            <div>
              <label style={{
                display: 'block',
                color: '#d1d5db',
                marginBottom: '0.5rem',
                fontSize: '0.875rem'
              }}>
                Country
              </label>
              <select
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  outline: 'none'
                }}
              >
                <option value="">Select Country</option>
                <option value="Pakistan">Pakistan</option>
                <option value="UAE">UAE</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
              </select>
            </div>

            {/* Postal Code */}
            <div>
              <label style={{
                display: 'block',
                color: '#d1d5db',
                marginBottom: '0.5rem',
                fontSize: '0.875rem'
              }}>
                Postal Code
              </label>
              <input
                type="text"
                name="address.postalCode"
                value={formData.address.postalCode}
                onChange={handleChange}
                placeholder="12345"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        )}

        {/* Social Tab */}
        {activeTab === 'social' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '1.5rem'
          }}>
            {/* Twitter */}
            <div>
              <label style={{
                display: 'block',
                color: '#d1d5db',
                marginBottom: '0.5rem',
                fontSize: '0.875rem'
              }}>
                <span style={{ color: '#1da1f2', marginRight: '0.5rem' }}>𝕏</span>
                Twitter
              </label>
              <input
                type="text"
                name="social.twitter"
                value={formData.social.twitter}
                onChange={handleChange}
                placeholder="@username"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  outline: 'none'
                }}
              />
            </div>

            {/* Facebook */}
            <div>
              <label style={{
                display: 'block',
                color: '#d1d5db',
                marginBottom: '0.5rem',
                fontSize: '0.875rem'
              }}>
                <span style={{ color: '#4267B2', marginRight: '0.5rem' }}>f</span>
                Facebook
              </label>
              <input
                type="text"
                name="social.facebook"
                value={formData.social.facebook}
                onChange={handleChange}
                placeholder="username"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  outline: 'none'
                }}
              />
            </div>

            {/* LinkedIn */}
            <div style={{ gridColumn: isMobile ? 'auto' : '1 / -1' }}>
              <label style={{
                display: 'block',
                color: '#d1d5db',
                marginBottom: '0.5rem',
                fontSize: '0.875rem'
              }}>
                <span style={{ color: '#0077b5', marginRight: '0.5rem' }}>in</span>
                LinkedIn
              </label>
              <input
                type="text"
                name="social.linkedin"
                value={formData.social.linkedin}
                onChange={handleChange}
                placeholder="username"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Notifications */}
            <div>
              <h4 style={{ color: 'white', fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                Notification Settings
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={formData.preferences.emailNotifications}
                    onChange={handleCheckboxChange}
                    style={{ width: '1.25rem', height: '1.25rem', accentColor: '#c084fc' }}
                  />
                  <span>Email Notifications</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="smsNotifications"
                    checked={formData.preferences.smsNotifications}
                    onChange={handleCheckboxChange}
                    style={{ width: '1.25rem', height: '1.25rem', accentColor: '#c084fc' }}
                  />
                  <span>SMS Notifications</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="darkMode"
                    checked={formData.preferences.darkMode}
                    onChange={handleCheckboxChange}
                    style={{ width: '1.25rem', height: '1.25rem', accentColor: '#c084fc' }}
                  />
                  <span>Dark Mode</span>
                </label>
              </div>
            </div>

            {/* Language */}
            <div>
              <h4 style={{ color: 'white', fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                Language Preferences
              </h4>
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
                  maxWidth: '300px',
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  outline: 'none'
                }}
              >
                <option value="English">English</option>
                <option value="Urdu">Urdu</option>
                <option value="Arabic">Arabic</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>

            {/* Privacy Note */}
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              background: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '0.5rem',
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>
              <p style={{ color: '#3b82f6', fontSize: '0.875rem', margin: 0 }}>
                🔒 Your privacy is important. We never share your data with third parties.
              </p>
            </div>
          </div>
        )}
      </div>
    </form>
  )
}