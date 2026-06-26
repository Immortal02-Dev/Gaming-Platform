'use client'

import { useState } from 'react'
import Image from 'next/image'

interface SportsSidebarProps {
  isLive?: boolean
}

const SportsSidebar = ({ isLive = false }: SportsSidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [activeItem, setActiveItem] = useState<string>('all-sports')

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const isCurrentlyExpanded = prev.includes(itemId)
      
      if (isCurrentlyExpanded) {
        // Collapsing - go back to all-sports
        setActiveItem('all-sports')
        return prev.filter(id => id !== itemId)
      } else {
        // Expanding - set as active and close others
        setActiveItem(itemId)
        return [itemId]  // Only keep this one expanded
      }
    })
  }

  const liveSidebarItems = [
    {
      id: 'all-sports',
      text: '인플레이 전체',
      icon: (
        <svg className="sidebar-icon" width="24" height="24" viewBox="0 0 32 32">
          <circle cx="16" cy="8" r="4"></circle>
          <circle cx="8" cy="16" r="4"></circle>
          <circle cx="24" cy="16" r="4"></circle>
          <circle cx="16" cy="24" r="4"></circle>
        </svg>
      )
    },
    {
      id: 'popular',
      text: '인기리그',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="sidebar-icon" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
            <path d="M17.5 8S19 9.5 19 12s-1.5 4-1.5 4m3-11S23 7.5 23 12s-2.5 7-2.5 7M6.5 8S5 9.5 5 12s1.5 4 1.5 4m-3-11S1 7.5 1 12s2.5 7 2.5 7"/>
            <path fill="currentColor" d="M12 13a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"/>
          </g>
        </svg>
      ),
      expandable: true,
      subItems: [
        {
          text: 'K리그 1',
          icons: [
            'https://p.staticube.com/common/cd42be37-ea6a-41b0-9469-fb5613e881da.svg',
            'https://p.staticube.com/common/flags/circle/kr.svg'
          ],
          count: 2
        }
      ]
    },
    {
      id: 'other',
      text: '그외리그',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="sidebar-icon" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
            <path d="M17.5 8S19 9.5 19 12s-1.5 4-1.5 4m3-11S23 7.5 23 12s-2.5 7-2.5 7M6.5 8S5 9.5 5 12s1.5 4 1.5 4m-3-11S1 7.5 1 12s2.5 7 2.5 7"/>
            <path fill="currentColor" d="M12 13a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"/>
          </g>
        </svg>
      ),
      expandable: true,
      subItems: [
        { text: 'K리그 1', icons: ['https://p.staticube.com/common/flags/circle/kr.svg'], count: 2 },
        { text: 'K리그 1', icons: ['https://p.staticube.com/common/flags/circle/kr.svg'], count: 2 },
        { text: 'K리그 1', icons: ['https://p.staticube.com/common/flags/circle/kr.svg'], count: 2 }
      ]
    }
  ]

  const preSidebarItems = [
    {
      id: 'all-sports',
      text: '스포츠 전체',
      icon: (
        <svg className="sidebar-icon" width="24" height="24" viewBox="0 0 32 32">
          <circle cx="16" cy="8" r="4"></circle>
          <circle cx="8" cy="16" r="4"></circle>
          <circle cx="24" cy="16" r="4"></circle>
          <circle cx="16" cy="24" r="4"></circle>
        </svg>
      )
    },
    {
      id: 'popular',
      text: '인기리그',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="sidebar-icon">
          <path fill="currentColor" d="m6.156 9.323l-.002.002l-.004.003l-.01.008a1.943 1.943 0 0 0-.126.104a4.557 4.557 0 0 0-.302.291c-.24.253-.548.629-.837 1.132c-.582 1.015-1.071 2.528-.796 4.551c.271 1.997 1.11 3.666 2.528 4.83C8.021 21.404 9.935 22 12.25 22c2.387 0 4.293-.895 5.554-2.43c1.25-1.521 1.808-3.596 1.675-5.864c-.128-2.176-1.313-3.827-2.36-5.285l-.299-.417c-1.142-1.612-2.043-3.097-1.824-5.175A.75.75 0 0 0 14.25 2c-.382 0-.82.118-1.242.296a6.49 6.49 0 0 0-1.373.8c-.925.698-1.85 1.75-2.343 3.156C8.8 7.654 9.05 8.99 9.41 9.963c.237.639-.02 1.27-.407 1.454a.706.706 0 0 1-.927-.31L7.27 9.576a.75.75 0 0 0-1.113-.252Z"/>
        </svg>
      ),
      expandable: true,
      subItems: [
        {
          text: 'K리그 1',
          icons: [
            'https://p.staticube.com/common/cd42be37-ea6a-41b0-9469-fb5613e881da.svg',
            'https://p.staticube.com/common/flags/circle/kr.svg'
          ],
          count: 2
        }
      ]
    },
    {
      id: 'soccer',
      text: '축구',
      icon: (
        <div className="sidebar-icon">
          <Image src="/assets/svg/soccer.svg" alt="로고이미지" width={19} height={19} />
        </div>
      ),
      expandable: true,
      subItems: [
        { text: '세계', icons: ['https://p.staticube.com/common/fe7b60e7-882c-45d8-8038-7f59ab55953e.svg'], count: 37 },
        { text: '대한민국', icons: ['https://p.staticube.com/common/flags/circle/kr.svg'], count: 2 },
        { text: '일본', icons: ['/assets/svg/jp.svg'], count: 4 },
        { text: '호주', icons: ['/assets/svg/au.svg'], count: 22 },
        { text: '베트남', icons: ['/assets/svg/vn.svg'], count: 1 }
      ]
    },
    {
      id: 'baseball',
      text: '야구',
      icon: (
        <div className="sidebar-icon">
          <Image src="/assets/svg/baseball.svg" alt="로고이미지" width={19} height={19} />
        </div>
      ),
      expandable: true,
      subItems: [
        { text: '대한민국', icons: ['https://p.staticube.com/common/flags/circle/kr.svg'], count: 1 },
        { text: '일본', icons: ['/assets/svg/jp.svg'], count: 2 },
        { text: '미국', icons: ['/assets/svg/us.svg'], count: 15 }
      ]
    },
    {
      id: 'basketball',
      text: '농구',
      icon: (
        <div className="sidebar-icon">
          <Image src="/assets/svg/basketball.svg" alt="로고이미지" width={19} height={19} />
        </div>
      ),
      expandable: true,
      subItems: [
        { text: '미국', icons: ['/assets/svg/us.svg'], count: 8 },
        { text: '유럽', icons: ['/assets/svg/eu.svg'], count: 12 },
        { text: '대한민국', icons: ['https://p.staticube.com/common/flags/circle/kr.svg'], count: 1 }
      ]
    },
    {
      id: 'Volleyball',
      text: '배구',
      icon: (
        <div className="sidebar-icon">
          <Image src="/assets/svg/volleyball.svg" alt="로고이미지" width={19} height={19} />
        </div>
      ),
      expandable: true,
      subItems: [
        { text: '세계', icons: ['https://p.staticube.com/common/fe7b60e7-882c-45d8-8038-7f59ab55953e.svg'], count: 37 },  
        { text: '대한민국', icons: ['https://p.staticube.com/common/flags/circle/kr.svg'], count: 2 },
        { text: '일본', icons: ['/assets/svg/jp.svg'], count: 4 },
        { text: '호주', icons: ['/assets/svg/au.svg'], count: 22 },
        { text: '베트남', icons: ['/assets/svg/vn.svg'], count: 1 }
      ]
    },

    {
      id: 'Football',
      text: '미식축구',
      icon: (
        <div className="sidebar-icon">
          <Image src="/assets/svg/football.svg" alt="로고이미지" width={19} height={19} />
        </div>
      ),
      expandable: true,
      subItems: [
        { text: '세계', icons: ['https://p.staticube.com/common/fe7b60e7-882c-45d8-8038-7f59ab55953e.svg'], count: 37 },  
        { text: '대한민국', icons: ['https://p.staticube.com/common/flags/circle/kr.svg'], count: 2 },
        { text: '일본', icons: ['/assets/svg/jp.svg'], count: 4 },
        { text: '호주', icons: ['/assets/svg/au.svg'], count: 22 },
        { text: '베트남', icons: ['/assets/svg/vn.svg'], count: 1 }
      ]
    },
    {
      id: 'Tennis Table',
      text: '탁구',
      icon: (
        <div className="sidebar-icon">
          <Image src="/assets/svg/tabletennis.svg" alt="로고이미지" width={19} height={19} />
        </div>
      ),
      expandable: true,
      subItems: [
        { text: '세계', icons: ['https://p.staticube.com/common/fe7b60e7-882c-45d8-8038-7f59ab55953e.svg'], count: 37 },  
        { text: '대한민국', icons: ['https://p.staticube.com/common/flags/circle/kr.svg'], count: 2 },
        { text: '일본', icons: ['/assets/svg/jp.svg'], count: 4 },
        { text: '호주', icons: ['/assets/svg/au.svg'], count: 22 },
        { text: '베트남', icons: ['/assets/svg/vn.svg'], count: 1 }
      ]
    },
    {
      id: 'Boxing',
      text: '복싱',
      icon: (
        <div className="sidebar-icon">
          <Image src="/assets/svg/boxing.svg" alt="로고이미지" width={19} height={19} />
        </div>
      ),
      expandable: true,
      subItems: [
        { text: '세계', icons: ['https://p.staticube.com/common/fe7b60e7-882c-45d8-8038-7f59ab55953e.svg'], count: 37 },  
        { text: '대한민국', icons: ['https://p.staticube.com/common/flags/circle/kr.svg'], count: 2 },
        { text: '일본', icons: ['/assets/svg/jp.svg'], count: 4 },
        { text: '호주', icons: ['/assets/svg/au.svg'], count: 22 },
        { text: '베트남', icons: ['/assets/svg/vn.svg'], count: 1 }
      ]
    }
  ]

  const sidebarItems = isLive ? liveSidebarItems : preSidebarItems
  const isExpanded = (itemId: string) => expandedItems.includes(itemId)

  return (
    <div className="main-sidebar">
      <div className="sidebar-menu">
        {sidebarItems.map((item) => (
          <div key={item.id}>
            <a 
              href="#" 
              className={`sidebar-item ${activeItem === item.id ? 'active' : ''}`} 
              data-sport={item.id}
              onClick={(e) => {
                e.preventDefault()
                if (item.expandable) {
                  toggleExpanded(item.id)
                } else {
                  // For non-expandable items (like all-sports), just set as active
                  setActiveItem(item.id)
                }
              }}
            >
              <div className="sidebar-label">
                {item.icon}
                <span className="sidebar-text">{item.text}</span>
              </div>
              {item.expandable && (
                <button 
                  className="sidebar-expansion-btn"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    toggleExpanded(item.id)
                  }}
                >
                  {isExpanded(item.id) ? (
                    // Minus icon when expanded
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      className="sidebar-icon"
                    >
                      <path
                        fill="currentColor"
                        d="M11.96 1.75A10.25 10.25 0 1 0 22.25 12A10.261 10.261 0 0 0 11.96 1.75M17.25 13H6.69a1 1 0 1 1 0-2h10.56a1 1 0 0 1 0 2z"
                      />
                    </svg>
                  ) : (
                    // Plus icon when collapsed
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      className="sidebar-icon"
                    >
                      <path
                        fill="currentColor"
                        d="M11.96 1.75A10.25 10.25 0 1 0 22.25 12A10.261 10.261 0 0 0 11.96 1.75M17.25 13h-4.28v4.27a1 1 0 0 1-2 0V13H6.69a1 1 0 1 1 0-2h4.28V6.68a1 1 0 0 1 2 0v4.28h4.28a1 1 0 0 1 0 2z"
                      />
                    </svg>
                  )}
                </button>
              )}
            </a>
            
            {item.expandable && item.subItems && isExpanded(item.id) && (
              <div className="sidebar-subMenu collapsed">
                {item.subItems.map((subItem, index) => (
                  <a key={index} href="#" className="sidebar-subItem">
                    <div className="sidebar-subLabel">
                      {subItem.icons?.map((iconSrc, iconIndex) => (
                        <div key={iconIndex} className="sidebar-subIcon">
                          <Image src={iconSrc} alt="로고이미지" width={19} height={19} />
                        </div>
                      ))}
                      <span className="sidebar-subText">{subItem.text}</span>
                    </div>
                    <button className="sidebar-subBadge">
                      <div className="sidebar-badgeText">{subItem.count}</div>
                    </button>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SportsSidebar
