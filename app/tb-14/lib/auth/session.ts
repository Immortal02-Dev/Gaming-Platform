import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

// Types for user and session
export interface User {
  id: string
  username: string
  nickname: string
  email?: string
  role: 'user' | 'admin'
  bankInfo?: {
    bank: string
    account: string
    depositor: string
  }
  mobile?: string
  birthDate?: string
  registrationCode?: string
  createdAt: Date
  lastLogin: Date
}

export interface SessionPayload {
  userId: string
  username: string
  role: string
  expiresAt: Date
  [key: string]: any // Index signature for JWT compatibility
}

// Environment variables for JWT
const secretKey = process.env.SESSION_SECRET || 'your-super-secret-key-change-in-production'
const encodedKey = new TextEncoder().encode(secretKey)

// Session configuration
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
const COOKIE_NAME = 'session-token'

/**
 * Encrypts the session payload and returns a JWT token
 */
export async function encrypt(payload: SessionPayload): Promise<string> {
  // Convert Date to timestamp for JWT compatibility
  const jwtPayload = {
    ...payload,
    expiresAt: payload.expiresAt.toISOString(),
  }
  
  return new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(payload.expiresAt)
    .sign(encodedKey)
}

/**
 * Decrypts and verifies the JWT token
 */
export async function decrypt(session: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    
    // Safely convert JWTPayload to SessionPayload
    if (payload && typeof payload === 'object' && 
        'userId' in payload && 'username' in payload && 
        'role' in payload && 'expiresAt' in payload) {
      return {
        userId: payload.userId as string,
        username: payload.username as string,
        role: payload.role as string,
        expiresAt: new Date(payload.expiresAt as string),
      }
    }
    
    return null
  } catch (error) {
    console.error('Failed to decrypt session:', error)
    return null
  }
}

/**
 * Creates a new session for the user
 * Returns the session token - cookie setting should be done by the caller
 */
export async function createSession(user: User): Promise<string> {
  const expiresAt = new Date(Date.now() + SESSION_DURATION)
  const sessionPayload: SessionPayload = {
    userId: user.id,
    username: user.username,
    role: user.role,
    expiresAt,
  }

  const sessionToken = await encrypt(sessionPayload)
  
  return sessionToken
}

/**
 * Gets the session expiration duration
 */
export function getSessionDuration(): number {
  return SESSION_DURATION
}

/**
 * Verifies if the session token is valid
 */
export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const payload = await decrypt(token)
    
    if (!payload) {
      return null
    }

    // Check if session is expired
    if (new Date() > new Date(payload.expiresAt)) {
      return null
    }

    return payload
  } catch (error) {
    console.error('Session verification failed:', error)
    return null
  }
}

/**
 * Gets the current session from cookies
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get(COOKIE_NAME)?.value

  if (!sessionToken) {
    return null
  }

  return verifySession(sessionToken)
}

/**
 * Updates the session with new data
 * Returns the new session token - cookie setting should be done by the caller
 */
export async function updateSession(updates: Partial<SessionPayload>): Promise<string> {
  const currentSession = await getSession()
  
  if (!currentSession) {
    throw new Error('No active session found')
  }

  const updatedSession: SessionPayload = {
    ...currentSession,
    ...updates,
    expiresAt: new Date(Date.now() + SESSION_DURATION), // Extend session
  }

  const sessionToken = await encrypt(updatedSession)
  
  return sessionToken
}

/**
 * Destroys the current session
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

/**
 * Refreshes the session expiration time
 * Returns the new session token - cookie setting should be done by the caller
 */
export async function refreshSession(): Promise<string | null> {
  const currentSession = await getSession()
  
  if (!currentSession) {
    return null
  }

  // Extend the session
  const sessionToken = await updateSession({
    expiresAt: new Date(Date.now() + SESSION_DURATION)
  })
  
  return sessionToken
}

/**
 * Validates if user has required role
 */
export async function hasRole(requiredRole: string): Promise<boolean> {
  const session = await getSession()
  
  if (!session) {
    return false
  }

  if (requiredRole === 'admin') {
    return session.role === 'admin'
  }

  return true // All authenticated users have 'user' role
}

/**
 * Gets user ID from session
 */
export async function getUserId(): Promise<string | null> {
  const session = await getSession()
  return session?.userId || null
}

/**
 * Checks if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return !!session
}
