// ==================== CURRENCY FORMATTERS ====================

/**
 * Format currency
 * @param amount - Number to format
 * @param currency - Currency code (default: 'USD')
 * @param locale - Locale (default: 'en-US')
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

/**
 * Format currency with symbol only (no decimals for whole numbers)
 * @param amount - Number to format
 * @param currency - Currency code (default: 'USD')
 * @returns Formatted currency string
 */
export function formatCurrencySimple(amount: number, currency: string = 'USD'): string {
  const symbol = getCurrencySymbol(currency)
  const formatted = amount % 1 === 0 
    ? amount.toString() 
    : amount.toFixed(2)
  return `${symbol}${formatted}`
}

/**
 * Get currency symbol
 * @param currency - Currency code
 * @returns Currency symbol
 */
export function getCurrencySymbol(currency: string = 'USD'): string {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    PKR: 'Rs',
    INR: '₹',
    AED: 'د.إ',
    SAR: '﷼',
    CNY: '¥',
    AUD: 'A$',
    CAD: 'C$'
  }
  return symbols[currency] || '$'
}

/**
 * Format price range
 * @param min - Minimum price
 * @param max - Maximum price
 * @param currency - Currency code
 * @returns Formatted price range
 */
export function formatPriceRange(min: number, max: number, currency: string = 'USD'): string {
  return `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}`
}

/**
 * Format discount percentage
 * @param original - Original price
 * @param current - Current price
 * @returns Formatted discount string
 */
export function formatDiscount(original: number, current: number): string {
  const discount = ((original - current) / original) * 100
  return `-${Math.round(discount)}%`
}

// ==================== DATE FORMATTERS ====================

/**
 * Format date
 * @param date - Date string or Date object
 * @param format - Format style (short, medium, long, full)
 * @param locale - Locale
 * @returns Formatted date string
 */
export function formatDate(
  date: string | Date,
  format: 'short' | 'medium' | 'long' | 'full' = 'medium',
  locale: string = 'en-US'
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

  return d.toLocaleDateString(locale, options)
}

/**
 * Format time
 * @param date - Date string or Date object
 * @param format12h - Use 12-hour format (default: true)
 * @param locale - Locale
 * @returns Formatted time string
 */
export function formatTime(
  date: string | Date,
  format12h: boolean = true,
  locale: string = 'en-US'
): string {
  const d = typeof date === 'string' ? new Date(date) : date
  
  return d.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: format12h
  })
}

/**
 * Format datetime
 * @param date - Date string or Date object
 * @param format12h - Use 12-hour format
 * @param locale - Locale
 * @returns Formatted datetime string
 */
export function formatDateTime(
  date: string | Date,
  format12h: boolean = true,
  locale: string = 'en-US'
): string {
  return `${formatDate(date, 'medium', locale)} at ${formatTime(date, format12h, locale)}`
}

/**
 * Format relative time (e.g., "2 hours ago")
 * @param date - Date string or Date object
 * @param locale - Locale
 * @returns Relative time string
 */
export function formatRelativeTime(date: string | Date, locale: string = 'en-US'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)
  const diffMonth = Math.floor(diffDay / 30)
  const diffYear = Math.floor(diffDay / 365)

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  if (diffSec < 60) {
    return rtf.format(-diffSec, 'second')
  } else if (diffMin < 60) {
    return rtf.format(-diffMin, 'minute')
  } else if (diffHour < 24) {
    return rtf.format(-diffHour, 'hour')
  } else if (diffDay < 30) {
    return rtf.format(-diffDay, 'day')
  } else if (diffMonth < 12) {
    return rtf.format(-diffMonth, 'month')
  } else {
    return rtf.format(-diffYear, 'year')
  }
}

/**
 * Format date to ISO string (YYYY-MM-DD)
 * @param date - Date string or Date object
 * @returns ISO date string
 */
export function formatISODate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toISOString().split('T')[0]
}

/**
 * Get month name
 * @param month - Month number (0-11)
 * @param format - Format (short, long)
 * @returns Month name
 */
