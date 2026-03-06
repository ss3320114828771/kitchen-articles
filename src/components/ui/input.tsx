'use client'

import { useState } from 'react'

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time'
  label?: string
  placeholder?: string
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  success?: string
  disabled?: boolean
  required?: boolean
  readOnly?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  helperText?: string
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  className?: string
  style?: React.CSSProperties
  name?: string
  id?: string
  min?: number
  max?: number
  step?: number
  pattern?: string
  autoFocus?: boolean
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export default function Input({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  success,
  disabled = false,
  required = false,
  readOnly = false,
  icon,
  iconPosition = 'left',
  helperText,
  size = 'md',
  fullWidth = false,
  className = '',
  style = {},
  name,
  id,
  min,
  max,
  step,
  pattern,
  autoFocus = false,
  onBlur,
  onFocus
}: InputProps) {
  const [focused, setFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Size styles
  const sizeStyles = {
    sm: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
    md: { padding: '0.75rem 1.25rem', fontSize: '1rem' },
    lg: { padding: '1rem 1.5rem', fontSize: '1.125rem' }
  }

  // Status styles
  const getStatusStyles = () => {
    if (error) {
      return {
        borderColor: '#ef4444',
        boxShadow: '0 0 0 1px #ef4444'
      }
    }
    if (success) {
      return {
        borderColor: '#10b981',
        boxShadow: '0 0 0 1px #10b981'
      }
    }
    if (focused) {
      return {
        borderColor: '#c084fc',
        boxShadow: '0 0 0 2px rgba(192,132,252,0.2)'
      }
    }
    return {
      borderColor: 'rgba(255,255,255,0.2)'
    }
  }

  // Padding based on icon
  const getPadding = () => {
    const basePadding = sizeStyles[size].padding
    if (icon && iconPosition === 'left') {
      return {
        paddingLeft: `calc(${sizeStyles[size].padding} * 2.5)`
      }
    }
    if (icon && iconPosition === 'right') {
      return {
        paddingRight: `calc(${sizeStyles[size].padding} * 2.5)`
      }
    }
    return {}
  }

  // Input type (for password toggle)
  const inputType = type === 'password' 
    ? (showPassword ? 'text' : 'password')
    : type

  return (
    <div
      className={className}
      style={{
        width: fullWidth ? '100%' : 'auto',
        ...style
      }}
    >
      {/* Label */}
      {label && (
        <label
          htmlFor={id || name}
          style={{
            display: 'block',
            color: '#d1d5db',
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}
        >
          {label}
          {required && <span style={{ color: '#ef4444', marginLeft: '0.25rem' }}>*</span>}
        </label>
      )}

      {/* Input Container */}
      <div style={{ position: 'relative' }}>
        {/* Left Icon */}
        {icon && iconPosition === 'left' && (
          <span
            style={{
              position: 'absolute',
              left: sizeStyles[size].padding,
              top: '50%',
              transform: 'translateY(-50%)',
              color: error ? '#ef4444' : focused ? '#c084fc' : '#9ca3af',
              transition: 'color 0.2s',
              pointerEvents: 'none',
              zIndex: 1
            }}
          >
            {icon}
          </span>
        )}

        {/* Input */}
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={(e) => {
            setFocused(true)
            if (onFocus) onFocus(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            if (onBlur) onBlur(e)
          }}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          name={name}
          id={id || name}
          min={min}
          max={max}
          step={step}
          pattern={pattern}
          autoFocus={autoFocus}
          style={{
            width: '100%',
            background: disabled 
              ? 'rgba(255,255,255,0.05)' 
              : 'rgba(255,255,255,0.1)',
            border: '1px solid',
            borderRadius: '0.75rem',
            color: disabled ? '#6b7280' : 'white',
            outline: 'none',
            transition: 'all 0.2s',
            cursor: disabled ? 'not-allowed' : 'text',
            opacity: disabled ? 0.6 : 1,
            ...sizeStyles[size],
            ...getPadding(),
            ...getStatusStyles()
          }}
        />

        {/* Right Icon */}
        {icon && iconPosition === 'right' && !(type === 'password') && (
          <span
            style={{
              position: 'absolute',
              right: sizeStyles[size].padding,
              top: '50%',
              transform: 'translateY(-50%)',
              color: error ? '#ef4444' : focused ? '#c084fc' : '#9ca3af',
              transition: 'color 0.2s',
              pointerEvents: 'none',
              zIndex: 1
            }}
          >
            {icon}
          </span>
        )}

        {/* Password Toggle */}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: sizeStyles[size].padding,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
              fontSize: '1.25rem',
              padding: 0,
              zIndex: 1
            }}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
      </div>

      {/* Error/Success/Helper Text */}
      {(error || success || helperText) && (
        <p
          style={{
            marginTop: '0.5rem',
            fontSize: '0.75rem',
            color: error 
              ? '#ef4444' 
              : success 
              ? '#10b981' 
              : '#9ca3af',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}
        >
          {error && <span>⚠️</span>}
          {success && <span>✓</span>}
          {error || success || helperText}
        </p>
      )}
    </div>
  )
}

// Pre-configured input types
export function EmailInput(props: Omit<InputProps, 'type'>) {
  return <Input type="email" {...props} />
}

export function PasswordInput(props: Omit<InputProps, 'type'>) {
  return <Input type="password" {...props} />
}

export function SearchInput(props: Omit<InputProps, 'type' | 'icon'>) {
  return <Input type="search" icon="🔍" iconPosition="left" {...props} />
}

export function NumberInput(props: Omit<InputProps, 'type'>) {
  return <Input type="number" {...props} />
}

export function PhoneInput(props: Omit<InputProps, 'type'>) {
  return <Input type="tel" {...props} />
}

// Form field with label and error handling
export function FormField({
  label,
  error,
  required,
  children
}: {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{
        display: 'block',
        color: '#d1d5db',
        marginBottom: '0.5rem',
        fontSize: '0.875rem'
      }}>
        {label}
        {required && <span style={{ color: '#ef4444', marginLeft: '0.25rem' }}>*</span>}
      </label>
      {children}
      {error && (
        <p style={{
          color: '#ef4444',
          fontSize: '0.75rem',
          marginTop: '0.25rem'
        }}>
          {error}
        </p>
      )}
    </div>
  )
}