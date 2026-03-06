'use client'

import { useState, useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnClickOutside?: boolean
  closeOnEsc?: boolean
  showCloseButton?: boolean
  footer?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnClickOutside = true,
  closeOnEsc = true,
  showCloseButton = true,
  footer,
  className = '',
  style = {}
}: ModalProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  // Size mappings
  const sizeMap = {
    sm: { maxWidth: '400px' },
    md: { maxWidth: '500px' },
    lg: { maxWidth: '600px' },
    xl: { maxWidth: '800px' },
    full: { maxWidth: '95%', width: '95%' }
  }

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, closeOnEsc, onClose])

  // Handle animation
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen && !isAnimating) return null

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeOnClickOutside ? onClose : undefined}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 9998,
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.3s ease',
          cursor: closeOnClickOutside ? 'pointer' : 'default'
        }}
      />

      {/* Modal */}
      <div
        className={className}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${isOpen ? 1 : 0.9})`,
          width: '100%',
          ...sizeMap[size],
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
          borderRadius: '1.5rem',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          zIndex: 9999,
          opacity: isOpen ? 1 : 0,
          transition: 'all 0.3s ease',
          ...style
        }}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1.5rem',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {title && (
              <h3 style={{
                color: 'white',
                fontSize: '1.25rem',
                fontWeight: '600',
                margin: 0
              }}>
                {title}
              </h3>
            )}
            
            {showCloseButton && (
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: 'white',
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  fontSize: '1.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                }}
              >
                ✕
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div style={{ padding: '1.5rem' }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            style={{
              padding: '1.5rem',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '1rem'
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </>
  )
}

// Confirmation Modal
export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'danger'
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  confirmVariant?: 'primary' | 'danger' | 'success'
}) {
  const getConfirmColor = () => {
    switch (confirmVariant) {
      case 'danger': return '#ef4444'
      case 'success': return '#10b981'
      default: return '#3b82f6'
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <button
            onClick={onClose}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '0.5rem',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            style={{
              padding: '0.75rem 1.5rem',
              background: getConfirmColor(),
              border: 'none',
              borderRadius: '0.5rem',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            {confirmText}
          </button>
        </>
      }
    >
      <p style={{ color: '#d1d5db', margin: 0 }}>{message}</p>
    </Modal>
  )
}

// Alert Modal
export function AlertModal({
  isOpen,
  onClose,
  title = 'Alert',
  message,
  buttonText = 'OK'
}: {
  isOpen: boolean
  onClose: () => void
  title?: string
  message: string
  buttonText?: string
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <button
          onClick={onClose}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
            border: 'none',
            borderRadius: '0.5rem',
            color: 'white',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          {buttonText}
        </button>
      }
    >
      <p style={{ color: '#d1d5db', margin: 0 }}>{message}</p>
    </Modal>
  )
}

// Form Modal
export function FormModal({
  isOpen,
  onClose,
  title,
  onSubmit,
  children,
  submitText = 'Submit',
  cancelText = 'Cancel'
}: {
  isOpen: boolean
  onClose: () => void
  title?: string
  onSubmit: () => void
  children: React.ReactNode
  submitText?: string
  cancelText?: string
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
      footer={
        <>
          <button
            onClick={onClose}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '0.5rem',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={onSubmit}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              border: 'none',
              borderRadius: '0.5rem',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            {submitText}
          </button>
        </>
      }
    >
      {children}
    </Modal>
  )
}