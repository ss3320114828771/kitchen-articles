// app/api/auth/register/route.ts
// NO NPM PACKAGES - Pure TypeScript for Vercel deployment

// Mock user database (in production, this would be your real database)
// This array will persist as long as the serverless function is warm
let users: any[] = [
  {
    id: "1",
    name: "Hafiz Sajid Syed",
    email: "hafizsajidsyed@gmail.com",
    password: "Hafiz@123456", // In production, this would be hashed
    role: "ADMIN",
    image: null,
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    name: "Demo User",
    email: "user@demo.com",
    password: "Demo@123456",
    role: "USER",
    image: null,
    createdAt: new Date().toISOString()
  }
]

// Simple hash function (for demo only - in production use proper bcrypt)
async function hashPassword(password: string): Promise<string> {
  // This is NOT secure - just for demonstration
  // In production, use bcrypt library
  return btoa(password + "_salt_" + Date.now())
}

// Simple email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Simple password strength check
function isStrongPassword(password: string): { valid: boolean; message: string } {
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters long" }
  }
  
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one uppercase letter" }
  }
  
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one lowercase letter" }
  }
  
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Password must contain at least one number" }
  }
  
  return { valid: true, message: "Password is strong" }
}

// Generate unique ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

// CORS headers for Vercel
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders
  })
}

// GET request handler (returns registration info)
export async function GET() {
  return new Response(JSON.stringify({
    message: "Registration API",
    fields: ["name", "email", "password", "confirmPassword"],
    requirements: {
      name: "Required, minimum 2 characters",
      email: "Required, valid email format",
      password: "Required, minimum 8 characters with uppercase, lowercase and number"
    }
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  })
}

// POST request handler (main registration)
export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json()
    const { name, email, password, confirmPassword } = body

    // Validate required fields
    if (!name || !email || !password || !confirmPassword) {
      return new Response(JSON.stringify({
        error: "All fields are required",
        details: {
          name: !name ? "Name is required" : null,
          email: !email ? "Email is required" : null,
          password: !password ? "Password is required" : null,
          confirmPassword: !confirmPassword ? "Please confirm your password" : null
        }
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }

    // Validate name
    if (name.length < 2) {
      return new Response(JSON.stringify({
        error: "Name must be at least 2 characters long"
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({
        error: "Please enter a valid email address"
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return new Response(JSON.stringify({
        error: "Passwords do not match"
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }

    // Check password strength
    const passwordCheck = isStrongPassword(password)
    if (!passwordCheck.valid) {
      return new Response(JSON.stringify({
        error: passwordCheck.message
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }

    // Check if email already exists
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    
    if (existingUser) {
      return new Response(JSON.stringify({
        error: "Email already registered. Please login instead."
      }), {
        status: 409, // Conflict
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }

    // Hash password (simplified for demo)
    const hashedPassword = await hashPassword(password)

    // Create new user
    const newUser = {
      id: generateId(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: "USER",
      image: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Add to "database" (in production, this would be a real database)
    users.push(newUser)

    // Log for debugging (in production, use proper logging)
    console.log(`New user registered: ${newUser.email} at ${newUser.createdAt}`)

    // Return success response (without password)
    const { password: _, ...userWithoutPassword } = newUser

    return new Response(JSON.stringify({
      message: "Registration successful! Please login.",
      user: userWithoutPassword,
      redirect: "/auth/login?registered=true"
    }), {
      status: 201, // Created
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })

  } catch (error) {
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return new Response(JSON.stringify({
        error: "Invalid JSON format"
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }

    // Handle other errors
    console.error("Registration error:", error)
    
    return new Response(JSON.stringify({
      error: "Registration failed. Please try again later."
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  }
}

// Get all users (for testing only - remove in production)
export async function GET_USERS() {
  // Return users without passwords
  const usersWithoutPasswords = users.map(({ password, ...user }) => user)
  
  return new Response(JSON.stringify({
    users: usersWithoutPasswords,
    count: usersWithoutPasswords.length
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  })
}