// hooks/use-auth.ts
'use client'

import { useState, useEffect } from 'react'

// Define types
type User = {
  id: string
  name: string
  email: string
  role: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if window is defined (client-side only)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('user')
      if (saved) {
        try {
          setUser(JSON.parse(saved))
        } catch (error) {
          console.error('Error parsing user:', error)
        }
      }
    }
  }, [])

  const login = (email: string, password: string): boolean => {
    // Admin login
    if (email === 'hafizsajidsyed@gmail.com' && password === 'Hafiz@123456') {
      const userData: User = { 
        id: '1', 
        name: 'Hafiz Sajid Syed', 
        email, 
        role: 'admin' 
      }
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      return true
    }
    
    // User login (optional)
    if (email === 'user@demo.com' && password === 'Demo@123456') {
      const userData: User = { 
        id: '2', 
        name: 'Demo User', 
        email, 
        role: 'user' 
      }
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      return true
    }
    
    return false
  }

  const logout = (): void => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return { user, login, logout }
}