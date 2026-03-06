'use client'

import { useState } from 'react'
import Link from 'next/link'

interface CartSummaryProps {
  subtotal: number
  tax?: number
  shipping?: number
  discount?: number
  total: number
  itemCount: number
  onCheckout?: () => void
  onApplyCoupon?: (coupon: string) => void
  isCheckoutDisabled?: boolean
  checkoutUrl?: string
  showTax?: boolean
  showShipping?: boolean
  showDiscount?: boolean
}

export default function CartSummary({
  subtotal,
  tax = 0,
  shipping = 0,
  discount = 0,
  total,
  itemCount,
  onCheckout,
  onApplyCoupon,
  isCheckoutDisabled = false,
  checkoutUrl = '/checkout',
  showTax = true,
  showShipping = true,
  showDiscount = true
}: CartSummaryProps) {
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponError, setCouponError] = useState('')
  const [isApplying, setIsApplying] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
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

  // Handle coupon apply
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code')
      return
    }

    setIsApplying(true)
    setCouponError('')

    // Demo coupons
    const validCoupons = ['SAVE10', 'SAVE20', 'WELCOME15', 'FLASH50', 'FREESHIP']
    
    setTimeout(() => {
      if (validCoupons.includes(couponCode.toUpperCase())) {
        setCouponApplied(true)
        if (onApplyCoupon) {
          onApplyCoupon(couponCode.toUpperCase())
        }
        setCouponError('')
      } else {
        setCouponError('Invalid coupon code')
      }
      setIsApplying(false)
    }, 500)
  }

  // Handle remove coupon
  const handleRemoveCoupon = () => {
    setCouponApplied(false)
    setCouponCode('')
    if (onApplyCoupon) {
      onApplyCoupon('')
    }
  }

  // Handle checkout
  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout()
    } else {
      window.location.href = checkoutUrl
    }
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  // Calculate savings
  const savings = discount > 0 ? discount : 0
  const estimatedTax = tax > 0 ? tax : subtotal * 0.1 // 10% default tax
  const estimatedShipping = shipping > 0 ? shipping : (subtotal > 100 ? 0 : 10)
  const finalTotal = total > 0 ? total : subtotal + estimatedTax + estimatedShipping - savings

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '1rem',
      padding: '1.5rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      position: isMobile ? 'static' : 'sticky',
      top: isMobile ? 'auto' : '2rem',
      width: '100%'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        cursor: isMobile ? 'pointer' : 'default'
      }}
      onClick={() => isMobile && setExpanded(!expanded)}
      >
        <h3 style={{
          color: 'white',
          fontSize: '1.25rem',
          fontWeight: '600',
          margin: 0
        }}>
          Order Summary
        </h3>
        <span style={{ color: '#c084fc', fontWeight: '600' }}>
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
        {isMobile && (
          <span style={{ color: '#9ca3af', fontSize: '1.25rem' }}>
            {expanded ? '↑' : '↓'}
          </span>
        )}
      </div>

      {/* Summary Details (collapsible on mobile) */}
      <div style={{
        display: isMobile && !expanded ? 'none' : 'block'
      }}>
        {/* Coupon Section */}
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
              disabled={couponApplied || isApplying}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: `1px solid ${couponError ? '#ef4444' : 'rgba(255, 255, 255, 0.2)'}`,
                borderRadius: '0.5rem',
                color: 'white',
                outline: 'none',
                fontSize: '0.875rem',
                opacity: couponApplied ? 0.5 : 1
              }}
            />
            {!couponApplied ? (
              <button
                onClick={handleApplyCoupon}
                disabled={isApplying || couponApplied}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  cursor: isApplying || couponApplied ? 'not-allowed' : 'pointer',
                  opacity: isApplying || couponApplied ? 0.5 : 1,
                  minWidth: '80px'
                }}
              >
                {isApplying ? '...' : 'Apply'}
              </button>
            ) : (
              <button
                onClick={handleRemoveCoupon}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '0.5rem',
                  color: '#ef4444',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            )}
          </div>
          {couponError && (
            <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>
              {couponError}
            </p>
          )}
          {couponApplied && (
            <p style={{ color: '#10b981', fontSize: '0.75rem', marginTop: '0.25rem' }}>
              ✓ Coupon applied successfully!
            </p>
          )}
        </div>

        {/* Price Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Subtotal */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#9ca3af' }}>Subtotal</span>
            <span style={{ color: 'white', fontWeight: '500' }}>
              {formatCurrency(subtotal)}
            </span>
          </div>

          {/* Discount */}
          {showDiscount && (discount > 0 || couponApplied) && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#10b981' }}>
                Discount {couponApplied && `(${couponCode})`}
              </span>
              <span style={{ color: '#10b981', fontWeight: '500' }}>
                -{formatCurrency(savings)}
              </span>
            </div>
          )}

          {/* Tax */}
          {showTax && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#9ca3af' }}>Estimated Tax</span>
              <span style={{ color: 'white', fontWeight: '500' }}>
                {formatCurrency(estimatedTax)}
              </span>
            </div>
          )}

          {/* Shipping */}
          {showShipping && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#9ca3af' }}>Shipping</span>
              {estimatedShipping === 0 ? (
                <span style={{ color: '#10b981', fontWeight: '500' }}>Free</span>
              ) : (
                <span style={{ color: 'white', fontWeight: '500' }}>
                  {formatCurrency(estimatedShipping)}
                </span>
              )}
            </div>
          )}

          {/* Free Shipping Message */}
          {showShipping && subtotal < 100 && (
            <p style={{
              color: '#f59e0b',
              fontSize: '0.75rem',
              marginTop: '-0.5rem'
            }}>
              Add {formatCurrency(100 - subtotal)} more for free shipping
            </p>
          )}

          {/* Divider */}
          <div style={{
            height: '1px',
            background: 'rgba(255, 255, 255, 0.1)',
            margin: '0.5rem 0'
          }} />

          {/* Total */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ color: 'white', fontSize: '1.125rem', fontWeight: '600' }}>
              Total
            </span>
            <span style={{
              color: '#c084fc',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              {formatCurrency(finalTotal)}
            </span>
          </div>

          {/* Savings Message */}
          {savings > 0 && (
            <p style={{
              color: '#10b981',
              fontSize: '0.875rem',
              textAlign: 'right'
            }}>
              You save {formatCurrency(savings)}!
            </p>
          )}
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          disabled={isCheckoutDisabled || itemCount === 0}
          style={{
            width: '100%',
            padding: '1rem',
            background: itemCount === 0 
              ? 'rgba(107, 114, 128, 0.3)'
              : 'linear-gradient(135deg, #10b981, #059669)',
            border: 'none',
            borderRadius: '0.75rem',
            color: 'white',
            fontWeight: '600',
            fontSize: '1rem',
            cursor: itemCount === 0 ? 'not-allowed' : 'pointer',
            opacity: itemCount === 0 ? 0.5 : 1,
            marginTop: '1.5rem',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => {
            if (itemCount > 0) {
              e.currentTarget.style.transform = 'scale(1.02)'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          {itemCount === 0 ? 'Cart is Empty' : 'Proceed to Checkout'}
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
          <span title="Visa">💳</span>
          <span title="Mastercard">💳</span>
          <span title="PayPal">📱</span>
          <span title="Apple Pay">🍎</span>
          <span title="Google Pay">🔷</span>
        </div>

        {/* Security Message */}
        <p style={{
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '0.75rem',
          marginTop: '1rem'
        }}>
          🔒 Secure checkout powered by Kitechn
        </p>
      </div>

      {/* Demo Coupons (Help Text) */}
      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '0.5rem'
      }}>
        <p style={{
          color: '#9ca3af',
          fontSize: '0.75rem',
          marginBottom: '0.5rem'
        }}>
          Demo coupons:
        </p>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap'
        }}>
          {['SAVE10', 'SAVE20', 'WELCOME15', 'FLASH50', 'FREESHIP'].map(code => (
            <button
              key={code}
              onClick={() => {
                setCouponCode(code)
                handleApplyCoupon()
              }}
              disabled={couponApplied}
              style={{
                padding: '0.25rem 0.5rem',
                background: 'rgba(168, 85, 247, 0.1)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                borderRadius: '0.25rem',
                color: '#c084fc',
                fontSize: '0.7rem',
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
  )
}