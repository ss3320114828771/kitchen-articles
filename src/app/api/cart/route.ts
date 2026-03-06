// app/api/cart/route.ts
// Pure TypeScript - No npm packages
// Vercel Serverless Function compatible

// Types
interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  maxStock: number
}

interface Cart {
  id: string
  userId: string | null
  sessionId: string | null
  items: CartItem[]
  createdAt: string
  updatedAt: string
}

// In-memory cart storage (in production, use a real database)
// This will persist as long as the serverless function is warm
let carts: Cart[] = []

// Helper function to generate unique IDs
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

// Helper function to generate session ID
function generateSessionId(): string {
  return 'sess_' + Date.now().toString(36) + Math.random().toString(36).substring(2)
}

// Helper function to parse cookies
function parseCookies(cookieHeader: string | null): Record<string, string> {
  const cookies: Record<string, string> = {}
  
  if (!cookieHeader) return cookies
  
  cookieHeader.split(';').forEach(cookie => {
    const [key, value] = cookie.trim().split('=')
    if (key && value) {
      cookies[key] = value
    }
  })
  
  return cookies
}

// Helper function to set cookie
function setCookie(name: string, value: string, maxAge: number = 30 * 24 * 60 * 60): string {
  return `${name}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`
}

// Helper function to clear cookie
function clearCookie(name: string): string {
  return `${name}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
}

// Get or create cart for user/session
function getOrCreateCart(userId: string | null, sessionId: string | null): Cart {
  // Try to find existing cart
  let cart = carts.find(c => 
    (userId && c.userId === userId) || 
    (sessionId && c.sessionId === sessionId)
  )
  
  // If no cart exists, create new one
  if (!cart) {
    cart = {
      id: generateId(),
      userId: userId || null,
      sessionId: sessionId || generateSessionId(),
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    carts.push(cart)
  }
  
  return cart
}

// Calculate cart totals
function calculateCartTotals(items: CartItem[]) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.1 // 10% tax
  const shipping = subtotal > 100 ? 0 : 10 // Free shipping over $100
  const total = subtotal + tax + shipping
  
  return {
    subtotal: Number(subtotal.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    shipping,
    total: Number(total.toFixed(2)),
    itemCount: items.reduce((count, item) => count + item.quantity, 0)
  }
}

// CORS headers for Vercel
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json'
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders
  })
}

// GET - Get cart contents
export async function GET(req: Request) {
  try {
    // Get cookies
    const cookieHeader = req.headers.get('cookie') || ''
    const cookies = parseCookies(cookieHeader)
    
    // Get user ID from auth token (simplified - in production, verify JWT)
    const authToken = cookies['next-auth.session-token']
    let userId: string | null = null
    
    if (authToken) {
      try {
        // In production, verify JWT properly
        const tokenData = JSON.parse(atob(authToken))
        userId = tokenData.userId
      } catch {
        // Invalid token, ignore
      }
    }
    
    // Get session ID from cookie or create new
    let sessionId = cookies['cart-session-id']
    const setCookieHeaders: string[] = []
    
    if (!sessionId) {
      sessionId = generateSessionId()
      setCookieHeaders.push(setCookie('cart-session-id', sessionId))
    }
    
    // Get or create cart
    const cart = getOrCreateCart(userId, sessionId)
    
    // Calculate totals
    const totals = calculateCartTotals(cart.items)
    
    return new Response(JSON.stringify({
      success: true,
      cart: {
        id: cart.id,
        items: cart.items,
        ...totals,
        updatedAt: cart.updatedAt
      }
    }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Set-Cookie': setCookieHeaders.join(', ')
      }
    })
    
  } catch (error) {
    console.error('Cart GET error:', error)
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to retrieve cart'
    }), {
      status: 500,
      headers: corsHeaders
    })
  }
}

// POST - Add item to cart
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { productId, name, price, quantity = 1, image, maxStock = 100 } = body
    
    // Validate required fields
    if (!productId || !name || !price) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields: productId, name, price are required'
      }), {
        status: 400,
        headers: corsHeaders
      })
    }
    
    // Validate quantity
    if (quantity < 1 || quantity > 10) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Quantity must be between 1 and 10'
      }), {
        status: 400,
        headers: corsHeaders
      })
    }
    
    // Get cookies
    const cookieHeader = req.headers.get('cookie') || ''
    const cookies = parseCookies(cookieHeader)
    
    // Get user ID from auth token
    const authToken = cookies['next-auth.session-token']
    let userId: string | null = null
    
    if (authToken) {
      try {
        const tokenData = JSON.parse(atob(authToken))
        userId = tokenData.userId
      } catch {
        // Invalid token, ignore
      }
    }
    
    // Get or create session ID
    let sessionId = cookies['cart-session-id']
    const setCookieHeaders: string[] = []
    
    if (!sessionId) {
      sessionId = generateSessionId()
      setCookieHeaders.push(setCookie('cart-session-id', sessionId))
    }
    
    // Get or create cart
    const cart = getOrCreateCart(userId, sessionId)
    
    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(item => item.productId === productId)
    
    if (existingItemIndex >= 0) {
      // Update existing item quantity
      const newQuantity = cart.items[existingItemIndex].quantity + quantity
      
      // Check stock limit
      if (newQuantity > maxStock) {
        return new Response(JSON.stringify({
          success: false,
          error: `Cannot add more than ${maxStock} items`
        }), {
          status: 400,
          headers: corsHeaders
        })
      }
      
      cart.items[existingItemIndex].quantity = newQuantity
    } else {
      // Add new item
      cart.items.push({
        id: generateId(),
        productId,
        name,
        price,
        quantity,
        image: image || '/placeholder.jpg',
        maxStock
      })
    }
    
    // Update cart timestamp
    cart.updatedAt = new Date().toISOString()
    
    // Calculate totals
    const totals = calculateCartTotals(cart.items)
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Item added to cart',
      cart: {
        id: cart.id,
        items: cart.items,
        ...totals,
        updatedAt: cart.updatedAt
      }
    }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Set-Cookie': setCookieHeaders.join(', ')
      }
    })
    
  } catch (error) {
    console.error('Cart POST error:', error)
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to add item to cart'
    }), {
      status: 500,
      headers: corsHeaders
    })
  }
}

// PUT - Update cart item quantity
export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { itemId, quantity } = body
    
    // Validate required fields
    if (!itemId || quantity === undefined) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields: itemId and quantity are required'
      }), {
        status: 400,
        headers: corsHeaders
      })
    }
    
    // Validate quantity
    if (quantity < 0 || quantity > 10) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Quantity must be between 0 and 10'
      }), {
        status: 400,
        headers: corsHeaders
      })
    }
    
    // Get cookies
    const cookieHeader = req.headers.get('cookie') || ''
    const cookies = parseCookies(cookieHeader)
    
    // Get user ID from auth token
    const authToken = cookies['next-auth.session-token']
    let userId: string | null = null
    
    if (authToken) {
      try {
        const tokenData = JSON.parse(atob(authToken))
        userId = tokenData.userId
      } catch {
        // Invalid token, ignore
      }
    }
    
    // Get session ID
    const sessionId = cookies['cart-session-id']
    
    if (!sessionId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'No cart found'
      }), {
        status: 404,
        headers: corsHeaders
      })
    }
    
    // Find cart
    const cart = carts.find(c => 
      (userId && c.userId === userId) || 
      c.sessionId === sessionId
    )
    
    if (!cart) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Cart not found'
      }), {
        status: 404,
        headers: corsHeaders
      })
    }
    
    // Find item
    const itemIndex = cart.items.findIndex(item => item.id === itemId)
    
    if (itemIndex === -1) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Item not found in cart'
      }), {
        status: 404,
        headers: corsHeaders
      })
    }
    
    // Update or remove item
    if (quantity === 0) {
      // Remove item
      cart.items.splice(itemIndex, 1)
    } else {
      // Check stock limit
      if (quantity > cart.items[itemIndex].maxStock) {
        return new Response(JSON.stringify({
          success: false,
          error: `Maximum quantity is ${cart.items[itemIndex].maxStock}`
        }), {
          status: 400,
          headers: corsHeaders
        })
      }
      
      // Update quantity
      cart.items[itemIndex].quantity = quantity
    }
    
    // Update cart timestamp
    cart.updatedAt = new Date().toISOString()
    
    // Calculate totals
    const totals = calculateCartTotals(cart.items)
    
    return new Response(JSON.stringify({
      success: true,
      message: quantity === 0 ? 'Item removed from cart' : 'Cart updated',
      cart: {
        id: cart.id,
        items: cart.items,
        ...totals,
        updatedAt: cart.updatedAt
      }
    }), {
      status: 200,
      headers: corsHeaders
    })
    
  } catch (error) {
    console.error('Cart PUT error:', error)
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to update cart'
    }), {
      status: 500,
      headers: corsHeaders
    })
  }
}

// DELETE - Clear cart
export async function DELETE(req: Request) {
  try {
    // Get cookies
    const cookieHeader = req.headers.get('cookie') || ''
    const cookies = parseCookies(cookieHeader)
    
    // Get user ID from auth token
    const authToken = cookies['next-auth.session-token']
    let userId: string | null = null
    
    if (authToken) {
      try {
        const tokenData = JSON.parse(atob(authToken))
        userId = tokenData.userId
      } catch {
        // Invalid token, ignore
      }
    }
    
    // Get session ID
    const sessionId = cookies['cart-session-id']
    
    if (!sessionId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'No cart found'
      }), {
        status: 404,
        headers: corsHeaders
      })
    }
    
    // Find cart index
    const cartIndex = carts.findIndex(c => 
      (userId && c.userId === userId) || 
      c.sessionId === sessionId
    )
    
    if (cartIndex === -1) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Cart not found'
      }), {
        status: 404,
        headers: corsHeaders
      })
    }
    
    // Remove cart
    carts.splice(cartIndex, 1)
    
    // Clear cart session cookie
    const clearCookieHeader = clearCookie('cart-session-id')
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Cart cleared successfully'
    }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Set-Cookie': clearCookieHeader
      }
    })
    
  } catch (error) {
    console.error('Cart DELETE error:', error)
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to clear cart'
    }), {
      status: 500,
      headers: corsHeaders
    })
  }
}

// GET /count - Get cart item count
export async function GET_COUNT(req: Request) {
  try {
    // Get cookies
    const cookieHeader = req.headers.get('cookie') || ''
    const cookies = parseCookies(cookieHeader)
    
    // Get user ID from auth token
    const authToken = cookies['next-auth.session-token']
    let userId: string | null = null
    
    if (authToken) {
      try {
        const tokenData = JSON.parse(atob(authToken))
        userId = tokenData.userId
      } catch {
        // Invalid token, ignore
      }
    }
    
    // Get session ID
    const sessionId = cookies['cart-session-id']
    
    if (!sessionId) {
      return new Response(JSON.stringify({
        success: true,
        count: 0
      }), {
        status: 200,
        headers: corsHeaders
      })
    }
    
    // Find cart
    const cart = carts.find(c => 
      (userId && c.userId === userId) || 
      c.sessionId === sessionId
    )
    
    const count = cart ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0
    
    return new Response(JSON.stringify({
      success: true,
      count
    }), {
      status: 200,
      headers: corsHeaders
    })
    
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      count: 0
    }), {
      status: 200,
      headers: corsHeaders
    })
  }
}