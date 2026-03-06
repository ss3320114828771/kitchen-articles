'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface CartIconProps {
  className?: string
  showCount?: boolean
  size?: 'small' | 'medium' | 'large'
  color?: string
}

export default function CartIcon({ 
  className = '', 
  showCount = true,
  size = 'medium',
  color = 'white'
}: CartIconProps) {
  const [itemCount, setItemCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Get size styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { fontSize: '1rem', iconSize: '1.25rem', badgeSize: '0.75rem' }
      case 'large':
        return { fontSize: '1.5rem', iconSize: '2rem', badgeSize: '1rem' }
      case 'medium':
      default:
        return { fontSize: '1.25rem', iconSize: '1.5rem', badgeSize: '0.875rem' }
    }
  }

  const sizeStyles = getSizeStyles()

  // Load cart count on mount
  useEffect(() => {
    updateCartCount()
    
    // Listen for cart updates
    const handleCartUpdate = () => {
      updateCartCount()
      triggerAnimation()
    }
    
    window.addEventListener('cartUpdated', handleCartUpdate)
    window.addEventListener('storage', handleCartUpdate)
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate)
      window.removeEventListener('storage', handleCartUpdate)
    }
  }, [])

  // Update cart count from localStorage
  const updateCartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const count = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0)
      setItemCount(count)
    } catch (error) {
      setItemCount(0)
    }
  }

  // Trigger animation
  const triggerAnimation = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Handle click
  const handleClick = () => {
    triggerAnimation()
  }

  return (
    <Link 
      href="/cart" 
      className={className}
      onClick={handleClick}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        color: color,
        transition: 'transform 0.2s',
        transform: isAnimating ? 'scale(1.2)' : 'scale(1)',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      {/* Cart Icon */}
      <span style={{ 
        fontSize: sizeStyles.iconSize,
        lineHeight: 1
      }}>
        🛒
      </span>

      {/* Item Count Badge */}
      {showCount && itemCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            minWidth: sizeStyles.badgeSize,
            height: sizeStyles.badgeSize,
            padding: '0 4px',
            background: '#ef4444',
            color: 'white',
            fontSize: sizeStyles.badgeSize,
            fontWeight: '600',
            borderRadius: '999px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: isAnimating ? 'bounce 0.5s ease' : 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
      `}</style>
    </Link>
  )
}

// Cart update utility
export function updateCartCount() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cartUpdated'))
  }
}

// Add to cart utility
export function addToCart(product: any, quantity: number = 1) {
  try {
    // Get existing cart
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    
    // Check if product already exists
    const existingIndex = cart.findIndex((item: any) => item.id === product.id)
    
    if (existingIndex >= 0) {
      // Update quantity
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + quantity
    } else {
      // Add new item
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image || '/placeholder.jpg'
      })
    }
    
    // Save cart
    localStorage.setItem('cart', JSON.stringify(cart))
    
    // Update cart icon
    updateCartCount()
    
    return { success: true, cart }
  } catch (error) {
    console.error('Failed to add to cart:', error)
    return { success: false, error: 'Failed to add to cart' }
  }
}

// Remove from cart utility
export function removeFromCart(productId: string) {
  try {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const updatedCart = cart.filter((item: any) => item.id !== productId)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    updateCartCount()
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to remove from cart' }
  }
}

// Clear cart utility
export function clearCart() {
  localStorage.removeItem('cart')
  updateCartCount()
}

// Get cart count utility
export function getCartCount(): number {
  try {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    return cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0)
  } catch {
    return 0
  }
}