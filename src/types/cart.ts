// ==================== CART TYPES ====================

/**
 * Cart item interface
 * Represents a single item in the shopping cart
 */
export interface CartItem {
  /** Unique identifier for the cart item */
  id: string
  
  /** Product ID reference */
  productId: string
  
  /** Product name */
  name: string
  
  /** Current price of the product */
  price: number
  
  /** Original price before discount (if any) */
  originalPrice?: number
  
  /** Quantity selected */
  quantity: number
  
  /** Product image URL or emoji */
  image?: string
  
  /** Maximum allowed quantity (based on stock) */
  maxStock?: number
  
  /** Product category */
  category?: string
  
  /** Any special instructions for this item */
  notes?: string
  
  /** Whether item is available for purchase */
  inStock?: boolean
  
  /** Discount percentage applied (if any) */
  discount?: number
  
  /** Item subtotal (price * quantity) */
  subtotal?: number
  
  /** Date added to cart */
  addedAt?: string
}

/**
 * Cart summary totals
 * Calculated values for the entire cart
 */
export interface CartTotals {
  /** Subtotal before tax and shipping */
  subtotal: number
  
  /** Tax amount */
  tax: number
  
  /** Tax rate percentage */
  taxRate: number
  
  /** Shipping cost */
  shipping: number
  
  /** Discount amount */
  discount: number
  
  /** Coupon code applied */
  couponCode?: string
  
  /** Discount percentage from coupon */
  couponDiscount?: number
  
  /** Grand total (subtotal + tax + shipping - discount) */
  total: number
  
  /** Total number of items (sum of quantities) */
  itemCount: number
  
  /** Unique items count */
  uniqueItems: number
  
  /** Free shipping eligible */
  freeShippingEligible: boolean
  
  /** Amount needed for free shipping */
  freeShippingNeeded?: number
  
  /** Estimated delivery date */
  estimatedDelivery?: string
}

/**
 * Main cart interface
 * Complete shopping cart data structure
 */
export interface Cart {
  /** Unique cart ID */
  id: string
  
  /** User ID (null for guest carts) */
  userId: string | null
  
  /** Session ID for guest carts */
  sessionId: string | null
  
  /** Cart items */
  items: CartItem[]
  
  /** Cart totals */
  totals: CartTotals
  
  /** Whether cart has been saved */
  isSaved: boolean
  
  /** Cart creation date */
  createdAt: string
  
  /** Cart last updated date */
  updatedAt: string
  
  /** Cart expiration date (for guest carts) */
  expiresAt?: string
  
  /** Any notes for the entire cart */
  notes?: string
}

/**
 * Cart actions
 * Available operations on cart
 */
export interface CartActions {
  /** Add item to cart */
  addItem: (item: Omit<CartItem, 'id' | 'subtotal' | 'addedAt'>) => Promise<boolean>
  
  /** Update item quantity */
  updateQuantity: (itemId: string, quantity: number) => Promise<boolean>
  
  /** Remove item from cart */
  removeItem: (itemId: string) => Promise<boolean>
  
  /** Clear entire cart */
  clearCart: () => Promise<boolean>
  
  /** Apply coupon code */
  applyCoupon: (code: string) => Promise<boolean>
  
  /** Remove coupon */
  removeCoupon: () => Promise<boolean>
  
  /** Save cart for later */
  saveCart: () => Promise<boolean>
  
  /** Load saved cart */
  loadCart: () => Promise<boolean>
  
  /** Merge guest cart with user cart (after login) */
  mergeCart: (userId: string) => Promise<boolean>
}

/**
 * Cart state
 * Represents the current state of the cart in the application
 */
export interface CartState {
  /** Cart data */
  cart: Cart | null
  
  /** Loading state */
  loading: boolean
  
  /** Updating state (for individual operations) */
  updating: boolean
  
  /** Error message */
  error: string | null
  
  /** Success message */
  success: string | null
  
  /** Last operation performed */
  lastOperation: string | null
}

