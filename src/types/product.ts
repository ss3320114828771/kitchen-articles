// ==================== PRODUCT TYPES ====================

/**
 * Product status enumeration
 */
export type ProductStatus = 
  | 'active'       // Product is active and for sale
  | 'inactive'     // Product is inactive (draft)
  | 'out-of-stock' // Product is out of stock
  | 'discontinued' // Product is discontinued
  | 'coming-soon'  // Product coming soon

/**
 * Product visibility enumeration
 */
export type ProductVisibility = 
  | 'published'    // Visible to everyone
  | 'draft'        // Only visible in admin
  | 'private'      // Visible to logged in users only
  | 'password'     // Password protected

/**
 * Product type enumeration
 */
export type ProductType = 
  | 'simple'       // Simple product
  | 'variable'     // Variable product (with variants)
  | 'digital'      // Digital product (downloadable)
  | 'service'      // Service product
  | 'bundle'       // Bundle of products

/**
 * Stock status enumeration
 */
export type StockStatus = 
  | 'in-stock'     // In stock
  | 'out-of-stock' // Out of stock
  | 'low-stock'    // Low stock (below threshold)
  | 'backorder'    // Available for backorder
  | 'preorder'     // Available for preorder

/**
 * Product variant
 * For variable products (size, color, etc.)
 */
export interface ProductVariant {
  /** Variant ID */
  id: string
  
  /** Variant name (e.g., "Large Red") */
  name: string
  
  /** Variant SKU */
  sku: string
  
  /** Variant price (if different from base) */
  price?: number
  
  /** Compare at price */
  compareAtPrice?: number
  
  /** Cost price (admin only) */
  cost?: number
  
  /** Stock quantity */
  stock: number
  
  /** Stock status */
  stockStatus: StockStatus
  
  /** Variant attributes */
  attributes: Record<string, string>
  
  /** Variant image */
  image?: string
  
  /** Variant weight */
  weight?: number
  
  /** Whether variant is enabled */
  enabled: boolean
}

/**
 * Product image
 */
export interface ProductImage {
  /** Image ID */
  id: string
  
  /** Image URL */
  url: string
  
  /** Image alt text */
  alt?: string
  
  /** Image title */
  title?: string
  
  /** Image order/position */
  order: number
  
  /** Whether this is the primary image */
  isPrimary: boolean
  
  /** Image width */
  width?: number
  
  /** Image height */
  height?: number
  
  /** Image size in bytes */
  size?: number
}

/**
 * Product category
 */
export interface ProductCategory {
  /** Category ID */
  id: string
  
  /** Category name */
  name: string
  
  /** Category slug */
  slug: string
  
  /** Category description */
  description?: string
  
  /** Parent category ID */
  parentId?: string
  
  /** Category image */
  image?: string
  
  /** Category order */
  order: number
  
  /** Product count in this category */
  productCount?: number
}

/**
 * Product tag
 */
export interface ProductTag {
  /** Tag ID */
  id: string
  
  /** Tag name */
  name: string
  
  /** Tag slug */
  slug: string
  
  /** Product count with this tag */
  productCount?: number
}

/**
 * Product attribute
 */
export interface ProductAttribute {
  /** Attribute ID */
  id: string
  
  /** Attribute name (e.g., "Color", "Size") */
  name: string
  
  /** Attribute slug */
  slug: string
  
  /** Attribute values */
  values: string[]
  
  /** Whether this attribute is used for variations */
  isVariation: boolean
  
  /** Attribute order */
  order: number
}

/**
 * Product review
 */
export interface ProductReview {
  /** Review ID */
  id: string
  
  /** User ID */
  userId: string
  
  /** User name */
  userName: string
  
  /** User avatar */
  userAvatar?: string
  
  /** Rating (1-5) */
  rating: number
  
  /** Review title */
  title?: string
  
  /** Review content */
  content: string
  
  /** Pros (what user liked) */
  pros?: string[]
  
  /** Cons (what user disliked) */
  cons?: string[]
  
  /** Images attached to review */
  images?: string[]
  
  /** Verified purchase */
  verified: boolean
  
  /** Helpful count */
  helpful: number
  
  /** Not helpful count */
  notHelpful: number
  
  /** Review status */
  status: 'pending' | 'approved' | 'rejected'
  
  /** Admin response */
  response?: {
    content: string
    date: string
    adminName: string
  }
  
  /** Review date */
  createdAt: string
  
  /** Updated date */
  updatedAt: string
}

/**
 * SEO data for product
 */
export interface ProductSEO {
  /** Meta title */
  metaTitle?: string
  
  /** Meta description */
  metaDescription?: string
  
  /** Meta keywords */
  metaKeywords?: string[]
  
