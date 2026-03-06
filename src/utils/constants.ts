// ==================== APP CONSTANTS ====================

/**
 * Application information
 */
export const APP = {
  NAME: 'Kitechn',
  FULL_NAME: 'Kitechn Technologies',
  DESCRIPTION: 'Pioneering the future of technology with innovation and integrity.',
  VERSION: '1.0.0',
  URL: 'https://kitechn.com',
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.kitechn.com',
  ENV: process.env.NODE_ENV || 'development',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_TEST: process.env.NODE_ENV === 'test',
} as const

// ==================== CONTACT INFORMATION ====================

/**
 * Contact information
 */
export const CONTACT = {
  EMAIL: 'info@kitechn.com',
  SUPPORT: 'support@kitechn.com',
  SALES: 'sales@kitechn.com',
  PHONE: '+92 300 1234567',
  WHATSAPP: '+92 300 1234567',
  ADDRESS: {
    STREET: '123 Tech Street',
    CITY: 'Innovation City',
    STATE: 'Tech Valley',
    COUNTRY: 'Pakistan',
    POSTAL_CODE: '12345',
    FULL: '123 Tech Street, Innovation City, Pakistan 12345'
  },
  HOURS: {
    MONDAY: '9:00 AM - 6:00 PM',
    TUESDAY: '9:00 AM - 6:00 PM',
    WEDNESDAY: '9:00 AM - 6:00 PM',
    THURSDAY: '9:00 AM - 6:00 PM',
    FRIDAY: '9:00 AM - 12:00 PM',
    SATURDAY: 'Closed',
    SUNDAY: 'Closed',
    FULL: 'Mon-Thu: 9am-6pm, Fri: 9am-12pm, Sat-Sun: Closed'
  }
} as const

// ==================== ADMIN INFORMATION ====================

/**
 * Admin information
 */
export const ADMIN = {
  NAME: 'Hafiz Sajid Syed',
  EMAIL: 'hafizsajidsyed@gmail.com',
  PHONE: '+92 300 1234567',
  ROLE: 'Administrator',
  GITHUB: 'https://github.com/hafizsajid',
  LINKEDIN: 'https://linkedin.com/in/hafiz-sajid-syed'
} as const

// ==================== SOCIAL MEDIA LINKS ====================

/**
 * Social media links
 */
export const SOCIAL = {
  FACEBOOK: 'https://facebook.com/kitechn',
  TWITTER: 'https://twitter.com/kitechn',
  INSTAGRAM: 'https://instagram.com/kitechn',
  LINKEDIN: 'https://linkedin.com/company/kitechn',
  YOUTUBE: 'https://youtube.com/kitechn',
  GITHUB: 'https://github.com/kitechn',
  WHATSAPP: 'https://wa.me/923001234567',
  TELEGRAM: 'https://t.me/kitechn',
  TIKTOK: 'https://tiktok.com/@kitechn'
} as const

// ==================== ROUTES ====================

/**
 * Public routes (no authentication required)
 */
export const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/contact',
  '/products',
  '/products/[id]',
  '/products/categories/[category]',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/terms',
  '/privacy',
  '/cookies',
  '/faq'
] as const

/**
 * Protected routes (authentication required)
 */
export const PROTECTED_ROUTES = [
  '/dashboard',
  '/dashboard/*',
  '/profile',
  '/profile/*',
  '/orders',
  '/orders/*',
  '/cart',
  '/checkout',
  '/wishlist'
] as const

/**
 * Admin routes (admin only)
 */
export const ADMIN_ROUTES = [
  '/admin',
  '/admin/*',
  '/admin/dashboard',
  '/admin/orders',
  '/admin/orders/*',
  '/admin/products',
  '/admin/products/*',
  '/admin/users',
  '/admin/users/*',
  '/admin/categories',
  '/admin/settings'
] as const

/**
 * API routes
 */
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    VERIFY_EMAIL: '/api/auth/verify-email',
    SESSION: '/api/auth/session'
  },
  PRODUCTS: {
    LIST: '/api/products',
    DETAIL: (id: string) => `/api/products/${id}`,
    CATEGORIES: '/api/products/categories',
    SEARCH: '/api/products/search'
  },
  ORDERS: {
    LIST: '/api/orders',
    DETAIL: (id: string) => `/api/orders/${id}`,
    USER: (userId: string) => `/api/orders/user/${userId}`
  },
  USERS: {
    LIST: '/api/users',
    DETAIL: (id: string) => `/api/users/${id}`,
    PROFILE: '/api/users/profile'
  },
  CART: {
    GET: '/api/cart',
    ADD: '/api/cart/add',
    UPDATE: '/api/cart/update',
    REMOVE: '/api/cart/remove',
    CLEAR: '/api/cart/clear'
  }
} as const

