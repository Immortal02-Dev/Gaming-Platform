'use client'

import { useEffect, useRef, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import SportsSidebar from './SportsSidebar'
import BettingRulesModal from './BettingRulesModal'
import { useModal } from '@/lib/hooks/useModal'

interface SportsLayoutProps {
  children: React.ReactNode
  isLive?: boolean
}

const SportsLayout = ({ children, isLive = false }: SportsLayoutProps) => {
  const { isOpen, openModal, closeModal } = useModal()
  const betSlipRef = useRef<HTMLDivElement>(null)
  const dragHandleRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [initial, setInitial] = useState({ x: 0, y: 0 })
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [betAmount, setBetAmount] = useState('0')

  // Handle betting rules modal button click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const button = target.closest('.modal-trigger[data-target="betting-rules-modal-container"]')
      if (button) {
        e.preventDefault()
        openModal()
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [openModal])

  // Set initial position from localStorage or default to bottom-right
  useEffect(() => {
    if (typeof window !== 'undefined' && betSlipRef.current) {
      const savedPosition = localStorage.getItem('betSlipPosition')
      const isSmallScreen = window.innerWidth < 768
      
      if (savedPosition && !isSmallScreen) {
        const { x, y } = JSON.parse(savedPosition)
        const clampedX = Math.max(0, Math.min(window.innerWidth - betSlipRef.current.offsetWidth, x))
        const clampedY = Math.max(0, Math.min(window.innerHeight - betSlipRef.current.offsetHeight, y))
        setOffset({ x: clampedX, y: clampedY })
      } else {
        // Default position: bottom-right with 20px margin
        const defaultX = window.innerWidth - betSlipRef.current.offsetWidth - 20
        const defaultY = window.innerHeight - betSlipRef.current.offsetHeight - 20
        setOffset({ x: defaultX, y: defaultY })
      }
    }
  }, [])

  // Handle window resize - prevent bet slip from going off-screen
  useEffect(() => {
    const handleResize = () => {
      if (betSlipRef.current) {
        const clampedX = Math.max(0, Math.min(window.innerWidth - betSlipRef.current.offsetWidth, offset.x))
        const clampedY = Math.max(0, Math.min(window.innerHeight - betSlipRef.current.offsetHeight, offset.y))
        setOffset({ x: clampedX, y: clampedY })
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [offset])

  // Save position to localStorage before page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('betSlipPosition', JSON.stringify(offset))
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [offset])

  // Handle mouse/touch move
  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !betSlipRef.current) return
      e.preventDefault()

      let clientX: number, clientY: number

      if (e instanceof TouchEvent) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else {
        clientX = e.clientX
        clientY = e.clientY
      }

      const currentX = clientX - initial.x
      const currentY = clientY - initial.y

      const clampedX = Math.max(0, Math.min(window.innerWidth - betSlipRef.current.offsetWidth, currentX))
      const clampedY = Math.max(0, Math.min(window.innerHeight - betSlipRef.current.offsetHeight, currentY))

      setOffset({ x: clampedX, y: clampedY })
    }

    const handleEnd = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMove)
      document.addEventListener('mouseup', handleEnd)
      document.addEventListener('touchmove', handleMove)
      document.addEventListener('touchend', handleEnd)
    }

    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleEnd)
      document.removeEventListener('touchmove', handleMove)
      document.removeEventListener('touchend', handleEnd)
    }
  }, [isDragging, initial])

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    // Don't start dragging if clicking on the arrow button
    const target = e.target as HTMLElement
    if (target.closest('.bet-slip-head-arrow')) {
      return
    }
    
    if (dragHandleRef.current && dragHandleRef.current.contains(e.target as Node)) {
      let clientX: number, clientY: number

      if ('touches' in e) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else {
        clientX = e.clientX
        clientY = e.clientY
      }

      setInitial({
        x: clientX - offset.x,
        y: clientY - offset.y,
      })
      setIsDragging(true)
    }
  }

  const toggleCollapse = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsCollapsed(!isCollapsed)
  }

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '') // Only allow numbers
    setBetAmount(value)
  }

  const handleClearAmount = () => {
    setBetAmount('0')
  }

  const handleQuickAmount = (amount: string) => {
    const amounts: { [key: string]: string } = {
      '오천': '5000',
      '일만': '10000',
      '오만': '50000',
      '십만': '100000',
      '백만': '1000000',
      '전액': '0' // This would be replaced with user's balance
    }
    setBetAmount(amounts[amount] || '0')
  }
  return (
    <div className="wrapper">
      <Header />
      <main className="main">
        <div className="main-wrap">
          <SportsSidebar isLive={isLive} />
          <div className="main-content">
            {children}
            <Footer />
          </div>
        </div>
      </main>

      {/* Bet Slip Draggable */}
      <div 
        ref={betSlipRef}
        className="draggable-dragged draggable" 
        id="betSlip"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          cursor: isDragging ? 'grabbing' : 'default',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <div 
          ref={dragHandleRef}
          className="bet-slip-head"
          style={{ cursor: 'grab' }}
        >
          <div className="bet-slip-head-title">
            <p className="bet-slip-head-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  d="M15 4H1V2h14zm0 5H1V7h14zM1 14h14v-2H1z"
                />
              </svg>
              <span>베팅슬립</span>
            </p>
            <span className="bet-slip-head-value">1</span>
          </div>
          <button 
            className="bet-slip-head-arrow"
            onClick={toggleCollapse}
            style={{ cursor: 'pointer' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="currentColor"
                d="M8.2 275.4c0-8.6 3.4-17.401 10-24.001c13.2-13.2 34.8-13.2 48 0l451.8 451.8l445.2-445.2c13.2-13.2 34.8-13.2 48 0s13.2 34.8 0 48L542 775.399c-13.2 13.2-34.8 13.2-48 0l-475.8-475.8c-6.8-6.8-10-15.4-10-24.199z"
              />
            </svg>
          </button>
        </div>

        <div 
          className="bet-slip-body"
          style={{
            display: isCollapsed ? 'none' : 'flex',
          }}
        >
          <div className="bet-body-item-one">
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                height: 'auto',
                minHeight: '85px',
                maxHeight: '661px',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  overflow: 'scroll',
                  marginRight: '-15px',
                  marginBottom: '-15px',
                  minHeight: 'calc(100px)',
                  maxHeight: 'calc(676px)',
                }}
              >
                <div className="bet-slip-folder">
                  <div className="bet-slip-folder-wrapper">
                    <button className="bet-slip-folder-btn">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M18 6L6 18M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <div className="bet-slip-folder-item">
                      <div className="bet-slip-folder-closed">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="19"
                          viewBox="0 0 1024 1024"
                        >
                          <path
                            fill="currentColor"
                            d="M864 448q-44 0-85 13t-74 32l-66 38l-74 32l-85 13q-97 0-160-81V64q18 23 36.5 37t40.5 19.5t36 6.5t39 1h8q44 0 85-13t74-32l66-38l74-32l85-13q40 0 81.5 24t78.5 72v416q-23-23-43.5-37T939 455.5t-35-6.5t-40-1zM384 960.5q0 26.5-18.5 45T320 1024H64q-26 0-45-18.5t-19-45T19 915t45-19h64V64q0-26 18.5-45T192 0t45.5 18.5T256 64v832h64q27 0 45.5 19t18.5 45.5z"
                          />
                        </svg>
                        베팅닫힘
                      </div>
                      <div className="bet-slip-folder-title">
                        <span>Tomas Hnizdil </span><span>1.39</span>
                      </div>
                      <div className="bet-slip-folder-desc">
                        <span>승패</span>
                        <div className="bet-slip-folder-icons">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill="currentColor"
                              d="M9 8a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
                            />
                            <path
                              fill="currentColor"
                              fillRule="evenodd"
                              d="M9.68 5.26a.75.75 0 0 1 1.06 0a3.875 3.875 0 0 1 0 5.48a.75.75 0 1 1-1.06-1.06a2.375 2.375 0 0 0 0-3.36a.75.75 0 0 1 0-1.06m-3.36 0a.75.75 0 0 1 0 1.06a2.375 2.375 0 0 0 0 3.36a.75.75 0 1 1-1.06 1.06a3.875 3.875 0 0 1 0-5.48a.75.75 0 0 1 1.06 0"
                              clipRule="evenodd"
                            />
                            <path
                              fill="currentColor"
                              fillRule="evenodd"
                              d="M11.89 3.05a.75.75 0 0 1 1.06 0a7 7 0 0 1 0 9.9a.75.75 0 1 1-1.06-1.06a5.5 5.5 0 0 0 0-7.78a.75.75 0 0 1 0-1.06m-7.78 0a.75.75 0 0 1 0 1.06a5.5 5.5 0 0 0 0 7.78a.75.75 0 1 1-1.06 1.06a7 7 0 0 1 0-9.9a.75.75 0 0 1 1.06 0"
                              clipRule="evenodd"
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 128 128"
                          >
                            <ellipse
                              cx="64"
                              cy="64"
                              fill="#fff"
                              rx="60.14"
                              ry="60.13"
                            />
                            <g fill="#2f2f2f">
                              <path
                                d="M88.68 63.26c-2.33-.33-4.4 1.53-6.22 2.7c-3.93 2.51-7.4 5.42-10.75 8.7c-2.07 2.03-4.87 4.73-5.61 7.65c-.34 1.35.08 2.9.35 4.22c.47 2.3 1.19 4.54 1.91 6.77a77.33 77.33 0 0 0 2.82 7.38c.53 1.21 1.11 2.41 1.68 3.61c.53 1.12.88 1.78 2.18 1.95c1.46.19 2.92-.03 4.37-.09c2.14-.08 4.28-.29 6.39-.65c2.79-.47 5.6-.98 8.27-1.93c2.47-.89 5.3-2.27 6.73-4.54c3.07-4.88 4.93-10.42 5.95-16.07c.3-1.63.59-3.29.58-4.96c.01-1.47.14-2.98-.92-4.11c-1.9-2.04-4.15-3.73-6.48-5.26c-3.45-2.24-7.06-4.77-11.25-5.37zM20.83 39.68c-2.17 1.15-3.87 3.89-5.14 5.9c-2.54 4-4.59 8.62-5.55 13.27c-.73 3.56.86 7.03 2.05 10.32c1.16 3.17 3.18 5.68 5.39 8.17c.56.64 1.27 1.12 1.83 1.75c.64.71 1.45 1.38 2.29 1.85c.6.34 1.14-.12 1.75-.26c1.61-.39 2.81-1.21 4.27-1.98c1.31-.7 2.66-1.29 3.98-1.99c2.83-1.52 6.2-2.77 8.67-4.86c.32-.27.74-.61.83-1.04c.23-1.07-.09-2.46-.14-3.55c-.06-1.53-.08-3.05-.09-4.58c-.01-3.46.12-6.92.12-10.38c.03-1.93.27-3.85.18-5.78c-.16-2.87-3.26-3.89-5.59-4.47c-3.27-.81-6.56-1.92-9.9-2.33c-1.38-.15-3.66-.72-4.95-.04zm84.89-8.63c.31-2.17-1.14-4.78-2.19-6.72c-2.08-3.87-5.06-7.67-8.78-10.69c-2.84-2.31-7.02-3.25-10.91-3.64c-6.97-.71-12.29-.28-13.76-.05c-1.48.23-2.87.68-3.66 1.66c-1.56 1.9-1.83 4.62-2.16 6.96c-.48 3.34-.9 6.78-.46 10.14c.07.6.16 1.39.45 1.92c.55.98 1.71 1.47 2.86 1.98c5.96 2.63 17.33 9.14 19.18 10.02c2.76 1.33 5.7-.44 7.74-1.87c2.83-1.99 5.98-3.86 8.48-6.11c1.03-.92 3.02-2.32 3.21-3.6zm-85.61 74.39c.24.37.47.65.84.93c.59.45 1.15.91 1.71 1.4c4.89 4.29 10.62 7.52 16.3 10.62c1.71.94 3.34 1.9 5.08 2.77c1.88.93 3.82 1.56 5.84 2.12c1.37.38 2.76.75 4.18.89c1.32.13 2.67.44 4 .46c.76.01 1.46-.02 2.2-.12c-.36-.58-.68-1.32-.99-1.94c-.49-.97-.99-1.95-1.49-2.91c-.58-1.11-1.03-2.27-1.62-3.37c-.46-.84-1.06-1.71-1.89-2.2c-1.11-.66-2.17-1.31-3.38-1.8c-4.42-1.8-8.38-4.34-12.49-6.72c-2.08-1.21-4.12-2.5-6.08-3.91c-1.05-.75-2.07-1.53-3.18-2.2c-.23-.15-.46-.33-.73-.37c-.24-.04-.61-.03-.85 0c-.22.03-.48.07-.69.11c-1.44.3-3 .68-4.49 1.01c-1.42.32-3.01.43-4.37.95c-.53.2-.47.5-.26.96c.32.72.79 1.38 1.28 1.98c.33.43.74.83 1.08 1.34z"
                              />
                              <path
                                d="M37.41 48.32a1.795 1.795 0 0 1-1.4-2.92c.49-.6 12.03-14.74 32.67-17.94a1.79 1.79 0 1 1 .54 3.54C50.01 33.99 38.91 47.52 38.8 47.65c-.36.44-.87.67-1.39.67zm-4.26 62.78c-.52 0-1.04-.22-1.39-.66c-.49-.6-11.86-14.88-10.63-35.72c.06-.99.9-1.75 1.89-1.69c.99.06 1.74.91 1.68 1.9c-1.14 19.47 9.73 33.12 9.84 33.25c.63.77.5 1.9-.26 2.52c-.33.26-.73.4-1.13.4zm13.52 7.04c-.92 0-1.7-.7-1.78-1.64c-.08-.99.65-1.86 1.64-1.94c.17-.01 17.59-1.65 30.81-15.91a1.8 1.8 0 0 1 2.54-.09c.73.67.77 1.81.09 2.54c-14.2 15.3-32.38 16.97-33.14 17.04c-.06-.01-.11 0-.16 0zM21.76 46.17c-.84 0-1.59-.59-1.75-1.45c-.1-.5-2.36-12.35 2.51-26.39c.33-.94 1.34-1.44 2.28-1.11c.93.33 1.43 1.34 1.11 2.28c-4.56 13.14-2.41 24.41-2.38 24.53c.19.97-.44 1.92-1.42 2.11c-.11.02-.23.03-.35.03zm52.11-29.41c-.37 0-.75-.12-1.06-.36c-.09-.06-9.42-6.83-23.19-8.34c-.98-.1-1.7-.99-1.59-1.97c.1-.99.99-1.69 1.97-1.59c14.78 1.61 24.52 8.71 24.93 9.01c.79.59.96 1.71.37 2.51c-.34.49-.88.74-1.43.74zm45.26 29.17c-.52 0-1.04-.23-1.4-.67c-8.74-10.81-19.44-14.96-19.54-15a1.799 1.799 0 0 1-1.05-2.31c.35-.93 1.39-1.39 2.31-1.05c.48.18 11.72 4.54 21.06 16.1c.63.77.5 1.9-.27 2.52c-.32.28-.72.41-1.11.41zM87.48 70.17c-.07 0-.16-.01-.23-.02a1.784 1.784 0 0 1-1.54-2.01c2.29-17.14.04-29.8.01-29.93c-.18-.97.46-1.91 1.44-2.08c.98-.19 1.91.47 2.09 1.44c.09.54 2.38 13.35.01 31.05c-.12.9-.89 1.55-1.78 1.55zM71.92 84.81c-.06 0-.1 0-.16-.01c-22.28-1.97-36.94-14.54-37.56-15.07a1.8 1.8 0 0 1-.18-2.53c.65-.75 1.78-.83 2.53-.18c.15.12 14.45 12.35 35.53 14.21a1.794 1.794 0 0 1-.16 3.58zM7.93 64.26c-1.51 0-3.16-.19-4.7-.78a1.799 1.799 0 0 1-1.05-2.31c.36-.92 1.38-1.39 2.32-1.05c3.3 1.26 7.71-.03 7.76-.04c.94-.28 1.94.25 2.22 1.21c.29.94-.25 1.94-1.19 2.23c-.15.04-2.51.74-5.36.74zm97.74 15.3c-.68 0-1.32-.39-1.62-1.04c-.42-.89-.02-1.96.87-2.38c.1-.05 10.52-4.98 18.45-16.34c.56-.82 1.68-1.02 2.49-.45c.81.57 1.01 1.68.45 2.49c-8.5 12.19-19.42 17.33-19.88 17.55c-.26.11-.51.17-.76.17zm0 30.27c-.4 0-.8-.13-1.14-.39c-4.1-3.23-8.07-9.1-8.24-9.34c-.56-.84-.34-1.98.5-2.55c.83-.56 1.98-.34 2.54.51c.04.05 3.82 5.63 7.47 8.5c.79.63.93 1.78.31 2.58c-.37.44-.9.69-1.44.69z"
                              />
                              <path
                                d="M64 127.72C28.86 127.72.28 99.14.28 64C.28 28.87 28.86.28 64 .28s63.72 28.59 63.72 63.71c0 35.15-28.59 63.73-63.72 63.73zM64 7.45C32.82 7.45 7.45 32.82 7.45 64c0 31.18 25.36 56.55 56.54 56.55S120.54 95.18 120.54 64C120.55 32.82 95.17 7.45 64 7.45z"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="bet-slip-folder-match">
                        Tomas Hnizdil vs Radek Muller • 세계 • TT컵 남자 단식
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bet-slip-bonus-container">
            <p className="bet-slip-bonus-title">다폴더보너스 추가배당</p>
            <div className="bet-slip-bonus-sub">최소배당 1.5</div>
            <div className="bet-slip-bonus-list">
              <div className="bet-slip-bonus-item">
                <div className="bet-slip-bonus-fill"></div>
              </div>
              <div className="bet-slip-bonus-item">
                <div className="bet-slip-bonus-fill"></div>
              </div>
              <div className="bet-slip-bonus-item">
                <div className="bet-slip-bonus-count">x1.04<br />▼</div>
                <div className="bet-slip-bonus-fill"></div>
              </div>
              <div className="bet-slip-bonus-item">
                <div className="bet-slip-bonus-count">x1.06<br />▼</div>
                <div className="bet-slip-bonus-fill"></div>
              </div>
              <div className="bet-slip-bonus-item">
                <div className="bet-slip-bonus-count">x1.08<br />▼</div>
                <div className="bet-slip-bonus-fill"></div>
              </div>
              <div className="bet-slip-bonus-item">
                <div className="bet-slip-bonus-count">x1.1<br />▼</div>
                <div className="bet-slip-bonus-fill"></div>
              </div>
              <div className="bet-slip-bonus-item">
                <div className="bet-slip-bonus-count">x1.15<br />▼</div>
                <div className="bet-slip-bonus-fill"></div>
              </div>
              <div className="bet-slip-bonus-item">
                <div className="bet-slip-bonus-count">x1.2<br />▼</div>
                <div className="bet-slip-bonus-fill"></div>
              </div>
              <div className="bet-slip-bonus-item">
                <div className="bet-slip-bonus-count">x1.25<br />▼</div>
                <div className="bet-slip-bonus-fill"></div>
              </div>
              <div className="bet-slip-bonus-item">
                <div className="bet-slip-bonus-count">x1.3<br />▼</div>
                <div className="bet-slip-bonus-fill"></div>
              </div>
            </div>
          </div>
          <form className="bet-slip-form-container">
            <label htmlFor="amount" className="bet-slip-form-input">
              <div className="bet-slip-form-label">
                <span>베팅금액</span>
              </div>
              <div className="bet-slip-input-box">
                <input
                  inputMode="numeric"
                  id="amount"
                  autoComplete="off"
                  value={betAmount}
                  onChange={handleBetAmountChange}
                  name="amount"
                />
                <span className="bet-slip-input-unit"> 원 </span>
              </div>
              <button type="button" className="bet-slip-input-btn" onClick={handleClearAmount}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M20.48 3.512a11.966 11.966 0 0 0-8.486-3.514C5.366-.002-.007 5.371-.007 11.999c0 3.314 1.344 6.315 3.516 8.487A11.966 11.966 0 0 0 11.995 24c6.628 0 12.001-5.373 12.001-12.001c0-3.314-1.344-6.315-3.516-8.487zm-1.542 15.427a9.789 9.789 0 0 1-6.943 2.876c-5.423 0-9.819-4.396-9.819-9.819a9.789 9.789 0 0 1 2.876-6.943a9.786 9.786 0 0 1 6.942-2.876c5.422 0 9.818 4.396 9.818 9.818a9.785 9.785 0 0 1-2.876 6.942z"
                  />
                  <path
                    fill="currentColor"
                    d="m13.537 12l3.855-3.855a1.091 1.091 0 0 0-1.542-1.541l.001-.001l-3.855 3.855l-3.855-3.855A1.091 1.091 0 0 0 6.6 8.145l-.001-.001l3.855 3.855l-3.855 3.855a1.091 1.091 0 1 0 1.541 1.542l.001-.001l3.855-3.855l3.855 3.855a1.091 1.091 0 1 0 1.542-1.541l-.001-.001z"
                  />
                </svg>
              </button>
            </label>
            <div className="bet-slip-amount-btns">
              <button type="button" className="bet-slip-amount-btn" onClick={() => handleQuickAmount('오천')}>오천</button>
              <button type="button" className="bet-slip-amount-btn" onClick={() => handleQuickAmount('일만')}>일만</button>
              <button type="button" className="bet-slip-amount-btn" onClick={() => handleQuickAmount('오만')}>오만</button>
              <button type="button" className="bet-slip-amount-btn" onClick={() => handleQuickAmount('십만')}>십만</button>
              <button type="button" className="bet-slip-amount-btn" onClick={() => handleQuickAmount('백만')}>백만</button>
              <button type="button" className="bet-slip-amount-btn" onClick={() => handleQuickAmount('전액')}>전액</button>
            </div>
          </form>
          <div className="bet-slip-btn-container">
            <button type="button" color="default" className="bet-slip-action-btn">
              <div className="bet-slip-action-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      strokeWidth="1.5"
                      d="M12 21.5a9.5 9.5 0 1 0 0-19a9.5 9.5 0 0 0 0 19m.005-4.222v-6.333"
                    />
                    <path strokeWidth="2" d="M11.956 7.443h.01" />
                  </g>
                </svg>
              </div>
            </button>
            <button type="button" color="default" className="bet-slip-action-btn">
              <div className="bet-slip-action-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 56 56"
                >
                  <path
                    fill="currentColor"
                    d="m44.524 48.66l1.617-34.265h2.343c.961 0 1.735-.797 1.735-1.758s-.774-1.782-1.735-1.782H38.242V7.34c0-3.352-2.273-5.531-5.882-5.531h-8.766c-3.61 0-5.86 2.18-5.86 5.53v3.516H7.54c-.937 0-1.758.82-1.758 1.782c0 .96.82 1.758 1.758 1.758h2.344L11.5 48.684c.164 3.375 2.39 5.507 5.766 5.507h21.492c3.351 0 5.601-2.156 5.765-5.53M21.484 7.574c0-1.336.985-2.273 2.391-2.273h8.227c1.43 0 2.414.937 2.414 2.273v3.281H21.484Zm-3.867 43.102c-1.36 0-2.367-1.032-2.437-2.39l-1.64-33.891h28.85l-1.546 33.89c-.07 1.383-1.055 2.39-2.438 2.39Zm17.344-4.125c.773 0 1.36-.633 1.383-1.524l.703-24.75c.023-.89-.586-1.547-1.383-1.547c-.726 0-1.336.68-1.36 1.524l-.702 24.773c-.024.844.562 1.524 1.359 1.524m-13.898 0c.797 0 1.382-.68 1.359-1.524l-.703-24.773c-.024-.844-.656-1.524-1.383-1.524c-.797 0-1.383.657-1.36 1.547l.727 24.75c.024.891.586 1.524 1.36 1.524m8.367-1.524V20.254c0-.844-.633-1.524-1.407-1.524c-.773 0-1.43.68-1.43 1.524v24.773c0 .844.657 1.524 1.43 1.524c.75 0 1.407-.68 1.407-1.524"
                  />
                </svg>
              </div>
            </button>
            <button
              type="button"
              className="bet-slip-action-btn-fill"
              style={{ flex: '1 1 0%' }}
              disabled={true}
            >
              <div className="bet-slip-action-btn-title">
                <div className="bet-slip-action-btn-text">당첨금 0원 (1.39배)</div>
                베팅하기
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Betting Rules Modal */}
      <BettingRulesModal isOpen={isOpen} onClose={closeModal} />
    </div>
  )
}

export default SportsLayout
