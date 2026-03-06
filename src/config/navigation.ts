// Navigation configuration for the entire site

export interface NavItem {
  name: string
  href: string
  icon?: string
  description?: string
  badge?: string | number
  disabled?: boolean
  external?: boolean
  children?: NavItem[]
}

export interface NavSection {
  title: string
  items: NavItem[]
}

// Main navigation - Header
export const mainNav: NavItem[] = [
  {
    name: 'Home',
    href: '/',
    icon: '🏠'
  },
  {
    name: 'Products',
    href: '/products',
    icon: '🛍️',
    children: [
      {
        name: 'All Products',
        href: '/products',
        description: 'Browse all products'
      },
      {
        name: 'Electronics',
        href: '/products/categories/Electronics',
        description: 'Latest gadgets and devices'
      },
      {
        name: 'AI Products',
        href: '/products/categories/AI%20Products',
        description: 'Artificial intelligence solutions'
      },
      {
        name: 'Wearables',
        href: '/products/categories/Wearables',
        description: 'Smart watches and trackers'
      },
      {
        name: 'Security',
        href: '/products/categories/Security',
        description: 'Protect your home and data'
      }
    ]
  },
  {
    name: 'Categories',
    href: '/categories',
    icon: '📑',
    children: [
      {
        name: 'Electronics',
        href: '/products/categories/Electronics',
        icon: '💻',
        description: '24 products'
      },
      {
        name: 'AI Products',
        href: '/products/categories/AI%20Products',
        icon: '🤖',
        description: '18 products'
      },
      {
        name: 'Wearables',
        href: '/products/categories/Wearables',
        icon: '⌚',
        description: '12 products'
      },
      {
        name: 'Security',
        href: '/products/categories/Security',
        icon: '🔒',
        description: '8 products'
      }
    ]
  },
  {
    name: 'Deals',
    href: '/deals',
    icon: '🏷️',
    badge: 'HOT'
  },
  {
    name: 'About',
    href: '/about',
    icon: 'ℹ️'
  },
  {
    name: 'Contact',
    href: '/contact',
    icon: '📞'
  }
]

// Dashboard navigation (User area)
export const dashboardNav: NavSection[] = [
  {
    title: 'Main',
    items: [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: '📊'
      },
      {
        name: 'Profile',
        href: '/dashboard/profile',
        icon: '👤'
      },
      {
        name: 'Orders',
        href: '/dashboard/orders',
        icon: '📦',
        badge: 3
      },
      {
        name: 'Wishlist',
        href: '/dashboard/wishlist',
        icon: '❤️',
        badge: 5
      }
    ]
  },
  {
    title: 'Settings',
    items: [
      {
        name: 'Account',
        href: '/dashboard/settings/account',
        icon: '⚙️'
      },
      {
        name: 'Notifications',
        href: '/dashboard/settings/notifications',
        icon: '🔔'
      },
      {
        name: 'Privacy',
        href: '/dashboard/settings/privacy',
        icon: '🔒'
      }
    ]
  }
]

// Admin navigation
export const adminNav: NavSection[] = [
  {
    title: 'Overview',
    items: [
      {
        name: 'Dashboard',
        href: '/admin',
        icon: '📊'
      }
    ]
  },
  {
    title: 'Management',
    items: [
      {
        name: 'Orders',
        href: '/admin/orders',
        icon: '📦',
        badge: 12
      },
      {
        name: 'Products',
        href: '/admin/products',
        icon: '🛍️'
      },
      {
        name: 'Users',
        href: '/admin/users',
        icon: '👥',
        badge: 5
      },
      {
        name: 'Categories',
        href: '/admin/categories',
        icon: '📑'
      },
      {
        name: 'Reviews',
        href: '/admin/reviews',
        icon: '⭐',
        badge: 8
      }
    ]
  },
  {
    title: 'Settings',
    items: [
      {
        name: 'General',
        href: '/admin/settings/general',
        icon: '⚙️'
      },
      {
        name: 'Payment',
        href: '/admin/settings/payment',
        icon: '💳'
      },
      {
        name: 'Shipping',
        href: '/admin/settings/shipping',
        icon: '🚚'
      },
      {
        name: 'Analytics',
        href: '/admin/analytics',
        icon: '📈'
      }
    ]
  }
]

// Footer navigation
export const footerNav: NavSection[] = [
  {
    title: 'Company',
    items: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers', disabled: true },
      { name: 'Blog', href: '/blog' }
    ]
  },
  {
    title: 'Products',
    items: [
      { name: 'Electronics', href: '/products/categories/Electronics' },
      { name: 'AI Products', href: '/products/categories/AI%20Products' },
      { name: 'Wearables', href: '/products/categories/Wearables' },
      { name: 'Security', href: '/products/categories/Security' }
    ]
  },
  {
    title: 'Support',
    items: [
      { name: 'Help Center', href: '/help' },
      { name: 'FAQs', href: '/faq' },
      { name: 'Shipping', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'Track Order', href: '/track-order' }
    ]
  },
  {
    title: 'Legal',
    items: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' }
    ]
  }
]

// Social media links
export const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/kitechn',
    icon: '📘',
    color: '#3b82f6'
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/kitechn',
    icon: '🐦',
    color: '#1da1f2'
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/kitechn',
    icon: '📸',
    color: '#e4405f'
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/kitechn',
    icon: '🔗',
    color: '#0a66c2'
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/kitechn',
    icon: '▶️',
    color: '#ff0000'
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/1234567890',
    icon: '📱',
    color: '#25d366'
  }
]

// Quick links (for mobile menu)
export const quickLinks: NavItem[] = [
  { name: 'My Account', href: '/dashboard', icon: '👤' },
  { name: 'Track Order', href: '/track-order', icon: '📦' },
  { name: 'Wishlist', href: '/wishlist', icon: '❤️' },
  { name: 'Compare', href: '/compare', icon: '⚖️' },
  { name: 'Gift Cards', href: '/gift-cards', icon: '🎁' },
  { name: 'Sell on Kitechn', href: '/sell', icon: '💰' }
]

// Auth links (login/register)
export const authLinks = {
  login: { name: 'Login', href: '/auth/login', icon: '🔑' },
  register: { name: 'Register', href: '/auth/register', icon: '📝' },
  forgotPassword: { name: 'Forgot Password', href: '/auth/forgot-password' },
  resetPassword: { name: 'Reset Password', href: '/auth/reset-password' }
}

// Utility functions
export function getNavItemByHref(href: string): NavItem | undefined {
  const searchInItems = (items: NavItem[]): NavItem | undefined => {
    for (const item of items) {
      if (item.href === href) return item
      if (item.children) {
        const found = searchInItems(item.children)
        if (found) return found
      }
    }
    return undefined
  }

  return searchInItems(mainNav)
}

export function isActiveRoute(currentPath: string, itemHref: string): boolean {
  if (itemHref === '/') {
    return currentPath === '/'
  }
  return currentPath.startsWith(itemHref)
}

export function getBreadcrumbs(path: string): NavItem[] {
  const parts = path.split('/').filter(Boolean)
  const breadcrumbs: NavItem[] = []
  let currentPath = ''

  for (const part of parts) {
    currentPath += `/${part}`
    const item = getNavItemByHref(currentPath)
    if (item) {
      breadcrumbs.push(item)
    } else {
      breadcrumbs.push({
        name: part.charAt(0).toUpperCase() + part.slice(1),
        href: currentPath
      })
    }
  }

  return breadcrumbs
}