// lib/db-types.ts
export type User = {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
}

export type Product = {
  id: string
  name: string
  price: number
  category: string
}

