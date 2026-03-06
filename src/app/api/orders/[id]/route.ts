// app/api/orders/[id]/route.ts
// Pure TypeScript - No npm packages
// Vercel Serverless Function compatible

// Types
interface OrderItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface Order {
  id: string
  orderNumber: string
  userId: string | null
  customerName: string
  customerEmail: string
  customerPhone: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentMethod: string
  shippingAddress: {
    street: string
    city: string
    country: string
    postalCode: string
  }
  notes?: string
  createdAt: string
  updatedAt: string
}

// In-memory orders storage (in production, use a real database)
// This will persist as long as the serverless function is warm
let orders: Order[] = [
  {
    id: "ord_1",
    orderNumber: "ORD-2024-001",
    userId: "1",
    customerName: "Hafiz Sajid Syed",
    customerEmail: "hafizsajidsyed@gmail.com",
    customerPhone: "+92 300 1234567",
    items: [
      {
        id: "item_1",
        productId: "prod_1",
        name: "Quantum Processor X1",
        price: 999.99,
        quantity: 1,
        image: "/n1.jpeg"
      },
      {
        id: "item_2",
        productId: "prod_2",
        name: "Neural Interface Pro",
        price: 299.99,
        quantity: 1,
        image: "/n2.jpeg"
      }
    ],
    subtotal: 1299.98,
    tax: 130.00,
    shipping: 0,
    discount: 0,
    total: 1429.98,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    shippingAddress: {
      street: '123 Tech Street',
      city: 'Innovation City',
      country: 'Pakistan',
      postalCode: '12345'
    },
    notes: 'Leave at front door',
    createdAt: '2024-03-05T10:30:00Z',
    updatedAt: '2024-03-05T10:30:00Z'
  },
  {
    id: "ord_2",
    orderNumber: "ORD-2024-002",
    userId: "2",
    customerName: "Ali Ahmed",
    customerEmail: "ali.ahmed@email.com",
    customerPhone: "+92 321 7654321",
    items: [
      {
        id: "item_3",
        productId: "prod_3",
        name: "Holographic Display",
        price: 799.99,
        quantity: 1,
        image: "/n3.jpeg"
      }
    ],
    subtotal: 799.99,
    tax: 80.00,
    shipping: 10,
    discount: 0,
    total: 889.99,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'Bank Transfer',
    shippingAddress: {
      street: '456 Digital Avenue',
      city: 'Tech Valley',
      country: 'Pakistan',
      postalCode: '54321'
    },
    notes: '',
    createdAt: '2024-03-04T14:20:00Z',
    updatedAt: '2024-03-04T14:20:00Z'
  }
]

// Helper function to generate unique ID
function generateId(): string {
  return 'ord_' + Date.now().toString(36) + Math.random().toString(36).substring(2)
}

// Helper function to generate order number
function generateOrderNumber(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  
  return `ORD-${year}-${month}${day}-${random}`
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

// Helper function to get user from auth token
function getUserFromToken(authToken: string | undefined): { id: string; role: string } | null {
  if (!authToken) return null
  
  try {
    // In production, verify JWT properly
    const tokenData = JSON.parse(atob(authToken))
    return {
      id: tokenData.userId,
      role: tokenData.role || 'USER'
    }
  } catch {
    return null
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

// GET - Get single order by ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params Promise to get the actual params object
    const { id } = await params
    const orderId = id
    
    // Get auth token from cookies
    const cookieHeader = req.headers.get('cookie') || ''
    const cookies = parseCookies(cookieHeader)
    const authToken = cookies['next-auth.session-token']
    const user = getUserFromToken(authToken)
    
    // Find order
    const order = orders.find(o => o.id === orderId || o.orderNumber === orderId)
    
    if (!order) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Order not found'
      }), {
        status: 404,
        headers: corsHeaders
      })
    }
    
    // Check authorization (users can only see their own orders, admins can see all)
    if (user?.role !== 'ADMIN' && order.userId !== user?.id) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Unauthorized to view this order'
      }), {
        status: 403,
        headers: corsHeaders
      })
    }
    
    return new Response(JSON.stringify({
      success: true,
      order
    }), {
      status: 200,
      headers: corsHeaders
    })
    
  } catch (error) {
    console.error('Order GET error:', error)
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to retrieve order'
    }), {
      status: 500,
      headers: corsHeaders
    })
  }
}