// ==================== PAGINATION ====================

/**
 * Pagination defaults
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  DEFAULT_LIMIT_SMALL: 5,
  DEFAULT_LIMIT_LARGE: 20,
  MAX_LIMIT: 100,
  PRODUCTS_PER_PAGE: 12,
  ORDERS_PER_PAGE: 10,
  USERS_PER_PAGE: 10
} as const

// ==================== CURRENCY ====================

/**
 * Currency settings
 */
export const CURRENCY = {
  CODE: 'USD',
  SYMBOL: '$',
  NAME: 'US Dollar',
  LOCALE: 'en-US',
  DECIMAL_PLACES: 2,
  THOUSAND_SEPARATOR: ',',
  DECIMAL_SEPARATOR: '.'
} as const

// ==================== TAX ====================

/**
 * Tax settings
 */
export const TAX = {
  RATE: 0.1, // 10%
  NAME: 'VAT',
  ENABLED: true,
  INCLUDED_IN_PRICE: false,
  APPLY_TO_SHIPPING: true
} as const

// ==================== SHIPPING ====================

/**
 * Shipping settings
 */
export const SHIPPING = {
  FREE_THRESHOLD: 100,
  STANDARD_COST: 5.99,
  EXPRESS_COST: 12.99,
  OVERNIGHT_COST: 24.99,
  ESTIMATED_DAYS: {
    STANDARD: '5-7 business days',
    EXPRESS: '2-3 business days',
    OVERNIGHT: '1 business day'
  }
} as const

// ==================== ORDER STATUS ====================

/**
 * Order statuses with colors
 */
export const ORDER_STATUS = {
  PENDING: { value: 'pending', label: 'Pending', color: '#f59e0b', bg: '#f59e0b20' },
  PROCESSING: { value: 'processing', label: 'Processing', color: '#3b82f6', bg: '#3b82f620' },
  SHIPPED: { value: 'shipped', label: 'Shipped', color: '#8b5cf6', bg: '#8b5cf620' },
  DELIVERED: { value: 'delivered', label: 'Delivered', color: '#10b981', bg: '#10b98120' },
  CANCELLED: { value: 'cancelled', label: 'Cancelled', color: '#ef4444', bg: '#ef444420' },
  REFUNDED: { value: 'refunded', label: 'Refunded', color: '#6b7280', bg: '#6b728020' }
} as const

// ==================== PAYMENT STATUS ====================

/**
 * Payment statuses with colors
 */
export const PAYMENT_STATUS = {
  PENDING: { value: 'pending', label: 'Pending', color: '#f59e0b', bg: '#f59e0b20' },
  PAID: { value: 'paid', label: 'Paid', color: '#10b981', bg: '#10b98120' },
  FAILED: { value: 'failed', label: 'Failed', color: '#ef4444', bg: '#ef444420' },
  REFUNDED: { value: 'refunded', label: 'Refunded', color: '#6b7280', bg: '#6b728020' }
} as const

// ==================== PAYMENT METHODS ====================

/**
 * Available payment methods
 */
export const PAYMENT_METHODS = [
  { id: 'credit-card', name: 'Credit Card', icon: '💳', enabled: true },
  { id: 'debit-card', name: 'Debit Card', icon: '💳', enabled: true },
  { id: 'paypal', name: 'PayPal', icon: '📱', enabled: true },
  { id: 'bank-transfer', name: 'Bank Transfer', icon: '🏦', enabled: true },
  { id: 'cash-on-delivery', name: 'Cash on Delivery', icon: '💰', enabled: true },
  { id: 'easypaisa', name: 'Easypaisa', icon: '📱', enabled: true },
  { id: 'jazzcash', name: 'JazzCash', icon: '📱', enabled: true }
] as const

// ==================== SHIPPING METHODS ====================

/**
 * Available shipping methods
 */
