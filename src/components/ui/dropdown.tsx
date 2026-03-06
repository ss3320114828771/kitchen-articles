'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface DropdownItem {
  label: string
  value: string
  href?: string
  icon?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  divider?: boolean
}

interface DropdownProps {
  trigger: React.ReactNode
  items: DropdownItem[]
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
  width?: number | string
  className?: string
  style?: React.CSSProperties
  closeOnSelect?: boolean
  closeOnClickOutside?: boolean
}

export default function Dropdown({
  trigger,
  items,
  position = 'bottom-left',
  width = 200,
  className = '',
  style = {},
  closeOnSelect = true,
  closeOnClickOutside = true
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  // Position styles
  const positionStyles = {
    'bottom-left': { top: '100%', left: 0, marginTop: '0.5rem' },
    'bottom-right': { top: '100%', right: 0, marginTop: '0.5rem' },
    'top-left': { bottom: '100%', left: 0, marginBottom: '0.5rem' },
    'top-right': { bottom: '100%', right: 0, marginBottom: '0.5rem' }
  }

  // Handle click outside
  useEffect(() => {
    if (!closeOnClickOutside) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(e.target as Node) &&
        triggerRef.current && 
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [closeOnClickOutside])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < items.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        if (selectedIndex >= 0 && items[selectedIndex]) {
          handleItemClick(items[selectedIndex])
        }
        break
    }
  }

  // Handle item click
  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled) return

    if (item.onClick) {
      item.onClick()
    }

    if (item.href) {
      window.location.href = item.href
    }

    if (closeOnSelect) {
      setIsOpen(false)
    }
  }

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'inline-block',
        ...style
      }}
      onKeyDown={handleKeyDown}
    >
      {/* Trigger */}
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          cursor: 'pointer',
          display: 'inline-block'
        }}
      >
        {trigger}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute',
            zIndex: 1000,
            minWidth: width,
            background: '#1e1b4b',
            borderRadius: '0.75rem',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            overflow: 'hidden',
            ...positionStyles[position]
          }}
        >
          {/* Items */}
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {items.map((item, index) => (
              <div key={index}>
                {/* Divider */}
                {item.divider && (
                  <div style={{
                    height: '1px',
                    background: 'rgba(255,255,255,0.1)',
                    margin: '0.5rem 0'
                  }} />
                )}

                {/* Item */}
                {!item.divider && (
                  <button
                    onClick={() => handleItemClick(item)}
                    disabled={item.disabled}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      background: index === selectedIndex 
                        ? 'rgba(168,85,247,0.2)' 
                        : 'transparent',
                      border: 'none',
                      color: item.disabled ? '#6b7280' : 'white',
                      cursor: item.disabled ? 'not-allowed' : 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.2s',
                      opacity: item.disabled ? 0.5 : 1
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onMouseLeave={() => setSelectedIndex(-1)}
                  >
                    {item.icon && (
                      <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                    )}
                    <span style={{ flex: 1, fontSize: '0.875rem' }}>
                      {item.label}
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Simplified dropdown for common use cases
export function SimpleDropdown({
  options,
  value,
  onChange,
  placeholder = 'Select...'
}: {
  options: Array<{ label: string; value: string }>
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(
    options.find(opt => opt.value === value)
  )

  const handleSelect = (option: { label: string; value: string }) => {
    setSelected(option)
    setIsOpen(false)
    if (onChange) onChange(option.value)
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '0.75rem',
          background: '#f5f5f5',
          border: '1px solid #ddd',
          borderRadius: '0.5rem',
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <span>{selected?.label || placeholder}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '0.25rem',
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}>
          {options.map(option => (
            <button
              key={option.value}
              onClick={() => handleSelect(option)}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'transparent',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                borderBottom: '1px solid #eee'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f0f0f0'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Menu dropdown (for actions)
export function MenuDropdown({
  items,
  children
}: {
  items: DropdownItem[]
  children?: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={menuRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          padding: '0.5rem'
        }}
      >
        {children || '⋮'}
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: '100%',
          marginTop: '0.25rem',
          background: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          minWidth: '150px',
          zIndex: 1000
        }}>
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (item.onClick) item.onClick()
                setIsOpen(false)
              }}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                borderBottom: index < items.length - 1 ? '1px solid #eee' : 'none'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}