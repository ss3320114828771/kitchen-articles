'use client'

import { useState, useEffect } from 'react'

export default function AdminProductDetailPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('details')
  const [product, setProduct] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  
  // Get product ID from URL
  const [productId, setProductId] = useState<string>('')
  
  useEffect(() => {
    // Get ID from window location
    const path = window.location.pathname
    const id = path.split('/').pop() || ''
    setProductId(id)
  }, [])
  
  // Form state
  const [formData, setFormData] = useState({
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
    featured: false
  })

  // Load product data
  useEffect(() => {
    if (!productId) return
    
    // Simulate API call
    setTimeout(() => {
      // Mock product data based on ID
      const mockProduct = {
        id: productId,
        name: productId === 'new' ? '' : 'Quantum Processor X1',
        slug: productId === 'new' ? '' : 'quantum-processor-x1',
        description: productId === 'new' ? '' : 'Next-generation quantum processor with AI acceleration. Features 8 cores, 16 threads, and integrated neural processing unit for advanced computing tasks.',
        shortDesc: productId === 'new' ? '' : 'Advanced quantum processor for next-gen computing',
        price: productId === 'new' ? '' : '999.99',
        compareAtPrice: productId === 'new' ? '' : '1299.99',
        cost: productId === 'new' ? '' : '599.99',
        sku: productId === 'new' ? '' : 'QPRO-X1-001',
        barcode: productId === 'new' ? '' : '123456789012',
        quantity: productId === 'new' ? '' : '50',
        category: productId === 'new' ? '' : 'Electronics',
        subCategory: productId === 'new' ? '' : 'Processors',
        brand: productId === 'new' ? '' : 'Kitechn',
        tags: productId === 'new' ? '' : 'quantum,processor,ai',
        weight: productId === 'new' ? '' : '0.5',
        dimensions: productId === 'new' ? '' : '10x10x2 cm',
        published: productId !== 'new',
        featured: productId === '1' || productId === '2',
        images: [
          { id: 1, url: '/n1.jpeg', isPrimary: true },
          { id: 2, url: '/n2.jpeg', isPrimary: false },
          { id: 3, url: '/n3.jpeg', isPrimary: false }
        ],
        variants: [
          { id: 1, name: '8GB RAM', price: '999.99', stock: 30 },
          { id: 2, name: '16GB RAM', price: '1199.99', stock: 20 },
          { id: 3, name: '32GB RAM', price: '1499.99', stock: 10 }
        ],
        reviews: [
          { id: 1, user: 'Ali Ahmed', rating: 5, comment: 'Amazing product!', date: '2024-03-01' },
          { id: 2, user: 'Fatima Khan', rating: 4, comment: 'Very good performance', date: '2024-02-28' }
        ],
        createdAt: '2024-01-15',
        updatedAt: '2024-03-01'
      }
      
      setProduct(mockProduct)
      setFormData({
        name: mockProduct.name || '',
        slug: mockProduct.slug || '',
        description: mockProduct.description || '',
        shortDesc: mockProduct.shortDesc || '',
        price: mockProduct.price || '',
        compareAtPrice: mockProduct.compareAtPrice || '',
        cost: mockProduct.cost || '',
        sku: mockProduct.sku || '',
        barcode: mockProduct.barcode || '',
        quantity: mockProduct.quantity || '',
        category: mockProduct.category || '',
        subCategory: mockProduct.subCategory || '',
        brand: mockProduct.brand || '',
        tags: mockProduct.tags || '',
        weight: mockProduct.weight || '',
        dimensions: mockProduct.dimensions || '',
        published: mockProduct.published || false,
        featured: mockProduct.featured || false
      })
      setLoading(false)
    }, 1000)
  }, [productId])

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  // Handle save
  const handleSave = () => {
    setSaving(true)
    
    // Validate form
    if (!formData.name || !formData.price || !formData.category) {
      alert('Please fill in all required fields')
      setSaving(false)
      return
    }
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      setIsEditing(false)
      alert('Product saved successfully!')
    }, 1500)
  }

  // Handle delete
  const handleDelete = () => {
    setSaving(true)
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      setShowDeleteConfirm(false)
      alert('Product deleted successfully!')
      window.location.href = '/admin/products'
    }, 1500)
  }

  // Handle go back
  const handleGoBack = () => {
    window.location.href = '/admin/products'
  }

  // Format currency
  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(num || 0)
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
            <button
              onClick={handleGoBack}
              style={{
                background: 'none',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}
            >
              <span>←</span> Back to Products
            </button>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #60a5fa, #c084fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem'
            }}>
              {productId === 'new' ? 'Add New Product' : `Edit Product: ${product?.name}`}
            </h2>
            <p style={{ color: '#d1d5db' }}>
              {productId === 'new' ? 'Create a new product' : `Product ID: ${productId}`}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            {productId !== 'new' && !isEditing && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
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
                  <span>✏️</span>
                  Edit Product
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '0.75rem',
                    color: '#ef4444',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>🗑️</span>
                  Delete
                </button>
              </>
            )}
            {productId === 'new' && (
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  padding: '0.75rem 2rem',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  border: 'none',
                  borderRadius: '0.75rem',
                  color: 'white',
                  fontWeight: '600',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  opacity: saving ? 0.5 : 1
                }}
              >
                {saving ? 'Creating...' : 'Create Product'}
              </button>
            )}
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
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
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={handleDelete}
                  disabled={saving}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: '#ef4444',
                    border: 'none',
                    borderRadius: '0.75rem',
                    color: 'white',
                    fontWeight: '600',
                    cursor: saving ? 'not-allowed' : 'pointer',
                    opacity: saving ? 0.5 : 1
                  }}
                >
                  {saving ? 'Deleting...' : 'Delete'}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
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

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '0.5rem',
          overflowX: 'auto'
        }}>
          {['details', 'images', 'variants', 'reviews', 'seo'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.75rem 1.5rem',
                background: activeTab === tab ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
                border: 'none',
                borderRadius: '0.5rem',
                color: activeTab === tab ? '#c084fc' : '#9ca3af',
                fontWeight: activeTab === tab ? '600' : '400',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Details Tab */}
        {activeTab === 'details' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '2rem'
            }}>
              {/* Left Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>
                    Product Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  {isEditing || productId === 'new' ? (
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
                  ) : (
                    <div style={{ color: 'white', padding: '0.75rem 0' }}>{product?.name}</div>
                  )}
                </div>

                <div>
                  <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>
                    Slug
                  </label>
                  {isEditing || productId === 'new' ? (
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
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
                  ) : (
                    <div style={{ color: 'white', padding: '0.75rem 0' }}>{product?.slug}</div>
                  )}
                </div>

                <div>
                  <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>
                    Short Description
                  </label>
                  {isEditing || productId === 'new' ? (
                    <input
                      type="text"
                      name="shortDesc"
                      value={formData.shortDesc}
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
                  ) : (
                    <div style={{ color: '#d1d5db', padding: '0.75rem 0' }}>{product?.shortDesc}</div>
                  )}
                </div>

                <div>
                  <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>
                    Full Description
                  </label>
                  {isEditing || productId === 'new' ? (
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={5}
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
                  ) : (
                    <div style={{ color: '#d1d5db', padding: '0.75rem 0', lineHeight: '1.6' }}>
                      {product?.description}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem'
                }}>
                  <div>
                    <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>
                      Price ($) <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    {isEditing || productId === 'new' ? (
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        step="0.01"
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
                    ) : (
                      <div style={{ color: 'white', padding: '0.75rem 0' }}>{formatCurrency(product?.price)}</div>
                    )}
                  </div>

                  <div>
                    <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>
                      Compare at Price
                    </label>
                    {isEditing || productId === 'new' ? (
                      <input
                        type="number"
                        name="compareAtPrice"
                        value={formData.compareAtPrice}
                        onChange={handleInputChange}
                        step="0.01"
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
                    ) : (
                      <div style={{ color: 'white', padding: '0.75rem 0' }}>
                        {product?.compareAtPrice ? formatCurrency(product.compareAtPrice) : '-'}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem'
                }}>
                  <div>
                    <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>
                      Cost (Admin only)
                    </label>
                    {isEditing || productId === 'new' ? (
                      <input
                        type="number"
                        name="cost"
                        value={formData.cost}
                        onChange={handleInputChange}
                        step="0.01"
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
                    ) : (
                      <div style={{ color: 'white', padding: '0.75rem 0' }}>
                        {product?.cost ? formatCurrency(product.cost) : '-'}
                      </div>
                    )}
                  </div>

                  <div>
                    <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>
                      Quantity <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    {isEditing || productId === 'new' ? (
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
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
                    ) : (
                      <div style={{ color: 'white', padding: '0.75rem 0' }}>{product?.quantity}</div>
                    )}
                  </div>
                </div>

                <div>
                  <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>
                    SKU
                  </label>
                  {isEditing || productId === 'new' ? (
                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
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
                  ) : (
                    <div style={{ color: 'white', padding: '0.75rem 0' }}>{product?.sku || '-'}</div>
                  )}
                </div>

                <div>
                  <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>
                    Barcode
                  </label>
                  {isEditing || productId === 'new' ? (
                    <input
                      type="text"
                      name="barcode"
                      value={formData.barcode}
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
                  ) : (
                    <div style={{ color: 'white', padding: '0.75rem 0' }}>{product?.barcode || '-'}</div>
                  )}
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem'
                }}>
                  <div>
                    <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>
                      Category <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    {isEditing || productId === 'new' ? (
                      <select
                        name="category"
                        value={formData.category}
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
                        <option value="">Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="AI Products">AI Products</option>
                        <option value="Wearables">Wearables</option>
                        <option value="Security">Security</option>
                      </select>
                    ) : (
                      <div style={{ color: 'white', padding: '0.75rem 0' }}>{product?.category}</div>
                    )}
                  </div>

                  <div>
                    <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>
                      Sub Category
                    </label>
                    {isEditing || productId === 'new' ? (
                      <input
                        type="text"
                        name="subCategory"
                        value={formData.subCategory}
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
                    ) : (
                      <div style={{ color: 'white', padding: '0.75rem 0' }}>{product?.subCategory || '-'}</div>
                    )}
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem'
                }}>
                  <div>
                    <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>
                      Brand
                    </label>
                    {isEditing || productId === 'new' ? (
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
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
                    ) : (
                      <div style={{ color: 'white', padding: '0.75rem 0' }}>{product?.brand || '-'}</div>
                    )}
                  </div>

                  <div>
                    <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>
                      Tags (comma separated)
                    </label>
                    {isEditing || productId === 'new' ? (
                      <input
                        type="text"
                        name="tags"
                        value={formData.tags}
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
                    ) : (
                      <div style={{ color: 'white', padding: '0.75rem 0' }}>{product?.tags}</div>
                    )}
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem'
                }}>
                  <div>
                    <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>
                      Weight (kg)
                    </label>
                    {isEditing || productId === 'new' ? (
                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        step="0.01"
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
                    ) : (
                      <div style={{ color: 'white', padding: '0.75rem 0' }}>{product?.weight || '-'}</div>
                    )}
                  </div>

                  <div>
                    <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>
                      Dimensions
                    </label>
                    {isEditing || productId === 'new' ? (
                      <input
                        type="text"
                        name="dimensions"
                        value={formData.dimensions}
                        onChange={handleInputChange}
                        placeholder="LxWxH cm"
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
                    ) : (
                      <div style={{ color: 'white', padding: '0.75rem 0' }}>{product?.dimensions || '-'}</div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '2rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
                    <input
                      type="checkbox"
                      name="published"
                      checked={formData.published}
                      onChange={handleInputChange}
                      disabled={!(isEditing || productId === 'new')}
                      style={{ width: '1.25rem', height: '1.25rem' }}
                    />
                    Published
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      disabled={!(isEditing || productId === 'new')}
                      style={{ width: '1.25rem', height: '1.25rem' }}
                    />
                    Featured
                  </label>
                </div>

                {isEditing && (
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        border: 'none',
                        borderRadius: '0.75rem',
                        color: 'white',
                        fontWeight: '600',
                        cursor: saving ? 'not-allowed' : 'pointer',
                        opacity: saving ? 0.5 : 1
                      }}
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false)
                        setFormData({
                          name: product.name || '',
                          slug: product.slug || '',
                          description: product.description || '',
                          shortDesc: product.shortDesc || '',
                          price: product.price || '',
                          compareAtPrice: product.compareAtPrice || '',
                          cost: product.cost || '',
                          sku: product.sku || '',
                          barcode: product.barcode || '',
                          quantity: product.quantity || '',
                          category: product.category || '',
                          subCategory: product.subCategory || '',
                          brand: product.brand || '',
                          tags: product.tags || '',
                          weight: product.weight || '',
                          dimensions: product.dimensions || '',
                          published: product.published || false,
                          featured: product.featured || false
                        })
                      }}
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
                )}
              </div>
            </div>
          </div>
        )}

        {/* Images Tab */}
        {activeTab === 'images' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
              Product Images
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem'
            }}>
              {product?.images?.map((image: any) => (
                <div
                  key={image.id}
                  style={{
                    position: 'relative',
                    aspectRatio: '1',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    border: image.isPrimary ? '2px solid #c084fc' : '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '3rem'
                  }}>
                    🖼️
                  </div>
                  {image.isPrimary && (
                    <span style={{
                      position: 'absolute',
                      top: '0.5rem',
                      left: '0.5rem',
                      background: '#c084fc',
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.75rem'
                    }}>
                      Primary
                    </span>
                  )}
                  {(isEditing || productId === 'new') && (
                    <div style={{
                      position: 'absolute',
                      bottom: '0.5rem',
                      right: '0.5rem',
                      display: 'flex',
                      gap: '0.5rem'
                    }}>
                      <button
                        onClick={() => alert('Set as primary')}
                        style={{
                          background: 'rgba(0, 0, 0, 0.5)',
                          border: 'none',
                          borderRadius: '0.5rem',
                          color: 'white',
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.75rem',
                          cursor: 'pointer'
                        }}
                      >
                        ⭐
                      </button>
                      <button
                        onClick={() => alert('Delete image')}
                        style={{
                          background: 'rgba(239, 68, 68, 0.5)',
                          border: 'none',
                          borderRadius: '0.5rem',
                          color: 'white',
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.75rem',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </div>
              ))}
              
              {(isEditing || productId === 'new') && (
                <div
                  onClick={() => alert('Add new image')}
                  style={{
                    aspectRatio: '1',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '1rem',
                    border: '2px dashed rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    color: '#9ca3af'
                  }}
                >
                  <span style={{ fontSize: '2rem' }}>➕</span>
                  <span>Add Image</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Variants Tab */}
        {activeTab === 'variants' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600' }}>
                Product Variants
              </h3>
              {(isEditing || productId === 'new') && (
                <button
                  onClick={() => alert('Add variant')}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>➕</span>
                  Add Variant
                </button>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {product?.variants?.map((variant: any) => (
                <div
                  key={variant.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 0.5fr',
                    gap: '1rem',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '0.75rem',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ color: 'white' }}>{variant.name}</div>
                  <div style={{ color: '#10b981' }}>{formatCurrency(variant.price)}</div>
                  <div style={{ color: variant.stock > 10 ? '#3b82f6' : '#ef4444' }}>{variant.stock} in stock</div>
                  {(isEditing || productId === 'new') && (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => alert('Edit variant')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#3b82f6',
                          cursor: 'pointer',
                          fontSize: '1rem'
                        }}
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => alert('Delete variant')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ef4444',
                          cursor: 'pointer',
                          fontSize: '1rem'
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
              Customer Reviews
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {product?.reviews?.map((review: any) => (
                <div
                  key={review.id}
                  style={{
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '0.75rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ color: 'white', fontWeight: '500' }}>{review.user}</div>
                    <div style={{ color: '#f59e0b' }}>
                      {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}
                    </div>
                  </div>
                  <p style={{ color: '#d1d5db', marginBottom: '0.5rem' }}>{review.comment}</p>
                  <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{formatDate(review.date)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
              SEO Settings
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>
                  Meta Title
                </label>
                <input
                  type="text"
                  value={product?.metaTitle || ''}
                  onChange={() => {}}
                  disabled={!(isEditing || productId === 'new')}
                  placeholder="Enter meta title"
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
                <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>
                  Meta Description
                </label>
                <textarea
                  value={product?.metaDesc || ''}
                  onChange={() => {}}
                  disabled={!(isEditing || productId === 'new')}
                  rows={4}
                  placeholder="Enter meta description"
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

// Helper function for date formatting
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}