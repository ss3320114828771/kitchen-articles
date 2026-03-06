// ==================== USER TYPES ====================

/**
 * User role enumeration
 */
export type UserRole = 
  | 'admin'        // Full access
  | 'moderator'    // Moderate content
  | 'user'         // Regular user
  | 'vendor'       // Seller/Vendor
  | 'guest'        // Guest/Not logged in

/**
 * User status enumeration
 */
export type UserStatus = 
  | 'active'       // Active account
  | 'inactive'     // Inactive account
  | 'blocked'      // Blocked/Suspended
  | 'pending'      // Pending verification
  | 'deleted'      // Soft deleted

/**
 * Account type enumeration
 */
export type AccountType = 
  | 'personal'     // Personal account
  | 'business'     // Business account
  | 'enterprise'   // Enterprise account

/**
 * Verification status enumeration
 */
export type VerificationStatus = 
  | 'unverified'   // Not verified
  | 'pending'      // Verification pending
  | 'verified'     // Verified
  | 'rejected'     // Verification rejected

/**
 * Gender enumeration
 */
export type Gender = 'male' | 'female' | 'other' | 'prefer-not-to-say'

/**
 * User address interface
 */
export interface UserAddress {
  /** Address ID */
  id: string
  
  /** Address type (home, work, etc.) */
  type: 'home' | 'work' | 'other'
  
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
  phone?: string
  
  /** Is default address */
  isDefault: boolean
  
  /** Delivery instructions */
  instructions?: string
  
  /** Latitude for maps */
  latitude?: number
  
  /** Longitude for maps */
  longitude?: number
  
  /** Created at */
  createdAt: string
  
  /** Updated at */
  updatedAt: string
}

/**
 * User payment method interface
 */
export interface UserPaymentMethod {
  /** Payment method ID */
  id: string
  
  /** Payment type */
  type: 'card' | 'bank' | 'paypal' | 'easypaisa' | 'jazzcash'
  
  /** Card brand (Visa, Mastercard, etc.) */
  brand?: string
  
  /** Last 4 digits */
  last4?: string
  
  /** Expiry month */
  expMonth?: number
  
  /** Expiry year */
  expYear?: number
  
  /** Name on card */
  name?: string
  
  /** Billing address */
  billingAddress?: UserAddress
  
  /** Is default payment method */
  isDefault: boolean
  
  /** Created at */
  createdAt: string
  
  /** Updated at */
  updatedAt: string
}

/**
 * User preferences interface
 */
export interface UserPreferences {
  /** Email notifications */
  emailNotifications: boolean
  
  /** SMS notifications */
  smsNotifications: boolean
  
  /** Push notifications */
  pushNotifications: boolean
  
  /** Marketing emails */
  marketingEmails: boolean
  
  /** Newsletter subscription */
  newsletter: boolean
  
  /** Language preference */
  language: string
  
  /** Currency preference */
  currency: string
  
  /** Timezone */
  timezone: string
  
  /** Date format */
  dateFormat: string
  
  /** Time format */
  timeFormat: '12h' | '24h'
  
  /** Theme preference */
  theme: 'light' | 'dark' | 'system'
  
  /** Reduced motion */
  reducedMotion: boolean
  
  /** High contrast */
  highContrast: boolean
  
  /** Font size */
  fontSize: 'small' | 'medium' | 'large'
  
  /** Privacy settings */
  privacy: {
    showProfile: boolean
    showEmail: boolean
    showPhone: boolean
    showAddress: boolean
    showOrders: boolean
  }
}

/**
 * User social links interface
 */
export interface UserSocialLinks {
  website?: string
  facebook?: string
  twitter?: string
  instagram?: string
  linkedin?: string
  youtube?: string
  github?: string
  tiktok?: string
  snapchat?: string
  whatsapp?: string
  telegram?: string
}

/**
 * User activity log interface
 */
export interface UserActivity {
  /** Activity ID */
  id: string
  
  /** Activity type */
  type: 'login' | 'logout' | 'purchase' | 'review' | 'profile_update' | 'password_change' | 'address_add' | 'address_update' | 'payment_add' | 'payment_update'
  
  /** Activity description */
  description: string
  
  /** IP address */
  ipAddress?: string
  
  /** User agent */
  userAgent?: string
  
  /** Device info */
  device?: string
  
  /** Location */
  location?: string
  
  /** Metadata */
  metadata?: Record<string, any>
  
  /** Created at */
  createdAt: string
}

/**
 * User statistics interface
 */
export interface UserStatistics {
  /** Total orders */
  totalOrders: number
  
  /** Total spent */
  totalSpent: number
  
  /** Average order value */
  averageOrderValue: number
  
  /** Last order date */
  lastOrderDate?: string
  
  /** Total reviews */
  totalReviews: number
  
  /** Average rating given */
  averageRating: number
  
  /** Wishlist count */
  wishlistCount: number
  
