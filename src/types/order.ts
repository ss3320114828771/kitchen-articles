// ==================== ORDER TYPES ====================

/**
 * Order status enumeration
 */
export type OrderStatus = 
  | 'pending'      // Order placed, waiting for processing
  | 'processing'   // Order being processed
  | 'confirmed'    // Order confirmed by admin
  | 'shipped'      // Order shipped to customer
  | 'delivered'    // Order delivered to customer
  | 'cancelled'    // Order cancelled by customer/admin
  | 'refunded'     // Order refunded
  | 'on-hold'      // Order on hold
  | 'failed'       // Order failed (payment, etc.)

/**
 * Payment status enumeration
 */
export type PaymentStatus = 
  | 'pending'      // Payment pending
  | 'paid'         // Payment successful
  | 'failed'       // Payment failed
  | 'refunded'     // Payment refunded
  | 'partially-refunded' // Partially refunded
  | 'awaiting'     // Awaiting payment (COD)

/**
 * Payment method enumeration
 */
export type PaymentMethod = 
  | 'credit-card'
  | 'debit-card'
  | 'paypal'
  | 'bank-transfer'
  | 'cash-on-delivery'
  | 'stripe'
  | 'razorpay'
  | 'easypaisa'
  | 'jazzcash'

/**
 * Shipping method enumeration
 */
export type ShippingMethod = 
  | 'standard'     // Standard shipping
  | 'express'      // Express shipping
  | 'overnight'    // Overnight shipping
  | 'pickup'       // Store pickup
  | 'free'         // Free shipping

/**
 * Order item interface
 * Represents a single item in an order
 */
export interface OrderItem {
  /** Unique identifier for the order item */
  id: string
  
  /** Product ID reference */
  productId: string
  
  /** Product name at time of order */
  name: string
  
  /** Product SKU */
  sku?: string
  
  /** Price at time of order */
  price: number
  
  /** Original price before discount */
  originalPrice?: number
  
  /** Quantity ordered */
  quantity: number
  
  /** Total for this item (price * quantity) */
  total: number
  
  /** Discount applied to this item */
  discount?: number
  
  /** Discount percentage */
  discountPercentage?: number
  
  /** Product image URL */
  image?: string
  
  /** Product category */
  category?: string
  
  /** Any customizations/notes for this item */
  notes?: string
  
  /** Whether item is refunded */
  refunded?: boolean
  
  /** Refund amount if partially refunded */
  refundAmount?: number
  
  /** Tax rate applied to this item */
  taxRate?: number
  
  /** Tax amount for this item */
  tax?: number
}

/**
 * Shipping address interface
 */
export interface ShippingAddress {
  /** Full name of recipient */
  name: string
  
  /** Street address */
  street: string
  
  /** Apartment, suite, etc. */
  apartment?: string
  
  /** City */
  city: string
  
  /** State/Province */
  state?: string
  
  /** Postal code */
  postalCode: string
  
  /** Country */
  country: string
  
  /** Phone number */
  phone: string
  
  /** Email address */
  email?: string
  
  /** Delivery instructions */
  instructions?: string
}

/**
 * Billing address interface
 */
export interface BillingAddress {
  /** Full name on billing */
  name: string
  
  /** Street address */
  street: string
  
  /** Apartment, suite, etc. */
  apartment?: string
  
  /** City */
  city: string
  
  /** State/Province */
  state?: string
  
  /** Postal code */
  postalCode: string
  
  /** Country */
  country: string
  
  /** Phone number */
  phone?: string
  
  /** Email for receipt */
  email?: string
  
  /** Company name (if business) */
  company?: string
  
  /** Tax ID/VAT number */
  taxId?: string
}

/**
 * Payment details interface
 */
export interface PaymentDetails {
  /** Payment method used */
  method: PaymentMethod
  
  /** Payment status */
  status: PaymentStatus
  
  /** Transaction ID from payment gateway */
  transactionId?: string
  
  /** Payment gateway used */
  gateway?: string
  
  /** Amount paid */
  amount: number
  
  /** Currency */
  currency: string
  
  /** Payment date */
  paidAt?: string
  
  /** Refund details if applicable */
  refund?: {
    amount: number
    reason: string
    refundedAt: string
    transactionId?: string
  }
  
  /** Card details (partial, for reference) */
  cardLast4?: string
  cardBrand?: string
  
  /** Installment details */
  installments?: {
    count: number
    amount: number
    paid: number
  }
}

/**
 * Shipping details interface
 */
