'use client'

import { createContext, useContext, useEffect, useState } from 'react'

// Types
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'moderator'
  avatar?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  updateUser: (data: Partial<User>) => void
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo
const mockUsers = [
  {
    id: '1',
    name: 'Hafiz Sajid Syed',
    email: 'hafizsajidsyed@gmail.com',
    password: 'Hafiz@123456',
    role: 'admin' as const,
    avatar: 'HS'
  },
  {
    id: '2',
    name: 'Demo User',
    email: 'user@demo.com',
    password: 'Demo@123456',
    role: 'user' as const,
    avatar: 'DU'
  },
  {
    id: '3',
    name: 'Moderator User',
    email: 'mod@demo.com',
    password: 'Mod@123456',
    role: 'moderator' as const,
    avatar: 'MU'
  }
]

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = () => {
    setLoading(true)
    try {
      // Check localStorage for saved user
      const savedUser = localStorage.getItem('user')
      const token = localStorage.getItem('token')

      if (savedUser && token) {
        setUser(JSON.parse(savedUser))
      } else {
        // Check for cookie (simplified)
        const hasCookie = document.cookie.includes('next-auth.session-token')
        if (hasCookie) {
          // Mock user for demo
          setUser(mockUsers[0])
        }
      }
    } catch (error) {
      console.error('Session check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    try {
      // Find user
      const found = mockUsers.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && 
        u.password === password
      )

      if (!found) {
        return { success: false, error: 'Invalid email or password' }
      }

      // Remove password from user object
      const { password: _, ...userWithoutPassword } = found
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(userWithoutPassword))
      localStorage.setItem('token', 'demo-token-' + Date.now())
      
      // Set cookie (simplified)
      document.cookie = `next-auth.session-token=demo-session; path=/; max-age=${30 * 24 * 60 * 60}`
      
      setUser(userWithoutPassword)
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Login failed' }
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    setLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Clear localStorage
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    
    // Clear cookie
    document.cookie = 'next-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    
    setUser(null)
    setLoading(false)
    
    // Redirect to home
    window.location.href = '/'
  }

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    try {
      // Check if email exists
      const exists = mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase())
      
      if (exists) {
        return { success: false, error: 'Email already registered' }
      }

      // Create new user (in real app, this would be saved to database)
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        role: 'user' as const,
        avatar: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      }

      // In demo, we just log success
      console.log('User registered:', newUser)
      
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Registration failed' }
    } finally {
      setLoading(false)
    }
  }

  // Update user
  const updateUser = (data: Partial<User>) => {
    if (!user) return
    
    const updated = { ...user, ...data }
    setUser(updated)
    localStorage.setItem('user', JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      register,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}

// Higher-order component to protect pages
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    requiredRole?: 'admin' | 'user' | 'moderator'
    redirectTo?: string
  }
) {
  return function ProtectedComponent(props: P) {
    const { user, loading } = useAuth()
    
    if (loading) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid #f3f3f3',
            borderTopColor: '#c084fc',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        </div>
      )
    }

    if (!user) {
      if (typeof window !== 'undefined') {
        window.location.href = options?.redirectTo || '/auth/login'
      }
      return null
    }

    if (options?.requiredRole && user.role !== options.requiredRole && user.role !== 'admin') {
      if (typeof window !== 'undefined') {
        window.location.href = '/'
      }
      return null
    }

    return <Component {...props} />
  }
}

// Role-specific guards
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '3px solid #f3f3f3',
          borderTopColor: '#c084fc',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      </div>
    )
  }

  if (!user || (user.role !== 'admin' && user.role !== 'moderator')) {
    return null
  }

  return <>{children}</>
}

export function UserGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '3px solid #f3f3f3',
          borderTopColor: '#c084fc',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}