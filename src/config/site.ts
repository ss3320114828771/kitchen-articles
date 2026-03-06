// Site-wide configuration

export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
    facebook: string
    instagram: string
    linkedin: string
    youtube: string
    whatsapp: string
  }
  keywords: string[]
  authors: Array<{
    name: string
    url: string
  }>
  creator: string
  themeColor: string
  backgroundColor: string
  defaultLocale: string
  locales: string[]
}

export const siteConfig: SiteConfig = {
  name: 'Kitechn',
  description: 'Pioneering the future of technology with innovation and integrity. Discover cutting-edge products that transform the way you live and work.',
  url: 'https://kitechn.com',
  ogImage: 'https://kitechn.com/og.jpg',
  
  links: {
    twitter: 'https://twitter.com/kitechn',
    github: 'https://github.com/kitechn',
    facebook: 'https://facebook.com/kitechn',
    instagram: 'https://instagram.com/kitechn',
    linkedin: 'https://linkedin.com/company/kitechn',
    youtube: 'https://youtube.com/kitechn',
    whatsapp: 'https://wa.me/1234567890'
  },

  keywords: [
    'technology',
    'ecommerce',
    'quantum computing',
    'AI products',
    'wearables',
    'security systems',
    'Pakistan tech',
    'innovation',
    'future technology'
  ],

  authors: [
    {
      name: 'Hafiz Sajid Syed',
      url: 'https://github.com/hafizsajid'
    }
  ],

  creator: 'Hafiz Sajid Syed',
  themeColor: '#c084fc',
  backgroundColor: '#0f172a',
  defaultLocale: 'en',
  locales: ['en', 'ur', 'ar']
}

// SEO defaults
export const seoDefaults = {
  titleTemplate: '%s | Kitechn',
  defaultTitle: 'Kitechn - Future of Technology',
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ]
  },
  twitter: {
    handle: '@kitechn',
    site: '@kitechn',
    cardType: 'summary_large_image'
  }
}

// Contact information
export const contactInfo = {
  email: 'info@kitechn.com',
  support: 'support@kitechn.com',
  sales: 'sales@kitechn.com',
  phone: '+92 300 1234567',
  whatsapp: '+92 300 1234567',
  address: {
    street: '123 Tech Street',
    city: 'Innovation City',
    state: 'Tech Valley',
    country: 'Pakistan',
    postalCode: '12345'
  },
  hours: {
    monday: '9:00 AM - 6:00 PM',
    tuesday: '9:00 AM - 6:00 PM',
    wednesday: '9:00 AM - 6:00 PM',
    thursday: '9:00 AM - 6:00 PM',
    friday: '9:00 AM - 12:00 PM',
    saturday: 'Closed',
    sunday: 'Closed'
  }
}

// Admin information
export const adminInfo = {
  name: 'Hafiz Sajid Syed',
  email: 'hafizsajidsyed@gmail.com',
  phone: '+92 300 1234567',
  role: 'Founder & CEO',
  github: 'https://github.com/hafizsajid',
  linkedin: 'https://linkedin.com/in/hafiz-sajid-syed'
}

// Company information
export const companyInfo = {
  name: 'Kitechn Technologies',
  legalName: 'Kitechn Technologies Pvt Ltd',
  founded: '2024',
  registrationNumber: 'PK-TECH-2024-001',
  taxNumber: 'TAX-123456789',
  vatNumber: 'VAT-987654321'
}

// Payment methods
export const paymentMethods = [
  {
    id: 'visa',
    name: 'Visa',
    icon: '💳',
    enabled: true
  },
  {
    id: 'mastercard',
    name: 'Mastercard',
    icon: '💳',
    enabled: true
  },
  {
    id: 'amex',
    name: 'American Express',
    icon: '💳',
    enabled: false
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '📱',
    enabled: true
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    icon: '💰',
    enabled: true
  },
  {
    id: 'bank_transfer',
    name: 'Bank Transfer',
    icon: '🏦',
    enabled: true
  }
]

// Shipping methods
export const shippingMethods = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    price: 5.99,
    estimatedDays: '5-7 business days',
    enabled: true
  },
  {
    id: 'express',
    name: 'Express Shipping',
    price: 12.99,
    estimatedDays: '2-3 business days',
    enabled: true
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    price: 24.99,
    estimatedDays: '1 business day',
    enabled: true
  },
  {
    id: 'free',
    name: 'Free Shipping',
    price: 0,
    estimatedDays: '7-10 business days',
    enabled: true,
    minOrder: 100
  }
]