export function getMonthName(month: number, format: 'short' | 'long' = 'long'): string {
  const date = new Date()
  date.setMonth(month)
  return date.toLocaleString('en-US', { month: format })
}

/**
 * Get day name
 * @param day - Day number (0-6, 0 = Sunday)
 * @param format - Format (short, long)
 * @returns Day name
 */
export function getDayName(day: number, format: 'short' | 'long' = 'long'): string {
  const date = new Date()
  date.setDate(date.getDate() + (day - date.getDay()))
  return date.toLocaleString('en-US', { weekday: format })
}

// ==================== NUMBER FORMATTERS ====================

/**
 * Format number with commas
 * @param num - Number to format
 * @param locale - Locale
 * @returns Formatted number string
 */
export function formatNumber(num: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(num)
}

/**
 * Format decimal
 * @param num - Number to format
 * @param decimals - Number of decimal places
 * @returns Formatted decimal string
 */
export function formatDecimal(num: number, decimals: number = 2): string {
  return num.toFixed(decimals)
}

/**
 * Format percentage
 * @param value - Number to format (0.1 = 10%)
 * @param decimals - Number of decimal places
 * @returns Formatted percentage string
 */
export function formatPercent(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`
}

/**
 * Format number in compact form (e.g., 1K, 1M)
 * @param num - Number to format
 * @param locale - Locale
 * @returns Compact number string
 */
export function formatCompactNumber(num: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short'
  }).format(num)
}

/**
 * Format number with ordinal (1st, 2nd, 3rd)
 * @param num - Number
 * @returns Ordinal string
 */
export function formatOrdinal(num: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd']
  const v = num % 100
  return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0])
}

// ==================== FILE SIZE FORMATTERS ====================

/**
 * Format file size
 * @param bytes - Size in bytes
 * @param decimals - Number of decimal places
 * @returns Formatted file size string
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`
}

/**
 * Format file size in MB
 * @param bytes - Size in bytes
 * @returns Size in MB
 */
