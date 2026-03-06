'use client'

import { useState, useEffect } from 'react'

export default function AdminProductsPage() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<any[]>([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [productToDelete, setProductToDelete] = useState<any>(null)

  // Load products data
  useEffect(() => {
    setTimeout(() => {
      setProducts([
        {
          id: '1',
          name: 'Quantum Processor X1',
          slug: 'quantum-processor-x1',
          price: 999.99,
          compareAtPrice: 1299.99,
          cost: 599.99,
          category: 'Electronics',
          subCategory: 'Processors',
          brand: 'Kitechn',
          stock: 50,
          sku: 'QPRO-X1-001',
          status: 'active',
          featured: true,
          image: '🖥️',
          createdAt: '2024-01-15',
          updatedAt: '2024-03-01'
        },
        {
          id: '2',
          name: 'Neural Interface Pro',
          slug: 'neural-interface-pro',
          price: 1499.99,
          compareAtPrice: 1799.99,
          cost: 899.99,
          category: 'AI Products',
          subCategory: 'Interfaces',
          brand: 'Kitechn',
          stock: 25,
          sku: 'NIPRO-002',
          status: 'active',
          featured: true,
          image: '🧠',
          createdAt: '2024-01-20',
          updatedAt: '2024-02-28'
        },
        {
          id: '3',
          name: 'Holographic Display 8K',
          slug: 'holographic-display-8k',
          price: 799.99,
          compareAtPrice: 999.99,
          cost: 449.99,
          category: 'Electronics',
          subCategory: 'Displays',
          brand: 'Kitechn',
          stock: 30,
          sku: 'HOLO-003',
          status: 'active',
          featured: false,
          image: '📺',
          createdAt: '2024-01-25',
          updatedAt: '2024-02-25'
        },
        {
          id: '4',
          name: 'Quantum Security System',
          slug: 'quantum-security-system',
          price: 2999.99,
          compareAtPrice: 3499.99,
          cost: 1799.99,
          category: 'Security',
          subCategory: 'Systems',
          brand: 'Kitechn',
          stock: 10,
          sku: 'QSEC-004',
          status: 'active',
          featured: true,
          image: '🔒',
          createdAt: '2024-02-01',
          updatedAt: '2024-02-20'
        },
        {
          id: '5',
          name: 'Bio-Tech Smart Watch',
          slug: 'bio-tech-smart-watch',
          price: 599.99,
          compareAtPrice: 699.99,
          cost: 349.99,
          category: 'Wearables',
          subCategory: 'Watches',
          brand: 'Kitechn',
          stock: 100,
          sku: 'BIOW-005',
          status: 'active',
          featured: false,
          image: '⌚',
          createdAt: '2024-02-05',
          updatedAt: '2024-02-15'
        },
        {
          id: '6',
          name: 'AI Assistant Hub',
          slug: 'ai-assistant-hub',
          price: 449.99,
          compareAtPrice: 549.99,
          cost: 249.99,
          category: 'AI Products',
          subCategory: 'Hubs',
          brand: 'Kitechn',
          stock: 75,
          sku: 'AIHUB-006',
          status: 'inactive',
          featured: false,
          image: '🤖',
          createdAt: '2024-02-10',
          updatedAt: '2024-02-10'
        },
        {
          id: '7',
          name: 'Quantum Router X2',
          slug: 'quantum-router-x2',
          price: 299.99,
          compareAtPrice: 349.99,
          cost: 179.99,
          category: 'Electronics',
          subCategory: 'Networking',
          brand: 'Kitechn',
          stock: 0,
          sku: 'QROU-007',
          status: 'out_of_stock',
          featured: false,
          image: '📶',
          createdAt: '2024-02-15',
          updatedAt: '2024-02-15'
        },
        {
          id: '8',
          name: 'Neural Headset',
          slug: 'neural-headset',
          price: 899.99,
          compareAtPrice: 1099.99,
          cost: 549.99,
          category: 'Wearables',
          subCategory: 'Headsets',
          brand: 'Kitechn',
          stock: 15,
          sku: 'NHEAD-008',
          status: 'active',
          featured: false,
          image: '🎧',
          createdAt: '2024-02-20',
          updatedAt: '2024-02-20'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  // Filter products
  const filteredProducts = products.filter(product => {
    // Status filter
    const matchesFilter = filter === 'all' || product.status === filter
    
    // Category filter
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    
    // Search filter
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesCategory && matchesSearch
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortBy === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    } else if (sortBy === 'price_high') {
      return b.price - a.price
    } else if (sortBy === 'price_low') {
      return a.price - b.price
    } else if (sortBy === 'name_asc') {
      return a.name.localeCompare(b.name)
    } else if (sortBy === 'name_desc') {
      return b.name.localeCompare(a.name)
    }
    return 0
  })

  // Get unique categories
  const categories = ['all', ...new Set(products.map(p => p.category))]

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  // Handle delete
  const handleDeleteClick = (product: any) => {
    setProductToDelete(product)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    setProducts(prev => prev.filter(p => p.id !== productToDelete.id))
    setShowDeleteModal(false)
    setProductToDelete(null)
  }

  // Handle edit
  const handleEdit = (productId: string) => {
    window.location.href = `/admin/products/${productId}`
  }

  // Handle add new
  const handleAddNew = () => {
    window.location.href = '/admin/products/new'
  }

  // Handle duplicate
  const handleDuplicate = (product: any) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      name: `${product.name} (Copy)`,
      sku: `${product.sku}-COPY`,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setProducts(prev => [...prev, newProduct])
  }

  // Get stock status color
  const getStockColor = (stock: number) => {
    if (stock === 0) return '#ef4444'
    if (stock < 10) return '#f59e0b'
    return '#10b981'
  }

  // Get status badge style
  const getStatusStyle = (status: string) => {
    const styles: {[key: string]: any} = {
      active: { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
      inactive: { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' },
      out_of_stock: { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }
    }
    return styles[status] || { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' }
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
              Products Management
            </h2>
            <p style={{ color: '#d1d5db' }}>
              Total Products: {products.length} | Active: {products.filter(p => p.status === 'active').length}
            </p>
          </div>

          {/* Add New Button */}
          <button
            onClick={handleAddNew}
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
            Add New Product
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
            <div style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>Total Products</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
              {products.length}
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>Active Products</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
              {products.filter(p => p.status === 'active').length}
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>Out of Stock</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
              {products.filter(p => p.stock === 0).length}
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>Low Stock</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
              {products.filter(p => p.stock > 0 && p.stock < 10).length}
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
              placeholder="Search by name, SKU, category..."
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

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
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
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
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
            <option value="out_of_stock">Out of Stock</option>
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
            <option value="price_high">Price High-Low</option>
            <option value="price_low">Price Low-High</option>
          </select>
        </div>

        {/* Products Table */}
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
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Product</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>SKU</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Category</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Price</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Cost</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Stock</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Featured</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#9ca3af' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((product) => {
                const statusStyle = getStatusStyle(product.status)
                return (
                  <tr 
                    key={product.id} 
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
                    onClick={() => handleEdit(product.id)}
                  >
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '2rem' }}>{product.image}</span>
                        <div>
                          <div style={{ color: 'white', fontWeight: '500' }}>{product.name}</div>
                          <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{product.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', color: '#d1d5db' }}>{product.sku}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ color: 'white' }}>{product.category}</div>
                      <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{product.subCategory}</div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ color: 'white', fontWeight: '600' }}>{formatCurrency(product.price)}</div>
                      {product.compareAtPrice && (
                        <div style={{ color: '#9ca3af', fontSize: '0.875rem', textDecoration: 'line-through' }}>
                          {formatCurrency(product.compareAtPrice)}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '1rem', color: '#ef4444' }}>{formatCurrency(product.cost)}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        color: getStockColor(product.stock),
                        fontWeight: '600'
                      }}>
                        {product.stock}
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
                        {product.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {product.featured ? (
                        <span style={{ color: '#f59e0b', fontSize: '1.25rem' }}>⭐</span>
                      ) : (
                        <span style={{ color: '#4b5563' }}>☆</span>
                      )}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEdit(product.id)
                          }}
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
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDuplicate(product)
                          }}
                          style={{
                            padding: '0.5rem',
                            background: 'rgba(16, 185, 129, 0.1)',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            borderRadius: '0.5rem',
                            color: '#10b981',
                            cursor: 'pointer',
                            fontSize: '1rem'
                          }}
                          title="Duplicate"
                        >
                          📋
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteClick(product)
                          }}
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
        {showDeleteModal && productToDelete && (
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
                Are you sure you want to delete <span style={{ color: 'white', fontWeight: '600' }}>{productToDelete.name}</span>? This action cannot be undone.
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