'use client'

import { useState, useEffect } from 'react'

// Types
type Product = {
  id: string
  name: string
  slug: string
  description: string
  shortDesc: string
  price: number
  compareAtPrice?: number
  cost?: number
  category: string
  subCategory: string
  brand: string
  tags: string[]
  images: string[]
  stock: number
  sku: string
  barcode?: string
  weight?: number
  dimensions?: string
  rating: number
  reviewCount: number
  featured: boolean
  published: boolean
  createdAt: string
  updatedAt: string
}

type ProductsFilter = {
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  featured?: boolean
  inStock?: boolean
  sortBy?: 'newest' | 'oldest' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'rating'
  page?: number
  limit?: number
}

type ProductsResponse = {
  products: Product[]
  total: number
  page: number
  totalPages: number
  filters: {
    categories: string[]
    minPrice: number
    maxPrice: number
  }
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<ProductsFilter>({ page: 1, limit: 12 })

  // Mock products data
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Quantum Processor X1',
      slug: 'quantum-processor-x1',
      description: 'Next-generation quantum processor with AI acceleration. Features 8 cores, 16 threads, and integrated neural processing unit for advanced computing tasks.',
      shortDesc: 'Advanced quantum processor for next-gen computing',
      price: 999.99,
      compareAtPrice: 1299.99,
      cost: 599.99,
      category: 'Electronics',
      subCategory: 'Processors',
      brand: 'Kitechn',
      tags: ['quantum', 'processor', 'ai', 'computing'],
      images: ['/n1.jpeg'],
      stock: 50,
      sku: 'QPRO-X1-001',
      barcode: '123456789012',
      weight: 0.5,
      dimensions: '10x10x2 cm',
      rating: 4.5,
      reviewCount: 128,
      featured: true,
      published: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-03-01'
    },
    {
      id: '2',
      name: 'Neural Interface Pro',
      slug: 'neural-interface-pro',
      description: 'Advanced brain-computer interface for developers and researchers. Enables direct neural communication with AI systems.',
      shortDesc: 'Cutting-edge neural interface technology',
      price: 1499.99,
      compareAtPrice: 1799.99,
      cost: 899.99,
      category: 'AI Products',
      subCategory: 'Interfaces',
      brand: 'Kitechn',
      tags: ['neural', 'ai', 'interface', 'brain'],
      images: ['/n2.jpeg'],
      stock: 25,
      sku: 'NIPRO-002',
      barcode: '123456789013',
      weight: 0.3,
      dimensions: '8x8x1 cm',
      rating: 4.8,
      reviewCount: 95,
      featured: true,
      published: true,
      createdAt: '2024-01-20',
      updatedAt: '2024-02-28'
    },
    {
      id: '3',
      name: 'Holographic Display 8K',
      slug: 'holographic-display-8k',
      description: '8K holographic display with 3D capability and eye-tracking. Experience immersive visuals like never before.',
      shortDesc: 'Revolutionary 8K holographic display',
      price: 799.99,
      compareAtPrice: 999.99,
      cost: 449.99,
      category: 'Electronics',
      subCategory: 'Displays',
      brand: 'Kitechn',
      tags: ['holographic', 'display', '8k', '3d'],
      images: ['/n3.jpeg'],
      stock: 30,
      sku: 'HOLO-003',
      barcode: '123456789014',
      weight: 2.5,
      dimensions: '40x30x5 cm',
      rating: 4.3,
      reviewCount: 89,
      featured: false,
      published: true,
      createdAt: '2024-01-25',
      updatedAt: '2024-02-25'
    },
    {
      id: '4',
      name: 'AI Assistant Hub',
      slug: 'ai-assistant-hub',
      description: 'Central AI hub for smart home automation. Controls all your smart devices with natural language processing.',
      shortDesc: 'Smart home AI controller',
      price: 449.99,
      compareAtPrice: 549.99,
      cost: 249.99,
      category: 'AI Products',
      subCategory: 'Hubs',
      brand: 'Kitechn',
      tags: ['ai', 'smart home', 'assistant', 'automation'],
      images: ['/n4.jpeg'],
      stock: 75,
      sku: 'AIHUB-004',
      barcode: '123456789015',
      weight: 0.8,
      dimensions: '15x15x4 cm',
      rating: 4.4,
      reviewCount: 112,
      featured: false,
      published: true,
      createdAt: '2024-02-01',
      updatedAt: '2024-02-20'
    },
    {
      id: '5',
      name: 'Bio-Tech Smart Watch',
      slug: 'bio-tech-smart-watch',
      description: 'Health monitoring smart watch with ECG, blood oxygen, and heart rate tracking. Includes AI health insights.',
      shortDesc: 'Advanced health monitoring smart watch',
      price: 599.99,
      compareAtPrice: 699.99,
      cost: 349.99,
      category: 'Wearables',
      subCategory: 'Watches',
      brand: 'Kitechn',
      tags: ['smartwatch', 'fitness', 'health', 'wearable'],
      images: ['/n5.jpeg'],
      stock: 100,
      sku: 'BIOW-005',
      barcode: '123456789016',
      weight: 0.2,
      dimensions: '4x4x1 cm',
      rating: 4.5,
      reviewCount: 203,
      featured: true,
      published: true,
      createdAt: '2024-02-05',
      updatedAt: '2024-02-15'
    },
    {
      id: '6',
      name: 'Quantum Security System',
      slug: 'quantum-security-system',
      description: 'Unhackable quantum encryption security system for home and office. Features biometric recognition and AI threat detection.',
      shortDesc: 'Military-grade quantum security',
      price: 2999.99,
      compareAtPrice: 3499.99,
      cost: 1799.99,
      category: 'Security',
      subCategory: 'Systems',
      brand: 'Kitechn',
      tags: ['security', 'quantum', 'encryption', 'biometric'],
      images: ['/n6.jpeg'],
      stock: 10,
      sku: 'QSEC-006',
      barcode: '123456789017',
      weight: 3.0,
      dimensions: '30x30x10 cm',
      rating: 4.9,
      reviewCount: 45,
      featured: true,
      published: true,
      createdAt: '2024-02-10',
      updatedAt: '2024-02-10'
    }
  ]

  // Load products on mount or filter change
  useEffect(() => {
    fetchProducts()
  }, [filter])

  // Fetch products with filters
  const fetchProducts = async (): Promise<ProductsResponse> => {
    setLoading(true)
    setError(null)

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Filter products
      let filtered = [...mockProducts]

      if (filter.category && filter.category !== 'all') {
        filtered = filtered.filter(p => p.category === filter.category)
      }

      if (filter.search) {
        const searchLower = filter.search.toLowerCase()
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower) ||
          p.tags.some(tag => tag.toLowerCase().includes(searchLower))
        )
      }

      if (filter.minPrice !== undefined) {
        filtered = filtered.filter(p => p.price >= filter.minPrice!)
      }

      if (filter.maxPrice !== undefined) {
        filtered = filtered.filter(p => p.price <= filter.maxPrice!)
      }

      if (filter.featured) {
        filtered = filtered.filter(p => p.featured === true)
      }

      if (filter.inStock) {
        filtered = filtered.filter(p => p.stock > 0)
      }

      // Sort products
      if (filter.sortBy) {
        switch (filter.sortBy) {
          case 'newest':
            filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            break
          case 'oldest':
            filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
            break
          case 'price_asc':
            filtered.sort((a, b) => a.price - b.price)
            break
          case 'price_desc':
            filtered.sort((a, b) => b.price - a.price)
            break
          case 'name_asc':
            filtered.sort((a, b) => a.name.localeCompare(b.name))
            break
          case 'name_desc':
            filtered.sort((a, b) => b.name.localeCompare(a.name))
            break
          case 'rating':
            filtered.sort((a, b) => b.rating - a.rating)
            break
        }
      }

      // Pagination
      const page = filter.page || 1
      const limit = filter.limit || 12
      const start = (page - 1) * limit
      const paginated = filtered.slice(start, start + limit)

      // Get unique categories
      const categories = [...new Set(mockProducts.map(p => p.category))]

      // Get price range
      const prices = mockProducts.map(p => p.price)
      const minPrice = Math.min(...prices)
      const maxPrice = Math.max(...prices)

      const response: ProductsResponse = {
        products: paginated,
        total: filtered.length,
        page,
        totalPages: Math.ceil(filtered.length / limit),
        filters: {
          categories,
          minPrice,
          maxPrice
        }
      }

      setProducts(paginated)
      return response
    } catch (err) {
      setError('Failed to fetch products')
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Get single product
  const getProduct = async (id: string): Promise<Product | null> => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      return mockProducts.find(p => p.id === id) || null
    } catch (err) {
      setError('Failed to fetch product')
      return null
    } finally {
      setLoading(false)
    }
  }

  // Get product by slug
  const getProductBySlug = async (slug: string): Promise<Product | null> => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      return mockProducts.find(p => p.slug === slug) || null
    } catch (err) {
      setError('Failed to fetch product')
      return null
    } finally {
      setLoading(false)
    }
  }

  // Get related products
  const getRelatedProducts = async (productId: string, limit: number = 4): Promise<Product[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const product = mockProducts.find(p => p.id === productId)
      if (!product) return []

      // Find products in same category
      const related = mockProducts
        .filter(p => p.id !== productId && p.category === product.category)
        .slice(0, limit)

      return related
    } catch (err) {
      console.error('Failed to fetch related products', err)
      return []
    }
  }

  // Get featured products
  const getFeaturedProducts = async (limit: number = 4): Promise<Product[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      return mockProducts.filter(p => p.featured).slice(0, limit)
    } catch (err) {
      console.error('Failed to fetch featured products', err)
      return []
    }
  }

  // Get products by category
  const getProductsByCategory = async (category: string, limit?: number): Promise<Product[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      let filtered = mockProducts.filter(p => p.category === category)
      
      if (limit) {
        filtered = filtered.slice(0, limit)
      }
      
      return filtered
    } catch (err) {
      console.error('Failed to fetch products by category', err)
      return []
    }
  }

  // Get categories
  const getCategories = (): string[] => {
    return [...new Set(mockProducts.map(p => p.category))]
  }

  // Get price range
  const getPriceRange = (): { min: number; max: number } => {
    const prices = mockProducts.map(p => p.price)
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    }
  }

  // Apply filter
  const applyFilter = (newFilter: ProductsFilter) => {
    setFilter(prev => ({ ...prev, ...newFilter, page: 1 }))
  }

  // Change page
  const setPage = (page: number) => {
    setFilter(prev => ({ ...prev, page }))
  }

  // Reset filters
  const resetFilters = () => {
    setFilter({ page: 1, limit: 12 })
  }

  return {
    // State
    products,
    loading,
    error,
    filter,

    // Actions
    fetchProducts,
    getProduct,
    getProductBySlug,
    getRelatedProducts,
    getFeaturedProducts,
    getProductsByCategory,
    
    // Filters
    applyFilter,
    setPage,
    resetFilters,
    
    // Utils
    getCategories,
    getPriceRange,
    
    // Computed
    hasProducts: products.length > 0,
    isEmpty: products.length === 0
  }
}