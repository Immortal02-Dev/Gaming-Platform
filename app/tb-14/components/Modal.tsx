'use client'

import { ReactNode, useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  className?: string
}

const Modal = ({ isOpen, onClose, title, children, className = '' }: ModalProps) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className={`modal-container ${className}`} style={{ display: 'flex' }}>
      <div className="modal-wrapper" style={{ zIndex: 11 }}>
        <div className="modal-header">
          <p className="modal-title">{title}</p>
          <button className="modal-close-btn" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="29"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M10 8.586L2.929 1.515L1.515 2.929L8.586 10l-7.071 7.071l1.414 1.414L10 11.414l7.071 7.071l1.414-1.414L11.414 10l7.071-7.071l-1.414-1.414L10 8.586z"
              />
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-body-inner">
            <div className="modal-body-scroll">
              <div className="modal-scroll-inner">
                <div className="modal-content">
                  <div className="modal-content-inner">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal-backdrop"
        onClick={onClose}
        style={{ zIndex: 10 }}
      />
    </div>
  )
}

export default Modal
