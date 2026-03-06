'use client'

import { useState } from 'react'

interface GradientTextProps {
  children: React.ReactNode
  from?: string
  to?: string
  via?: string
  direction?: 'to-right' | 'to-left' | 'to-bottom' | 'to-top' | 'to-bottom-right' | 'to-bottom-left' | 'to-top-right' | 'to-top-left'
  animation?: 'pulse' | 'shine' | 'none' | 'rainbow'
  duration?: number
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
  align?: 'left' | 'center' | 'right'
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  className?: string
  style?: React.CSSProperties
}

export default function GradientText({
  children,
  from = '#60a5fa',
  to = '#c084fc',
  via,
  direction = 'to-right',
  animation = 'none',
  duration = 3,
  weight = 'bold',
  size = 'md',
  align = 'left',
  as: Component = 'span',
  className = '',
  style = {}
}: GradientTextProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Direction styles
  const directionStyles = {
    'to-right': 'to right',
    'to-left': 'to left',
    'to-bottom': 'to bottom',
    'to-top': 'to top',
    'to-bottom-right': 'to bottom right',
    'to-bottom-left': 'to bottom left',
    'to-top-right': 'to top right',
    'to-top-left': 'to top left'
  }

  // Build gradient string
  const getGradient = () => {
    const dir = directionStyles[direction]
    if (via) {
      return `linear-gradient(${dir}, ${from}, ${via}, ${to})`
    }
    return `linear-gradient(${dir}, ${from}, ${to})`
  }

  // Animation styles
  const getAnimationStyle = () => {
    switch (animation) {
      case 'pulse':
        return {
          animation: `gradientPulse ${duration}s ease-in-out infinite`,
          backgroundSize: '200% 200%'
        }
      case 'shine':
        return {
          animation: `gradientShine ${duration}s linear infinite`,
          backgroundSize: '200% 200%'
        }
      case 'rainbow':
        return {
          animation: `gradientRainbow ${duration}s linear infinite`,
          backgroundSize: '300% 300%'
        }
      default:
        return {}
    }
  }

  // Size styles
  const sizeStyles = {
    xs: { fontSize: '0.75rem' },
    sm: { fontSize: '0.875rem' },
    md: { fontSize: '1rem' },
    lg: { fontSize: '1.125rem' },
    xl: { fontSize: '1.25rem' },
    '2xl': { fontSize: '1.5rem' },
    '3xl': { fontSize: '1.875rem' },
    '4xl': { fontSize: '2.25rem' },
    '5xl': { fontSize: '3rem' },
    '6xl': { fontSize: '3.75rem' }
  }

  // Weight styles
  const weightStyles = {
    normal: { fontWeight: 400 },
    medium: { fontWeight: 500 },
    semibold: { fontWeight: 600 },
    bold: { fontWeight: 700 },
    extrabold: { fontWeight: 800 }
  }

  // Combined styles
  const combinedStyles: React.CSSProperties = {
    background: getGradient(),
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
    display: 'inline-block',
    textAlign: align,
    transition: 'all 0.3s ease',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    ...sizeStyles[size],
    ...weightStyles[weight],
    ...getAnimationStyle(),
    ...style
  }

  return (
    <Component
      className={className}
      style={combinedStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Component>
  )
}

// Pre-configured variants
export function PurpleGradient({ children, ...props }: GradientTextProps) {
  return (
    <GradientText from="#a855f7" to="#d946ef" {...props}>
      {children}
    </GradientText>
  )
}

export function BlueGradient({ children, ...props }: GradientTextProps) {
  return (
    <GradientText from="#3b82f6" to="#60a5fa" {...props}>
      {children}
    </GradientText>
  )
}

export function GreenGradient({ children, ...props }: GradientTextProps) {
  return (
    <GradientText from="#10b981" to="#34d399" {...props}>
      {children}
    </GradientText>
  )
}

export function SunsetGradient({ children, ...props }: GradientTextProps) {
  return (
    <GradientText from="#f97316" to="#ec4899" via="#f43f5e" {...props}>
      {children}
    </GradientText>
  )
}

export function OceanGradient({ children, ...props }: GradientTextProps) {
  return (
    <GradientText from="#06b6d4" to="#3b82f6" via="#8b5cf6" {...props}>
      {children}
    </GradientText>
  )
}

export function FireGradient({ children, ...props }: GradientTextProps) {
  return (
    <GradientText from="#ef4444" to="#f97316" via="#f59e0b" {...props}>
      {children}
    </GradientText>
  )
}

export function ForestGradient({ children, ...props }: GradientTextProps) {
  return (
    <GradientText from="#059669" to="#10b981" via="#34d399" {...props}>
      {children}
    </GradientText>
  )
}

export function RoyalGradient({ children, ...props }: GradientTextProps) {
  return (
    <GradientText from="#4f46e5" to="#c084fc" via="#a855f7" {...props}>
      {children}
    </GradientText>
  )
}

// Animated gradient with rainbow effect
export function RainbowGradient({ children, ...props }: GradientTextProps) {
  return (
    <GradientText
      from="#ef4444"
      to="#8b5cf6"
      via="#10b981"
      animation="rainbow"
      duration={5}
      {...props}
    >
      {children}
    </GradientText>
  )
}

// Heading components
export function GradientH1({ children, ...props }: GradientTextProps) {
  return (
    <GradientText as="h1" size="6xl" weight="bold" {...props}>
      {children}
    </GradientText>
  )
}

export function GradientH2({ children, ...props }: GradientTextProps) {
  return (
    <GradientText as="h2" size="4xl" weight="bold" {...props}>
      {children}
    </GradientText>
  )
}

export function GradientH3({ children, ...props }: GradientTextProps) {
  return (
    <GradientText as="h3" size="2xl" weight="semibold" {...props}>
      {children}
    </GradientText>
  )
}

export function GradientTitle({ children, ...props }: GradientTextProps) {
  return (
    <GradientText size="xl" weight="bold" {...props}>
      {children}
    </GradientText>
  )
}