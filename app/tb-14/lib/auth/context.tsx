'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, SessionPayload } from './session'

// Types for authentication context
interface AuthContextType {
  user: User | null
  session: SessionPayload | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<LoginResult>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

interface LoginCredentials {
  username: string
  password: string
  rememberMe?: boolean
}

interface LoginResult {
  success: boolean
  error?: string
  user?: User
}

interface AuthProviderProps {
  children: ReactNode
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Custom hook to use authentication context
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

/**
 * Authentication provider component
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<SessionPayload | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user && !!session

  /**
   * Initialize authentication state on mount
   */
  useEffect(() => {
    initializeAuth()
  }, [])

  /**
   * Initialize authentication state
   */
  const initializeAuth = async () => {
    try {
      setIsLoading(true)
      
      // Check if user has valid session
      const response = await fetch('/api/auth/session', {
        method: 'GET',
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        if (data.user && data.session) {
          setUser(data.user)
          setSession(data.session)
        }
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Login function
   */
  const login = async (credentials: LoginCredentials): Promise<LoginResult> => {
    try {
      setIsLoading(true)

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setUser(data.user)
        setSession(data.session)
        
        return {
          success: true,
          user: data.user,
        }
      } else {
        return {
          success: false,
          error: data.error || 'Login failed',
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        error: 'Network error occurred',
      }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Logout function
   */
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true)

      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })

      // Clear local state regardless of API response
      setUser(null)
      setSession(null)

      // Check if logout was successful
      if (response.ok) {
        const data = await response.json()
        console.log('Logout successful:', data.message)
      } else {
        console.warn('Logout API failed, but continuing with local logout')
      }

      // Redirect to home page
      window.location.href = '/'
    } catch (error) {
      console.error('Logout error:', error)
      // Clear local state even if API call fails
      setUser(null)
      setSession(null)
      // Still redirect to ensure user is logged out from UI perspective
      window.location.href = '/'
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Refresh user data
   */
  const refreshUser = async (): Promise<void> => {
    try {
      const response = await fetch('/api/auth/user', {
        method: 'GET',
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        if (data.user) {
          setUser(data.user)
        }
      }
    } catch (error) {
      console.error('Failed to refresh user:', error)
    }
  }

  /**
   * Auto-refresh session periodically
   */
  useEffect(() => {
    if (!isAuthenticated) return

    const refreshInterval = setInterval(async () => {
      try {
        await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include',
        })
      } catch (error) {
        console.error('Failed to refresh session:', error)
      }
    }, 15 * 60 * 1000) // Refresh every 15 minutes

    return () => clearInterval(refreshInterval)
  }, [isAuthenticated])

  /**
   * Handle page visibility change to refresh session
   */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isAuthenticated) {
        refreshUser()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [isAuthenticated])

  const contextValue: AuthContextType = {
    user,
    session,
    isLoading,
    isAuthenticated,
    login,
    logout,
    refreshUser,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Higher-order component for protecting routes
 */
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: { requireAuth?: boolean; requireRole?: string } = {}
) {
  const { requireAuth = true, requireRole } = options

  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading, user } = useAuth()

    // Show loading state
    if (isLoading) {
      return (
        <div className="auth-loading">
          <div className="loading-spinner">Loading...</div>
        </div>
      )
    }

    // Check authentication requirement
    if (requireAuth && !isAuthenticated) {
      window.location.href = '/account/login'
      return null
    }

    // Check role requirement
    if (requireRole && user?.role !== requireRole) {
      return (
        <div className="auth-error">
          <h2>Access Denied</h2>
          <p>You don't have permission to access this page.</p>
        </div>
      )
    }

    return <WrappedComponent {...props} />
  }
}
