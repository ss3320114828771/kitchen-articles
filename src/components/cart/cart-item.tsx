'use client'

import { useState } from 'react'
import Link from 'next/link'

interface CartItemProps {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
  maxStock?: number
  onUpdateQuantity: (id: string, newQuantity: number) => void
  onRemove: (id: string) => void
  isUpdating?: boolean
}

export default function CartItem({
  id,
  productId,
  name,
  price,
  quantity,
  image,
  maxStock = 100,
  onUpdateQuantity,
  onRemove,
  isUpdating = false
}: CartItemProps) {
  const [localQuantity, setLocalQuantity] = useState(quantity)
  const [isRemoving, setIsRemoving] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  // Handle quantity increase
  const handleIncrease = () => {
    if (localQuantity < maxStock) {
      const newQuantity = localQuantity + 1
      setLocalQuantity(newQuantity)
      onUpdateQuantity(id, newQuantity)
    }
  }

  // Handle quantity decrease
  const handleDecrease = () => {
    if (localQuantity > 1) {
      const newQuantity = localQuantity - 1
      setLocalQuantity(newQuantity)
      onUpdateQuantity(id, newQuantity)
    }
  }

  // Handle quantity input change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value >= 1 && value <= maxStock) {
      setLocalQuantity(value)
      onUpdateQuantity(id, value)
    }
  }

  // Handle remove
  const handleRemove = () => {
    setIsRemoving(true)
    setTimeout(() => {
      onRemove(id)
    }, 300)
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  // Calculate item total
  const itemTotal = price * localQuantity

  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
        opacity: isRemoving ? 0 : 1,
        transform: isRemoving ? 'translateX(-20px)' : 'translateX(0)',
        position: 'relative',
        marginBottom: '0.5rem'
      }}
    >
      {/* Product Image */}
      <Link href={`/products/${productId}`} style={{ textDecoration: 'none' }}>
        <div
          style={{
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            color: 'white',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          {image ? '🖼️' : '📦'}
        </div>
      </Link>

      {/* Product Details */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Link href={`/products/${productId}`} style={{ textDecoration: 'none' }}>
            <h3
              style={{
                color: 'white',
                fontWeight: '600',
                fontSize: '1rem',
                margin: 0,
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#c084fc'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'white'
              }}
            >
              {name}
            </h3>
          </Link>
          
          {/* Remove Button */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowConfirm(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#9ca3af',
                fontSize: '1.25rem',
                cursor: 'pointer',
                padding: '0.25rem',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ef4444'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#9ca3af'
              }}
              title="Remove item"
            >
              ✕
            </button>

            {/* Confirm Delete Popup */}
            {showConfirm && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: '#1e1b4b',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.5rem',
                  padding: '0.5rem',
                  zIndex: 10,
                  minWidth: '150px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              >
                <p style={{ color: 'white', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  Remove item?
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={handleRemove}
                    style={{
                      flex: 1,
                      padding: '0.25rem',
                      background: '#ef4444',
                      border: 'none',
                      borderRadius: '0.25rem',
                      color: 'white',
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    style={{
                      flex: 1,
                      padding: '0.25rem',
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '0.25rem',
                      color: 'white',
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#c084fc', fontWeight: '600' }}>
            {formatCurrency(price)}
          </span>
          <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
            each
          </span>
        </div>

        {/* Quantity Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '2rem',
            padding: '0.25rem'
          }}>
            <button
              onClick={handleDecrease}
              disabled={isUpdating || localQuantity <= 1}
              style={{
                width: '2rem',
                height: '2rem',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.25rem',
                cursor: isUpdating || localQuantity <= 1 ? 'not-allowed' : 'pointer',
                opacity: isUpdating || localQuantity <= 1 ? 0.5 : 1,
                borderRadius: '50%',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!isUpdating && localQuantity > 1) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none'
              }}
            >
              −
            </button>
            
            <input
              type="number"
              value={localQuantity}
              onChange={handleQuantityChange}
              min="1"
              max={maxStock}
              disabled={isUpdating}
              style={{
                width: '3rem',
                textAlign: 'center',
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontWeight: '600',
                outline: 'none'
              }}
            />
            
            <button
              onClick={handleIncrease}
              disabled={isUpdating || localQuantity >= maxStock}
              style={{
                width: '2rem',
                height: '2rem',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.25rem',
                cursor: isUpdating || localQuantity >= maxStock ? 'not-allowed' : 'pointer',
                opacity: isUpdating || localQuantity >= maxStock ? 0.5 : 1,
                borderRadius: '50%',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!isUpdating && localQuantity < maxStock) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none'
              }}
            >
              +
            </button>
          </div>

          {/* Stock Status */}
          {localQuantity >= maxStock && (
            <span style={{
              color: '#ef4444',
              fontSize: '0.75rem',
              background: 'rgba(239,68,68,0.1)',
              padding: '0.25rem 0.5rem',
              borderRadius: '1rem'
            }}>
              Max stock
            </span>
          )}
        </div>

        {/* Item Total */}
        <div style={{
          marginTop: '0.5rem',
          paddingTop: '0.5rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Item Total:</span>
          <span style={{ color: 'white', fontWeight: '600', fontSize: '1.125rem' }}>
            {formatCurrency(itemTotal)}
          </span>
        </div>

        {/* Loading Overlay */}
        {isUpdating && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(2px)'
            }}
          >
            <div style={{
              width: '30px',
              height: '30px',
              border: '2px solid rgba(255,255,255,0.1)',
              borderTopColor: '#c084fc',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
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
    </div>
  )
}