// Currency settings
export const currency = {
  code: 'USD',
  symbol: '$',
  name: 'US Dollar',
  locale: 'en-US',
  decimalPlaces: 2,
  thousandsSeparator: ',',
  decimalSeparator: '.'
}

// Tax settings
export const taxSettings = {
  enabled: true,
  rate: 10, // 10%
  name: 'VAT',
  includedInPrice: false,
  applyToShipping: true
}

// Order statuses
export const orderStatuses = [
  { value: 'pending', label: 'Pending', color: '#f59e0b' },
  { value: 'processing', label: 'Processing', color: '#3b82f6' },
  { value: 'shipped', label: 'Shipped', color: '#8b5cf6' },
  { value: 'delivered', label: 'Delivered', color: '#10b981' },
  { value: 'cancelled', label: 'Cancelled', color: '#ef4444' },
  { value: 'refunded', label: 'Refunded', color: '#6b7280' }
]

// Payment statuses
export const paymentStatuses = [
  { value: 'pending', label: 'Pending', color: '#f59e0b' },
  { value: 'paid', label: 'Paid', color: '#10b981' },
  { value: 'failed', label: 'Failed', color: '#ef4444' },
  { value: 'refunded', label: 'Refunded', color: '#6b7280' }
]

// User roles
export const userRoles = [
  { value: 'user', label: 'User', level: 1 },
  { value: 'moderator', label: 'Moderator', level: 2 },
  { value: 'admin', label: 'Admin', level: 3 }
]

// Product categories
export const productCategories = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    icon: '💻',
    subcategories: [
      'Processors',
      'Displays',
      'Networking',
      'Audio',
      'Components'
    ]
  },
  {
    id: 'ai-products',
    name: 'AI Products',
    slug: 'ai-products',
    icon: '🤖',
    subcategories: [
      'Interfaces',
      'Hubs',
      'Headsets',
      'Cameras',
      'Software'
    ]
  },
  {
    id: 'wearables',
    name: 'Wearables',
    slug: 'wearables',
    icon: '⌚',
    subcategories: [
      'Watches',
      'Headsets',
      'Glasses',
      'Trackers',
      'Fitness'
    ]
  },
  {
    id: 'security',
    name: 'Security',
    slug: 'security',
    icon: '🔒',
    subcategories: [
      'Systems',
      'Locks',
      'Drones',
      'Cameras',
      'Sensors'
    ]
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    icon: '🎧',
    subcategories: [
      'Cables',
      'Adapters',
      'Mounts',
      'Cases',
      'Chargers'
    ]
  }
]

// Features list
export const features = [
  {
    id: 'free-shipping',
    name: 'Free Shipping',
    description: 'On orders over $100',
    icon: '🚚'
  },
  {
    id: 'secure-payment',
    name: 'Secure Payment',
    description: '100% secure transactions',
    icon: '🔒'
  },
  {
    id: '30-day-returns',
    name: '30-Day Returns',
    description: 'Easy return policy',
    icon: '↩️'
  },
  {
    id: '24-7-support',
    name: '24/7 Support',
    description: 'Dedicated customer service',
    icon: '💬'
  },
  {
    id: 'warranty',
    name: 'Warranty',
    description: '2-year warranty on all products',
    icon: '🛡️'
  },
  {
    id: 'gift-wrapping',
    name: 'Gift Wrapping',
    description: 'Available at checkout',
    icon: '🎁'
  }
]

// Promo codes (for demo)
export const promoCodes = [
  { code: 'WELCOME10', discount: 10, type: 'percentage', minOrder: 50 },
  { code: 'SAVE20', discount: 20, type: 'percentage', minOrder: 100 },
  { code: 'FLASH50', discount: 50, type: 'percentage', minOrder: 200 },
  { code: 'FREESHIP', discount: 0, type: 'free_shipping', minOrder: 0 }
]

// Utility function to get site URL
export function getSiteUrl(path?: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || siteConfig.url
  return path ? `${baseUrl}${path}` : baseUrl
}

// Utility function to get meta tags
export function getMetaTags({
  title,
  description,
  image,
  path
}: {
  title?: string
  description?: string
  image?: string
  path?: string
}) {
  const url = getSiteUrl(path)
  const metaTitle = title 
    ? `${title} | ${siteConfig.name}`
    : seoDefaults.defaultTitle
  const metaDescription = description || siteConfig.description
  const metaImage = image || siteConfig.ogImage

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url,
      images: [{ url: metaImage }]
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [metaImage]
    }
  }
}