export interface ShippingDetails {
  /** Shipping method */
  method: ShippingMethod
  
  /** Shipping cost */
  cost: number
  
  /** Carrier/Company */
  carrier?: string
  
  /** Tracking number */
  trackingNumber?: string
  
  /** Tracking URL */
  trackingUrl?: string
  
  /** Estimated delivery date */
  estimatedDelivery?: string
  
  /** Actual delivery date */
  deliveredAt?: string
  
  /** Shipping notes */
  notes?: string
  
  /** Shipping label URL */
  label?: string
}

/**
 * Discount/coupon details
 */
export interface DiscountDetails {
  /** Coupon code applied */
  code: string
  
  /** Discount type */
  type: 'percentage' | 'fixed' | 'free-shipping'
  
  /** Discount value */
  value: number
  
  /** Discount amount applied */
  amount: number
  
  /** Description */
  description?: string
}

/**
 * Tax details
 */
export interface TaxDetails {
  /** Tax rate */
  rate: number
  
  /** Tax amount */
  amount: number
  
  /** Tax name (VAT, GST, etc.) */
  name?: string
  
  /** Tax number */
  number?: string
  
  /** Inclusive or exclusive */
  inclusive: boolean
}

/**
 * Main order interface
 * Complete order data structure
 */
export interface Order {
  /** Unique order ID */
  id: string
  
  /** Order number (user-friendly) */
  orderNumber: string
  
  /** User ID (if logged in) */
  userId?: string
  
  /** Customer information */
  customer: {
    name: string
    email: string
    phone: string
    guest?: boolean
  }
  
  /** Order items */
  items: OrderItem[]
  
  /** Order totals */
  totals: {
    /** Subtotal before tax/shipping/discount */
    subtotal: number
    
    /** Tax amount */
    tax: number
    
    /** Shipping cost */
    shipping: number
    
    /** Discount amount */
    discount: number
    
    /** Grand total */
    total: number
    
    /** Amount paid */
    paid: number
    
    /** Amount due */
    due: number
    
    /** Currency */
    currency: string
  }
  
  /** Order status */
  status: OrderStatus
  
  /** Payment details */
  payment: PaymentDetails
  
  /** Shipping details */
  shipping: ShippingDetails
  
  /** Shipping address */
  shippingAddress: ShippingAddress
  
  /** Billing address (if different) */
  billingAddress?: BillingAddress
  
  /** Applied discounts */
  discounts?: DiscountDetails[]
  
  /** Tax details */
  tax?: TaxDetails
  
  /** Customer notes */
  notes?: string
  
  /** Admin notes (internal) */
  adminNotes?: string
  
  /** IP address of customer */
  ipAddress?: string
  
  /** User agent of customer */
  userAgent?: string
  
  /** Order tags */
  tags?: string[]
  
  /** Order metadata (custom fields) */
  metadata?: Record<string, any>
  
  /** Timestamps */
  createdAt: string
  updatedAt: string
  cancelledAt?: string
  completedAt?: string
}

/**
 * Order summary (minimal version for lists)
 */
export interface OrderSummary {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  total: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  itemsCount: number
  createdAt: string
  updatedAt: string
}

/**
 * Create order request
 * Payload for creating a new order
 */
export interface CreateOrderRequest {
  /** Customer information */
  customer: {
    name: string
    email: string
    phone: string
  }
  
  /** Order items */
  items: Array<{
    productId: string
    quantity: number
    notes?: string
  }>
  
  /** Shipping address */
  shippingAddress: Omit<ShippingAddress, 'name' | 'phone'> & {
    name?: string
    phone?: string
  }
  
  /** Billing address (if different) */
  billingAddress?: BillingAddress
  
  /** Payment method */
  paymentMethod: PaymentMethod
  
  /** Shipping method */
  shippingMethod: ShippingMethod
  
  /** Coupon code */
  couponCode?: string
  
  /** Customer notes */
  notes?: string
  
  /** Save address for later */
  saveAddress?: boolean
}

/**
 * Update order request
 * Payload for updating an order
 */
export interface UpdateOrderRequest {
  /** Order status */
  status?: OrderStatus
  
  /** Payment status */
  paymentStatus?: PaymentStatus
  
  /** Tracking information */
  tracking?: {
    number: string
    carrier: string
    url?: string
  }
  
  /** Admin notes */
  adminNotes?: string
  
  /** Customer notes */
  notes?: string
  
  /** Refund information */
  refund?: {
    amount: number
    reason: string
  }
}

