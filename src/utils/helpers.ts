// ==================== TYPE CHECKING HELPERS ====================

/**
 * Check if value is null or undefined
 */
export function isNil(value: any): boolean {
  return value === null || value === undefined
}

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 */
export function isEmpty(value: any): boolean {
  if (isNil(value)) return true
  if (typeof value === 'string') return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * Check if value is a string
 */
export function isString(value: any): boolean {
  return typeof value === 'string'
}

/**
 * Check if value is a number
 */
export function isNumber(value: any): boolean {
  return typeof value === 'number' && !isNaN(value)
}

/**
 * Check if value is a boolean
 */
export function isBoolean(value: any): boolean {
  return typeof value === 'boolean'
}

/**
 * Check if value is an array
 */
export function isArray(value: any): boolean {
  return Array.isArray(value)
}

/**
 * Check if value is an object (not null, not array)
 */
export function isObject(value: any): boolean {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

/**
 * Check if value is a function
 */
export function isFunction(value: any): boolean {
  return typeof value === 'function'
}

/**
 * Check if value is a date
 */
export function isDate(value: any): boolean {
  return value instanceof Date && !isNaN(value.getTime())
}

/**
 * Check if value is a promise
 */
export function isPromise(value: any): boolean {
  return value && typeof value.then === 'function'
}

// ==================== STRING HELPERS ====================

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

/**
 * Generate random number string
 * @param length - Length of random number
 * @returns Random number string
 */
export function randomNumber(length: number = 6): string {
  const chars = '0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Generate UUID v4
 * @returns UUID string
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
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
 * Remove accents/diacritics from string
 * @param str - Input string
 * @returns Normalized string
 */
export function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

/**
 * Escape HTML special characters
 * @param html - HTML string
 * @returns Escaped string
 */
export function escapeHtml(html: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return html.replace(/[&<>"']/g, (m) => map[m])
}

/**
 * Unescape HTML special characters
 * @param text - Escaped text
 * @returns Unescaped string
 */
export function unescapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'"
  }
  return text.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, (m) => map[m])
}

/**
 * Truncate text at word boundary
 * @param text - Text to truncate
 * @param limit - Character limit
 * @param suffix - Suffix to add
 * @returns Truncated text
 */
export function truncateWords(text: string, limit: number, suffix: string = '...'): string {
  if (text.length <= limit) return text
  
  const truncated = text.slice(0, limit)
  const lastSpace = truncated.lastIndexOf(' ')
  
  if (lastSpace === -1) return truncated + suffix
  return truncated.slice(0, lastSpace) + suffix
}

/**
 * Extract initials from name
 * @param name - Full name
 * @param max - Maximum initials
 * @returns Initials
 */
export function getInitials(name: string, max: number = 2): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, max)
}

// ==================== NUMBER HELPERS ====================

/**
 * Clamp number between min and max
 * @param num - Number to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped number
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max)
}

/**
 * Map number from one range to another
 * @param num - Number to map
 * @param inMin - Input range min
 * @param inMax - Input range max
 * @param outMin - Output range min
 * @param outMax - Output range max
 * @returns Mapped number
 */
export function mapRange(
  num: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

/**
 * Round to specific decimal places
 * @param num - Number to round
 * @param decimals - Decimal places
 * @returns Rounded number
 */
export function round(num: number, decimals: number = 0): number {
  const factor = Math.pow(10, decimals)
  return Math.round(num * factor) / factor
}

/**
 * Generate random number between min and max
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random number
 */
export function random(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

/**
 * Generate random integer between min and max
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns Random integer
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

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

// ==================== ARRAY HELPERS ====================

/**
 * Chunk array into smaller arrays
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

/**
 * Remove duplicates from array
 * @param array - Array with duplicates
 * @returns Unique array
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)]
}

/**
 * Shuffle array randomly
 * @param array - Array to shuffle
 * @returns Shuffled array
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

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
 * Get first element of array
 * @param array - Input array
 * @returns First element or undefined
 */
export function first<T>(array: T[]): T | undefined {
  return array[0]
}

/**
 * Get last element of array
 * @param array - Input array
 * @returns Last element or undefined
 */
export function last<T>(array: T[]): T | undefined {
  return array[array.length - 1]
}

/**
 * Check if array contains value
 * @param array - Input array
 * @param value - Value to check
 * @returns Boolean
 */
export function contains<T>(array: T[], value: T): boolean {
  return array.includes(value)
}

// ==================== OBJECT HELPERS ====================

/**
 * Pick specific keys from object
 * @param obj - Source object
 * @param keys - Keys to pick
 * @returns New object with picked keys
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  return keys.reduce((result, key) => {
    if (key in obj) {
      result[key] = obj[key]
    }
    return result
  }, {} as Pick<T, K>)
}

/**
 * Omit specific keys from object
 * @param obj - Source object
 * @param keys - Keys to omit
 * @returns New object without omitted keys
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj }
  keys.forEach(key => delete result[key])
  return result
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
 * Merge objects deeply
 * @param target - Target object
 * @param sources - Source objects
 * @returns Merged object
 */
export function deepMerge(target: any, ...sources: any[]): any {
  if (!sources.length) return target
  
  const source = sources.shift()
  
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        deepMerge(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }
  
  return deepMerge(target, ...sources)
}

/**
 * Get nested object value safely
 * @param obj - Object to get from
 * @param path - Path string (e.g., 'user.address.city')
 * @param defaultValue - Default value if not found
 * @returns Value or default
 */
export function get<T = any>(
  obj: any,
  path: string,
  defaultValue?: T
): T | undefined {
  const keys = path.split('.')
  let result = obj
  
  for (const key of keys) {
    if (result === null || result === undefined) {
      return defaultValue
    }
    result = result[key]
  }
  
  return (result === undefined ? defaultValue : result) as T
}

/**
 * Check if object has key
 * @param obj - Object to check
 * @param key - Key to check
 * @returns Boolean
 */
export function hasKey(obj: object, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

// ==================== FUNCTION HELPERS ====================

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
 * Memoize function results
 * @param fn - Function to memoize
 * @returns Memoized function
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map()
  
  return ((...args: any[]) => {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }
    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

/**
 * Once function (executes only once)
 * @param fn - Function to execute once
 * @returns Function that executes only once
 */
export function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false
  let result: ReturnType<T>
  
  return ((...args: Parameters<T>) => {
    if (!called) {
      called = true
      result = fn(...args)
    }
    return result
  }) as T
}

// ==================== ASYNC HELPERS ====================

/**
 * Sleep for ms
 * @param ms - Milliseconds to sleep
 * @returns Promise
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Retry function with delay
 * @param fn - Async function to retry
 * @param retries - Number of retries
 * @param delay - Delay between retries
 * @returns Promise with result
 */
export async function retry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    if (retries <= 0) throw error
    await sleep(delay)
    return retry(fn, retries - 1, delay * 2)
  }
}

/**
 * Timeout promise
 * @param promise - Promise to timeout
 * @param ms - Timeout in ms
 * @param error - Error message
 * @returns Promise with timeout
 */
export async function timeout<T>(
  promise: Promise<T>,
  ms: number,
  error: string = 'Operation timed out'
): Promise<T> {
  let timeoutId: NodeJS.Timeout
  
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(error)), ms)
  })
  
  return Promise.race([promise, timeoutPromise]).finally(() => {
    clearTimeout(timeoutId)
  })
}

