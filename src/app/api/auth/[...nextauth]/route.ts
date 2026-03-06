// YE FILE BINA KISI NPM PACKAGE KE HAI
// Isme koi import nahi hai - pure JavaScript/TypeScript

// Mock user database (in real app, this would be your database)
const users = [
  {
    id: "1",
    name: "Hafiz Sajid Syed",
    email: "hafizsajidsyed@gmail.com",
    password: "Hafiz@123456", // In production, this should be hashed
    role: "ADMIN",
    image: null
  },
  {
    id: "2",
    name: "Demo User",
    email: "user@demo.com",
    password: "Demo@123456",
    role: "USER",
    image: null
  }
]

// Simple hash function (for demo only - use proper bcrypt in production)
async function simpleHash(password: string): Promise<string> {
  // This is NOT secure - just for demonstration
  // In production, use proper bcrypt library
  return btoa(password)
}

async function simpleCompare(password: string, hash: string): Promise<boolean> {
  // This is NOT secure - just for demonstration
  // In production, use proper bcrypt library
  return btoa(password) === hash
}

// Custom NextAuth implementation without npm packages
export async function GET(req: Request) {
  const url = new URL(req.url)
  const action = url.searchParams.get('action')
  
  // Handle different auth actions
  if (action === 'session') {
    return handleSession(req)
  }
  
  if (action === 'signin') {
    return handleSignIn(req)
  }
  
  if (action === 'signout') {
    return handleSignOut(req)
  }
  
  // Return auth configuration
  return new Response(JSON.stringify({
    providers: ['credentials'],
    csrf: true
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, action } = body
    
    // Handle sign in
    if (action === 'signin' || (email && password)) {
      return handleSignInPost(email, password)
    }
    
    // Handle sign out
    if (action === 'signout') {
      return handleSignOutPost()
    }
    
    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// Session handler
async function handleSession(req: Request) {
  const cookies = parseCookies(req)
  const sessionToken = cookies['next-auth.session-token']
  
  if (!sessionToken) {
    return new Response(JSON.stringify({ user: null }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  // Parse session token (in production, this would be JWT verification)
  try {
    const sessionData = JSON.parse(atob(sessionToken))
    
    // Find user
    const user = users.find(u => u.id === sessionData.userId)
    
    if (!user) {
      return new Response(JSON.stringify({ user: null }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    // Return session without password
    const { password, ...userWithoutPassword } = user
    
    return new Response(JSON.stringify({
      user: {
        ...userWithoutPassword,
        role: user.role
      },
      expires: sessionData.expires
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch {
    return new Response(JSON.stringify({ user: null }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// Sign in handler (GET)
async function handleSignIn(req: Request) {
  const url = new URL(req.url)
  const callbackUrl = url.searchParams.get('callbackUrl') || '/dashboard'
  
  // Return sign in page info
  return new Response(JSON.stringify({
    redirect: callbackUrl,
    csrfToken: generateCsrfToken()
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}

// Sign in handler (POST)
async function handleSignInPost(email: string, password: string) {
  // Validate input
  if (!email || !password) {
    return new Response(JSON.stringify({ 
      error: 'Please enter email and password' 
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  // Find user
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())
  
  // Check if user exists
  if (!user) {
    return new Response(JSON.stringify({ 
      error: 'Invalid email or password' 
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  // Verify password (simple compare for demo)
  if (user.password !== password) {
    return new Response(JSON.stringify({ 
      error: 'Invalid email or password' 
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  // Create session token (in production, this would be JWT)
  const sessionToken = btoa(JSON.stringify({
    userId: user.id,
    email: user.email,
    role: user.role,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  }))
  
  // Create response with cookie
  const response = new Response(JSON.stringify({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    redirect: '/dashboard'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
  
  // Set session cookie
  response.headers.append('Set-Cookie', 
    `next-auth.session-token=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}`
  )
  
  return response
}

// Sign out handler
async function handleSignOut(req: Request) {
  return handleSignOutPost()
}

async function handleSignOutPost() {
  const response = new Response(JSON.stringify({ 
    redirect: '/auth/login' 
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
  
  // Clear session cookie
  response.headers.append('Set-Cookie', 
    'next-auth.session-token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0'
  )
  
  return response
}

// Helper function to parse cookies
function parseCookies(req: Request) {
  const cookieHeader = req.headers.get('cookie') || ''
  const cookies: { [key: string]: string } = {}
  
  cookieHeader.split(';').forEach(cookie => {
    const [key, value] = cookie.trim().split('=')
    if (key && value) {
      cookies[key] = value
    }
  })
  
  return cookies
}

// Generate CSRF token
function generateCsrfToken() {
  return btoa(Math.random().toString(36).substring(2) + Date.now().toString())
}