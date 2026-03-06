'use client'

import { useState, useEffect } from 'react'

interface Product {
  id?: string
  name: string
  slug: string
  description: string
  shortDesc: string
  price: string
  compareAtPrice: string
  cost: string
  sku: string
  barcode: string
  quantity: string
  category: string
  subCategory: string
  brand: string
  tags: string
  weight: string
  dimensions: string
  published: boolean
  featured: boolean
  metaTitle?: string  // ✅ Added missing field
  metaDesc?: string   // ✅ Added missing field
}

interface ProductFormProps {
  initialData?: Product | null
  onSubmit: (data: Product) => void
  onCancel: () => void
  loading?: boolean
}

export default function ProductForm({ 
  initialData, 
  onSubmit, 
  onCancel,
  loading = false 
}: ProductFormProps) {
  const [formData, setFormData] = useState<Product>({
    name: '',
    slug: '',
    description: '',
    shortDesc: '',
    price: '',
    compareAtPrice: '',
    cost: '',
    sku: '',
    barcode: '',
    quantity: '',
    category: '',
    subCategory: '',
    brand: '',
    tags: '',
    weight: '',
    dimensions: '',
    published: false,
    featured: false,
    metaTitle: '',  // ✅ Added missing field
    metaDesc: ''    // ✅ Added missing field
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [activeTab, setActiveTab] = useState('basic')
  const [isMobile, setIsMobile] = useState(false)

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
        ...initialData,
        metaTitle: initialData.metaTitle || '',  // ✅ Ensure fields exist
        metaDesc: initialData.metaDesc || ''      // ✅ Ensure fields exist
      })
    }
  }, [initialData])

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Generate slug from name
  const generateSlug = () => {
    if (formData.name) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      
      setFormData(prev => ({ ...prev, slug }))
    }
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required'
    }

    if (!formData.price) {
      newErrors.price = 'Price is required'
    } else if (parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0'
    }

    if (!formData.category) {
      newErrors.category = 'Category is required'
    }

    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is required'
    } else if (parseInt(formData.quantity) < 0) {
      newErrors.quantity = 'Quantity cannot be negative'
    }

    // Optional field validation
    if (formData.compareAtPrice && parseFloat(formData.compareAtPrice) < 0) {
      newErrors.compareAtPrice = 'Compare at price cannot be negative'
    }

    if (formData.cost && parseFloat(formData.cost) < 0) {
      newErrors.cost = 'Cost cannot be negative'
    }

    if (formData.weight && parseFloat(formData.weight) < 0) {
      newErrors.weight = 'Weight cannot be negative'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    } else {
      // Scroll to first error
      const firstError = Object.keys(errors)[0]
      const element = document.getElementsByName(firstError)[0]
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  // Categories
  const categories = [
    'Electronics',
    'AI Products',
    'Wearables',
    'Security',
    'Accessories'
  ]

  // Subcategories by category
  const subCategories: { [key: string]: string[] } = {
    'Electronics': ['Processors', 'Displays', 'Networking', 'Audio', 'Components'],
    'AI Products': ['Interfaces', 'Hubs', 'Headsets', 'Cameras', 'Software'],
    'Wearables': ['Watches', 'Headsets', 'Glasses', 'Trackers', 'Fitness'],
    'Security': ['Systems', 'Locks', 'Drones', 'Cameras', 'Sensors'],
    'Accessories': ['Cables', 'Adapters', 'Mounts', 'Cases', 'Chargers']
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
          {initialData?.id ? 'Edit Product' : 'Add New Product'}
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
              background: 'linear-gradient(135deg, #10b981, #059669)',
              border: 'none',
              borderRadius: '0.5rem',
              color: 'white',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
              fontSize: '0.875rem'
            }}
          >
            {loading ? 'Saving...' : initialData?.id ? 'Update Product' : 'Create Product'}
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
        {['basic', 'pricing', 'inventory', 'media', 'seo'].map(tab => (
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
        {/* Basic Information Tab */}
        {activeTab === 'basic' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '2rem'
          }}>
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Product Name */}
              <div>
                <label style={{ 
                  display: 'block', 
                  color: '#d1d5db', 
                  marginBottom: '0.5rem', 
                  fontSize: '0.875rem' 
                }}>
                  Product Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={generateSlug}
                  placeholder="e.g., Quantum Processor X1"
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

              {/* Slug */}
              <div>
                <label style={{ 
                  display: 'block', 
                  color: '#d1d5db', 
                  marginBottom: '0.5rem', 
                  fontSize: '0.875rem' 
                }}>
                  Slug
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="quantum-processor-x1"
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.5rem',
                      color: 'white',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="button"
                    onClick={generateSlug}
                    style={{
                      padding: '0.75rem',
                      background: 'rgba(168, 85, 247, 0.1)',
                      border: '1px solid rgba(168, 85, 247, 0.3)',
                      borderRadius: '0.5rem',
                      color: '#c084fc',
                      cursor: 'pointer'
                    }}
                  >
                    Generate
                  </button>
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label style={{ 
                  display: 'block', 
                  color: '#d1d5db', 
                  marginBottom: '0.5rem', 
                  fontSize: '0.875rem' 
                }}>
                  Short Description
                </label>
                <input
                  type="text"
                  name="shortDesc"
                  value={formData.shortDesc}
                  onChange={handleChange}
                  placeholder="Brief product overview"
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

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Category */}
              <div>
                <label style={{ 
                  display: 'block', 
                  color: '#d1d5db', 
                  marginBottom: '0.5rem', 
                  fontSize: '0.875rem' 
                }}>
                  Category <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: `1px solid ${errors.category ? '#ef4444' : 'rgba(255, 255, 255, 0.2)'}`,
                    borderRadius: '0.5rem',
                    color: 'white',
                    outline: 'none'
                  }}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && (
                  <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    {errors.category}
                  </p>
                )}
              </div>

              {/* Sub Category */}
              <div>
                <label style={{ 
                  display: 'block', 
                  color: '#d1d5db', 
                  marginBottom: '0.5rem', 
                  fontSize: '0.875rem' 
                }}>
                  Sub Category
                </label>
                <select
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                  disabled={!formData.category}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '0.5rem',
                    color: 'white',
                    outline: 'none',
                    opacity: !formData.category ? 0.5 : 1,
                    cursor: !formData.category ? 'not-allowed' : 'pointer'
                  }}
                >
                  <option value="">Select Sub Category</option>
                  {formData.category && subCategories[formData.category]?.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div>
                <label style={{ 
                  display: 'block', 
                  color: '#d1d5db', 
                  marginBottom: '0.5rem', 
                  fontSize: '0.875rem' 
                }}>
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="e.g., Kitechn"
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

              {/* Tags */}
              <div>
                <label style={{ 
                  display: 'block', 
                  color: '#d1d5db', 
                  marginBottom: '0.5rem', 
                  fontSize: '0.875rem' 
                }}>
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="quantum, processor, ai"
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

            {/* Full Description - Full Width */}
            <div style={{ gridColumn: isMobile ? 'auto' : '1 / -1' }}>
              <label style={{ 
                display: 'block', 
                color: '#d1d5db', 
                marginBottom: '0.5rem', 
                fontSize: '0.875rem' 
              }}>
                Full Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Detailed product description..."
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
        )}

        {/* Pricing Tab */}
        {activeTab === 'pricing' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '2rem'
          }}>
            {/* Price */}
            <div>
              <label style={{ 
                display: 'block', 
                color: '#d1d5db', 
                marginBottom: '0.5rem', 
                fontSize: '0.875rem' 
              }}>
                Price ($) <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                placeholder="0.00"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: `1px solid ${errors.price ? '#ef4444' : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '0.5rem',
                  color: 'white',
                  outline: 'none'
                }}
              />
              {errors.price && (
                <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  {errors.price}
                </p>
              )}
            </div>

            {/* Compare at Price */}
            <div>
              <label style={{ 
                display: 'block', 
                color: '#d1d5db', 
                marginBottom: '0.5rem', 
                fontSize: '0.875rem' 
              }}>
                Compare at Price ($)
              </label>
              <input
                type="number"
                name="compareAtPrice"
                value={formData.compareAtPrice}
                onChange={handleChange}
                step="0.01"
                min="0"
                placeholder="0.00"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: `1px solid ${errors.compareAtPrice ? '#ef4444' : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '0.5rem',
                  color: 'white',
                  outline: 'none'
                }}
              />
              {errors.compareAtPrice && (
                <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  {errors.compareAtPrice}
                </p>
              )}
            </div>

            {/* Cost */}
            <div>
              <label style={{ 
                display: 'block', 
                color: '#d1d5db', 
                marginBottom: '0.5rem', 
                fontSize: '0.875rem' 
              }}>
                Cost ($) <span style={{ color: '#9ca3af' }}>(Admin only)</span>
              </label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                step="0.01"
                min="0"
                placeholder="0.00"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: `1px solid ${errors.cost ? '#ef4444' : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '0.5rem',
                  color: 'white',
                  outline: 'none'
                }}
              />
              {errors.cost && (
                <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  {errors.cost}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '2rem'
          }}>
            {/* SKU */}
            <div>
              <label style={{ 
                display: 'block', 
                color: '#d1d5db', 
                marginBottom: '0.5rem', 
                fontSize: '0.875rem' 
              }}>
                SKU
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="e.g., QPRO-X1-001"
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

            {/* Barcode */}
            <div>
              <label style={{ 
                display: 'block', 
                color: '#d1d5db', 
                marginBottom: '0.5rem', 
                fontSize: '0.875rem' 
              }}>
                Barcode
              </label>
              <input
                type="text"
                name="barcode"
                value={formData.barcode}
                onChange={handleChange}
                placeholder="e.g., 123456789012"
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

            {/* Quantity */}
            <div>
              <label style={{ 
                display: 'block', 
                color: '#d1d5db', 
                marginBottom: '0.5rem', 
                fontSize: '0.875rem' 
              }}>
                Quantity <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                placeholder="0"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: `1px solid ${errors.quantity ? '#ef4444' : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '0.5rem',
                  color: 'white',
                  outline: 'none'
                }}
              />
              {errors.quantity && (
                <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  {errors.quantity}
                </p>
              )}
            </div>

            {/* Weight */}
            <div>
              <label style={{ 
                display: 'block', 
                color: '#d1d5db', 
                marginBottom: '0.5rem', 
                fontSize: '0.875rem' 
              }}>
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                step="0.01"
                min="0"
                placeholder="0.00"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: `1px solid ${errors.weight ? '#ef4444' : 'rgba(255, 255, 255, 0.2)'}`,
                  borderRadius: '0.5rem',
                  color: 'white',
                  outline: 'none'
                }}
              />
              {errors.weight && (
                <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  {errors.weight}
                </p>
              )}
            </div>

            {/* Dimensions */}
            <div style={{ gridColumn: isMobile ? 'auto' : '1 / -1' }}>
              <label style={{ 
                display: 'block', 
                color: '#d1d5db', 
                marginBottom: '0.5rem', 
                fontSize: '0.875rem' 
              }}>
                Dimensions
              </label>
              <input
                type="text"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                placeholder="e.g., 10 x 20 x 5 cm"
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

        {/* Media Tab */}
        {activeTab === 'media' && (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>🖼️</div>
            <h3 style={{ color: 'white', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              Image Upload
            </h3>
            <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>
              Drag and drop images here or click to upload
            </p>
            <button
              type="button"
              style={{
                padding: '0.75rem 2rem',
                background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                border: 'none',
                borderRadius: '0.5rem',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Upload Images
            </button>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ 
                display: 'block', 
                color: '#d1d5db', 
                marginBottom: '0.5rem', 
                fontSize: '0.875rem' 
              }}>
                Meta Title
              </label>
              <input
                type="text"
                name="metaTitle"
                value={formData.metaTitle || ''}
                onChange={handleChange}
                placeholder="SEO title (optional)"
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

            <div>
              <label style={{ 
                display: 'block', 
                color: '#d1d5db', 
                marginBottom: '0.5rem', 
                fontSize: '0.875rem' 
              }}>
                Meta Description
              </label>
              <textarea
                name="metaDesc"
                value={formData.metaDesc || ''}
                onChange={handleChange}
                rows={4}
                placeholder="SEO description (optional)"
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
        )}

        {/* Status Toggles */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          marginTop: '2rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', cursor: 'pointer' }}>
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              style={{ width: '1.25rem', height: '1.25rem', accentColor: '#c084fc' }}
            />
            Published
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', cursor: 'pointer' }}>
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              style={{ width: '1.25rem', height: '1.25rem', accentColor: '#c084fc' }}
            />
            Featured Product
          </label>
        </div>
      </div>
    </form>
  )
}