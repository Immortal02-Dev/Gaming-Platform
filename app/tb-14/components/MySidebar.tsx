'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth/context'

const MySidebar = () => {
  const pathname = usePathname()
  const { logout } = useAuth()

  const sidebarItems = [
    {
      href: '/my',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          className="sidebar-icon"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0S112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"
          />
        </svg>
      ),
      text: '내정보'
    },
    {
      href: '/my/deposit',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          className="sidebar-icon"
          viewBox="0 0 256 256"
        >
          <path
            fill="currentColor"
            d="m223.16 68.42l-16-32A8 8 0 0 0 200 32H56a8 8 0 0 0-7.16 4.42l-16 32A8.08 8.08 0 0 0 32 72v136a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V72a8.08 8.08 0 0 0-.84-3.58M60.94 48h134.12l8 16H52.94ZM208 208H48V80h160zm-42.34-77.66a8 8 0 0 1-11.32 11.32L136 123.31V184a8 8 0 0 1-16 0v-60.69l-18.34 18.35a8 8 0 0 1-11.32-11.32l32-32a8 8 0 0 1 11.32 0Z"
          />
        </svg>
      ),
      text: '입금 신청'
    },
    {
      href: '/my/withdrawal',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          className="sidebar-icon"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            color="currentColor"
          >
            <path
              d="m18.935 13.945l-.67-3.648c-.29-1.576-.435-2.364-1.008-2.83S15.86 7 14.213 7H9.787c-1.647 0-2.47 0-3.044.467c-.573.466-.718 1.254-1.008 2.83l-.67 3.648c-.6 3.271-.901 4.907.024 5.98C6.014 21 7.724 21 11.142 21h1.716c3.418 0 5.128 0 6.053-1.074s.625-2.71.024-5.98"
            />
            <path
              d="M10.438 16.667v-5.334m1.562 0V10m0 8v-1.333M10.438 14h3.124m0 0c.518 0 .938.448.938 1v.667c0 .552-.42 1-.937 1H9.5M13.563 14c.517 0 .937-.448.937-1v-.667c0-.552-.42-1-.937-1H9.5M21 11a1.5 1.5 0 0 0 .414-.305C22 10.089 22 9.11 22 7.152s0-2.936-.586-3.544S19.886 3 18 3H6c-1.886 0-2.828 0-3.414.608S2 5.195 2 7.152s0 2.936.586 3.543q.18.188.414.305"
            />
          </g>
        </svg>
      ),
      text: '출금 신청'
    },
    {
      href: '/my/money',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          className="sidebar-icon"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10Zm0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16Zm1-8h4v2h-6V7h2v5Z"
          />
        </svg>
      ),
      text: '머니내역'
    },
    {
      href: '/my/point',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          className="sidebar-icon"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M3.586 16.5L8.5 11.586L9.914 13l-2.5 2.5H19.5v2H7.414l2.5 2.5L8.5 21.414L3.586 16.5Zm.914-10h12.086l-2.5-2.5L15.5 2.586L20.414 7.5L15.5 12.414L14.086 11l2.5-2.5H4.5v-2Z"
          />
        </svg>
      ),
      text: '포인트전환'
    },
    {
      href: '/my/attendance',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          className="sidebar-icon"
          viewBox="0 0 14 14"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M4.5 1a1 1 0 0 0-2 0v1h-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h11a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 12.5 2h-1V1a1 1 0 1 0-2 0v1h-5zm2.489 4.125a.5.5 0 0 1 .454.27l.002.004l.744 1.498h.003l1.65.25a.5.5 0 0 1 .274.862L8.955 9.112a.25.25 0 0 1 .018.063l.232 1.636a.5.5 0 0 1-.739.529l-1.456-.77a.044.044 0 0 0-.028 0l-1.456.77a.5.5 0 0 1-.738-.533l.276-1.638a.252.252 0 0 1 .006-.026L3.875 7.999l-.005-.005a.5.5 0 0 1 .277-.846h.003l1.653-.243l.001-.002l.743-1.493a.5.5 0 0 1 .442-.285"
            clipRule="evenodd"
          />
        </svg>
      ),
      text: '출석부'
    },
    {
      href: '/my/message',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          className="sidebar-icon"
          viewBox="0 0 20 20"
        >
          <path
            fill="currentColor"
            d="M0 8v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-10 4z"
          />
          <path
            fill="currentColor"
            d="M2 2a2 2 0 0 0-2 2v2l10 4l10-4V4a2 2 0 0 0-2-2z"
          />
        </svg>
      ),
      text: '쪽지'
    },
    {
      href: '/my/bets',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          className="sidebar-icon"
          viewBox="0 0 24 24"
        >
          <g fill="none">
            <path
              d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"
            />
            <path
              fill="currentColor"
              d="M19 4a2 2 0 0 1 1.995 1.85L21 6v4a2 2 0 0 1-1.85 1.995L19 12H5a2 2 0 0 1-1.995-1.85L3 10V6a2 2 0 0 1 1.85-1.995L5 4zm0 2H5v4h14zm-9 1a1 1 0 0 1 .117 1.993L10 9H8a1 1 0 0 1-.117-1.993L8 7zm9 6a2 2 0 0 1 1.995 1.85L21 15v4a2 2 0 0 1-1.85 1.995L19 21H5a2 2 0 0 1-1.995-1.85L3 19v-4a2 2 0 0 1 1.85-1.995L5 13zm0 2H5v4h14zm-9 1a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2z"
            />
          </g>
        </svg>
      ),
      text: '베팅내역'
    }
  ]

  return (
    <div className="main-sidebar">
      <div className="sidebar-menu">
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`sidebar-item ${pathname === item.href ? 'active' : ''}`}
          >
            <div className="sidebar-label">
              {item.icon}
              <span className="sidebar-text">{item.text}</span>
            </div>
          </Link>
        ))}
        
        {/* Logout button */}
        <button
          onClick={logout}
          className="sidebar-item"
          style={{  width: '100%', textAlign: 'left' }}
        >
          <div className="sidebar-label">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              className="sidebar-icon"
              viewBox="0 0 717 672"
            >
              <path
                fill="currentColor"
                d="M0 151v391c0 36 15 68 39 93c24 24 55 37 91 37h196v-81H130c-27 0-48-22-48-49V151c0-27 21-48 48-48h196V21H130c-36 0-67 14-91 38c-24 25-39 56-39 92zm215 118v156c0 18 16 33 34 33h181v123c0 11 6 20 16 25c4 1 8 1 10 1c7 0 13-2 18-7l235-235c11-9 10-27 0-37L474 94c-14-15-44-6-44 18v124H249c-18 0-34 15-34 33z"
              />
            </svg>
            <span className="sidebar-text">로그아웃</span>
          </div>
        </button>
      </div>
    </div>
  )
}

export default MySidebar
