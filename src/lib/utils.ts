// Utility functions for the entire application

// ==================== FORMATTING FUNCTIONS ====================

/**
 * Format currency
 * @param amount - Number to format
 * @param currency - Currency code (default: 'USD')
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

/**
 * Format date
 * @param date - Date string or Date object
 * @param format - Format style (default: 'medium')
 * @returns Formatted date string
 */
export function formatDate(
  date: string | Date,
  format: 'short' | 'medium' | 'long' | 'full' = 'medium'
): string {
  const d = typeof date === 'string' ? new Date(date) : date
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: format === 'short' ? 'numeric' : 'long',
    day: 'numeric'
  }

  if (format === 'full') {
    options.weekday = 'long'
  }

  return d.toLocaleDateString('en-US', options)
}

/**
 * Format time
 * @param date - Date string or Date object
 * @returns Formatted time string
 */
export function formatTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Format datetime
 * @param date - Date string or Date object
 * @returns Formatted datetime string
 */
export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return `${formatDate(d)} at ${formatTime(d)}`
}

/**
 * Format number with commas
 * @param num - Number to format
 * @returns Formatted number string
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

/**
 * Format percentage
 * @param value - Number to format as percentage
 * @param decimals - Number of decimal places
 * @returns Formatted percentage string
 */
export function formatPercent(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`
}

/**
 * Format file size
 * @param bytes - Size in bytes
 * @returns Formatted file size string
 */
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let size = bytes
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`
}

/**
 * Format phone number
 * @param phone - Phone number string
 * @returns Formatted phone number
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return phone
}

// ==================== STRING FUNCTIONS ====================

/**
 * Capitalize first letter
 * @param str - Input string
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Capitalize each word
 * @param str - Input string
 * @returns Title cased string
 */
export function titleCase(str: string): string {
  if (!str) return ''
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Truncate text
 * @param text - Text to truncate
 * @param length - Maximum length
 * @param suffix - Suffix to add (default: '...')
 * @returns Truncated text
 */
export function truncate(text: string, length: number, suffix: string = '...'): string {
  if (text.length <= length) return text
  return text.substring(0, length) + suffix
}

/**
 * Generate slug from string
 * @param text - Input text
 * @returns URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/**
 * Generate random string
 * @param length - Length of random string
 * @returns Random string
 */
export function randomString(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// ==================== VALIDATION FUNCTIONS ====================

/**
 * Check if email is valid
 * @param email - Email to validate
 * @returns Boolean
 */
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

/**
 * Check if phone is valid
 * @param phone - Phone to validate
 * @returns Boolean
 */
export function isValidPhone(phone: string): boolean {
  const re = /^[\d\s\+\-\(\)]{10,}$/
  return re.test(phone)
}

/**
 * Check if URL is valid
 * @param url - URL to validate
 * @returns Boolean
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Check password strength
 * @param password - Password to check
 * @returns Object with strength info
 */
export function checkPasswordStrength(password: string): {
  score: number
  message: string
  isStrong: boolean
} {
  let score = 0
  const messages = []

  if (password.length >= 8) {
    score++
  } else {
    messages.push('At least 8 characters')
  }

  if (/[A-Z]/.test(password)) {
    score++
  } else {
    messages.push('One uppercase letter')
  }

  if (/[a-z]/.test(password)) {
    score++
  } else {
    messages.push('One lowercase letter')
  }

  if (/[0-9]/.test(password)) {
    score++
  } else {
    messages.push('One number')
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score++
  } else {
    messages.push('One special character')
  }

  const strengthMap = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong']
  
  return {
    score,
    message: messages.length > 0 ? `Missing: ${messages.join(', ')}` : strengthMap[score],
    isStrong: score >= 4
  }
}

// ==================== ARRAY FUNCTIONS ====================

/**
 * Group array by key
 * @param array - Array to group
 * @param key - Key to group by
 * @returns Grouped object
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key])
    if (!result[groupKey]) {
      result[groupKey] = []
    }
    result[groupKey].push(item)
    return result
  }, {} as Record<string, T[]>)
}

/**
 * Sort array by key
 * @param array - Array to sort
 * @param key - Key to sort by
 * @param order - Sort order ('asc' or 'desc')
 * @returns Sorted array
 */
export function sortBy<T>(
  array: T[],
  key: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1
    if (aVal > bVal) return order === 'asc' ? 1 : -1
    return 0
  })
}

/**
 * Unique array
 * @param array - Array to process
 * @returns Array with unique values
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)]
}

/**
 * Chunk array
 * @param array - Array to chunk
 * @param size - Chunk size
 * @returns Array of chunks
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

// ==================== MATH FUNCTIONS ====================

/**
 * Calculate percentage
 * @param value - Current value
 * @param total - Total value
 * @returns Percentage
 */
export function percentage(value: number, total: number): number {
  if (total === 0) return 0
  return (value / total) * 100
}

/**
 * Calculate discount percentage
 * @param original - Original price
 * @param current - Current price
 * @returns Discount percentage
 */
export function discountPercentage(original: number, current: number): number {
  if (original === 0) return 0
  return ((original - current) / original) * 100
}

/**
 * Calculate average
 * @param numbers - Array of numbers
 * @returns Average
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0
  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length
}

/**
 * Calculate sum
 * @param numbers - Array of numbers
 * @returns Sum
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0)
}

// ==================== STORAGE FUNCTIONS ====================

/**
 * Save to localStorage
 * @param key - Storage key
 * @param value - Value to save
 */
export function setStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

/**
 * Get from localStorage
 * @param key - Storage key
 * @param defaultValue - Default value if not found
 * @returns Stored value or default
 */
export function getStorage<T>(key: string, defaultValue: T | null = null): T | null {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return defaultValue
  }
}

/**
 * Remove from localStorage
 * @param key - Storage key
 */
export function removeStorage(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Error removing from localStorage:', error)
  }
}

/**
 * Clear localStorage
 */
export function clearStorage(): void {
  try {
    localStorage.clear()
  } catch (error) {
    console.error('Error clearing localStorage:', error)
  }
}

// ==================== COOKIE FUNCTIONS ====================

/**
 * Set cookie
 * @param name - Cookie name
 * @param value - Cookie value
 * @param days - Expiry in days
 */
export function setCookie(name: string, value: string, days: number = 7): void {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`
}

/**
 * Get cookie
 * @param name - Cookie name
 * @returns Cookie value or null
 */
export function getCookie(name: string): string | null {
  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=')
    if (cookieName === name) {
      return cookieValue
    }
  }
  return null
}

/**
 * Delete cookie
 * @param name - Cookie name
 */
export function deleteCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

// ==================== MISC FUNCTIONS ====================

/**
 * Debounce function
 * @param fn - Function to debounce
 * @param delay - Delay in ms
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Throttle function
 * @param fn - Function to throttle
 * @param limit - Limit in ms
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Deep clone object
 * @param obj - Object to clone
 * @returns Cloned object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Check if object is empty
 * @param obj - Object to check
 * @returns Boolean
 */
export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0
}

/**
 * Generate unique ID
 * @returns Unique ID string
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

/**
 * Sleep for ms
 * @param ms - Milliseconds to sleep
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}