// PUT - Update order
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params Promise
    const { id } = await params
    const orderId = id
    
    const body = await req.json()
    
    // Get auth token from cookies
    const cookieHeader = req.headers.get('cookie') || ''
    const cookies = parseCookies(cookieHeader)
    const authToken = cookies['next-auth.session-token']
    const user = getUserFromToken(authToken)
    
    // Check if user is authenticated
    if (!user) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Authentication required'
      }), {
        status: 401,
        headers: corsHeaders
      })
    }
    
    // Find order index
    const orderIndex = orders.findIndex(o => o.id === orderId || o.orderNumber === orderId)
    
    if (orderIndex === -1) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Order not found'
      }), {
        status: 404,
        headers: corsHeaders
      })
    }
    
    const order = orders[orderIndex]
    
    // Check authorization (only admin can update orders)
    if (user.role !== 'ADMIN') {
      return new Response(JSON.stringify({
        success: false,
        error: 'Only administrators can update orders'
      }), {
        status: 403,
        headers: corsHeaders
      })
    }
    
    // Validate allowed fields for update
    const allowedUpdates = ['status', 'paymentStatus', 'notes']
    const updates: Partial<Order> = {}
    
    for (const field of allowedUpdates) {
      if (body[field] !== undefined) {
        // Validate status
        if (field === 'status') {
          const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
          if (!validStatuses.includes(body.status)) {
            return new Response(JSON.stringify({
              success: false,
              error: 'Invalid order status'
            }), {
              status: 400,
              headers: corsHeaders
            })
          }
        }
        
        // Validate payment status
        if (field === 'paymentStatus') {
          const validPaymentStatuses = ['pending', 'paid', 'failed', 'refunded']
          if (!validPaymentStatuses.includes(body.paymentStatus)) {
            return new Response(JSON.stringify({
              success: false,
              error: 'Invalid payment status'
            }), {
              status: 400,
              headers: corsHeaders
            })
          }
        }
        
        updates[field as keyof Order] = body[field]
      }
    }
    
    // Update order
    orders[orderIndex] = {
      ...order,
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Order updated successfully',
      order: orders[orderIndex]
    }), {
      status: 200,
      headers: corsHeaders
    })
    
  } catch (error) {
    console.error('Order PUT error:', error)
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to update order'
    }), {
      status: 500,
      headers: corsHeaders
    })
  }
}

// DELETE - Cancel/Delete order
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params Promise
    const { id } = await params
    const orderId = id
    
    // Get auth token from cookies
    const cookieHeader = req.headers.get('cookie') || ''
    const cookies = parseCookies(cookieHeader)
    const authToken = cookies['next-auth.session-token']
    const user = getUserFromToken(authToken)
    
    // Check if user is authenticated
    if (!user) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Authentication required'
      }), {
        status: 401,
        headers: corsHeaders
      })
    }
    
    // Find order index
    const orderIndex = orders.findIndex(o => o.id === orderId || o.orderNumber === orderId)
    
    if (orderIndex === -1) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Order not found'
      }), {
        status: 404,
        headers: corsHeaders
      })
    }
    
    const order = orders[orderIndex]
    
    // Check authorization (users can cancel their own pending orders, admins can delete any)
    if (user.role !== 'ADMIN') {
      // Users can only cancel their own orders that are pending
      if (order.userId !== user.id) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Unauthorized to cancel this order'
        }), {
          status: 403,
          headers: corsHeaders
        })
      }
      
      if (order.status !== 'pending') {
        return new Response(JSON.stringify({
          success: false,
          error: 'Only pending orders can be cancelled'
        }), {
          status: 400,
          headers: corsHeaders
        })
      }
      
      // For users, just update status to cancelled instead of deleting
      orders[orderIndex] = {
        ...order,
        status: 'cancelled',
        updatedAt: new Date().toISOString()
      }
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Order cancelled successfully'
      }), {
        status: 200,
        headers: corsHeaders
      })
    } else {
      // Admin can permanently delete
      orders.splice(orderIndex, 1)
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Order deleted successfully'
      }), {
        status: 200,
        headers: corsHeaders
      })
    }
    
  } catch (error) {
    console.error('Order DELETE error:', error)
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to delete order'
    }), {
      status: 500,
      headers: corsHeaders
    })
  }
}