export function formatFileSizeMB(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

// ==================== PHONE FORMATTERS ====================

/**
 * Format phone number
 * @param phone - Phone number string
 * @param country - Country code (us, pk, uk)
 * @returns Formatted phone number
 */
export function formatPhone(phone: string, country: string = 'us'): string {
  const cleaned = phone.replace(/\D/g, '')
  
  const formats: Record<string, RegExp> = {
    us: /^(\d{3})(\d{3})(\d{4})$/,
    pk: /^(\d{3})(\d{3})(\d{4})$/,
    uk: /^(\d{4})(\d{3})(\d{4})$/
  }

  const patterns: Record<string, string> = {
    us: '($1) $2-$3',
    pk: '$1 $2 $3',
    uk: '$1 $2 $3'
  }

  const match = cleaned.match(formats[country] || formats.us)
  
  if (match) {
    return patterns[country].replace(/\$(\d+)/g, (_, n) => match[parseInt(n)])
  }

  return phone
}

/**
 * Format phone international
 * @param phone - Phone number
 * @param countryCode - Country code (e.g., '92' for Pakistan)
 * @returns International phone format
 */
export function formatPhoneInternational(phone: string, countryCode: string = '92'): string {
  const cleaned = phone.replace(/\D/g, '')
  return `+${countryCode} ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
}

// ==================== STRING FORMATTERS ====================

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
 * Format slug to title
 * @param slug - Slug string (e.g., 'hello-world')
 * @returns Title cased string
 */
export function formatSlugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Format camelCase to words
 * @param str - camelCase string
 * @returns Space separated words
 */
export function formatCamelCase(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, match => match.toUpperCase())
    .trim()
}

// ==================== ADDRESS FORMATTERS ====================

/**
 * Format address
 * @param address - Address object
 * @returns Formatted address string
 */
export function formatAddress(address: {
  street: string
  city: string
  state?: string
  postalCode: string
  country: string
  apartment?: string
}): string {
  const parts = [
    address.street,
    address.apartment,
    address.city,
    address.state,
    address.postalCode,
    address.country
  ].filter(Boolean)
  
  return parts.join(', ')
}

/**
 * Format short address
 * @param address - Address object
 * @returns Short address (city, country)
 */
export function formatShortAddress(address: {
  city: string
  country: string
}): string {
  return `${address.city}, ${address.country}`
}

// ==================== DURATION FORMATTERS ====================

/**
 * Format duration in seconds
 * @param seconds - Duration in seconds
 * @param format - Format type (short, long)
 * @returns Formatted duration
 */
export function formatDuration(seconds: number, format: 'short' | 'long' = 'short'): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (format === 'short') {
    const parts = []
    if (hours > 0) parts.push(`${hours}h`)
    if (minutes > 0) parts.push(`${minutes}m`)
    if (secs > 0 || parts.length === 0) parts.push(`${secs}s`)
    return parts.join(' ')
  }

  const parts = []
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? 's' : ''}`)
  if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`)
  if (secs > 0) parts.push(`${secs} second${secs > 1 ? 's' : ''}`)
  return parts.join(' ')
}

/**
 * Format minutes to hours and minutes
 * @param minutes - Total minutes
 * @returns Formatted string (e.g., "2h 30m")
 */
export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  
  if (hours === 0) return `${mins}m`
  if (mins === 0) return `${hours}h`
  return `${hours}h ${mins}m`
}

// ==================== DISTANCE FORMATTERS ====================

/**
 * Format distance
 * @param meters - Distance in meters
 * @param unit - Unit system (metric, imperial)
 * @returns Formatted distance
 */
export function formatDistance(meters: number, unit: 'metric' | 'imperial' = 'metric'): string {
  if (unit === 'metric') {
    if (meters < 1000) {
      return `${Math.round(meters)} m`
    }
    return `${(meters / 1000).toFixed(1)} km`
  } else {
    const feet = meters * 3.28084
    if (feet < 528) {
      return `${Math.round(feet)} ft`
    }
    return `${(feet / 5280).toFixed(1)} miles`
  }
}

// ==================== WEIGHT FORMATTERS ====================

/**
 * Format weight
 * @param kg - Weight in kilograms
 * @param unit - Unit system (metric, imperial)
 * @returns Formatted weight
 */
export function formatWeight(kg: number, unit: 'metric' | 'imperial' = 'metric'): string {
  if (unit === 'metric') {
    return `${kg.toFixed(1)} kg`
  } else {
    const lbs = kg * 2.20462
    return `${lbs.toFixed(1)} lbs`
  }
}

// ==================== TEMPERATURE FORMATTERS ====================

/**
 * Format temperature
 * @param celsius - Temperature in Celsius
 * @param unit - Unit (celsius, fahrenheit)
 * @returns Formatted temperature
 */
export function formatTemperature(celsius: number, unit: 'celsius' | 'fahrenheit' = 'celsius'): string {
  if (unit === 'celsius') {
    return `${Math.round(celsius)}°C`
  } else {
    const fahrenheit = (celsius * 9/5) + 32
    return `${Math.round(fahrenheit)}°F`
  }
}

// ==================== LIST FORMATTERS ====================

/**
 * Format list with commas and 'and'
 * @param items - Array of strings
 * @param oxford - Use Oxford comma (default: true)
 * @returns Formatted list
 */
export function formatList(items: string[], oxford: boolean = true): string {
  if (items.length === 0) return ''
  if (items.length === 1) return items[0]
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  
  const last = items.pop()
  const comma = oxford ? ',' : ''
  return `${items.join(', ')}${comma} and ${last}`
}

// ==================== BYTE SIZE FORMATTERS ====================

/**
 * Format bytes to human readable
 * @param bytes - Bytes
 * @param si - Use SI units (1000 instead of 1024)
 * @returns Formatted size
 */
export function formatBytes(bytes: number, si: boolean = false): string {
  const thresh = si ? 1000 : 1024
  
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B'
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
  
  let u = -1
  do {
    bytes /= thresh
    ++u
  } while (Math.abs(bytes) >= thresh && u < units.length - 1)

  return bytes.toFixed(1) + ' ' + units[u]
}