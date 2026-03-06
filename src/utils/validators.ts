// ==================== CORE VALIDATION FUNCTIONS ====================

/**
 * Check if value is present (not null, undefined, or empty string)
 */
export function isPresent(value: any): boolean {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'object') return Object.keys(value).length > 0
  return true
}

/**
 * Check if value is absent (null, undefined, or empty)
 */
export function isAbsent(value: any): boolean {
  return !isPresent(value)
}

// ==================== STRING VALIDATORS ====================

/**
 * Check if string is empty
 */
export function isEmptyString(value: string): boolean {
  return typeof value === 'string' && value.trim().length === 0
}

/**
 * Check minimum length
 */
export function minLength(value: string, min: number): boolean {
  return value.length >= min
}

/**
 * Check maximum length
 */
export function maxLength(value: string, max: number): boolean {
  return value.length <= max
}

/**
 * Check exact length
 */
export function exactLength(value: string, length: number): boolean {
  return value.length === length
}

/**
 * Check if string contains only letters
 */
export function isAlpha(value: string): boolean {
  return /^[A-Za-z]+$/.test(value)
}

/**
 * Check if string contains only letters and numbers
 */
export function isAlphanumeric(value: string): boolean {
  return /^[A-Za-z0-9]+$/.test(value)
}

/**
 * Check if string contains only numbers
 */
export function isNumeric(value: string): boolean {
  return /^[0-9]+$/.test(value)
}

/**
 * Check if string contains only lowercase
 */
export function isLowercase(value: string): boolean {
  return value === value.toLowerCase()
}

/**
 * Check if string contains only uppercase
 */
export function isUppercase(value: string): boolean {
  return value === value.toUpperCase()
}

/**
 * Check if string matches pattern
 */
export function matches(value: string, pattern: RegExp): boolean {
  return pattern.test(value)
}

// ==================== EMAIL VALIDATORS ====================

/**
 * Check if email is valid
 */
export function isEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}

/**
 * Check if email domain is valid
 */
export function hasValidEmailDomain(email: string, domains: string[]): boolean {
  const domain = email.split('@')[1]
  return domains.includes(domain)
}

/**
 * Check if email is disposable (temporary email)
 */
export function isDisposableEmail(email: string): boolean {
  const disposableDomains = [
    'tempmail.com', 'throwaway.com', 'mailinator.com',
    'guerrillamail.com', 'sharklasers.com', 'yopmail.com'
  ]
  const domain = email.split('@')[1]
  return disposableDomains.includes(domain)
}

// ==================== PHONE VALIDATORS ====================

/**
 * Check if phone number is valid (basic)
 */
export function isPhone(value: string): boolean {
  const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/
  return phoneRegex.test(value.replace(/\s/g, ''))
}

/**
 * Check if phone number is valid for specific country
 */
export function isPhoneForCountry(value: string, country: string): boolean {
  const cleaned = value.replace(/\D/g, '')
  
  const patterns: Record<string, RegExp> = {
    us: /^\d{10}$/,
    pk: /^\d{11}$/,
    uk: /^\d{10}$/,
    ca: /^\d{10}$/,
    au: /^\d{9}$/
  }
  
  return patterns[country]?.test(cleaned) || false
}

// ==================== URL VALIDATORS ====================

/**
 * Check if URL is valid
 */
export function isUrl(value: string): boolean {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

/**
 * Check if URL is secure (https)
 */
export function isHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Check if URL has valid domain
 */
export function hasValidDomain(url: string, domains: string[]): boolean {
  try {
    const urlObj = new URL(url)
    const hostname = urlObj.hostname.replace('www.', '')
    return domains.some(domain => hostname === domain)
  } catch {
    return false
  }
}

// ==================== NUMBER VALIDATORS ====================

/**
 * Check if value is a number
 */
export function isNumber(value: any): boolean {
  return typeof value === 'number' && !isNaN(value)
}

/**
 * Check if value is an integer
 */
export function isInteger(value: any): boolean {
  return Number.isInteger(Number(value))
}

/**
 * Check if value is positive
 */
export function isPositive(value: number): boolean {
  return value > 0
}

/**
 * Check if value is negative
 */
export function isNegative(value: number): boolean {
  return value < 0
}

/**
 * Check if value is between min and max
 */
export function isBetween(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

/**
 * Check if value is greater than min
 */
export function isGreaterThan(value: number, min: number): boolean {
  return value > min
}

/**
 * Check if value is less than max
 */
export function isLessThan(value: number, max: number): boolean {
  return value < max
}

/**
 * Check if value is divisible by divisor
 */
export function isDivisibleBy(value: number, divisor: number): boolean {
  return value % divisor === 0
}

// ==================== DATE VALIDATORS ====================

/**
 * Check if value is a valid date
 */
export function isDate(value: any): boolean {
  const date = new Date(value)
  return date instanceof Date && !isNaN(date.getTime())
}

/**
 * Check if date is in the past
 */
export function isPastDate(value: string | Date): boolean {
  const date = new Date(value)
  const now = new Date()
  return date < now
}

/**
 * Check if date is in the future
 */
export function isFutureDate(value: string | Date): boolean {
  const date = new Date(value)
  const now = new Date()
  return date > now
}

/**
 * Check if date is today
 */
export function isToday(value: string | Date): boolean {
  const date = new Date(value)
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

/**
 * Check if date is within range
 */
export function isDateBetween(
  value: string | Date,
  start: string | Date,
  end: string | Date
): boolean {
  const date = new Date(value)
  const startDate = new Date(start)
  const endDate = new Date(end)
  return date >= startDate && date <= endDate
}

/**
 * Check if date is valid format (YYYY-MM-DD)
 */
export function isValidDateFormat(value: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(value)) return false
  
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  
  return date.getFullYear() === year &&
         date.getMonth() === month - 1 &&
         date.getDate() === day
}

/**
 * Check if time is valid format (HH:MM)
 */
export function isValidTimeFormat(value: string): boolean {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
  return timeRegex.test(value)
}

// ==================== PASSWORD VALIDATORS ====================

/**
 * Check password strength
 */
export function isStrongPassword(password: string): boolean {
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /[0-9]/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)
  const hasMinLength = password.length >= 8
  
  return hasMinLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecial
}

/**
 * Get password strength score (0-5)
 */
export function getPasswordStrength(password: string): number {
  let score = 0
  
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  
  return score
}

/**
 * Get password strength label
 */
export function getPasswordStrengthLabel(score: number): string {
  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong']
  return labels[score] || 'Unknown'
}

/**
 * Check if passwords match
 */
export function passwordsMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword
}