/**
 * Order filter options
 * For filtering orders in lists
 */
export interface OrderFilter {
  /** Filter by status */
  status?: OrderStatus | OrderStatus[]
  
  /** Filter by payment status */
  paymentStatus?: PaymentStatus | PaymentStatus[]
  
  /** Filter by date range */
  dateFrom?: string
  dateTo?: string
  
  /** Filter by customer */
  customerId?: string
  customerEmail?: string
  
  /** Filter by amount range */
  minAmount?: number
  maxAmount?: number
  
  /** Search term (order #, customer name, email) */
  search?: string
  
  /** Pagination */
  page?: number
  limit?: number
  
  /** Sorting */
  sortBy?: 'createdAt' | 'total' | 'status'
  sortOrder?: 'asc' | 'desc'
}

/**
 * Order statistics
 * Aggregated order data for dashboard
 */
export interface OrderStatistics {
  /** Total orders */
  totalOrders: number
  
  /** Orders by status */
  byStatus: Record<OrderStatus, number>
  
  /** Orders by payment status */
  byPaymentStatus: Record<PaymentStatus, number>
  
  /** Total revenue */
  totalRevenue: number
  
  /** Average order value */
  averageOrderValue: number
  
  /** Today's orders */
  todayOrders: number
  
  /** Today's revenue */
  todayRevenue: number
  
  /** This week's orders */
  weekOrders: number
  
  /** This week's revenue */
  weekRevenue: number
  
  /** This month's orders */
  monthOrders: number
  
  /** This month's revenue */
  monthRevenue: number
  
  /** Pending orders count */
  pendingOrders: number
  
  /** Processing orders count */
  processingOrders: number
  
  /** Shipped orders count */
  shippedOrders: number
  
  /** Delivered orders count */
  deliveredOrders: number
  
  /** Cancelled orders count */
  cancelledOrders: number
}

/**
 * Order API response
 */
export interface OrderApiResponse {
  success: boolean
  order?: Order
  orders?: Order[]
  error?: string
  message?: string
  total?: number
  page?: number
  totalPages?: number
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Calculate order totals from items
 */
export function calculateOrderTotals(
  items: OrderItem[],
  shippingCost: number = 0,
  discount: number = 0,
  taxRate: number = 0.1
): Order['totals'] {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * taxRate
  const total = subtotal + tax + shippingCost - discount
  
  return {
    subtotal: Number(subtotal.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    shipping: shippingCost,
    discount,
    total: Number(total.toFixed(2)),
    paid: 0,
    due: Number(total.toFixed(2)),
    currency: 'USD'
  }
}

/**
 * Generate order number
 */
export function generateOrderNumber(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  
  return `ORD-${year}${month}${day}-${random}`
}

/**
 * Check if order is refundable
 */
export function isOrderRefundable(order: Order): boolean {
  const refundableStatuses: OrderStatus[] = ['delivered', 'shipped', 'processing']
  const refundablePaymentStatuses: PaymentStatus[] = ['paid']
  
  return (
    refundableStatuses.includes(order.status) &&
    refundablePaymentStatuses.includes(order.payment.status) &&
    order.totals.paid > 0
  )
}

/**
 * Check if order can be cancelled
 */
export function canCancelOrder(order: Order): boolean {
  const cancellableStatuses: OrderStatus[] = ['pending', 'processing', 'on-hold']
  return cancellableStatuses.includes(order.status)
}

/**
 * Get order status color for UI
 */
export function getOrderStatusColor(status: OrderStatus): string {
  const colors: Record<OrderStatus, string> = {
    pending: '#f59e0b',      // Yellow
    processing: '#3b82f6',    // Blue
    confirmed: '#10b981',     // Green
    shipped: '#8b5cf6',       // Purple
    delivered: '#10b981',     // Green
    cancelled: '#ef4444',     // Red
    refunded: '#6b7280',      // Gray
    'on-hold': '#f97316',     // Orange
    failed: '#ef4444'         // Red
  }
  return colors[status] || '#6b7280'
}

/**
 * Get payment status color for UI
 */
export function getPaymentStatusColor(status: PaymentStatus): string {
  const colors: Record<PaymentStatus, string> = {
    pending: '#f59e0b',
    paid: '#10b981',
    failed: '#ef4444',
    refunded: '#6b7280',
    'partially-refunded': '#f97316',
    awaiting: '#3b82f6'
  }
  return colors[status] || '#6b7280'
}