  /** Canonical URL */
  canonicalUrl?: string
  
  /** OG title */
  ogTitle?: string
  
  /** OG description */
  ogDescription?: string
  
  /** OG image */
  ogImage?: string
  
  /** Schema markup */
  schema?: Record<string, any>
}

/**
 * Shipping information for product
 */
export interface ProductShipping {
  /** Weight (kg/lbs) */
  weight?: number
  
  /** Weight unit */
  weightUnit?: 'kg' | 'lbs'
  
  /** Dimensions (L x W x H) */
  dimensions?: {
    length: number
    width: number
    height: number
    unit: 'cm' | 'in'
  }
  
  /** Shipping class */
  shippingClass?: string
  
  /** Free shipping */
  freeShipping: boolean
  
  /** Flat rate shipping */
  flatRate?: number
  
  /** Estimated delivery days */
  estimatedDelivery?: {
    min: number
    max: number
  }
}

/**
 * Inventory information for product
 */
export interface ProductInventory {
  /** Stock keeping unit */
  sku: string
  
  /** Universal product code */
  upc?: string
  
  /** European article number */
  ean?: string
  
  /** International standard book number */
  isbn?: string
  
  /** Manufacturer part number */
  mpn?: string
  
  /** Current stock quantity */
  stock: number
  
  /** Stock status */
  stockStatus: StockStatus
  
  /** Low stock threshold */
  lowStockThreshold?: number
  
  /** Allow backorders */
  allowBackorders: boolean
  
  /** Backorder limit */
  backorderLimit?: number
  
  /** Track inventory */
  trackInventory: boolean
  
  /** Sold individually (max 1 per order) */
  soldIndividually: boolean
  
  /** Minimum order quantity */
  minQuantity: number
  
  /** Maximum order quantity */
  maxQuantity?: number
}

/**
 * Pricing information for product
 */
export interface ProductPricing {
  /** Regular price */
  price: number
  
  /** Compare at price (for showing discount) */
  compareAtPrice?: number
  
  /** Cost price (admin only) */
  cost?: number
  
  /** Wholesale price */
  wholesalePrice?: number
  
  /** Wholesale minimum quantity */
  wholesaleMinQty?: number
  
  /** Currency */
  currency: string
  
  /** Tax class */
  taxClass?: string
  
  /** Tax status (taxable, none) */
  taxStatus: 'taxable' | 'none'
  
  /** Tax rate (if fixed) */
  taxRate?: number
}

/**
 * Main product interface
 * Complete product data structure
 */
export interface Product {
  /** Product ID */
  id: string
  
  /** Product name */
  name: string
  
  /** Product slug (URL-friendly) */
  slug: string
  
  /** Product type */
  type: ProductType
  
  /** Product status */
  status: ProductStatus
  
  /** Product visibility */
  visibility: ProductVisibility
  
  /** Short description */
  shortDescription: string
  
  /** Full description (HTML) */
  description: string
  
  /** Pricing information */
  pricing: ProductPricing
  
  /** Inventory information */
  inventory: ProductInventory
  
  /** Shipping information */
  shipping: ProductShipping
  
  /** Categories */
  categories: ProductCategory[]
  
  /** Tags */
  tags: ProductTag[]
  
  /** Main category ID */
  mainCategory?: string
  
  /** Brand */
  brand?: string
  
  /** Brands (if multiple) */
  brands?: string[]
  
  /** Attributes */
  attributes: ProductAttribute[]
  
  /** Variants (for variable products) */
  variants?: ProductVariant[]
  
  /** Images */
  images: ProductImage[]
  
  /** Featured image */
  featuredImage?: ProductImage
  
  /** Video URL (YouTube/Vimeo) */
  videoUrl?: string
  
  /** 3D model URL */
  model3dUrl?: string
  
  /** Related products */
  relatedProducts?: string[]
  
  /** Upsell products */
  upsellProducts?: string[]
  
  /** Cross-sell products */
  crossSellProducts?: string[]
  
  /** Featured product */
  featured: boolean
  
  /** New product */
  isNew: boolean
  
  /** On sale */
  onSale: boolean
  
  /** Average rating */
  rating: number
  
  /** Number of reviews */
  reviewCount: number
  
  /** Number of sales */
  salesCount: number
  
  /** Number of views */
  viewsCount: number
  
  /** SEO data */
  seo: ProductSEO
  
  /** Warranty information */
  warranty?: string
  
  /** Specifications (key-value pairs) */
  specifications?: Record<string, string>
  
  /** Features (list) */
  features?: string[]
  
  /** What's in the box */
  whatsInBox?: string[]
  
  /** Downloadable files (for digital products) */
  downloads?: Array<{
    id: string
    name: string
    file: string
    size: number
    downloads: number
  }>
  
