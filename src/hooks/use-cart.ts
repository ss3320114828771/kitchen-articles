'use client'

import { useState, useEffect } from 'react'

// Types
type CartItem = {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
  maxStock?: number
}

type CartTotals = {
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  itemCount: number
}

type Cart = {
  items: CartItem[]
  totals: CartTotals
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  // Load cart on mount
  useEffect(() => {
    loadCart()
  }, [])

  // Load cart from localStorage
  const loadCart = () => {
    setLoading(true)
    try {
      const saved = localStorage.getItem('cart')
      if (saved) {
        setItems(JSON.parse(saved))
      } else {
        // Load sample items for demo
        setItems([
          {
            id: '1',
            productId: 'prod1',
            name: 'Quantum Processor X1',
            price: 999.99,
            quantity: 1,
            image: '🖥️',
            maxStock: 50
          },
          {
            id: '2',
            productId: 'prod2',
            name: 'Neural Interface Pro',
            price: 299.99,
            quantity: 2,
            image: '🧠',
            maxStock: 25
          }
        ])
      }
    } catch (error) {
      console.error('Failed to load cart:', error)
    } finally {
      setLoading(false)
    }
  }

  // Save cart to localStorage
  const saveCart = (newItems: CartItem[]) => {
    try {
      localStorage.setItem('cart', JSON.stringify(newItems))
      setItems(newItems)
    } catch (error) {
      console.error('Failed to save cart:', error)
    }
  }

  // Add item to cart
  const addItem = (
    productId: string,
    name: string,
    price: number,
    quantity: number = 1,
    image?: string,
    maxStock: number = 100
  ) => {
    setUpdating(true)

    try {
      // Check if item already exists
      const existingIndex = items.findIndex(item => item.productId === productId)

      if (existingIndex >= 0) {
        // Update quantity
        const newQuantity = items[existingIndex].quantity + quantity
        if (newQuantity > maxStock) {
          alert(`Cannot add more than ${maxStock} items`)
          setUpdating(false)
          return false
        }

        const updatedItems = [...items]
        updatedItems[existingIndex].quantity = newQuantity
        saveCart(updatedItems)
      } else {
        // Add new item
        const newItem: CartItem = {
          id: Date.now().toString(),
          productId,
          name,
          price,
          quantity,
          image,
          maxStock
        }
        saveCart([...items, newItem])
      }

      setUpdating(false)
      return true
    } catch (error) {
      console.error('Failed to add item:', error)
      setUpdating(false)
      return false
    }
  }

  // Update item quantity
  const updateQuantity = (itemId: string, newQuantity: number) => {
    setUpdating(true)

    try {
      if (newQuantity < 1) {
        removeItem(itemId)
        return
      }

      const item = items.find(i => i.id === itemId)
      if (item && newQuantity > (item.maxStock || 100)) {
        alert(`Maximum quantity is ${item.maxStock}`)
        setUpdating(false)
        return false
      }

      const updatedItems = items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
      saveCart(updatedItems)
      setUpdating(false)
      return true
    } catch (error) {
      console.error('Failed to update quantity:', error)
      setUpdating(false)
      return false
    }
  }

  // Remove item from cart
  const removeItem = (itemId: string) => {
    setUpdating(true)

    try {
      const updatedItems = items.filter(item => item.id !== itemId)
      saveCart(updatedItems)
      setUpdating(false)
      return true
    } catch (error) {
      console.error('Failed to remove item:', error)
      setUpdating(false)
      return false
    }
  }

  // Clear cart
  const clearCart = () => {
    setUpdating(true)

    try {
      localStorage.removeItem('cart')
      setItems([])
      setUpdating(false)
      return true
    } catch (error) {
      console.error('Failed to clear cart:', error)
      setUpdating(false)
      return false
    }
  }

  // Calculate totals
  const getTotals = (): CartTotals => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const tax = subtotal * 0.1 // 10% tax
    const shipping = subtotal > 100 ? 0 : 10 // Free shipping over $100
    const discount = 0 // No discount by default
    const total = subtotal + tax + shipping - discount
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return {
      subtotal: Number(subtotal.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      shipping,
      discount,
      total: Number(total.toFixed(2)),
      itemCount
    }
  }

  // Get cart with totals
  const getCart = (): Cart => {
    return {
      items,
      totals: getTotals()
    }
  }

  // Check if item exists in cart
  const hasItem = (productId: string): boolean => {
    return items.some(item => item.productId === productId)
  }

  // Get item quantity
  const getItemQuantity = (productId: string): number => {
    const item = items.find(item => item.productId === productId)
    return item?.quantity || 0
  }

  return {
    // State
    items,
    loading,
    updating,
    
    // Cart operations
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    
    // Getters
    getCart,
    getTotals,
    hasItem,
    getItemQuantity,
    
    // Computed values
    itemCount: getTotals().itemCount,
    subtotal: getTotals().subtotal,
    total: getTotals().total
  }
}