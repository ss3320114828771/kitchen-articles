'use client'

import { useState } from 'react'

interface GlowingBorderProps {
  children: React.ReactNode
  color?: string
  intensity?: 'low' | 'medium' | 'high'
  animation?: 'pulse' | 'rotate' | 'none'
  borderRadius?: string | number
  padding?: string | number
  hoverEffect?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function GlowingBorder({
  children,
  color = '#c084fc',
  intensity = 'medium',
  animation = 'pulse',
  borderRadius = '1rem',
  padding = '1px',
  hoverEffect = true,
  className = '',
  style = {}
}: GlowingBorderProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Intensity values
  const intensityValues = {
    low: {
      blur: '4px',
      spread: '1px',
      opacity: 0.3
    },
    medium: {
      blur: '8px',
      spread: '2px',
      opacity: 0.5
    },
    high: {
      blur: '16px',
      spread: '4px',
      opacity: 0.8
    }
  }

  const int = intensityValues[intensity]

  // Animation styles
  const getAnimationStyle = () => {
    switch (animation) {
      case 'pulse':
        return {
          animation: 'glowPulse 2s ease-in-out infinite'
        }
      case 'rotate':
        return {
          animation: 'glowRotate 3s linear infinite'
        }
      default:
        return {}
    }
  }

  // Base glow style
  const glowStyle: React.CSSProperties = {
    position: 'relative',
    borderRadius,
    padding,
    display: 'inline-block',
    ...style
  }

  // Inner content style
  const contentStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 2,
    borderRadius,
    overflow: 'hidden'
  }

  // Glow effect style
  const effectStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius,
    boxShadow: `0 0 ${int.blur} ${int.spread} ${color}`,
    opacity: (hoverEffect && !isHovered) ? 0 : int.opacity,
    transition: 'opacity 0.3s ease',
    zIndex: 1,
    ...getAnimationStyle()
  }

  // Multiple layers for stronger effect
  const secondLayerStyle: React.CSSProperties = {
    ...effectStyle,
    boxShadow: `0 0 ${parseInt(int.blur) * 2}px ${parseInt(int.spread) * 2}px ${color}`,
    opacity: ((hoverEffect && !isHovered) ? 0 : int.opacity) * 0.5
  }

  return (
    <div
      className={className}
      style={glowStyle}
      onMouseEnter={() => hoverEffect && setIsHovered(true)}
      onMouseLeave={() => hoverEffect && setIsHovered(false)}
    >
      {/* Glow layers */}
      <div style={effectStyle} />
      <div style={secondLayerStyle} />
      
      {/* Content */}
      <div style={contentStyle}>
        {children}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes glowPulse {
          0%, 100% {
            opacity: ${int.opacity};
            box-shadow: 0 0 ${int.blur} ${int.spread} ${color};
          }
          50% {
            opacity: ${int.opacity * 1.5};
            box-shadow: 0 0 ${parseInt(int.blur) * 1.5}px ${parseInt(int.spread) * 1.5}px ${color};
          }
        }

        @keyframes glowRotate {
          0% {
            transform: rotate(0deg);
            box-shadow: 0 0 ${int.blur} ${int.spread} ${color};
          }
          25% {
            box-shadow: 2px 2px ${int.blur} ${int.spread} ${color};
          }
          50% {
            box-shadow: 0 0 ${int.blur} ${int.spread} ${color};
          }
          75% {
            box-shadow: -2px -2px ${int.blur} ${int.spread} ${color};
          }
          100% {
            transform: rotate(360deg);
            box-shadow: 0 0 ${int.blur} ${int.spread} ${color};
          }
        }
      `}</style>
    </div>
  )
}

// Pre-configured variants
export function PurpleGlow({ children, ...props }: GlowingBorderProps) {
  return (
    <GlowingBorder color="#c084fc" {...props}>
      {children}
    </GlowingBorder>
  )
}

export function BlueGlow({ children, ...props }: GlowingBorderProps) {
  return (
    <GlowingBorder color="#3b82f6" {...props}>
      {children}
    </GlowingBorder>
  )
}

export function GreenGlow({ children, ...props }: GlowingBorderProps) {
  return (
    <GlowingBorder color="#10b981" {...props}>
      {children}
    </GlowingBorder>
  )
}

export function RedGlow({ children, ...props }: GlowingBorderProps) {
  return (
    <GlowingBorder color="#ef4444" {...props}>
      {children}
    </GlowingBorder>
  )
}

export function YellowGlow({ children, ...props }: GlowingBorderProps) {
  return (
    <GlowingBorder color="#f59e0b" {...props}>
      {children}
    </GlowingBorder>
  )
}

export function PinkGlow({ children, ...props }: GlowingBorderProps) {
  return (
    <GlowingBorder color="#ec4899" {...props}>
      {children}
    </GlowingBorder>
  )
}

// Rainbow variant (cycles through colors)
export function RainbowGlow({ children, ...props }: GlowingBorderProps) {
  return (
    <GlowingBorder 
      color="#c084fc" 
      animation="rotate"
      {...props}
    >
      {children}
      <style>{`
        @keyframes rainbow {
          0% { box-shadow: 0 0 8px 2px #c084fc; }
          20% { box-shadow: 0 0 8px 2px #3b82f6; }
          40% { box-shadow: 0 0 8px 2px #10b981; }
          60% { box-shadow: 0 0 8px 2px #f59e0b; }
          80% { box-shadow: 0 0 8px 2px #ec4899; }
          100% { box-shadow: 0 0 8px 2px #c084fc; }
        }
        .rainbow-glow {
          animation: rainbow 5s linear infinite;
        }
      `}</style>
    </GlowingBorder>
  )
}

// Text with glow
export function GlowingText({
  children,
  color = '#c084fc',
  intensity = 'medium'
}: {
  children: React.ReactNode
  color?: string
  intensity?: 'low' | 'medium' | 'high'
}) {
  const intensityValues = {
    low: { blur: '4px' },
    medium: { blur: '8px' },
    high: { blur: '16px' }
  }

  return (
    <span
      style={{
        color: 'white',
        textShadow: `0 0 ${intensityValues[intensity].blur} ${color}`,
        animation: 'glowPulse 2s ease-in-out infinite'
      }}
    >
      {children}
    </span>
  )
}