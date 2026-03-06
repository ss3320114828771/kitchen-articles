// Validation rules and schemas for the entire application

// ==================== TYPE DEFINITIONS ====================

export type ValidationRule<T = any> = {
  validate: (value: T) => boolean
  message: string
}

export type ValidationSchema<T> = {
  [K in keyof T]?: ValidationRule<T[K]>[]
}

export type ValidationResult = {
  valid: boolean
  errors: Record<string, string>
}

// ==================== COMMON VALIDATION RULES ====================

// Required field
export const required = (fieldName: string = 'This field'): ValidationRule => ({
  validate: (value: any) => {
    if (value === null || value === undefined) return false
    if (typeof value === 'string') return value.trim().length > 0
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'object') return Object.keys(value).length > 0
    return true
  },
  message: `${fieldName} is required`
})

// Minimum length
export const minLength = (min: number, fieldName: string = 'This field'): ValidationRule => ({
  validate: (value: string) => value.length >= min,
  message: `${fieldName} must be at least ${min} characters`
})

// Maximum length
export const maxLength = (max: number, fieldName: string = 'This field'): ValidationRule => ({
  validate: (value: string) => value.length <= max,
  message: `${fieldName} must not exceed ${max} characters`
})

// Exact length
export const exactLength = (len: number, fieldName: string = 'This field'): ValidationRule => ({
  validate: (value: string) => value.length === len,
  message: `${fieldName} must be exactly ${len} characters`
})

// Email validation
export const email: ValidationRule = {
  validate: (value: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(value)
  },
  message: 'Please enter a valid email address'
}

// Phone number validation
export const phone: ValidationRule = {
  validate: (value: string) => {
    const re = /^[\d\s\+\-\(\)]{10,}$/
    return re.test(value.replace(/\s/g, ''))
  },
  message: 'Please enter a valid phone number'
}

// URL validation
export const url: ValidationRule = {
  validate: (value: string) => {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  },
  message: 'Please enter a valid URL'
}

// Number validation
export const isNumber: ValidationRule = {
  validate: (value: any) => !isNaN(parseFloat(value)) && isFinite(value),
  message: 'Please enter a valid number'
}

// Integer validation
export const isInteger: ValidationRule = {
  validate: (value: any) => Number.isInteger(Number(value)),
  message: 'Please enter a whole number'
}

// Positive number
export const isPositive: ValidationRule = {
  validate: (value: number) => value > 0,
  message: 'Value must be greater than 0'
}

// Negative number
export const isNegative: ValidationRule = {
  validate: (value: number) => value < 0,
  message: 'Value must be less than 0'
}

// Minimum value
export const minValue = (min: number, fieldName: string = 'Value'): ValidationRule => ({
  validate: (value: number) => value >= min,
  message: `${fieldName} must be at least ${min}`
})

// Maximum value
export const maxValue = (max: number, fieldName: string = 'Value'): ValidationRule => ({
  validate: (value: number) => value <= max,
  message: `${fieldName} must not exceed ${max}`
})

// Between values
export const between = (min: number, max: number, fieldName: string = 'Value'): ValidationRule => ({
  validate: (value: number) => value >= min && value <= max,
  message: `${fieldName} must be between ${min} and ${max}`
})

// Password strength
export const strongPassword: ValidationRule = {
  validate: (value: string) => {
    const hasUpperCase = /[A-Z]/.test(value)
    const hasLowerCase = /[a-z]/.test(value)
    const hasNumbers = /[0-9]/.test(value)
    const hasSpecial = /[^A-Za-z0-9]/.test(value)
    return value.length >= 8 && hasUpperCase && hasLowerCase && hasNumbers && hasSpecial
  },
  message: 'Password must be at least 8 characters with uppercase, lowercase, number and special character'
}

// Password match
export const passwordMatch = (password: string): ValidationRule => ({
  validate: (value: string) => value === password,
  message: 'Passwords do not match'
})

// Alpha only (letters only)
export const alpha: ValidationRule = {
  validate: (value: string) => /^[A-Za-z]+$/.test(value),
  message: 'Only letters are allowed'
}

// Alpha numeric (letters and numbers)
export const alphaNumeric: ValidationRule = {
  validate: (value: string) => /^[A-Za-z0-9]+$/.test(value),
  message: 'Only letters and numbers are allowed'
}

// Alpha numeric with spaces
export const alphaNumericSpace: ValidationRule = {
  validate: (value: string) => /^[A-Za-z0-9\s]+$/.test(value),
  message: 'Only letters, numbers and spaces are allowed'
}

// Postal code (ZIP code)
export const postalCode: ValidationRule = {
  validate: (value: string) => /^\d{5}(-\d{4})?$/.test(value),
  message: 'Please enter a valid postal code (e.g., 12345 or 12345-6789)'
}

// Credit card number
export const creditCard: ValidationRule = {
  validate: (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    return cleaned.length >= 13 && cleaned.length <= 19
  },
  message: 'Please enter a valid credit card number'
}

// CVV
export const cvv: ValidationRule = {
  validate: (value: string) => /^\d{3,4}$/.test(value),
  message: 'Please enter a valid CVV (3 or 4 digits)'
}

// Date validation (YYYY-MM-DD)
export const dateFormat: ValidationRule = {
  validate: (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value),
  message: 'Please enter a valid date in YYYY-MM-DD format'
}