  /** Saved addresses count */
  addressesCount: number
  
  /** Payment methods count */
  paymentMethodsCount: number
  
  /** Account age (days) */
  accountAge: number
  
  /** Login count */
  loginCount: number
  
  /** Last login */
  lastLogin?: string
}

/**
 * User device interface
 */
export interface UserDevice {
  /** Device ID */
  id: string
  
  /** Device name */
  name: string
  
  /** Device type */
  type: 'mobile' | 'tablet' | 'desktop' | 'other'
  
  /** Operating system */
  os?: string
  
  /** Browser */
  browser?: string
  
  /** IP address */
  ipAddress?: string
  
  /** Location */
  location?: string
  
  /** Last active */
  lastActive: string
  
  /** Is current device */
  isCurrent: boolean
  
  /** Trusted device */
  trusted: boolean
}

/**
 * User session interface
 */
export interface UserSession {
  /** Session ID */
  id: string
  
  /** Session token */
  token: string
  
  /** IP address */
  ipAddress?: string
  
  /** User agent */
  userAgent?: string
  
  /** Device info */
  device?: string
  
  /** Location */
  location?: string
  
  /** Created at */
  createdAt: string
  
  /** Expires at */
  expiresAt: string
  
  /** Is active */
  isActive: boolean
}

/**
 * Main user interface
 * Complete user data structure
 */
export interface User {
  /** User ID */
  id: string
  
  /** Full name */
  name: string
  
  /** Email address */
  email: string
  
  /** Email verified */
  emailVerified: boolean
  
  /** Email verified at */
  emailVerifiedAt?: string
  
  /** Phone number */
  phone?: string
  
  /** Phone verified */
  phoneVerified: boolean
  
  /** Phone verified at */
  phoneVerifiedAt?: string
  
  /** Password hash (never exposed) */
  password?: string
  
  /** User role */
  role: UserRole
  
  /** User status */
  status: UserStatus
  
  /** Account type */
  accountType: AccountType
  
  /** Verification status */
  verificationStatus: VerificationStatus
  
  /** Avatar/Profile picture */
  avatar?: string
  
  /** Avatar initials (fallback) */
  avatarInitials?: string
  
  /** Bio/About */
  bio?: string
  
  /** Date of birth */
  dateOfBirth?: string
  
  /** Gender */
  gender?: Gender
  
  /** Occupation */
  occupation?: string
  
  /** Company (for business accounts) */
  company?: string
  
  /** Tax ID/VAT number */
  taxId?: string
  
  /** Website */
  website?: string
  
  /** Social links */
  social?: UserSocialLinks
  
  /** Primary address ID */
  primaryAddressId?: string
  
  /** Addresses */
  addresses?: UserAddress[]
  
  /** Payment methods */
  paymentMethods?: UserPaymentMethod[]
  
  /** Preferences */
  preferences: UserPreferences
  
  /** Statistics */
  statistics: UserStatistics
  
  /** Recent activity */
  recentActivity?: UserActivity[]
  
  /** Devices */
  devices?: UserDevice[]
  
  /** Active sessions */
  sessions?: UserSession[]
  
  /** Wishlist product IDs */
  wishlist?: string[]
  
  /** Recently viewed product IDs */
  recentlyViewed?: string[]
  
  /** Search history */
  searchHistory?: string[]
  
  /** Notes (admin only) */
  notes?: string
  
  /** Tags */
  tags?: string[]
  
  /** Metadata */
  metadata?: Record<string, any>
  
  /** Referrer ID */
  referredBy?: string
  
  /** Referral code */
  referralCode?: string
  
  /** Created at */
  createdAt: string
  
  /** Updated at */
  updatedAt: string
  
  /** Last login at */
  lastLoginAt?: string
  
  /** Deleted at (soft delete) */
  deletedAt?: string
}

/**
 * User summary (minimal version for lists)
 */
export interface UserSummary {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  avatar?: string
  createdAt: string
  lastLoginAt?: string
  totalOrders?: number
}

/**
 * Create user request
 */
export interface CreateUserRequest {
  name: string
  email: string
  password: string
  phone?: string
  role?: UserRole
  status?: UserStatus
  avatar?: string
  bio?: string
  dateOfBirth?: string
  gender?: Gender
  preferences?: Partial<UserPreferences>
  metadata?: Record<string, any>
}

/**
 * Update user request
 */
export interface UpdateUserRequest {
  name?: string
  email?: string
  password?: string
  phone?: string
  role?: UserRole
  status?: UserStatus
  avatar?: string
  bio?: string
  dateOfBirth?: string
  gender?: Gender
  preferences?: Partial<UserPreferences>
  metadata?: Record<string, any>
}

/**
 * User filter options
 */
export interface UserFilter {
  /** Search term */
  search?: string
  
  /** Filter by role */
  role?: UserRole | UserRole[]
  
  /** Filter by status */
  status?: UserStatus | UserStatus[]
  
