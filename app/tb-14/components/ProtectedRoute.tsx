'use client'

import { useAuth } from '@/lib/auth/context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireRole?: 'user' | 'admin'
  fallbackUrl?: string
}

export default function ProtectedRoute({ 
  children, 
  requireRole = 'user',
  fallbackUrl = '/account/login' 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(fallbackUrl)
        return
      }

      if (requireRole === 'admin' && user?.role !== 'admin') {
        router.push('/')
        return
      }
    }
  }, [isAuthenticated, isLoading, user, requireRole, router, fallbackUrl])

  // Show loading state
  if (isLoading) {
    return (
      <div className="protected-route-loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // Show nothing while redirecting
  if (!isAuthenticated || (requireRole === 'admin' && user?.role !== 'admin')) {
    return null
  }

  return <>{children}</>
}
