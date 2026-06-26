'use client'

import { useState, useEffect } from 'react'

interface UseModalProps {
  modalId?: string
  urlParam?: string
}

export const useModal = ({ modalId, urlParam }: UseModalProps = {}) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
    
    // Handle URL updates for specific modals (like Powerball)
    if (urlParam && typeof window !== 'undefined') {
      const randomId = Math.floor(10000 + Math.random() * 90000)
      const query = `?${urlParam}&modalId=${randomId}`
      if (!window.location.search.includes(urlParam)) {
        window.history.pushState({ modalOpen: true }, '', query)
      }
    }
  }

  const closeModal = () => {
    setIsOpen(false)
    
    // Handle URL cleanup for specific modals
    if (urlParam && typeof window !== 'undefined') {
      const originalPath = window.location.pathname
      window.history.replaceState({}, '', originalPath)
    }
  }

  // Handle browser back/forward navigation
  useEffect(() => {
    if (!urlParam || typeof window === 'undefined') return

    const handlePopState = () => {
      if (window.location.search.includes(urlParam)) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }

    // Check if modal should be open on initial load
    if (window.location.search.includes(urlParam)) {
      setIsOpen(true)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [urlParam])

  return {
    isOpen,
    openModal,
    closeModal,
    setIsOpen
  }
}
