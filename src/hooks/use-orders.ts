'use client'

import { useState, useEffect } from 'react'

// Simple types
type Order = {
  id: string
  orderNumber: string
  customer: string
  total: number
  status: string
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setOrders([
        { 
          id: '1', 
          orderNumber: 'ORD-001', 
          customer: 'Hafiz Sajid Syed', 
          total: 1099.99, 
          status: 'delivered' 
        },
        { 
          id: '2', 
          orderNumber: 'ORD-002', 
          customer: 'Ali Ahmed', 
          total: 1659.99, 
          status: 'processing' 
        }
      ])
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return { orders, loading }
}