// ==================== CREDIT CARD VALIDATORS ====================

/**
 * Check if credit card number is valid (Luhn algorithm)
 */
export function isValidCreditCard(value: string): boolean {
  const cleaned = value.replace(/\D/g, '')
  
  if (cleaned.length < 13 || cleaned.length > 19) return false
  
  let sum = 0
  let isEven = false
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10)
    
    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    
    sum += digit
    isEven = !isEven
  }
  
  return sum % 10 === 0
}

/**
 * Check credit card type
 */
export function getCreditCardType(value: string): string | null {
  const cleaned = value.replace(/\D/g, '')
  
  const patterns: Record<string, RegExp> = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/,
    diners: /^3(?:0[0-5]|[68])/,
    jcb: /^(?:2131|1800|35)/,
    unionpay: /^62/
  }
  
  for (const [card, pattern] of Object.entries(patterns)) {
    if (pattern.test(cleaned)) {
      return card
    }
  }
  
  return null
}

/**
 * Check if CVV is valid
 */
export function isValidCvv(cvv: string, cardType?: string): boolean {
  const cleaned = cvv.replace(/\D/g, '')
  
  if (cardType === 'amex') {
    return /^\d{4}$/.test(cleaned)
  }
  
  return /^\d{3,4}$/.test(cleaned)
}

/**
 * Check if expiry date is valid (MM/YY)
 */
export function isValidExpiry(value: string): boolean {
  const cleaned = value.replace(/\D/g, '')
  
  if (!/^\d{4}$/.test(cleaned)) return false
  
  const month = parseInt(cleaned.slice(0, 2), 10)
  const year = parseInt(cleaned.slice(2, 4), 10) + 2000
  
  if (month < 1 || month > 12) return false
  
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1
  
  return year > currentYear || (year === currentYear && month >= currentMonth)
}

// ==================== ID VALIDATORS ====================

/**
 * Check if ID is valid UUID
 */
export function isUuid(value: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(value)
}

/**
 * Check if ID is valid MongoDB ObjectId
 */
export function isObjectId(value: string): boolean {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/
  return objectIdRegex.test(value)
}

/**
 * Check if ID is valid CUID
 */
export function isCuid(value: string): boolean {
  const cuidRegex = /^c[a-z0-9]{24}$/
  return cuidRegex.test(value)
}

// ==================== COUNTRY SPECIFIC VALIDATORS ====================

/**
 * Check if US ZIP code is valid
 */
export function isValidUsZip(value: string): boolean {
  const cleaned = value.replace(/\s/g, '')
  return /^\d{5}(-\d{4})?$/.test(cleaned)
}

/**
 * Check if Canadian postal code is valid
 */
export function isValidCaPostal(value: string): boolean {
  const cleaned = value.replace(/\s/g, '').toUpperCase()
  return /^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(cleaned)
}

/**
 * Check if UK postcode is valid
 */
export function isValidUkPostcode(value: string): boolean {
  const cleaned = value.replace(/\s/g, '').toUpperCase()
  return /^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/.test(cleaned)
}

/**
 * Check if Pakistani postal code is valid
 */
export function isValidPkPostal(value: string): boolean {
  const cleaned = value.replace(/\s/g, '')
  return /^\d{5}$/.test(cleaned)
}

// ==================== FILE VALIDATORS ====================

/**
 * Check if file is image
 */
export function isImage(file: File): boolean {
  return file.type.startsWith('image/')
}

/**
 * Check if file is video
 */
export function isVideo(file: File): boolean {
  return file.type.startsWith('video/')
}

/**
 * Check if file is audio
 */
