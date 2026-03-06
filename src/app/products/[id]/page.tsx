'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type Product = {
  id: string
  name: string
  price: number
  description: string
  category: string
  stock: number
  image: string
  rating: number
  reviews: number
  features: string[]
  specs: { [key: string]: string }
}

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState('description')
  const [addedToCart, setAddedToCart] = useState(false)
  
  // Get product ID from URL
  const [productId, setProductId] = useState<string>('')
  
  useEffect(() => {
    const path = window.location.pathname
    const id = path.split('/').pop() || ''
    setProductId(id)
  }, [])

  // Load product data
  useEffect(() => {
    if (!productId) return
    
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      // Mock product data
      const mockProduct: Product = {
        id: productId,
        name: productId === '1' ? 'Quantum Processor X1' :
              productId === '2' ? 'Neural Interface Pro' :
              productId === '3' ? 'Holographic Display 8K' :
              productId === '4' ? 'Quantum Security System' :
              productId === '5' ? 'Bio-Tech Smart Watch' :
              productId === '6' ? 'AI Assistant Hub' :
              'Quantum Processor X1',
        price: productId === '1' ? 999.99 :
               productId === '2' ? 1499.99 :
               productId === '3' ? 799.99 :
               productId === '4' ? 2999.99 :
               productId === '5' ? 599.99 :
               productId === '6' ? 449.99 :
               999.99,
        description: `Experience the future with our cutting-edge technology. This product represents the pinnacle of innovation, designed to transform the way you work and live.`,
        category: productId === '1' ? 'Electronics' :
                  productId === '2' ? 'AI Products' :
                  productId === '3' ? 'Electronics' :
                  productId === '4' ? 'Security' :
                  productId === '5' ? 'Wearables' :
                  productId === '6' ? 'AI Products' :
                  'Electronics',
        stock: productId === '1' ? 50 :
               productId === '2' ? 25 :
               productId === '3' ? 30 :
               productId === '4' ? 10 :
               productId === '5' ? 100 :
               productId === '6' ? 75 :
               50,
        image: `/n${productId || '1'}.jpeg`,
        rating: 4.5,
        reviews: 128,
        features: [
          'Next-generation performance',
          'AI-powered optimization',
          'Energy efficient design',
          'Seamless integration',
          'Premium build quality',
          '2-year warranty'
        ],
        specs: {
          'Processor': '8-core Quantum CPU',
          'Memory': '32GB DDR5',
          'Storage': '1TB NVMe SSD',
          'Connectivity': 'WiFi 6E, Bluetooth 5.3',
          'Ports': '2x USB-C, 1x HDMI',
          'Dimensions': '30 x 20 x 2 cm',
          'Weight': '1.2 kg',
          'Color': 'Space Gray'
        }
      }
      
      setProduct(mockProduct)
      setLoading(false)
    }, 1000)
  }, [productId])

  // Handle quantity change
  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(prev => prev + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  // Handle add to cart
  const handleAddToCart = () => {
    setAddedToCart(true)
    
    // Get existing cart
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    
    // Add item
    cart.push({
      id: product?.id,
      name: product?.name,
      price: product?.price,
      quantity,
      image: product?.image
    })
    
    // Save cart
    localStorage.setItem('cart', JSON.stringify(cart))
    
    // Show success message
    setTimeout(() => setAddedToCart(false), 3000)
  }

  // Handle buy now
  const handleBuyNow = () => {
    handleAddToCart()
    setTimeout(() => {
      window.location.href = '/cart'
    }, 500)
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  if (loading) {
    return (
      <main style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a, #1e1b4b)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '3px solid rgba(255,255,255,0.1)',
          borderTopColor: '#c084fc',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </main>
    )
  }

  if (!product) {
    return (
      <main style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a, #1e1b4b)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem' }}>
            Product Not Found
          </h1>
          <Link href="/products" style={{
            color: '#c084fc',
            textDecoration: 'none'
          }}>
            ← Back to Products
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a, #1e1b4b)'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(15,23,42,0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #f472b6, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Kitechn
            </span>
          </Link>
          <Link href="/products" style={{
            color: '#9ca3af',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>←</span> Back to Products
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Breadcrumb */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          color: '#9ca3af',
          fontSize: '0.875rem'
        }}>
          <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/products" style={{ color: '#9ca3af', textDecoration: 'none' }}>Products</Link>
          <span>/</span>
          <span style={{ color: '#c084fc' }}>{product.name}</span>
        </div>

        {/* Product Details */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
              borderRadius: '1rem',
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(239,68,68,0.9)',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '2rem',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </div>
              <span style={{ fontSize: '8rem', color: 'white' }}>🖼️</span>
            </div>

            {/* Thumbnail Images */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              {[1, 2, 3, 4].map((img, index) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(index)}
                  style={{
                    width: '80px',
                    height: '80px',
                    background: selectedImage === index 
                      ? 'linear-gradient(135deg, #3b82f6, #a855f7)'
                      : 'rgba(255,255,255,0.1)',
                    borderRadius: '0.5rem',
                    border: selectedImage === index 
                      ? '2px solid #c084fc'
                      : '1px solid rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2rem'
                  }}
                >
                  🖼️
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Category */}
            <span style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              background: 'rgba(168,85,247,0.1)',
              color: '#c084fc',
              borderRadius: '1rem',
              fontSize: '0.875rem',
              marginBottom: '1rem'
            }}>
              {product.category}
            </span>

            {/* Title */}
            <h1 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} style={{ color: star <= product.rating ? '#f59e0b' : '#4b5563', fontSize: '1.25rem' }}>
                    ★
                  </span>
                ))}
              </div>
              <span style={{ color: '#9ca3af' }}>{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Price</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'white', fontSize: '2.5rem', fontWeight: 'bold' }}>
                  {formatCurrency(product.price)}
                </span>
                {product.stock < 10 && (
                  <span style={{
                    background: '#ef4444',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '2rem',
                    fontSize: '0.875rem'
                  }}>
                    Only {product.stock} left!
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p style={{ color: '#d1d5db', lineHeight: '1.6', marginBottom: '2rem' }}>
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', color: '#9ca3af', marginBottom: '0.5rem' }}>
                Quantity
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '0.5rem'
                }}>
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    style={{
                      width: '3rem',
                      height: '3rem',
                      background: 'none',
                      border: 'none',
                      color: 'white',
                      fontSize: '1.5rem',
                      cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                      opacity: quantity <= 1 ? 0.5 : 1
                    }}
                  >
                    −
                  </button>
                  <span style={{ color: 'white', minWidth: '3rem', textAlign: 'center' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                    style={{
                      width: '3rem',
                      height: '3rem',
                      background: 'none',
                      border: 'none',
                      color: 'white',
                      fontSize: '1.5rem',
                      cursor: quantity >= product.stock ? 'not-allowed' : 'pointer',
                      opacity: quantity >= product.stock ? 0.5 : 1
                    }}
                  >
                    +
                  </button>
                </div>
                <span style={{ color: '#9ca3af' }}>{product.stock} available</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                style={{
                  flex: 1,
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                  border: 'none',
                  borderRadius: '0.75rem',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '1rem',
                  cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                  opacity: product.stock === 0 ? 0.5 : 1
                }}
              >
                {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                style={{
                  flex: 1,
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  border: 'none',
                  borderRadius: '0.75rem',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '1rem',
                  cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                  opacity: product.stock === 0 ? 0.5 : 1
                }}
              >
                Buy Now
              </button>
            </div>

            {/* Features */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '0.75rem',
              padding: '1rem'
            }}>
              <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '0.5rem' }}>
                Key Features
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {product.features.map((feature, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#10b981' }}>✓</span>
                    <span style={{ color: '#d1d5db', fontSize: '0.875rem' }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '1rem',
          border: '1px solid rgba(255,255,255,0.1)',
          overflow: 'hidden'
        }}>
          {/* Tab Headers */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(0,0,0,0.2)'
          }}>
            {['description', 'specifications', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: '1rem',
                  background: activeTab === tab ? 'rgba(168,85,247,0.2)' : 'transparent',
                  border: 'none',
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

          {/* Tab Content */}
          <div style={{ padding: '2rem' }}>
            {activeTab === 'description' && (
              <div>
                <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                  Product Description
                </h3>
                <p style={{ color: '#d1d5db', lineHeight: '1.8' }}>
                  {product.description} This innovative product is designed to meet the highest standards of quality and performance. Built with cutting-edge technology, it delivers exceptional results for both professional and personal use.
                </p>
                <p style={{ color: '#d1d5db', lineHeight: '1.8', marginTop: '1rem' }}>
                  Whether you're a tech enthusiast or a professional user, this product offers the perfect balance of power, efficiency, and reliability. Experience the future of technology with Kitechn.
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                  Technical Specifications
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.75rem',
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: '0.5rem'
                    }}>
                      <span style={{ color: '#9ca3af' }}>{key}:</span>
                      <span style={{ color: 'white', fontWeight: '500' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                  Customer Reviews
                </h3>
                {[1, 2, 3].map(review => (
                  <div key={review} style={{
                    padding: '1rem',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ color: 'white', fontWeight: '600' }}>John Doe</span>
                      <span style={{ color: '#f59e0b' }}>★★★★★</span>
                    </div>
                    <p style={{ color: '#d1d5db', fontSize: '0.875rem' }}>
                      Excellent product! Highly recommended. The quality is outstanding and it performs exactly as described.
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            You Might Also Like
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            {[1, 2, 3, 4].map(item => (
              <Link
                key={item}
                href={`/products/${item}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '1rem',
                  padding: '1rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'transform 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                    borderRadius: '0.5rem',
                    aspectRatio: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    color: 'white',
                    fontSize: '3rem'
                  }}>
                    🖼️
                  </div>
                  <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '0.25rem' }}>
                    Product {item}
                  </h3>
                  <span style={{ color: '#c084fc', fontWeight: '600' }}>
                    {formatCurrency(499.99)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  )
}