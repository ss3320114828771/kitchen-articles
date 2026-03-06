'use client'

import { useState, useEffect } from 'react'

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: 'admin' | 'user' | 'moderator' | null
  fallbackUrl?: string
}

export default function AuthGuard({ 
  children, 
  requiredRole = null,
  fallbackUrl = '/auth/login'
}: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  // Check authentication
  const checkAuth = () => {
    setIsLoading(true)
    
    try {
      // Check for auth token in localStorage
      const token = localStorage.getItem('token')
      const userStr = localStorage.getItem('user')
      
      if (token && userStr) {
        // Parse user data
        const user = JSON.parse(userStr)
        setIsAuthenticated(true)
        setUserRole(user.role || 'user')
      } else {
        // Check for session cookie (simplified)
        const hasSession = document.cookie.includes('next-auth.session-token')
        
        if (hasSession) {
          // Mock user for demo
          setIsAuthenticated(true)
          setUserRole('user')
        } else {
          setIsAuthenticated(false)
          setUserRole(null)
        }
      }
    } catch (error) {
      console.error('Auth check error:', error)
      setIsAuthenticated(false)
      setUserRole(null)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle redirect
  useEffect(() => {
    if (!isLoading && isAuthenticated === false) {
      // Store current path for redirect after login
      const currentPath = window.location.pathname
      sessionStorage.setItem('redirectAfterLogin', currentPath)
      
      // Redirect to login
      window.location.href = fallbackUrl
    }
    
    if (!isLoading && isAuthenticated && requiredRole) {
      // Check role requirement
      if (userRole !== requiredRole && userRole !== 'admin') {
        // Admin can access everything
        if (userRole !== 'admin') {
          // Redirect to unauthorized page or home
          window.location.href = '/'
        }
      }
    }
  }, [isLoading, isAuthenticated, userRole, requiredRole, fallbackUrl])

  // Show loading state
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a, #1e1b4b)'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '3px solid rgba(255,255,255,0.1)',
          borderTopColor: '#c084fc',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
    )
  }

  // Show nothing while redirecting
  if (isAuthenticated === false) {
    return null
  }

  // Check role access
  if (requiredRole && userRole !== requiredRole && userRole !== 'admin') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a, #1e1b4b)',
        padding: '1rem'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '1rem',
          padding: '3rem 2rem',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚫</div>
          <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            Access Denied
          </h2>
          <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>
            You don't have permission to access this page.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              padding: '0.75rem 2rem',
              background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
              border: 'none',
              borderRadius: '0.5rem',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Go to Home
          </button>
        </div>
      </div>
    )
  }

  // Render children if authenticated
  return <>{children}</>
}

// Higher-order component for protecting pages
export function withAuthGuard<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    requiredRole?: 'admin' | 'user' | 'moderator'
    fallbackUrl?: string
  }
) {
  return function ProtectedComponent(props: P) {
    return (
      <AuthGuard 
        requiredRole={options?.requiredRole || null} 
        fallbackUrl={options?.fallbackUrl || '/auth/login'}
      >
        <Component {...props} />
      </AuthGuard>
    )
  }
}

// Role-based guard components
export function AdminGuard({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requiredRole="admin" fallbackUrl="/dashboard">
      {children}
    </AuthGuard>
  )
}

export function UserGuard({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requiredRole="user" fallbackUrl="/auth/login">
      {children}
    </AuthGuard>
  )
}

export function ModeratorGuard({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requiredRole="moderator" fallbackUrl="/dashboard">
      {children}
    </AuthGuard>
  )
}