  /** Filter by account type */
  accountType?: AccountType | AccountType[]
  
  /** Filter by verification status */
  verificationStatus?: VerificationStatus | VerificationStatus[]
  
  /** Filter by date range */
  dateFrom?: string
  dateTo?: string
  
  /** Filter by last login */
  lastLoginFrom?: string
  lastLoginTo?: string
  
  /** Filter by total orders */
  minOrders?: number
  maxOrders?: number
  
  /** Filter by total spent */
  minSpent?: number
  maxSpent?: number
  
  /** Filter by location */
  country?: string
  city?: string
  
  /** Pagination */
  page?: number
  limit?: number
  
  /** Sorting */
  sortBy?: 'createdAt' | 'name' | 'email' | 'lastLogin' | 'orders'
  sortOrder?: 'asc' | 'desc'
}

/**
 * User statistics (aggregated)
 */
export interface UserStatisticsAggregate {
  totalUsers: number
  activeUsers: number
  inactiveUsers: number
  blockedUsers: number
  pendingUsers: number
  
  byRole: Record<UserRole, number>
  byStatus: Record<UserStatus, number>
  byAccountType: Record<AccountType, number>
  
  newToday: number
  newThisWeek: number
  newThisMonth: number
  
  verifiedUsers: number
  unverifiedUsers: number
  
  totalOrders: number
  totalRevenue: number
  averageOrderValue: number
  
  topCountries: Array<{ country: string; count: number }>
  topCities: Array<{ city: string; count: number }>
}

/**
 * User API response
 */
export interface UserApiResponse {
  success: boolean
  user?: User
  users?: User[]
  error?: string
  message?: string
  total?: number
  page?: number
  totalPages?: number
  filters?: UserFilter
}

/**
 * Login request
 */
export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

/**
 * Login response
 */
export interface LoginResponse {
  success: boolean
  user?: User
  token?: string
  error?: string
  requiresTwoFactor?: boolean
}

/**
 * Register request
 */
export interface RegisterRequest {
  name: string
  email: string
  password: string
  passwordConfirmation: string
  phone?: string
  acceptTerms: boolean
}

/**
 * Register response
 */
export interface RegisterResponse {
  success: boolean
  user?: User
  token?: string
  error?: string
  message?: string
}

/**
 * Password reset request
 */
export interface PasswordResetRequest {
  email: string
}

/**
 * Password reset confirm request
 */
export interface PasswordResetConfirmRequest {
  token: string
  password: string
  passwordConfirmation: string
}

/**
 * Email verification request
 */
export interface EmailVerificationRequest {
  token: string
}

/**
 * Two-factor authentication setup
 */
export interface TwoFactorSetup {
  enabled: boolean
  secret?: string
  qrCode?: string
  recoveryCodes?: string[]
}

/**
 * Change password request
 */
export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  newPasswordConfirmation: string
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Get user display name
 */
export function getUserDisplayName(user: User): string {
  return user.name || user.email.split('@')[0]
}

/**
 * Get user initials
 */
export function getUserInitials(user: User): string {
  return user.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Check if user is admin
 */
export function isAdmin(user: User): boolean {
  return user.role === 'admin'
}

/**
 * Check if user is moderator
 */
export function isModerator(user: User): boolean {
  return user.role === 'moderator' || user.role === 'admin'
}

/**
 * Check if user is vendor
 */
export function isVendor(user: User): boolean {
  return user.role === 'vendor'
}

/**
 * Check if user is active
 */
export function isActive(user: User): boolean {
  return user.status === 'active'
}

/**
 * Check if user is verified
 */
export function isVerified(user: User): boolean {
  return user.verificationStatus === 'verified'
}

/**
 * Check if user can login
 */
export function canLogin(user: User): boolean {
  return user.status === 'active' && user.verificationStatus !== 'rejected'
}

/**
 * Get user role badge color
 */
export function getRoleColor(role: UserRole): string {
  const colors: Record<UserRole, string> = {
    admin: '#ef4444',      // Red
    moderator: '#f59e0b',   // Orange
    user: '#3b82f6',        // Blue
    vendor: '#10b981',      // Green
    guest: '#6b7280'        // Gray
  }
  return colors[role] || '#6b7280'
}

/**
 * Get user status badge color
 */
export function getStatusColor(status: UserStatus): string {
  const colors: Record<UserStatus, string> = {
    active: '#10b981',      // Green
    inactive: '#6b7280',    // Gray
    blocked: '#ef4444',     // Red
    pending: '#f59e0b',     // Orange
    deleted: '#6b7280'      // Gray
  }
  return colors[status] || '#6b7280'
}

/**
 * Format user join date
 */
export function formatJoinDate(user: User): string {
  return new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Calculate account age in days
 */
export function getAccountAge(user: User): number {
  const created = new Date(user.createdAt).getTime()
  const now = Date.now()
  const diff = now - created
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}