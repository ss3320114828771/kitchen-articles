'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Cart item type
type CartItem = {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  maxStock: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponError, setCouponError] = useState('')

  // Load cart on mount
  useEffect(() => {
    loadCart()
  }, [])

  // Load cart from localStorage or API
  const loadCart = () => {
    setLoading(true)
    
    // Try to load from localStorage first
    const savedCart = localStorage.getItem('cart')
    
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart)
        setCartItems(parsed)
      } catch (e) {
        // If error, load default items
        loadDefaultCart()
      }
    } else {
      // Load default items for demo
      loadDefaultCart()
    }
    
    setLoading(false)
  }

  // Load default cart items for demo
  const loadDefaultCart = () => {
    setCartItems([
      {
        id: '1',
        productId: 'prod_1',
        name: 'Quantum Processor X1',
        price: 999.99,
        quantity: 1,
        image: '/n1.jpeg',
        maxStock: 50
      },
      {
        id: '2',
        productId: 'prod_2',
        name: 'Neural Interface Pro',
        price: 299.99,
        quantity: 2,
        image: '/n2.jpeg',
        maxStock: 25
      },
      {
        id: '3',
        productId: 'prod_3',
        name: 'Holographic Display',
        price: 799.99,
        quantity: 1,
        image: '/n3.jpeg',
        maxStock: 30
      }
    ])
  }

  // Save cart to localStorage
  const saveCart = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items))
    setCartItems(items)
  }

  // Update quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    
    const item = cartItems.find(item => item.id === id)
    if (item && newQuantity > item.maxStock) {
      alert(`Maximum quantity is ${item.maxStock}`)
      return
    }
    
    setUpdating(true)
    
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
    
    saveCart(updated)
    setTimeout(() => setUpdating(false), 300)
  }

  // Remove item
  const removeItem = (id: string) => {
    if (confirm('Remove this item from cart?')) {
      const updated = cartItems.filter(item => item.id !== id)
      saveCart(updated)
    }
  }

  // Clear cart
  const clearCart = () => {
    if (confirm('Clear your entire cart?')) {
      setCartItems([])
      localStorage.removeItem('cart')
      setDiscount(0)
      setCouponApplied(false)
      setCouponCode('')
    }
  }

  // Apply coupon
  const applyCoupon = () => {
    setCouponError('')
    
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code')
      return
    }
    
    // Demo coupons
    const coupons: { [key: string]: number } = {
      'SAVE10': 10,
      'SAVE20': 20,
      'WELCOME15': 15,
      'FLASH50': 50,
      'FREESHIP': 0 // Free shipping
    }
    
    const code = couponCode.toUpperCase().trim()
    
    if (coupons[code] !== undefined) {
      setDiscount(coupons[code])
      setCouponApplied(true)
      setCouponError('')
    } else {
      setCouponError('Invalid coupon code')
    }
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  // Apply discount
  let discountAmount = 0
  if (couponApplied && discount > 0) {
    discountAmount = (subtotal * discount) / 100
  }
  
  const afterDiscount = subtotal - discountAmount
  
  // Calculate tax (10%)
  const tax = afterDiscount * 0.1
  
  // Calculate shipping
  const shipping = afterDiscount > 100 ? 0 : 10
  
  // Calculate total
  const total = afterDiscount + tax + shipping
  
  // Item count
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

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
        padding: '1rem 2rem'
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
            <span>←</span> Continue Shopping
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #60a5fa, #c084fc)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '2rem'
        }}>
          Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </h1>

        {cartItems.length === 0 ? (
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '1rem',
            padding: '4rem 2rem',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>
              Your cart is empty
            </h2>
            <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link href="/products" style={{
              display: 'inline-block',
              padding: '0.75rem 2rem',
              background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
              borderRadius: '0.75rem',
              color: 'white',
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              Start Shopping
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '2rem'
          }}>
            {/* Cart Items */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                  {/* Product Image */}
                  <div style={{
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    color: 'white'
                  }}>
                    {item.image ? '🖼️' : '📦'}
                  </div>

                  {/* Product Details */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '0.25rem' }}>
                          {item.name}
                        </h3>
                        <p style={{ color: '#c084fc', fontSize: '0.875rem' }}>
                          {formatCurrency(item.price)} each
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ef4444',
                          fontSize: '1.25rem',
                          cursor: 'pointer'
                        }}
                        title="Remove"
                      >
                        🗑️
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginTop: '1rem'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '2rem',
                        padding: '0.25rem'
                      }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={updating || item.quantity <= 1}
                          style={{
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            color: 'white',
                            cursor: updating || item.quantity <= 1 ? 'not-allowed' : 'pointer',
                            opacity: updating || item.quantity <= 1 ? 0.5 : 1
                          }}
                        >
                          −
                        </button>
                        <span style={{ color: 'white', minWidth: '2rem', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={updating || item.quantity >= item.maxStock}
                          style={{
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            color: 'white',
                            cursor: updating || item.quantity >= item.maxStock ? 'not-allowed' : 'pointer',
                            opacity: updating || item.quantity >= item.maxStock ? 0.5 : 1
                          }}
                        >
                          +
                        </button>
                      </div>
                      <span style={{ color: 'white', fontWeight: '600' }}>
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Cart Actions */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '1.5rem'
              }}>
                <button
                  onClick={clearCart}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: '0.5rem',
                    color: '#ef4444',
                    cursor: 'pointer'
                  }}
                >
                  Clear Cart
                </button>
                <Link href="/products" style={{
                  padding: '0.5rem 1rem',
                  background: 'rgba(59,130,246,0.1)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  borderRadius: '0.5rem',
                  color: '#3b82f6',
                  textDecoration: 'none'
                }}>
                  Add More Items
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '1rem',
                padding: '1.5rem',
                border: '1px solid rgba(255,255,255,0.1)',
                position: 'sticky',
                top: '2rem'
              }}>
                <h2 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                  Order Summary
                </h2>

                {/* Coupon Code */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value)
                        setCouponError('')
                      }}
                      placeholder="Coupon code"
                      disabled={couponApplied}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '0.5rem',
                        color: 'white',
                        outline: 'none'
                      }}
                    />
                    <button
                      onClick={applyCoupon}
                      disabled={couponApplied}
                      style={{
                        padding: '0.5rem 1rem',
                        background: couponApplied ? 'rgba(16,185,129,0.3)' : 'linear-gradient(135deg, #3b82f6, #a855f7)',
                        border: 'none',
                        borderRadius: '0.5rem',
                        color: 'white',
                        cursor: couponApplied ? 'not-allowed' : 'pointer'
                      }}
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                      {couponError}
                    </p>
                  )}
                  {couponApplied && (
                    <p style={{ color: '#10b981', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                      Coupon applied! {discount}% discount
                    </p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af' }}>
                    <span>Subtotal ({itemCount} items)</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  
                  {couponApplied && discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                      <span>Discount ({discount}%)</span>
                      <span>-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af' }}>
                    <span>Tax (10%)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af' }}>
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
                  </div>
                  
                  <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: 'white',
                    fontSize: '1.25rem',
                    fontWeight: 'bold'
                  }}>
                    <span>Total</span>
                    <span style={{ color: '#c084fc' }}>{formatCurrency(total)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => alert('Proceeding to checkout...')}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    border: 'none',
                    borderRadius: '0.75rem',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '1.125rem',
                    cursor: 'pointer',
                    marginTop: '1.5rem'
                  }}
                >
                  Proceed to Checkout
                </button>

                {/* Payment Methods */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem',
                  marginTop: '1rem',
                  color: '#9ca3af',
                  fontSize: '1.5rem'
                }}>
                  <span>💳</span>
                  <span>📱</span>
                  <span>🏦</span>
                  <span>💰</span>
                </div>

                {/* Demo Coupons */}
                <div style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '0.5rem'
                }}>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    Demo Coupons:
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {['SAVE10', 'SAVE20', 'WELCOME15', 'FLASH50'].map(code => (
                      <button
                        key={code}
                        onClick={() => {
                          setCouponCode(code)
                          applyCoupon()
                        }}
                        disabled={couponApplied}
                        style={{
                          padding: '0.25rem 0.5rem',
                          background: 'rgba(168,85,247,0.1)',
                          border: '1px solid rgba(168,85,247,0.3)',
                          borderRadius: '0.25rem',
                          color: '#c084fc',
                          fontSize: '0.75rem',
                          cursor: couponApplied ? 'not-allowed' : 'pointer',
                          opacity: couponApplied ? 0.5 : 1
                        }}
                      >
                        {code}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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