export const SHIPPING_METHODS = [
  { id: 'standard', name: 'Standard Shipping', cost: 5.99, days: '5-7 business days' },
  { id: 'express', name: 'Express Shipping', cost: 12.99, days: '2-3 business days' },
  { id: 'overnight', name: 'Overnight Shipping', cost: 24.99, days: '1 business day' },
  { id: 'free', name: 'Free Shipping', cost: 0, days: '7-10 business days', minOrder: 100 }
] as const

// ==================== PRODUCT CATEGORIES ====================

/**
 * Product categories
 */
export const CATEGORIES = [
  { id: 'electronics', name: 'Electronics', slug: 'electronics', icon: '💻' },
  { id: 'ai-products', name: 'AI Products', slug: 'ai-products', icon: '🤖' },
  { id: 'wearables', name: 'Wearables', slug: 'wearables', icon: '⌚' },
  { id: 'security', name: 'Security', slug: 'security', icon: '🔒' },
  { id: 'accessories', name: 'Accessories', slug: 'accessories', icon: '🎧' }
] as const

/**
 * Category icons mapping
 */
export const CATEGORY_ICONS = {
  electronics: '💻',
  'ai-products': '🤖',
  wearables: '⌚',
  security: '🔒',
  accessories: '🎧',
  default: '📦'
} as const

// ==================== USER ROLES ====================

/**
 * User roles with permissions
 */
export const USER_ROLES = {
  ADMIN: { value: 'admin', label: 'Admin', level: 3, color: '#ef4444' },
  MODERATOR: { value: 'moderator', label: 'Moderator', level: 2, color: '#f59e0b' },
  USER: { value: 'user', label: 'User', level: 1, color: '#3b82f6' },
  VENDOR: { value: 'vendor', label: 'Vendor', level: 2, color: '#10b981' }
} as const

// ==================== LOCAL STORAGE KEYS ====================

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  AUTH_USER: 'auth_user',
  CART: 'cart',
  WISHLIST: 'wishlist',
  THEME: 'theme',
  LANGUAGE: 'language',
  RECENT_SEARCHES: 'recent_searches',
  RECENTLY_VIEWED: 'recently_viewed'
} as const

// ==================== COOKIE KEYS ====================

/**
 * Cookie keys
 */
export const COOKIE_KEYS = {
  SESSION: 'next-auth.session-token',
  CSRF: 'next-auth.csrf-token',
  CALLBACK_URL: 'next-auth.callback-url'
} as const

// ==================== DATE FORMATS ====================

/**
 * Date formats
 */
export const DATE_FORMATS = {
  DEFAULT: 'YYYY-MM-DD',
  DISPLAY: 'MMM DD, YYYY',
  DISPLAY_WITH_TIME: 'MMM DD, YYYY h:mm A',
  FULL: 'dddd, MMMM DD, YYYY',
  ISO: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  TIME: 'h:mm A',
  TIME_24: 'HH:mm'
} as const

// ==================== ANIMATION DURATIONS ====================

/**
 * Animation durations (ms)
 */
export const ANIMATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
  PAGE_TRANSITION: 300,
  MODAL: 300,
  DROPDOWN: 200,
  TOAST: 3000
} as const

// ==================== BREAKPOINTS ====================

/**
 * Responsive breakpoints (px)
 */
export const BREAKPOINTS = {
  XS: 0,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
} as const

/**
 * Media query strings
 */
export const MEDIA_QUERIES = {
  XS: '(min-width: 0px)',
  SM: '(min-width: 640px)',
  MD: '(min-width: 768px)',
  LG: '(min-width: 1024px)',
  XL: '(min-width: 1280px)',
  '2XL': '(min-width: 1536px)',
  MOBILE: '(max-width: 767px)',
  TABLET: '(min-width: 768px) and (max-width: 1023px)',
  DESKTOP: '(min-width: 1024px)'
} as const

// ==================== COLORS ====================

/**
 * Color palette
 */
export const COLORS = {
  PRIMARY: {
    DEFAULT: '#3b82f6',
    LIGHT: '#60a5fa',
    DARK: '#2563eb'
  },
  SECONDARY: {
    DEFAULT: '#a855f7',
    LIGHT: '#c084fc',
    DARK: '#9333ea'
  },
  SUCCESS: {
    DEFAULT: '#10b981',
    LIGHT: '#34d399',
    DARK: '#059669'
  },
  DANGER: {
    DEFAULT: '#ef4444',
    LIGHT: '#f87171',
    DARK: '#dc2626'
  },
  WARNING: {
    DEFAULT: '#f59e0b',
    LIGHT: '#fbbf24',
    DARK: '#d97706'
  },
  INFO: {
    DEFAULT: '#3b82f6',
    LIGHT: '#60a5fa',
    DARK: '#2563eb'
  },
  GRAY: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827'
  }
} as const