// PATCH - Partial update (for status changes)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params Promise
    const { id } = await params
    const orderId = id
    
    const body = await req.json()
    
    // Get auth token from cookies
    const cookieHeader = req.headers.get('cookie') || ''
    const cookies = parseCookies(cookieHeader)
    const authToken = cookies['next-auth.session-token']
    const user = getUserFromToken(authToken)
    
    // Check if user is authenticated
    if (!user) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Authentication required'
      }), {
        status: 401,
        headers: corsHeaders
      })
    }
    
    // Find order index
    const orderIndex = orders.findIndex(o => o.id === orderId || o.orderNumber === orderId)
    
    if (orderIndex === -1) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Order not found'
      }), {
        status: 404,
        headers: corsHeaders
      })
    }
    
    const order = orders[orderIndex]
    
    // Handle different update types
    const { action } = body
    
    if (action === 'cancel' && user.id === order.userId) {
      // User cancelling their own order
      if (order.status !== 'pending') {
        return new Response(JSON.stringify({
          success: false,
          error: 'Only pending orders can be cancelled'
        }), {
          status: 400,
          headers: corsHeaders
        })
      }
      
      orders[orderIndex] = {
        ...order,
        status: 'cancelled',
        updatedAt: new Date().toISOString()
      }
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Order cancelled successfully',
        order: orders[orderIndex]
      }), {
        status: 200,
        headers: corsHeaders
      })
    }
    
    if (action === 'status' && user.role === 'ADMIN') {
      // Admin updating status
      const { status } = body
      const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
      
      if (!validStatuses.includes(status)) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Invalid order status'
        }), {
          status: 400,
          headers: corsHeaders
        })
      }
      
      orders[orderIndex] = {
        ...order,
        status,
        updatedAt: new Date().toISOString()
      }
      
      return new Response(JSON.stringify({
        success: true,
        message: `Order status updated to ${status}`,
        order: orders[orderIndex]
      }), {
        status: 200,
        headers: corsHeaders
      })
    }
    
    if (action === 'payment' && user.role === 'ADMIN') {
      // Admin updating payment status
      const { paymentStatus } = body
      const validPaymentStatuses = ['pending', 'paid', 'failed', 'refunded']
      
      if (!validPaymentStatuses.includes(paymentStatus)) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Invalid payment status'
        }), {
          status: 400,
          headers: corsHeaders
        })
      }
      
      orders[orderIndex] = {
        ...order,
        paymentStatus,
        updatedAt: new Date().toISOString()
      }
      
      return new Response(JSON.stringify({
        success: true,
        message: `Payment status updated to ${paymentStatus}`,
        order: orders[orderIndex]
      }), {
        status: 200,
        headers: corsHeaders
      })
    }
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Invalid action or unauthorized'
    }), {
      status: 400,
      headers: corsHeaders
    })
    
  } catch (error) {
    console.error('Order PATCH error:', error)
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to update order'
    }), {
      status: 500,
      headers: corsHeaders
    })
  }
}