/**
 * Cart context type
 * Used for React context
 */
export interface CartContextType extends CartState, CartActions {
  /** Check if item exists in cart */
  hasItem: (productId: string) => boolean
  
  /** Get item quantity by product ID */
  getItemQuantity: (productId: string) => number
  
  /** Get item by ID */
  getItem: (itemId: string) => CartItem | undefined
  
  /** Check if cart is empty */
  isEmpty: boolean
  
  /** Check if cart is for guest user */
  isGuestCart: boolean
  
  /** Refresh cart data */
  refreshCart: () => Promise<void>
}

/**
 * Cart API response
 * Standard response format for cart API endpoints
 */
export interface CartApiResponse {
  /** Success status */
  success: boolean
  
  /** Cart data (if successful) */
  cart?: Cart
  
  /** Error message (if failed) */
  error?: string
  
  /** Success message */
  message?: string
  
  /** Validation errors */
  errors?: Record<string, string>
}

/**
 * Add to cart request
 * Payload for adding item to cart
 */
export interface AddToCartRequest {
  /** Product ID */
  productId: string
  
  /** Product name */
  name: string
  
  /** Product price */
  price: number
  
  /** Quantity to add */
  quantity?: number
  
  /** Product image */
  image?: string
  
  /** Product category */
  category?: string
  
  /** Maximum stock */
  maxStock?: number
  
  /** Any notes */
  notes?: string
}

/**
 * Update cart request
 * Payload for updating cart item
 */
export interface UpdateCartRequest {
  /** Cart item ID */
  itemId: string
  
  /** New quantity (0 to remove) */
  quantity: number
  
  /** Any notes to update */
  notes?: string
}

/**
 * Apply coupon request
 * Payload for applying coupon code
 */
export interface ApplyCouponRequest {
  /** Coupon code */
  code: string
}

/**
 * Cart validation errors
 * Specific validation error types
 */
export interface CartValidationErrors {
  /** Item out of stock */
  outOfStock?: string[]
  
  /** Quantity exceeds stock */
  quantityExceeded?: Array<{ itemId: string; maxStock: number }>
  
  /** Invalid coupon */
  invalidCoupon?: string
  
  /** Cart expired */
  cartExpired?: boolean
  
  /** Item not found */
  itemNotFound?: string[]
}

// ==================== ENUMS ====================

/**
 * Cart status
 */
export enum CartStatus {
  ACTIVE = 'active',
  SAVED = 'saved',
  ABANDONED = 'abandoned',
  CONVERTED = 'converted',
  EXPIRED = 'expired'
}

/**
 * Cart event types
 */
export enum CartEventType {
  ITEM_ADDED = 'item_added',
  ITEM_REMOVED = 'item_removed',
  QUANTITY_UPDATED = 'quantity_updated',
  COUPON_APPLIED = 'coupon_applied',
  COUPON_REMOVED = 'coupon_removed',
  CART_CLEARED = 'cart_cleared',
  CART_SAVED = 'cart_saved',
  CART_LOADED = 'cart_loaded',
  CART_MERGED = 'cart_merged'
}

/**
 * Cart error codes
 */
export enum CartErrorCode {
  ITEM_NOT_FOUND = 'ITEM_NOT_FOUND',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  QUANTITY_EXCEEDED = 'QUANTITY_EXCEEDED',
  INVALID_COUPON = 'INVALID_COUPON',
  CART_EXPIRED = 'CART_EXPIRED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID_REQUEST = 'INVALID_REQUEST',
  SERVER_ERROR = 'SERVER_ERROR'
}

// ==================== UTILITY TYPES ====================

/**
 * Cart summary (minimal version for display)
 */
export type CartSummary = Pick<Cart, 'id' | 'totals'> & {
  itemCount: number
  firstItemImage?: string
}

/**
 * Cart item summary (minimal version for display)
 */
export type CartItemSummary = Pick<CartItem, 'id' | 'name' | 'price' | 'quantity' | 'image'>

/**
 * Cart totals summary
 */
