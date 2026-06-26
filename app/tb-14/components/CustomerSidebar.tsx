'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const CustomerSidebar = () => {
  const pathname = usePathname()

  const sidebarItems = [
    {
      href: '/customer',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className="sidebar-icon" viewBox="0 0 24 24">
          <path fill="currentColor" fillRule="evenodd" d="M12.45 4.903a.75.75 0 0 0-.9 0l-6.5 4.875a.75.75 0 0 0-.3.6V18.5c0 .414.336.75.75.75H9V17a3 3 0 0 1 6 0v2.25h3.5a.75.75 0 0 0 .75-.75v-8.122a.75.75 0 0 0-.3-.6zm-1.8-1.2c.8-.6 1.9-.6 2.7 0l6.5 4.875c.567.425.9 1.092.9 1.8V18.5a2.25 2.25 0 0 1-2.25 2.25h-4.25a.75.75 0 0 1-.75-.75v-3a1.5 1.5 0 0 0-3 0v3a.75.75 0 0 1-.75.75H5.5a2.25 2.25 0 0 1-2.25-2.25v-8.122c0-.708.333-1.375.9-1.8z" clipRule="evenodd" />
        </svg>
      ),
      text: '고객센터 홈'
    },
    {
      href: '/customer/notices',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className="sidebar-icon" viewBox="0 0 24 24">
          <path fill="currentColor" fillRule="evenodd" d="M18.008 2.987C19.34 2.225 21 3.187 21 4.723v12.554c0 1.535-1.659 2.498-2.992 1.736L14 16.723V5.277l4.008-2.29zM12 6H7a5 5 0 0 0-1 9.9v3.6a2.5 2.5 0 0 0 5 0V16h1V6z" clipRule="evenodd" />
        </svg>
      ),
      text: '공지사항'
    },
    {
      href: '/customer/qna',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className="sidebar-icon" viewBox="0 0 26 26">
          <path fill="currentColor" d="M13 0c-1.7 0-3 1.3-3 3v6c0 1.7 1.3 3 3 3h6l4 4v-4c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3H13zm4.188 3h1.718l1.688 6h-1.5l-.407-1.5h-1.5L16.813 9H15.5l1.688-6zM18 4c-.1.4-.212.888-.313 1.188l-.28 1.312h1.187l-.282-1.313C18.113 4.888 18 4.4 18 4zM3 10c-1.7 0-3 1.3-3 3v6c0 1.7 1.3 3 3 3v4l4-4h6c1.7 0 3-1.3 3-3v-6h-3c-1.9 0-3.406-1.3-3.906-3H3zm4.594 2.906c1.7 0 2.5 1.4 2.5 3c0 1.4-.481 2.288-1.281 2.688c.4.2.874.306 1.374.406l-.374 1c-.7-.2-1.426-.512-2.126-.813c-.1-.1-.275-.093-.375-.093C6.112 18.994 5 18 5 16c0-1.7.994-3.094 2.594-3.094zm0 1.094c-.8 0-1.188.9-1.188 2c0 1.2.388 2 1.188 2c.8 0 1.218-.9 1.218-2s-.418-2-1.218-2z" />
        </svg>
      ),
      text: '1:1문의'
    },
    {
      href: '/customer/faq',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className="sidebar-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M5.455 15L1 18.5V3a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v12H5.455Zm-.692-2H16V4H3v10.385L4.763 13ZM8 17h10.237L20 18.385V8h1a1 1 0 0 1 1 1v13.5L17.546 19H9a1 1 0 0 1-1-1v-1Z" />
        </svg>
      ),
      text: '자주하는 질문'
    },
    {
      href: '/customer/guide',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className="sidebar-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M4 4.5A2.5 2.5 0 0 1 6.5 2H18a2.5 2.5 0 0 1 2.5 2.5v14.25a.75.75 0 0 1-.75.75H5.5a1 1 0 0 0 1 1h13.25a.75.75 0 0 1 0 1.5H6.5A2.5 2.5 0 0 1 4 19.5v-15ZM12.25 8a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm-.75 1.75v5a.75.75 0 0 0 1.5 0v-5a.75.75 0 0 0-1.5 0Z" />
        </svg>
      ),
      text: '이용가이드'
    },
    {
      href: '/customer/rule',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className="sidebar-icon" viewBox="0 0 24 24">
          <path fill="currentColor" fillRule="evenodd" d="m18.79 3.744l-4.214.718a3.001 3.001 0 0 0-5.516.94l-5.187.883a1 1 0 0 0 .336 1.972l.226-.039L2 13.495v.22C2 15.873 3.862 17.5 6 17.5s4-1.626 4-3.786v-.22l-2.663-5.77l2-.34A3 3 0 0 0 11 8.828V19H4v2h16v-2h-7V8.83a3 3 0 0 0 1.97-2.406l1.738-.296L14 11.995v.22C14 14.373 15.862 16 18 16s4-1.626 4-3.786v-.22L19.104 5.72l.023-.004a1 1 0 1 0-.336-1.971M18 8.1l-1.437 3.114h2.874zM4.563 12.714L6 9.6l1.437 3.114zM12 7a1 1 0 1 0 0-2a1 1 0 0 0 0 2" clipRule="evenodd" />
        </svg>
      ),
      text: '베팅규정'
    },
    {
      href: '/customer/connect',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className="sidebar-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="m10 17l-4-4l1.41-1.41L10 14.17l6.59-6.59L18 9m-6-8L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4Z" />
        </svg>
      ),
      text: '우회접속안내'
    },
    {
      href: '/customer/grade',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className="sidebar-icon" viewBox="0 0 16 16">
          <path fill="currentColor" d="M10 12.2c-.3 0-.5-.1-.8-.2L8 11.5l-1.2.5c-.2.1-.5.2-.8.2c-.2 0-.3 0-.5-.1L5 16l3-2l3 2l-.6-3.9c-.1.1-.3.1-.4.1zm2.9-6.3c-.1-.2-.1-.5 0-.7l.6-1.2c.2-.4 0-.9-.5-1.1l-1.3-.5c-.2-.1-.4-.3-.5-.5L10.7.6c-.1-.4-.4-.6-.7-.6c-.1 0-.3 0-.4.1L8.3.7H8c-.1 0-.2 0-.3-.1L6.4.1C6.3 0 6.1 0 6 0c-.3 0-.6.2-.8.5l-.5 1.4c0 .2-.2.4-.4.5l-1.4.5c-.4.1-.6.6-.4 1.1l.6 1.3c.1.2.1.5 0 .7l-.6 1.2c-.2.4 0 .9.5 1.1l1.3.5c.2.1.4.3.5.5l.5 1.3c.1.4.4.6.7.6c.1 0 .2 0 .3-.1l1.3-.6c.1 0 .2-.1.3-.1s.2 0 .3.1l1.3.6c.1.1.2.1.3.1c.3 0 .6-.2.8-.5l.5-1.3c.1-.2.3-.4.5-.5l1.3-.5c.4-.2.7-.7.5-1.1l-.5-1.4zM8 9.6c-2.2 0-4-1.8-4-4s1.8-4 4-4s4 1.8 4 4s-1.8 4-4 4z" />
          <path fill="currentColor" d="M11 5.6a3 3 0 1 1-6 0a3 3 0 0 1 6 0z" />
        </svg>
      ),
      text: '회원등급안내'
    }
  ]

  return (
    <div className="main-sidebar">
      {/* Sidebar Menu */}
      <div className="sidebar-menu">
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`sidebar-item ${pathname === item.href ? 'active' : ''}`}
            data-sport="all-sports"
          >
            <div className="sidebar-label">
              {item.icon}
              <span className="sidebar-text">{item.text}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CustomerSidebar