// ==================== GRADIENTS ====================

/**
 * Gradient presets
 */
export const GRADIENTS = {
  PRIMARY: 'linear-gradient(135deg, #3b82f6, #a855f7)',
  SECONDARY: 'linear-gradient(135deg, #a855f7, #ec4899)',
  SUCCESS: 'linear-gradient(135deg, #10b981, #34d399)',
  DANGER: 'linear-gradient(135deg, #ef4444, #f87171)',
  WARNING: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
  SUNSET: 'linear-gradient(135deg, #f97316, #ec4899)',
  OCEAN: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
  FOREST: 'linear-gradient(135deg, #059669, #10b981)',
  ROYAL: 'linear-gradient(135deg, #4f46e5, #a855f7)',
  RAINBOW: 'linear-gradient(90deg, #ef4444, #f59e0b, #10b981, #3b82f6, #a855f7, #ec4899)'
} as const

// ==================== DEMO COUPONS ====================

/**
 * Demo coupon codes
 */
export const COUPONS = {
  WELCOME10: { code: 'WELCOME10', discount: 10, type: 'percentage', minOrder: 50 },
  SAVE20: { code: 'SAVE20', discount: 20, type: 'percentage', minOrder: 100 },
  FLASH50: { code: 'FLASH50', discount: 50, type: 'percentage', minOrder: 200 },
  FREESHIP: { code: 'FREESHIP', discount: 0, type: 'free_shipping', minOrder: 0 }
} as const

// ==================== MESSAGES ====================

/**
 * Common messages
 */
export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Login successful!',
    LOGOUT: 'Logout successful!',
    REGISTER: 'Registration successful! Please check your email.',
    ORDER_PLACED: 'Order placed successfully!',
    CART_UPDATED: 'Cart updated successfully!',
    PROFILE_UPDATED: 'Profile updated successfully!',
    PASSWORD_CHANGED: 'Password changed successfully!'
  },
  ERROR: {
    REQUIRED: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PASSWORD: 'Invalid password',
    PASSWORDS_MATCH: 'Passwords do not match',
    WEAK_PASSWORD: 'Password is too weak',
    NETWORK: 'Network error. Please try again.',
    SERVER: 'Server error. Please try again later.',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'You do not have permission to perform this action',
    NOT_FOUND: 'Resource not found'
  },
  CONFIRM: {
    DELETE: 'Are you sure you want to delete this?',
    CANCEL: 'Are you sure you want to cancel?',
    LOGOUT: 'Are you sure you want to logout?'
  }
} as const

// ==================== META DEFAULTS ====================

/**
 * Default SEO meta tags
 */
export const META_DEFAULTS = {
  TITLE: 'Kitechn - Future of Technology',
  DESCRIPTION: 'Discover cutting-edge technology products that transform the way you live and work.',
  KEYWORDS: 'technology, ecommerce, quantum computing, AI, wearables, security',
  OG_IMAGE: 'https://kitechn.com/og-image.jpg',
  TWITTER_HANDLE: '@kitechn'
} as const

// ==================== FILE UPLOAD ====================

/**
 * File upload limits
 */
export const UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_SIZE_MB: 5,
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp', '.gif']
} as const

// ==================== RATINGS ====================

/**
 * Rating options
 */
export const RATINGS = [
  { value: 5, label: '5 Stars', emoji: '⭐⭐⭐⭐⭐' },
  { value: 4, label: '4 Stars', emoji: '⭐⭐⭐⭐' },
  { value: 3, label: '3 Stars', emoji: '⭐⭐⭐' },
  { value: 2, label: '2 Stars', emoji: '⭐⭐' },
  { value: 1, label: '1 Star', emoji: '⭐' }
] as const

// ==================== SORT OPTIONS ====================

/**
 * Sort options for products
 */
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'name_asc', label: 'Name: A to Z' },
  { value: 'name_desc', label: 'Name: Z to A' },
  { value: 'rating', label: 'Top Rated' }
] as const