export type CartTotalsSummary = Pick<CartTotals, 'subtotal' | 'tax' | 'shipping' | 'discount' | 'total' | 'itemCount'>

/**
 * Cart with only necessary fields for checkout
 */
export type CheckoutCart = {
  items: Array<Pick<CartItem, 'id' | 'name' | 'price' | 'quantity' | 'image'>>
  totals: CartTotalsSummary
}

// ==================== CONSTANTS ====================

/** Default tax rate (10%) */
export const DEFAULT_TAX_RATE = 0.1

/** Free shipping threshold */
export const FREE_SHIPPING_THRESHOLD = 100

/** Default shipping cost */
export const DEFAULT_SHIPPING_COST = 10

/** Cart expiration time (7 days in milliseconds) */
export const CART_EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000

/** Maximum quantity per item */
export const MAX_ITEM_QUANTITY = 10

// ==================== HELPER FUNCTIONS ====================

/**
 * Calculate cart totals from items
 * @param items - Cart items
 * @param couponDiscount - Optional coupon discount percentage
 * @returns Calculated totals
 */
export function calculateCartTotals(
  items: CartItem[],
  couponDiscount?: number
): CartTotals {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const uniqueItems = items.length
  
  const taxRate = DEFAULT_TAX_RATE
  const tax = subtotal * taxRate
  
  const freeShippingEligible = subtotal >= FREE_SHIPPING_THRESHOLD
  const shipping = freeShippingEligible ? 0 : DEFAULT_SHIPPING_COST
  const freeShippingNeeded = freeShippingEligible ? 0 : FREE_SHIPPING_THRESHOLD - subtotal
  
  let discount = 0
  if (couponDiscount) {
    discount = subtotal * (couponDiscount / 100)
  }
  
  const total = subtotal + tax + shipping - discount

  return {
    subtotal: Number(subtotal.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    taxRate,
    shipping,
    discount: Number(discount.toFixed(2)),
    total: Number(total.toFixed(2)),
    itemCount,
    uniqueItems,
    freeShippingEligible,
    freeShippingNeeded: freeShippingNeeded > 0 ? Number(freeShippingNeeded.toFixed(2)) : undefined,
    couponDiscount
  }
}

/**
 * Create new cart item
 * @param product - Product data
 * @param quantity - Quantity
 * @returns New cart item
 */
export function createCartItem(
  product: Omit<CartItem, 'id' | 'quantity' | 'subtotal' | 'addedAt'>,
  quantity: number = 1
): CartItem {
  return {
    id: `item_${Date.now()}_${Math.random().toString(36).substring(2)}`,
    ...product,
    quantity,
    subtotal: product.price * quantity,
    addedAt: new Date().toISOString()
  }
}

/**
 * Create empty cart
 * @param userId - User ID (optional)
 * @param sessionId - Session ID (optional)
 * @returns New empty cart
 */
export function createEmptyCart(
  userId?: string | null,
  sessionId?: string | null
): Cart {
  const now = new Date().toISOString()
  const expiresAt = new Date(Date.now() + CART_EXPIRATION_TIME).toISOString()
  
  return {
    id: `cart_${Date.now()}_${Math.random().toString(36).substring(2)}`,
    userId: userId || null,
    sessionId: sessionId || null,
    items: [],
    totals: calculateCartTotals([]),
    isSaved: false,
    createdAt: now,
    updatedAt: now,
    expiresAt
  }
}

/**
 * Validate cart item
 * @param item - Cart item to validate
 * @returns Validation result
 */
export function validateCartItem(item: Partial<CartItem>): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!item.productId) errors.push('Product ID is required')
  if (!item.name) errors.push('Product name is required')
  if (item.price === undefined || item.price < 0) errors.push('Valid price is required')
  if (item.quantity !== undefined && (item.quantity < 1 || item.quantity > MAX_ITEM_QUANTITY)) {
    errors.push(`Quantity must be between 1 and ${MAX_ITEM_QUANTITY}`)
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}