// ULTRA SIMPLIFIED - ZERO ERRORS
// Vercel Deployment Ready
// No npm packages - Pure TypeScript

// Simple Product Type
type Product = {
  id: string
  name: string
  price: number
  description: string
  category: string
  stock: number
  image?: string
  featured?: boolean
  createdAt: string
}

// Mock Database
let products: Product[] = [
  {
    id: "1",
    name: "Quantum Processor X1",
    price: 999.99,
    description: "Next-gen quantum processor with AI acceleration",
    category: "Electronics",
    stock: 50,
    image: "/n1.jpeg",
    featured: true,
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    name: "Neural Interface Pro",
    price: 1499.99,
    description: "Advanced brain-computer interface",
    category: "AI Products",
    stock: 25,
    image: "/n2.jpeg",
    featured: true,
    createdAt: "2024-01-20"
  },
  {
    id: "3",
    name: "Holographic Display 8K",
    price: 799.99,
    description: "8K holographic display with 3D capability",
    category: "Electronics",
    stock: 30,
    image: "/n3.jpeg",
    featured: false,
    createdAt: "2024-01-25"
  },
  {
    id: "4",
    name: "Quantum Security System",
    price: 2999.99,
    description: "Unhackable quantum encryption",
    category: "Security",
    stock: 10,
    image: "/n4.jpeg",
    featured: true,
    createdAt: "2024-02-01"
  },
  {
    id: "5",
    name: "Bio-Tech Smart Watch",
    price: 599.99,
    description: "Health monitoring smart watch",
    category: "Wearables",
    stock: 100,
    image: "/n5.jpeg",
    featured: false,
    createdAt: "2024-02-05"
  },
  {
    id: "6",
    name: "AI Assistant Hub",
    price: 449.99,
    description: "Central AI hub for smart home",
    category: "AI Products",
    stock: 75,
    image: "/n6.jpeg",
    featured: false,
    createdAt: "2024-02-10"
  }
]

// Helper function to generate ID
const generateId = () => Date.now().toString()

// CORS Headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
}

// OPTIONS - For CORS
export async function OPTIONS() {
  return new Response(null, { 
    status: 204, 
    headers 
  })
}

// GET - Get all products (with filters)
export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const category = url.searchParams.get('category')
    const featured = url.searchParams.get('featured')
    const search = url.searchParams.get('search')
    const limit = parseInt(url.searchParams.get('limit') || '100')
    const page = parseInt(url.searchParams.get('page') || '1')
    const sortBy = url.searchParams.get('sortBy') || 'newest'
    
    // Filter products
    let filtered = [...products]
    
    // Filter by category
    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category)
    }
    
    // Filter by featured
    if (featured === 'true') {
      filtered = filtered.filter(p => p.featured === true)
    }
    
    // Search by name
    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      )
    }
    
    // Sort products
    filtered.sort((a, b) => {
      if (sortBy === 'price_low') {
        return a.price - b.price
      } else if (sortBy === 'price_high') {
        return b.price - a.price
      } else if (sortBy === 'name_asc') {
        return a.name.localeCompare(b.name)
      } else if (sortBy === 'name_desc') {
        return b.name.localeCompare(a.name)
      } else {
        // newest first
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })
    
    // Pagination
    const start = (page - 1) * limit
    const paginated = filtered.slice(start, start + limit)
    
    // Get unique categories
    const categories = [...new Set(products.map(p => p.category))]
    
    // Calculate stats
    const stats = {
      total: products.length,
      filtered: filtered.length,
      inStock: products.filter(p => p.stock > 0).length,
      outOfStock: products.filter(p => p.stock === 0).length,
      categories: categories.length
    }
    
    return Response.json({ 
      success: true, 
      products: paginated,
      pagination: {
        page,
        limit,
        total: filtered.length,
        pages: Math.ceil(filtered.length / limit)
      },
      filters: {
        categories,
        minPrice: Math.min(...products.map(p => p.price)),
        maxPrice: Math.max(...products.map(p => p.price))
      },
      stats
    }, { headers })
    
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: 'Failed to fetch products' 
    }, { status: 500, headers })
  }
}

// POST - Create new product
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, price, description, category, stock, image, featured } = body
    
    // Validate required fields
    if (!name || !price || !category) {
      return Response.json({ 
        success: false, 
        error: 'Name, price and category are required' 
      }, { status: 400, headers })
    }
    
    // Validate price
    if (price <= 0) {
      return Response.json({ 
        success: false, 
        error: 'Price must be greater than 0' 
      }, { status: 400, headers })
    }
    
    // Validate stock
    if (stock !== undefined && stock < 0) {
      return Response.json({ 
        success: false, 
        error: 'Stock cannot be negative' 
      }, { status: 400, headers })
    }
    
    // Create new product
    const newProduct: Product = {
      id: generateId(),
      name,
      price: Number(price),
      description: description || '',
      category,
      stock: stock !== undefined ? Number(stock) : 0,
      image: image || null,
      featured: featured || false,
      createdAt: new Date().toISOString().split('T')[0]
    }
    
    // Save to "database"
    products.push(newProduct)
    
    return Response.json({ 
      success: true, 
      message: 'Product created successfully',
      product: newProduct 
    }, { status: 201, headers })
    
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: 'Failed to create product' 
    }, { status: 500, headers })
  }
}

// DELETE - Delete multiple products
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    const ids = url.searchParams.get('ids')
    
    // Delete single product
    if (id) {
      const initialLength = products.length
      products = products.filter(p => p.id !== id)
      
      if (products.length === initialLength) {
        return Response.json({ 
          success: false, 
          error: 'Product not found' 
        }, { status: 404, headers })
      }
      
      return Response.json({ 
        success: true, 
        message: 'Product deleted successfully' 
      }, { headers })
    }
    
    // Delete multiple products
    if (ids) {
      const idArray = ids.split(',')
      const initialLength = products.length
      products = products.filter(p => !idArray.includes(p.id))
      const deletedCount = initialLength - products.length
      
      return Response.json({ 
        success: true, 
        message: `${deletedCount} products deleted successfully`,
        deletedCount
      }, { headers })
    }
    
    return Response.json({ 
      success: false, 
      error: 'Product ID or IDs required' 
    }, { status: 400, headers })
    
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: 'Failed to delete products' 
    }, { status: 500, headers })
  }
}