// ==================== URL HELPERS ====================

/**
 * Get query params from URL
 * @param url - URL string
 * @returns Query params object
 */
export function getQueryParams(url: string): Record<string, string> {
  const params: Record<string, string> = {}
  const searchParams = new URL(url).searchParams
  
  for (const [key, value] of searchParams) {
    params[key] = value
  }
  
  return params
}

/**
 * Build query string from object
 * @param params - Object with params
 * @returns Query string
 */
export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams()
  
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value))
    }
  }
  
  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}

/**
 * Add query params to URL
 * @param url - Base URL
 * @param params - Params to add
 * @returns URL with params
 */
export function addQueryParams(url: string, params: Record<string, any>): string {
  const urlObj = new URL(url)
  
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      urlObj.searchParams.set(key, String(value))
    }
  }
  
  return urlObj.toString()
}

// ==================== COLOR HELPERS ====================

/**
 * Convert hex to RGB
 * @param hex - Hex color (e.g., '#ff0000')
 * @returns RGB object
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

/**
 * Convert RGB to hex
 * @param r - Red (0-255)
 * @param g - Green (0-255)
 * @param b - Blue (0-255)
 * @returns Hex color
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
}

/**
 * Lighten color
 * @param color - Hex color
 * @param percent - Percent to lighten (0-100)
 * @returns Lightened color
 */
export function lighten(color: string, percent: number): string {
  const rgb = hexToRgb(color)
  if (!rgb) return color
  
  const { r, g, b } = rgb
  const amount = Math.round(2.55 * percent)
  
  return rgbToHex(
    Math.min(255, r + amount),
    Math.min(255, g + amount),
    Math.min(255, b + amount)
  )
}

/**
 * Darken color
 * @param color - Hex color
 * @param percent - Percent to darken (0-100)
 * @returns Darkened color
 */
export function darken(color: string, percent: number): string {
  const rgb = hexToRgb(color)
  if (!rgb) return color
  
  const { r, g, b } = rgb
  const amount = Math.round(2.55 * percent)
  
  return rgbToHex(
    Math.max(0, r - amount),
    Math.max(0, g - amount),
    Math.max(0, b - amount)
  )
}

// ==================== BROWSER HELPERS ====================

/**
 * Check if running in browser
 */
export const isBrowser = typeof window !== 'undefined'

/**
 * Check if running on server
 */
export const isServer = !isBrowser

/**
 * Copy text to clipboard
 * @param text - Text to copy
 * @returns Promise
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!isBrowser) return false
  
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy:', err)
    return false
  }
}

/**
 * Download file
 * @param content - File content
 * @param filename - File name
 * @param type - MIME type
 */
export function downloadFile(content: string, filename: string, type: string = 'text/plain'): void {
  if (!isBrowser) return
  
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

/**
 * Open URL in new tab
 * @param url - URL to open
 */
export function openInNewTab(url: string): void {
  if (!isBrowser) return
  window.open(url, '_blank', 'noopener,noreferrer')
}

/**
 * Scroll to element
 * @param element - Element or selector
 * @param options - Scroll options
 */
export function scrollToElement(
  element: HTMLElement | string,
  options?: ScrollIntoViewOptions
): void {
  if (!isBrowser) return
  
  const el = typeof element === 'string'
    ? document.querySelector(element)
    : element
    
  if (el) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      ...options
    })
  }
}

/**
 * Get scroll position
 * @returns Scroll position
 */
export function getScrollPosition(): { x: number; y: number } {
  if (!isBrowser) return { x: 0, y: 0 }
  
  return {
    x: window.scrollX || window.pageXOffset,
    y: window.scrollY || window.pageYOffset
  }
}

/**
 * Check if element is in viewport
 * @param element - Element to check
 * @returns Boolean
 */
export function isInViewport(element: HTMLElement): boolean {
  if (!isBrowser) return false
  
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  )
}