  /** Download expiry (days) */
  downloadExpiry?: number
  
  /** Download limit */
  downloadLimit?: number
  
  /** External/affiliate URL */
  externalUrl?: string
  
  /** Button text for external product */
  buttonText?: string
  
  /** Purchase note (shown after purchase) */
  purchaseNote?: string
  
  /** Meta data (custom fields) */
  metaData?: Record<string, any>
  
  /** Created by user ID */
  createdBy: string
  
  /** Created at */
  createdAt: string
  
  /** Updated at */
  updatedAt: string
  
  /** Published at */
  publishedAt?: string
}

/**
 * Product summary (minimal version for lists)
 */
export interface ProductSummary {
  id: string
  name: string
  slug: string
  price: number
  compareAtPrice?: number
  image?: string
  category?: string
  rating: number
  reviewCount: number
  status: ProductStatus
  featured: boolean
  createdAt: string
}

/**
 * Create product request
 */
export interface CreateProductRequest {
  name: string
  slug?: string
  type?: ProductType
  shortDescription: string
  description: string
  price: number
  compareAtPrice?: number
  sku: string
  stock?: number
  categories?: string[]
  tags?: string[]
  images?: string[]
  featured?: boolean
  status?: ProductStatus
  [key: string]: any
}

/**
 * Update product request
 */
export interface UpdateProductRequest {
  name?: string
  slug?: string
  shortDescription?: string
  description?: string
  price?: number
  compareAtPrice?: number
  sku?: string
  stock?: number
  categories?: string[]
  tags?: string[]
  images?: string[]
  featured?: boolean
  status?: ProductStatus
  [key: string]: any
}

/**
 * Product filter options
 */
export interface ProductFilter {
  /** Search term */
  search?: string
  
  /** Category slug(s) */
  category?: string | string[]
  
  /** Tag slug(s) */
  tag?: string | string[]
  
  /** Brand(s) */
  brand?: string | string[]
  
  /** Min price */
  minPrice?: number
  
  /** Max price */
  maxPrice?: number
  
  /** On sale */
  onSale?: boolean
  
  /** Featured */
  featured?: boolean
  
  /** In stock */
  inStock?: boolean
  
  /** Rating minimum */
  minRating?: number
  
  /** Attributes filter */
  attributes?: Record<string, string | string[]>
  
  /** Status */
  status?: ProductStatus | ProductStatus[]
  
  /** Type */
  type?: ProductType | ProductType[]
  
  /** Sort by */
  sortBy?: 'price' | 'name' | 'rating' | 'newest' | 'popularity'
  
  /** Sort order */
  sortOrder?: 'asc' | 'desc'
  
  /** Pagination */
  page?: number
  limit?: number
}

/**
 * Product statistics
 */
export interface ProductStatistics {
  totalProducts: number
  activeProducts: number
  inactiveProducts: number
  outOfStock: number
  lowStock: number
  featuredCount: number
  averagePrice: number
  totalValue: number
  totalSales: number
  totalRevenue: number
  topCategories: Array<{ category: string; count: number }>
  topBrands: Array<{ brand: string; count: number }>
}

/**
 * Product API response
 */
export interface ProductApiResponse {
  success: boolean
  product?: Product
  products?: Product[]
  error?: string
  message?: string
  total?: number
  page?: number
  totalPages?: number
  filters?: ProductFilter
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Calculate discount percentage
 */
export function calculateDiscount(price: number, compareAtPrice?: number): number {
  if (!compareAtPrice || compareAtPrice <= price) return 0
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
}

/**
 * Check if product is in stock
 */
export function isInStock(product: Product): boolean {
  if (!product.inventory.trackInventory) return true
  return product.inventory.stock > 0
}

/**
 * Check if product is low stock
 */
export function isLowStock(product: Product): boolean {
  if (!product.inventory.trackInventory) return false
  const threshold = product.inventory.lowStockThreshold || 5
  return product.inventory.stock > 0 && product.inventory.stock <= threshold
}

/**
 * Get product price after discount
 */
export function getFinalPrice(product: Product): number {
  return product.pricing.price
}

/**
 * Get product stock status text
 */
export function getStockStatusText(product: Product): string {
  if (!product.inventory.trackInventory) return 'In Stock'
  
  if (product.inventory.stock === 0) {
    return product.inventory.allowBackorders ? 'Backorder' : 'Out of Stock'
  }
  
  if (isLowStock(product)) return 'Low Stock'
  
  return 'In Stock'
}

/**
 * Get product URL
 */
export function getProductUrl(product: Product): string {
  return `/products/${product.slug}`
}

/**
 * Generate product slug from name
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/**
 * Format product price
 */
export function formatProductPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
}