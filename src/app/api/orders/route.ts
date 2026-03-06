// ULTRA SIMPLIFIED - ZERO ERRORS
// Vercel Deployment Ready

// Simple Order Type
type Order = {
  id: string
  orderNumber: string
  customerName: string
  total: number
  status: string
  createdAt: string
}

// Mock Database
let orders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-001",
    customerName: "Hafiz Sajid Syed",
    total: 1429.98,
    status: "delivered",
    createdAt: "2024-03-05"
  },
  {
    id: "2",
    orderNumber: "ORD-002",
    customerName: "Ali Ahmed",
    total: 889.99,
    status: "processing",
    createdAt: "2024-03-04"
  },
  {
    id: "3",
    orderNumber: "ORD-003",
    customerName: "Fatima Khan",
    total: 2749.99,
    status: "pending",
    createdAt: "2024-03-03"
  }
]

// Helper Functions
const generateId = () => Date.now().toString()
const generateOrderNumber = () => `ORD-${Date.now().toString().slice(-6)}`

// CORS Headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Content-Type': 'application/json'
}

// OPTIONS - For CORS
export async function OPTIONS() {
  return new Response(null, { status: 204, headers })
}

// GET - Fetch Orders
export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const status = url.searchParams.get('status')
    const getStats = url.searchParams.get('stats') === 'true'
    
    // Filter by status
    let filtered = orders
    if (status && status !== 'all') {
      filtered = orders.filter(o => o.status === status)
    }
    
    // Return stats if requested
    if (getStats) {
      const stats = {
        total: filtered.length,
        pending: filtered.filter(o => o.status === 'pending').length,
        processing: filtered.filter(o => o.status === 'processing').length,
        delivered: filtered.filter(o => o.status === 'delivered').length,
        revenue: filtered.reduce((sum, o) => sum + o.total, 0)
      }
      return Response.json({ success: true, stats }, { headers })
    }
    
    // Return orders
    return Response.json({ 
      success: true, 
      orders: filtered,
      total: filtered.length
    }, { headers })
    
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: 'Failed to fetch orders' 
    }, { status: 500, headers })
  }
}

// POST - Create Order
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { customerName, items } = body
    
    // Basic validation
    if (!customerName || !items?.length) {
      return Response.json({ 
        success: false, 
        error: 'Customer name and items required' 
      }, { status: 400, headers })
    }
    
    // Calculate total (simplified)
    const total = items.reduce((sum: number, item: any) => 
      sum + (item.price * (item.quantity || 1)), 0)
    
    // Create new order
    const newOrder: Order = {
      id: generateId(),
      orderNumber: generateOrderNumber(),
      customerName,
      total,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    }
    
    // Save to "database"
    orders.push(newOrder)
    
    return Response.json({ 
      success: true, 
      message: 'Order created',
      order: newOrder 
    }, { status: 201, headers })
    
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: 'Failed to create order' 
    }, { status: 500, headers })
  }
}

// DELETE - Delete Order
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    
    if (!id) {
      return Response.json({ 
        success: false, 
        error: 'Order ID required' 
      }, { status: 400, headers })
    }
    
    // Filter out the order
    const initialLength = orders.length
    orders = orders.filter(o => o.id !== id)
    
    if (orders.length === initialLength) {
      return Response.json({ 
        success: false, 
        error: 'Order not found' 
      }, { status: 404, headers })
    }
    
    return Response.json({ 
      success: true, 
      message: 'Order deleted' 
    }, { headers })
    
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: 'Failed to delete order' 
    }, { status: 500, headers })
  }
}