// Time validation (HH:MM)
export const timeFormat: ValidationRule = {
  validate: (value: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(value),
  message: 'Please enter a valid time in HH:MM format (24-hour)'
}

// Boolean check
export const isTrue: ValidationRule = {
  validate: (value: boolean) => value === true,
  message: 'This must be checked'
}

// Array not empty
export const arrayNotEmpty: ValidationRule = {
  validate: (value: any[]) => value.length > 0,
  message: 'Please select at least one item'
}

// File size
export const maxFileSize = (maxMB: number): ValidationRule => ({
  validate: (file: File) => file.size <= maxMB * 1024 * 1024,
  message: `File size must not exceed ${maxMB}MB`
})

// File type
export const fileType = (types: string[]): ValidationRule => ({
  validate: (file: File) => types.includes(file.type),
  message: `File type must be: ${types.join(', ')}`
})

// ==================== VALIDATION FUNCTIONS ====================

/**
 * Validate a single value against rules
 * @param value - Value to validate
 * @param rules - Array of validation rules
 * @returns Validation result
 */
export function validateField<T>(
  value: T,
  rules: ValidationRule<T>[]
): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  for (const rule of rules) {
    if (!rule.validate(value)) {
      errors.push(rule.message)
    }
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Validate an object against a schema
 * @param data - Object to validate
 * @param schema - Validation schema
 * @returns Validation result with all errors
 */
export function validateSchema<T extends object>(
  data: T,
  schema: ValidationSchema<T>
): ValidationResult {
  const errors: Record<string, string> = {}

  for (const field in schema) {
    const rules = schema[field]
    if (!rules) continue

    const value = data[field]
    
    for (const rule of rules) {
      if (!rule.validate(value)) {
        errors[field] = rule.message
        break // Stop at first error for this field
      }
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Create a validator function for a schema
 * @param schema - Validation schema
 * @returns Validator function
 */
export function createValidator<T extends object>(
  schema: ValidationSchema<T>
): (data: T) => ValidationResult {
  return (data: T) => validateSchema(data, schema)
}

// ==================== COMMON SCHEMAS ====================

// Login form schema
export const loginSchema: ValidationSchema<{
  email: string
  password: string
}> = {
  email: [required('Email'), email],
  password: [required('Password'), minLength(6, 'Password')]
}

// Register form schema
export const registerSchema: ValidationSchema<{
  name: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}> = {
  name: [required('Name'), minLength(2, 'Name'), maxLength(50, 'Name')],
  email: [required('Email'), email],
  password: [required('Password'), strongPassword],
  confirmPassword: [required('Confirm Password')],
  terms: [isTrue]
}

// Profile form schema
export const profileSchema: ValidationSchema<{
  name: string
  email: string
  phone: string
  bio?: string
}> = {
  name: [required('Name'), minLength(2, 'Name'), maxLength(50, 'Name')],
  email: [required('Email'), email],
  phone: [required('Phone'), phone]
}

// Product form schema
export const productSchema: ValidationSchema<{
  name: string
  price: number
  category: string
  stock: number
  description?: string
}> = {
  name: [required('Product name'), minLength(3, 'Product name'), maxLength(100, 'Product name')],
  price: [required('Price'), isNumber, isPositive, minValue(0.01, 'Price')],
  category: [required('Category')],
  stock: [required('Stock'), isInteger, isPositive, minValue(0, 'Stock')]
}

// Address form schema
export const addressSchema: ValidationSchema<{
  street: string
  city: string
  country: string
  postalCode: string
}> = {
  street: [required('Street address'), minLength(5, 'Street address')],
  city: [required('City'), minLength(2, 'City')],
  country: [required('Country')],
  postalCode: [required('Postal code')]
}

// Payment form schema
export const paymentSchema: ValidationSchema<{
  cardNumber: string
  expiry: string
  cvv: string
  name: string
}> = {
  cardNumber: [required('Card number'), creditCard],
  expiry: [required('Expiry date'), dateFormat],
  cvv: [required('CVV'), cvv],
  name: [required('Name on card'), minLength(3, 'Name')]
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Check if string is empty
 * @param str - String to check
 * @returns Boolean
 */
export function isEmptyString(str: string): boolean {
  return !str || str.trim().length === 0
}

/**
 * Check if email is valid (simple)
 * @param email - Email to check
 * @returns Boolean
 */
export function isValidEmailSimple(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Check if phone is valid (simple)
 * @param phone - Phone to check
 * @returns Boolean
 */
export function isValidPhoneSimple(phone: string): boolean {
  return /^[\d\s\+\-\(\)]{10,}$/.test(phone.replace(/\s/g, ''))
}

/**
 * Check if URL is valid (simple)
 * @param url - URL to check
 * @returns Boolean
 */
export function isValidUrlSimple(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://')
}

/**
 * Get validation error message
 * @param field - Field name
 * @param errors - Errors object
 * @returns Error message or null
 */
export function getFieldError(field: string, errors: Record<string, string>): string | null {
  return errors[field] || null
}

/**
 * Clear field error
 * @param field - Field name
 * @param errors - Errors object
 * @returns Updated errors object
 */
export function clearFieldError(field: string, errors: Record<string, string>): Record<string, string> {
  const newErrors = { ...errors }
  delete newErrors[field]
  return newErrors
}