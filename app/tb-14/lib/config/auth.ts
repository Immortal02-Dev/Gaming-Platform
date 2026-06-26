// Authentication configuration
export const authConfig = {
  // Session duration in milliseconds (7 days)
  sessionDuration: 7 * 24 * 60 * 60 * 1000,
  
  // Cookie configuration
  cookie: {
    name: 'session-token',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
  },
  
  // JWT configuration
  jwt: {
    algorithm: 'HS256' as const,
    secret: process.env.SESSION_SECRET || 'your-super-secret-key-change-in-production',
  },
  
  // Rate limiting
  rateLimit: {
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
    blockDuration: 30 * 60 * 1000, // 30 minutes
  },
  
  // Password requirements
  password: {
    minLength: 4,
    maxLength: 18,
    requireLetters: false, // Set to true for stronger security
    requireNumbers: false, // Set to true for stronger security
    requireSpecialChars: false, // Set to true for stronger security
  },
  
  // Protected routes
  protectedRoutes: [
    '/my',
    '/my/attendance',
    '/my/bets',
    '/my/deposit',
    '/my/message',
    '/my/money',
    '/my/point',
    '/my/withdrawal',
    '/casino',
    '/slot',
    '/sports',
    '/powerball',
    '/minigame',
    '/events'
  ],
  
  // Public routes
  publicRoutes: [
    '/',
    '/account/login',
    '/account/register',
    '/customer',
    '/customer/connect',
    '/customer/faq',
    '/customer/grade',
    '/customer/guide',
    '/customer/notices',
    '/customer/qna',
    '/customer/rule'
  ],
  
  // Admin routes
  adminRoutes: [
    '/admin'
  ],
  
  // Redirect URLs
  redirects: {
    afterLogin: '/my',
    afterLogout: '/',
    loginPage: '/account/login',
    accessDenied: '/',
  }
}

export default authConfig
