import 'next-auth'
import 'next-auth/jwt'

// Extend the built-in session types
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's unique identifier */
      id: string
      /** The user's name */
      name?: string | null
      /** The user's email address */
      email?: string | null
      /** The user's avatar/image URL */
      image?: string | null
      /** The user's role (admin, user, moderator) */
      role?: string
      /** The user's phone number */
      phone?: string
      /** Whether the user's email is verified */
      emailVerified?: boolean
      /** When the user joined */
      createdAt?: string
    }
    /** Session expiry time */
    expires: string
    /** Access token for API calls */
    accessToken?: string
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    /** The user's unique identifier */
    id: string
    /** The user's name */
    name?: string | null
    /** The user's email address */
    email?: string | null
    /** The user's avatar/image URL */
    image?: string | null
    /** The user's role */
    role?: string
    /** The user's phone number */
    phone?: string
    /** Access token for API calls */
    accessToken?: string
  }
}

// Extend the built-in JWT types
declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** The user's unique identifier */
    id?: string
    /** The user's role */
    role?: string
    /** The user's phone number */
    phone?: string
    /** Access token for API calls */
    accessToken?: string
    /** Token expiry time */
    expiresAt?: number
  }
}

// Extend the built-in Profile types (for OAuth providers)
declare module 'next-auth/profiles' {
  interface Profile {
    /** User ID from provider */
    id?: string
    /** User email from provider */
    email?: string
    /** User name from provider */
    name?: string
    /** User picture from provider */
    picture?: string
    /** User avatar from provider */
    avatar?: string
    /** User role from provider */
    role?: string
  }
}

// Extend the built-in Account types
declare module 'next-auth/adapters' {
  interface AdapterUser {
    /** The user's role */
    role?: string
    /** The user's phone number */
    phone?: string
    /** Whether the user's email is verified */
    emailVerified?: boolean
    /** When the user joined */
    createdAt?: Date
    /** Last updated */
    updatedAt?: Date
  }
}