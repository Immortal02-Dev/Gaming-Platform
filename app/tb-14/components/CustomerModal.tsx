'use client'

import { useEffect } from 'react'

export interface ModalItem {
  id: number
  category: string
  title: string
  content: string
}

interface CustomerModalProps {
  isOpen: boolean
  onClose: () => void
  items: ModalItem[]
  currentIndex: number
  onNavigate: (direction: 'prev' | 'next') => void
  modalTitle?: string
}

const CustomerModal = ({ 
  isOpen, 
  onClose, 
  items, 
  currentIndex,
  onNavigate,
  modalTitle = '공지사항 글보기'
}: CustomerModalProps) => {
  const currentItem = items[currentIndex]
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < items.length - 1

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        onNavigate('prev')
      } else if (e.key === 'ArrowRight' && hasNext) {
        onNavigate('next')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, hasPrev, hasNext, onClose, onNavigate])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen || !currentItem) return null

  return (
    <div className="modal-container" id="customer-modal" style={{ display: 'flex' }}>
      <div className="modal-wrapper" style={{ zIndex: 110, maxWidth: '1090px' }}>
        <div className="modal-header">
          <p className="modal-title">{modalTitle}</p>
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
          <div className="modal-content-title">
            <div className="modal-content-text">
              {currentItem.title}
            </div>
          </div>
          <div className="modal-body-inner">
            <div className="modal-body-scroll">
              <div className="modal-scroll-inner">
                <div className="modal-content">
                  <div className="modal-content-inner">
                    <div className="modal-text-content">
                      <div className="toastui-editor-client">
                        <div className="toastui-editor-contents">
                          <div className="jpDkPF">
                            <div>
                              <div dangerouslySetInnerHTML={{ __html: currentItem.content }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="jKPXdS" style={{ zIndex: 3000 }}>
        <button 
          disabled={!hasPrev} 
          className="dvbazz"
          onClick={() => hasPrev && onNavigate('prev')}
          aria-label="Previous item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="55"
            height="55"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="M752.145 0c8.685 0 17.572 3.434 24.237 10.099c13.33 13.33 13.33 35.143 0 48.473L320.126 515.03l449.591 449.591c13.33 13.33 13.33 35.144 0 48.474c-13.33 13.33-35.142 13.33-48.472 0L247.418 539.268c-13.33-13.33-13.33-35.144 0-48.474L727.91 10.1C734.575 3.435 743.46.002 752.146.002z"
            />
          </svg>
        </button>
        <button 
          disabled={!hasNext} 
          className="dvbazz"
          onClick={() => hasNext && onNavigate('next')}
          aria-label="Next item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="55"
            height="55"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="M271.653 1023.192c-8.685 0-17.573-3.432-24.238-10.097c-13.33-13.33-13.33-35.144 0-48.474L703.67 508.163L254.08 58.573c-13.33-13.331-13.33-35.145 0-48.475c13.33-13.33 35.143-13.33 48.473 0L776.38 483.925c13.33 13.33 13.33 35.143 0 48.473l-480.492 480.694c-6.665 6.665-15.551 10.099-24.236 10.099z"
            />
          </svg>
        </button>
      </div>
      
      {/* Backdrop */}
      <div className="modal-backdrop" style={{ zIndex: 100 }} onClick={onClose}></div>
    </div>
  )
}

export default CustomerModal