import { createHash, randomBytes, pbkdf2Sync } from 'crypto'

/**
 * Hash a password using PBKDF2
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(32).toString('hex')
  const hash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return `${salt}:${hash}`
}

/**
 * Verify a password against its hash
 */
export function verifyPassword(password: string, hashedPassword: string): boolean {
  try {
    const [salt, hash] = hashedPassword.split(':')
    const verifyHash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return hash === verifyHash
  } catch (error) {
    console.error('Password verification error:', error)
    return false
  }
}

/**
 * Generate a secure random token
 */
export function generateSecureToken(length: number = 32): string {
  return randomBytes(length).toString('hex')
}

/**
 * Hash a string using SHA-256
 */
export function sha256Hash(input: string): string {
  return createHash('sha256').update(input).digest('hex')
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 4) {
    errors.push('Password must be at least 4 characters long')
  }

  if (password.length > 18) {
    errors.push('Password must be no more than 18 characters long')
  }

  // Additional security checks (optional)
  if (!/[a-zA-Z]/.test(password)) {
    errors.push('Password should contain at least one letter')
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password should contain at least one number')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Generate a random password
 */
export function generateRandomPassword(length: number = 12): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
  let password = ''
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    password += charset[randomIndex]
  }
  
  return password
}