export function isAudio(file: File): boolean {
  return file.type.startsWith('audio/')
}

/**
 * Check if file is PDF
 */
export function isPdf(file: File): boolean {
  return file.type === 'application/pdf'
}

/**
 * Check file size (max MB)
 */
export function isFileSizeValid(file: File, maxMb: number): boolean {
  const maxBytes = maxMb * 1024 * 1024
  return file.size <= maxBytes
}

/**
 * Check file type
 */
export function isFileTypeValid(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type)
}

/**
 * Check file extension
 */
export function hasValidExtension(file: File, extensions: string[]): boolean {
  const ext = '.' + file.name.split('.').pop()?.toLowerCase()
  return extensions.includes(ext)
}

// ==================== BOOLEAN VALIDATORS ====================

/**
 * Check if value is boolean
 */
export function isBoolean(value: any): boolean {
  return typeof value === 'boolean'
}

/**
 * Check if value is true
 */
export function isTrue(value: boolean): boolean {
  return value === true
}

/**
 * Check if value is false
 */
export function isFalse(value: boolean): boolean {
  return value === false
}

// ==================== ARRAY VALIDATORS ====================

/**
 * Check if value is array
 */
export function isArray(value: any): boolean {
  return Array.isArray(value)
}

/**
 * Check if array is empty
 */
export function isEmptyArray(value: any[]): boolean {
  return value.length === 0
}

/**
 * Check if array contains value
 */
export function arrayContains<T>(array: T[], value: T): boolean {
  return array.includes(value)
}

/**
 * Check if array has minimum length
 */
export function arrayMinLength(array: any[], min: number): boolean {
  return array.length >= min
}

/**
 * Check if array has maximum length
 */
export function arrayMaxLength(array: any[], max: number): boolean {
  return array.length <= max
}

// ==================== OBJECT VALIDATORS ====================

/**
 * Check if value is object
 */
export function isObject(value: any): boolean {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

/**
 * Check if object is empty
 */
export function isEmptyObject(value: object): boolean {
  return Object.keys(value).length === 0
}

/**
 * Check if object has key
 */
export function objectHasKey(obj: object, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

/**
 * Check if object has all keys
 */
export function objectHasKeys(obj: object, keys: string[]): boolean {
  return keys.every(key => Object.prototype.hasOwnProperty.call(obj, key))
}

// ==================== COMPOSITE VALIDATORS ====================

/**
 * Validate multiple fields
 */
export function validateAll(validations: boolean[]): boolean {
  return validations.every(Boolean)
}

/**
 * Validate at least one field
 */
export function validateAny(validations: boolean[]): boolean {
  return validations.some(Boolean)
}

/**
 * Create validation result object
 */
export function createValidationResult(
  valid: boolean,
  errors: Record<string, string> = {}
): { valid: boolean; errors: Record<string, string> } {
  return { valid, errors }
}

/**
 * Merge validation results
 */
export function mergeValidationResults(
  ...results: Array<{ valid: boolean; errors: Record<string, string> }>
): { valid: boolean; errors: Record<string, string> } {
  const valid = results.every(r => r.valid)
  const errors = results.reduce((acc, r) => ({ ...acc, ...r.errors }), {})
  return { valid, errors }
}

// ==================== COMMON VALIDATION SCHEMAS ====================

/**
 * Email validation schema
 */
export const emailSchema = {
  required: (value: string) => isPresent(value) || 'Email is required',
  valid: (value: string) => isEmail(value) || 'Please enter a valid email address'
}

/**
 * Password validation schema
 */
export const passwordSchema = {
  required: (value: string) => isPresent(value) || 'Password is required',
  minLength: (value: string) => minLength(value, 8) || 'Password must be at least 8 characters',
  strength: (value: string) => isStrongPassword(value) || 
    'Password must contain uppercase, lowercase, number and special character'
}

/**
 * Phone validation schema
 */
export const phoneSchema = {
  required: (value: string) => isPresent(value) || 'Phone number is required',
  valid: (value: string) => isPhone(value) || 'Please enter a valid phone number'
}

/**
 * Name validation schema
 */
export const nameSchema = {
  required: (value: string) => isPresent(value) || 'Name is required',
  minLength: (value: string) => minLength(value, 2) || 'Name must be at least 2 characters',
  maxLength: (value: string) => maxLength(value, 50) || 'Name must not exceed 50 characters'
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Get validation error message
 */
export function getValidationError(
  value: any,
  validators: Array<(val: any) => boolean | string>
): string | null {
  for (const validator of validators) {
    const result = validator(value)
    if (typeof result === 'string') {
      return result
    }
    if (result === false) {
      return 'Validation failed'
    }
  }
  return null
}

/**
 * Create validator function
 */
export function createValidator<T>(
  rules: Array<(val: T) => boolean | string>
): (val: T) => { valid: boolean; message?: string } {
  return (value: T) => {
    for (const rule of rules) {
      const result = rule(value)
      if (typeof result === 'string') {
        return { valid: false, message: result }
      }
      if (result === false) {
        return { valid: false, message: 'Validation failed' }
      }
    }
    return { valid: true }
  }
}