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
  createdAt: string
}

// Mock Database
let products: Product[] = [
  {
    id: "1",
    name: "Quantum Processor X1",
    price: 999.99,
    description: "Next-gen quantum processor",
    category: "Electronics",
    stock: 50,
    image: "/n1.jpeg",
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    name: "Neural Interface Pro",
    price: 1499.99,
    description: "Advanced neural interface",
    category: "AI Products",
    stock: 25,
    image: "/n2.jpeg",
    createdAt: "2024-01-20"
  },
  {
    id: "3",
    name: "Holographic Display",
    price: 799.99,
    description: "8K holographic display",
    category: "Electronics",
    stock: 30,
    image: "/n3.jpeg",
    createdAt: "2024-01-25"
  }
]

// Helper function to generate ID
const generateId = () => Date.now().toString()

// CORS Headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
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

// GET - Get single product by ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }  // ✅ FIXED: Promise type
) {
  try {
    const { id } = await params  // ✅ FIXED: Await params
    const productId = id
    
    // Find product
    const product = products.find(p => p.id === productId)
    
    if (!product) {
      return Response.json({ 
        success: false, 
        error: 'Product not found' 
      }, { 
        status: 404, 
        headers 
      })
    }
    
    return Response.json({ 
      success: true, 
      product 
    }, { 
      headers 
    })
    
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: 'Failed to fetch product' 
    }, { 
      status: 500, 
      headers 
    })
  }
}

// PUT - Update product
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }  // ✅ FIXED: Promise type
) {
  try {
    const { id } = await params  // ✅ FIXED: Await params
    const productId = id
    
    const body = await req.json()
    const { name, price, description, category, stock, image } = body
    
    // Find product index
    const index = products.findIndex(p => p.id === productId)
    
    if (index === -1) {
      return Response.json({ 
        success: false, 
        error: 'Product not found' 
      }, { 
        status: 404, 
        headers 
      })
    }
    
    // Validate required fields
    if (!name || !price || !category) {
      return Response.json({ 
        success: false, 
        error: 'Name, price and category are required' 
      }, { 
        status: 400, 
        headers 
      })
    }
    
    // Update product
    const updatedProduct: Product = {
      ...products[index],
      name: name || products[index].name,
      price: price || products[index].price,
      description: description || products[index].description,
      category: category || products[index].category,
      stock: stock !== undefined ? stock : products[index].stock,
      image: image || products[index].image
    }
    
    products[index] = updatedProduct
    
    return Response.json({ 
      success: true, 
      message: 'Product updated successfully',
      product: updatedProduct 
    }, { 
      headers 
    })
    
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: 'Failed to update product' 
    }, { 
      status: 500, 
      headers 
    })
  }
}

// DELETE - Delete product
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }  // ✅ FIXED: Promise type
) {
  try {
    const { id } = await params  // ✅ FIXED: Await params
    const productId = id
    
    // Find product index
    const index = products.findIndex(p => p.id === productId)
    
    if (index === -1) {
      return Response.json({ 
        success: false, 
        error: 'Product not found' 
      }, { 
        status: 404, 
        headers 
      })
    }
    
    // Remove product
    products.splice(index, 1)
    
    return Response.json({ 
      success: true, 
      message: 'Product deleted successfully' 
    }, { 
      headers 
    })
    
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: 'Failed to delete product' 
    }, { 
      status: 500, 
      headers 
    })
  }
}

// PATCH - Partially update product
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }  // ✅ FIXED: Promise type
) {
  try {
    const { id } = await params  // ✅ FIXED: Await params
    const productId = id
    
    const body = await req.json()
    
    // Find product index
    const index = products.findIndex(p => p.id === productId)
    
    if (index === -1) {
      return Response.json({ 
        success: false, 
        error: 'Product not found' 
      }, { 
        status: 404, 
        headers 
      })
    }
    
    // Update only provided fields
    const updatedProduct = {
      ...products[index],
      ...body
    }
    
    products[index] = updatedProduct
    
    return Response.json({ 
      success: true, 
      message: 'Product updated successfully',
      product: updatedProduct 
    }, { 
      headers 
    })
    
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: 'Failed to update product' 
    }, { 
      status: 500, 
      headers 
    })
  }
}