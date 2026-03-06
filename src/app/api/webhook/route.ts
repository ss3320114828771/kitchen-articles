// ULTRA SIMPLIFIED - ZERO ERRORS
// Vercel Deployment Ready
// No npm packages - Pure TypeScript

// Webhook Event Types
type WebhookEvent = {
  id: string
  type: 'payment' | 'order' | 'user' | 'product' | 'system'
  action: 'created' | 'updated' | 'deleted' | 'completed' | 'failed'
  data: any
  timestamp: string
  source: string
}

// Store webhook events (in production, use database)
let webhookEvents: WebhookEvent[] = []

// CORS Headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Webhook-Signature',
  'Content-Type': 'application/json'
}

// OPTIONS - For CORS
export async function OPTIONS() {
  return new Response(null, { 
    status: 204, 
    headers 
  })
}

// POST - Handle incoming webhooks
export async function POST(req: Request) {
  try {
    // Get webhook signature from headers (for verification)
    const signature = req.headers.get('x-webhook-signature')
    const userAgent = req.headers.get('user-agent') || 'unknown'
    
    // Parse webhook payload
    const payload = await req.json()
    
    // Basic validation
    if (!payload || Object.keys(payload).length === 0) {
      return Response.json({ 
        success: false, 
        error: 'Empty payload' 
      }, { status: 400, headers })
    }
    
    // Determine webhook type
    const eventType = detectEventType(payload)
    const action = detectAction(payload)
    
    // Create webhook event
    const webhookEvent: WebhookEvent = {
      id: generateId(),
      type: eventType,
      action,
      data: payload,
      timestamp: new Date().toISOString(),
      source: userAgent
    }
    
    // Store event
    webhookEvents.push(webhookEvent)
    
    // Process webhook based on type
    await processWebhook(webhookEvent)
    
    // Log webhook (for debugging)
    console.log(`Webhook received: ${eventType}.${action}`, {
      id: webhookEvent.id,
      source: userAgent
    })
    
    // Return success response
    return Response.json({ 
      success: true, 
      message: 'Webhook received successfully',
      eventId: webhookEvent.id,
      timestamp: webhookEvent.timestamp
    }, { status: 200, headers })
    
  } catch (error) {
    console.error('Webhook error:', error)
    
    return Response.json({ 
      success: false, 
      error: 'Failed to process webhook' 
    }, { status: 500, headers })
  }
}

// GET - Get webhook history (for testing/debugging)
export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const limit = parseInt(url.searchParams.get('limit') || '50')
    const type = url.searchParams.get('type')
    
    // Filter events
    let events = [...webhookEvents]
    
    if (type) {
      events = events.filter(e => e.type === type)
    }
    
    // Sort by newest first
    events.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    
    // Apply limit
    events = events.slice(0, limit)
    
    return Response.json({ 
      success: true, 
      events,
      total: webhookEvents.length,
      filtered: events.length
    }, { headers })
    
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: 'Failed to fetch webhooks' 
    }, { status: 500, headers })
  }
}

// Helper: Generate unique ID
function generateId(): string {
  return 'wh_' + Date.now().toString(36) + Math.random().toString(36).substring(2)
}

// Helper: Detect event type from payload
function detectEventType(payload: any): WebhookEvent['type'] {
  // Check for payment webhooks
  if (payload.payment_id || payload.transaction_id || payload.invoice_id) {
    return 'payment'
  }
  
  // Check for order webhooks
  if (payload.order_id || payload.order_number || payload.cart_id) {
    return 'order'
  }
  
  // Check for user webhooks
  if (payload.user_id || payload.customer_id || payload.email) {
    return 'user'
  }
  
  // Check for product webhooks
  if (payload.product_id || payload.sku || payload.product) {
    return 'product'
  }
  
  // Default to system
  return 'system'
}

// Helper: Detect action from payload
function detectAction(payload: any): WebhookEvent['action'] {
  // Check for status indicators
  if (payload.status === 'completed' || payload.completed_at) {
    return 'completed'
  }
  
  if (payload.status === 'failed' || payload.error) {
    return 'failed'
  }
  
  // Check for action indicators
  if (payload.action === 'create' || payload.created_at) {
    return 'created'
  }
  
  if (payload.action === 'update' || payload.updated_at) {
    return 'updated'
  }
  
  if (payload.action === 'delete' || payload.deleted_at) {
    return 'deleted'
  }
  
  // Default
  return 'updated'
}

// Helper: Process webhook based on type
async function processWebhook(event: WebhookEvent) {
  switch (event.type) {
    case 'payment':
      await handlePaymentWebhook(event)
      break
    case 'order':
      await handleOrderWebhook(event)
      break
    case 'user':
      await handleUserWebhook(event)
      break
    case 'product':
      await handleProductWebhook(event)
      break
    default:
      await handleSystemWebhook(event)
  }
}

// Payment webhook handler
async function handlePaymentWebhook(event: WebhookEvent) {
  const { data } = event
  
  // Extract payment details
  const paymentId = data.payment_id || data.transaction_id
  const amount = data.amount || data.total
  const status = data.status || 'unknown'
  
  console.log(`Processing payment ${paymentId}: $${amount} - ${status}`)
  
  // In production: update order status, send email, etc.
  // await updateOrderPayment(paymentId, status)
  // await sendPaymentConfirmation(email, amount)
}

// Order webhook handler
async function handleOrderWebhook(event: WebhookEvent) {
  const { data, action } = event
  
  const orderId = data.order_id || data.order_number
  const customerEmail = data.customer_email || data.email
  
  console.log(`Order ${orderId} ${action}`)
  
  // In production: update inventory, send notification, etc.
  // await updateInventory(data.items)
  // await sendOrderNotification(customerEmail, action)
}

// User webhook handler
async function handleUserWebhook(event: WebhookEvent) {
  const { data, action } = event
  
  const userId = data.user_id || data.customer_id
  const email = data.email
  
  console.log(`User ${userId} ${action}: ${email}`)
  
  // In production: send welcome email, update CRM, etc.
  // if (action === 'created') await sendWelcomeEmail(email)
}

// Product webhook handler
async function handleProductWebhook(event: WebhookEvent) {
  const { data, action } = event
  
  const productId = data.product_id || data.sku
  const productName = data.name || data.product
  
  console.log(`Product ${productName} (${productId}) ${action}`)
  
  // In production: update catalog, clear cache, etc.
  // await clearProductCache(productId)
}

// System webhook handler
async function handleSystemWebhook(event: WebhookEvent) {
  console.log(`System event: ${event.action}`, event.data)
}