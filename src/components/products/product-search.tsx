'use client'

import { useState } from 'react'

// Simple product type
type Product = {
  id: string
  name: string
  price: number
  category: string
}

interface MinimalProductSearchProps {
  onSearch?: (query: string) => void
  placeholder?: string
}

export default function MinimalProductSearch({ 
  onSearch, 
  placeholder = 'Search products...' 
}: MinimalProductSearchProps) {
  const [query, setQuery] = useState('')

  // Mock products
  const products: Product[] = [
    { id: '1', name: 'Quantum Processor', price: 999, category: 'Electronics' },
    { id: '2', name: 'Neural Interface', price: 1499, category: 'AI' },
    { id: '3', name: 'Holographic Display', price: 799, category: 'Electronics' },
  ]

  // Filter products
  const filtered = query.length >= 2 
    ? products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    : []

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    if (onSearch) onSearch(value)
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Search Input */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: '#f5f5f5',
        borderRadius: '2rem',
        padding: '0.5rem 1rem'
      }}>
        <span style={{ marginRight: '0.5rem' }}>🔍</span>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder={placeholder}
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            outline: 'none',
            padding: '0.5rem 0'
          }}
        />
        {query && (
          <button 
            onClick={() => setQuery('')}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {filtered.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '0.5rem',
          background: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}>
          {filtered.map(product => (
            <div
              key={product.id}
              onClick={() => window.location.href = `/products/${product.id}`}
              style={{
                padding: '0.75rem',
                cursor: 'pointer',
                borderBottom: '1px solid #eee'
              }}
            >
              <div><strong>{product.name}</strong></div>
              <div style={{ fontSize: '0.875rem', color: '#666' }}>
                ${product.price} • {product.category}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}