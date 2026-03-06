'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  disabled?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  className?: string
  style?: React.CSSProperties
}

export default function Button({
  children,
  onClick,
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  style = {}
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Variant styles
  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
      color: 'white',
      border: 'none',
      hoverBackground: 'linear-gradient(135deg, #2563eb, #9333ea)',
      boxShadow: '0 4px 6px -1px rgba(59,130,246,0.3)'
    },
    secondary: {
      background: 'rgba(255,255,255,0.1)',
      color: 'white',
      border: '1px solid rgba(255,255,255,0.2)',
      hoverBackground: 'rgba(255,255,255,0.15)',
      boxShadow: 'none'
    },
    outline: {
      background: 'transparent',
      color: 'white',
      border: '2px solid rgba(255,255,255,0.3)',
      hoverBackground: 'rgba(255,255,255,0.05)',
      boxShadow: 'none'
    },
    ghost: {
      background: 'transparent',
      color: 'white',
      border: 'none',
      hoverBackground: 'rgba(255,255,255,0.05)',
      boxShadow: 'none'
    },
    danger: {
      background: '#ef4444',
      color: 'white',
      border: 'none',
      hoverBackground: '#dc2626',
      boxShadow: '0 4px 6px -1px rgba(239,68,68,0.3)'
    },
    success: {
      background: '#10b981',
      color: 'white',
      border: 'none',
      hoverBackground: '#059669',
      boxShadow: '0 4px 6px -1px rgba(16,185,129,0.3)'
    }
  }

  // Size styles
  const sizeStyles = {
    xs: { padding: '0.25rem 0.75rem', fontSize: '0.75rem', borderRadius: '0.375rem' },
    sm: { padding: '0.5rem 1rem', fontSize: '0.875rem', borderRadius: '0.5rem' },
    md: { padding: '0.75rem 1.5rem', fontSize: '1rem', borderRadius: '0.5rem' },
    lg: { padding: '1rem 2rem', fontSize: '1.125rem', borderRadius: '0.75rem' },
    xl: { padding: '1.25rem 2.5rem', fontSize: '1.25rem', borderRadius: '1rem' }
  }

  const currentVariant = variantStyles[variant]
  const currentSize = sizeStyles[size]

  // Button content
  const content = (
    <>
      {loading && (
        <span style={{
          width: '1em',
          height: '1em',
          border: '2px solid currentColor',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite',
          marginRight: iconPosition === 'left' ? '0.5rem' : 0,
          marginLeft: iconPosition === 'right' ? '0.5rem' : 0
        }} />
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span style={{ marginRight: '0.5rem', display: 'inline-flex' }}>{icon}</span>
      )}
      
      <span>{children}</span>
      
      {!loading && icon && iconPosition === 'right' && (
        <span style={{ marginLeft: '0.5rem', display: 'inline-flex' }}>{icon}</span>
      )}
    </>
  )

  // Common styles
  const commonStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: fullWidth ? '100%' : 'auto',
    cursor: (disabled || loading) ? 'not-allowed' : 'pointer',
    opacity: (disabled || loading) ? 0.6 : 1,
    transition: 'all 0.2s ease',
    fontWeight: '600',
    outline: 'none',
    ...currentSize,
    ...style
  }

  // If href is provided, render as Link
  if (href) {
    return (
      <Link
        href={href}
        style={{
          ...commonStyles,
          background: currentVariant.background,
          color: currentVariant.color,
          border: currentVariant.border,
          textDecoration: 'none',
          boxShadow: isHovered ? '0 8px 16px rgba(0,0,0,0.2)' : currentVariant.boxShadow,
          transform: isHovered ? 'translateY(-2px)' : 'none'
        }}
        onMouseEnter={() => !disabled && !loading && setIsHovered(true)}
        onMouseLeave={() => !disabled && !loading && setIsHovered(false)}
        className={className}
      >
        {content}
      </Link>
    )
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        ...commonStyles,
        background: isHovered ? currentVariant.hoverBackground : currentVariant.background,
        color: currentVariant.color,
        border: currentVariant.border,
        boxShadow: isHovered ? '0 8px 16px rgba(0,0,0,0.2)' : currentVariant.boxShadow,
        transform: isHovered ? 'translateY(-2px)' : 'none'
      }}
      onMouseEnter={() => !disabled && !loading && setIsHovered(true)}
      onMouseLeave={() => !disabled && !loading && setIsHovered(false)}
      className={className}
    >
      {content}
    </button>
  )
}

// Variant-specific buttons
export function PrimaryButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button {...props} variant="primary" />
}

export function SecondaryButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button {...props} variant="secondary" />
}

export function OutlineButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button {...props} variant="outline" />
}

export function GhostButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button {...props} variant="ghost" />
}

export function DangerButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button {...props} variant="danger" />
}

export function SuccessButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button {...props} variant="success" />
}

// Icon button (square)
export function IconButton({
  icon,
  onClick,
  href,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  loading = false,
  label
}: {
  icon: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  disabled?: boolean
  loading?: boolean
  label?: string
}) {
  const sizeMap = {
    xs: '2rem',
    sm: '2.5rem',
    md: '3rem',
    lg: '3.5rem',
    xl: '4rem'
  }

  return (
    <Button
      onClick={onClick}
      href={href}
      variant={variant}
      size={size}
      disabled={disabled}
      loading={loading}
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
        padding: 0,
        borderRadius: '50%'
      }}
      aria-label={label}
    >
      {icon}
    </Button>
  )
}