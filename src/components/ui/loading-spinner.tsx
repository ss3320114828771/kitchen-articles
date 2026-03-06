'use client'

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  variant?: 'circle' | 'dots' | 'pulse' | 'bars' | 'spinner'
  text?: string
  fullScreen?: boolean
  overlay?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function LoadingSpinner({
  size = 'md',
  color = '#c084fc',
  variant = 'circle',
  text,
  fullScreen = false,
  overlay = false,
  className = '',
  style = {}
}: LoadingSpinnerProps) {
  // Size mappings
  const sizeMap = {
    xs: { container: '1.5rem', icon: '1rem', text: '0.75rem' },
    sm: { container: '2rem', icon: '1.25rem', text: '0.875rem' },
    md: { container: '3rem', icon: '1.5rem', text: '1rem' },
    lg: { container: '4rem', icon: '2rem', text: '1.125rem' },
    xl: { container: '5rem', icon: '2.5rem', text: '1.25rem' }
  }

  const sizes = sizeMap[size]

  // Circle spinner
  const CircleSpinner = () => (
    <div
      style={{
        width: sizes.container,
        height: sizes.container,
        border: `3px solid rgba(255,255,255,0.1)`,
        borderTopColor: color,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}
    />
  )

  // Dots spinner
  const DotsSpinner = () => (
    <div style={{ display: 'flex', gap: '0.25rem' }}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            width: `calc(${sizes.container} / 3)`,
            height: `calc(${sizes.container} / 3)`,
            background: color,
            borderRadius: '50%',
            animation: `bounce 1.4s infinite ${i * 0.2}s`
          }}
        />
      ))}
    </div>
  )

  // Pulse spinner
  const PulseSpinner = () => (
    <div
      style={{
        width: sizes.container,
        height: sizes.container,
        background: color,
        borderRadius: '50%',
        animation: 'pulse 1.5s ease-in-out infinite'
      }}
    />
  )

  // Bars spinner
  const BarsSpinner = () => (
    <div style={{ display: 'flex', gap: '0.25rem', height: sizes.container }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          style={{
            width: `calc(${sizes.container} / 5)`,
            height: '100%',
            background: color,
            borderRadius: '2px',
            animation: `barWave 1.2s ease-in-out infinite ${i * 0.1}s`
          }}
        />
      ))}
    </div>
  )

  // Spinner (classic)
  const SpinnerIcon = () => (
    <svg
      width={sizes.container}
      height={sizes.container}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ animation: 'spin 1s linear infinite' }}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M22 12C22 17.5228 17.5228 22 12 22"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )

  // Render appropriate spinner
  const renderSpinner = () => {
    switch (variant) {
      case 'dots': return <DotsSpinner />
      case 'pulse': return <PulseSpinner />
      case 'bars': return <BarsSpinner />
      case 'spinner': return <SpinnerIcon />
      default: return <CircleSpinner />
    }
  }

  // Spinner content
  const content = (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        ...style
      }}
    >
      {renderSpinner()}
      {text && (
        <p style={{
          color: '#9ca3af',
          fontSize: sizes.text,
          margin: 0
        }}>
          {text}
        </p>
      )}
    </div>
  )

  // Full screen with overlay
  if (fullScreen) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: overlay ? 'rgba(0,0,0,0.7)' : 'transparent',
          backdropFilter: overlay ? 'blur(4px)' : 'none',
          zIndex: 9999
        }}
      >
        {content}
      </div>
    )
  }

  return content
}

// Pre-configured spinners
export function CircleSpinner(props: Omit<LoadingSpinnerProps, 'variant'>) {
  return <LoadingSpinner variant="circle" {...props} />
}

export function DotsSpinner(props: Omit<LoadingSpinnerProps, 'variant'>) {
  return <LoadingSpinner variant="dots" {...props} />
}

export function PulseSpinner(props: Omit<LoadingSpinnerProps, 'variant'>) {
  return <LoadingSpinner variant="pulse" {...props} />
}

export function BarsSpinner(props: Omit<LoadingSpinnerProps, 'variant'>) {
  return <LoadingSpinner variant="bars" {...props} />
}

// Page loader (full screen)
export function PageLoader({ text = 'Loading...' }: { text?: string }) {
  return (
    <LoadingSpinner
      size="lg"
      text={text}
      fullScreen
      overlay
    />
  )
}

// Section loader
export function SectionLoader({ text = 'Loading...' }: { text?: string }) {
  return (
    <div style={{
      minHeight: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <LoadingSpinner size="md" text={text} />
    </div>
  )
}

// Button loader (inline)
export function ButtonLoader({ size = 'sm' }: { size?: LoadingSpinnerProps['size'] }) {
  return (
    <LoadingSpinner
      size={size}
      variant="circle"
      style={{ display: 'inline-block', marginRight: '0.5rem' }}
    />
  )
}

// CSS Styles - moved outside component
const styles = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.7; }
  }

  @keyframes barWave {
    0%, 100% { transform: scaleY(0.5); }
    50% { transform: scaleY(1); }
  }
`

// Add styles to document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.innerHTML = styles
  document.head.appendChild(styleElement)
}