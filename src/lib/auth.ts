// Types
export type User = {
  id: string
  name: string
  email: string
  role: 'user' | 'admin' | 'moderator'
  avatar?: string
  phone?: string
  createdAt?: string
}

export type AuthResponse = {
  success: boolean
  user?: User
  token?: string
  error?: string
}

// Mock users database (in real app, this would be in your database)
const mockUsers = [
  {
    id: '1',
    name: 'Hafiz Sajid Syed',
    email: 'hafizsajidsyed@gmail.com',
    password: 'Hafiz@123456',
    role: 'admin' as const,
    avatar: 'HS',
    phone: '+92 300 1234567',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Demo User',
    email: 'user@demo.com',
    password: 'Demo@123456',
    role: 'user' as const,
    avatar: 'DU',
    phone: '+92 321 7654321',
    createdAt: '2024-02-20'
  },
  {
    id: '3',
    name: 'Moderator User',
    email: 'mod@demo.com',
    password: 'Mod@123456',
    role: 'moderator' as const,
    avatar: 'MU',
    phone: '+92 333 9876543',
    createdAt: '2024-02-25'
  }
]

// Session storage keys
const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'auth_user',
  REMEMBER: 'auth_remember'
}

// ==================== AUTH FUNCTIONS ====================

// Login function
export async function login(email: string, password: string, rememberMe: boolean = false): Promise<AuthResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  try {
    // Find user
    const user = mockUsers.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password
    )

    if (!user) {
      return { 
        success: false, 
        error: 'Invalid email or password' 
      }
    }

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user

    // Generate token
    const token = generateToken(user.id)

    // Save to storage if remember me
    if (rememberMe) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token)
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userWithoutPassword))
      localStorage.setItem(STORAGE_KEYS.REMEMBER, 'true')
    } else {
      // Use sessionStorage for temporary sessions
      sessionStorage.setItem(STORAGE_KEYS.TOKEN, token)
      sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userWithoutPassword))
    }

    return {
      success: true,
      user: userWithoutPassword,
      token
    }
  } catch (error) {
    console.error('Login error:', error)
    return { 
      success: false, 
      error: 'Login failed. Please try again.' 
    }
  }
}

// Register function
export async function register(
  name: string, 
  email: string, 
  password: string, 
  phone?: string
): Promise<AuthResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))

  try {
    // Check if email already exists
    const exists = mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase())

    if (exists) {
      return { 
        success: false, 
        error: 'Email already registered' 
      }
    }

    // In real app, you would save to database
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      role: 'user' as const,
      phone,
      createdAt: new Date().toISOString().split('T')[0]
    }

    // Log for demo
    console.log('User registered:', newUser)

    return {
      success: true,
      user: newUser
    }
  } catch (error) {
    console.error('Registration error:', error)
    return { 
      success: false, 
      error: 'Registration failed. Please try again.' 
    }
  }
}

// Logout function
export function logout(): void {
  // Clear all storages
  localStorage.removeItem(STORAGE_KEYS.TOKEN)
  localStorage.removeItem(STORAGE_KEYS.USER)
  localStorage.removeItem(STORAGE_KEYS.REMEMBER)
  sessionStorage.removeItem(STORAGE_KEYS.TOKEN)
  sessionStorage.removeItem(STORAGE_KEYS.USER)
}

// Get current user
export function getCurrentUser(): User | null {
  try {
    // Check localStorage first
    const userStr = localStorage.getItem(STORAGE_KEYS.USER)
    if (userStr) {
      return JSON.parse(userStr)
    }

    // Then check sessionStorage
    const sessionUser = sessionStorage.getItem(STORAGE_KEYS.USER)
    if (sessionUser) {
      return JSON.parse(sessionUser)
    }

    return null
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

// Get auth token
export function getToken(): string | null {
  return (
    localStorage.getItem(STORAGE_KEYS.TOKEN) || 
    sessionStorage.getItem(STORAGE_KEYS.TOKEN)
  )
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!getToken() && !!getCurrentUser()
}

// Check if user has role
export function hasRole(role: string | string[]): boolean {
  const user = getCurrentUser()
  if (!user) return false

  const roles = Array.isArray(role) ? role : [role]
  return roles.includes(user.role)
}

// Check if user is admin
export function isAdmin(): boolean {
  return hasRole('admin')
}

// Check if user is moderator
export function isModerator(): boolean {
  return hasRole(['admin', 'moderator'])
}

// Update user profile
export async function updateProfile(userData: Partial<User>): Promise<AuthResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  try {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      return { success: false, error: 'Not authenticated' }
    }

    const updatedUser = { ...currentUser, ...userData }
    
    // Update in storage
    const storage = localStorage.getItem(STORAGE_KEYS.REMEMBER) ? localStorage : sessionStorage
    storage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser))

    return {
      success: true,
      user: updatedUser
    }
  } catch (error) {
    console.error('Update profile error:', error)
    return { success: false, error: 'Failed to update profile' }
  }
}

// Change password
export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<AuthResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  try {
    const user = getCurrentUser()
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    // In real app, verify current password from database
    // For demo, we'll just return success
    return { success: true }
  } catch (error) {
    console.error('Change password error:', error)
    return { success: false, error: 'Failed to change password' }
  }
}

// ==================== HELPER FUNCTIONS ====================

// Generate token
function generateToken(userId: string): string {
  return `token_${userId}_${Date.now()}_${Math.random().toString(36).substring(2)}`
}

// Get auth header for API requests
export function getAuthHeader(): { Authorization?: string } {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate password strength
export function isStrongPassword(password: string): {
  valid: boolean
  message: string
} {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters' }
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain an uppercase letter' }
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain a lowercase letter' }
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain a number' }
  }
  return { valid: true, message: 'Password is strong' }
}

// ==================== DEMO CREDENTIALS ====================

export const demoCredentials = {
  admin: {
    email: 'hafizsajidsyed@gmail.com',
    password: 'Hafiz@123456',
    name: 'Hafiz Sajid Syed',
    role: 'admin'
  },
  user: {
    email: 'user@demo.com',
    password: 'Demo@123456',
    name: 'Demo User',
    role: 'user'
  },
  moderator: {
    email: 'mod@demo.com',
    password: 'Mod@123456',
    name: 'Moderator User',
    role: 'moderator'
  }
}