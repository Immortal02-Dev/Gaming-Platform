import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import RegisterForm from '@/components/RegisterForm'

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: 'Register | TB-14 Gaming Platform',
  description: 'Create your TB-14 gaming account',
}

export default function RegisterPage() {
  return (
    <div className="wrapper">
      <nav className="navbar">
        <div className="nav-wrap">
          <div className="nav-content">
            <div className="nav-top">
              <div className="logo">
                <Link className="logo-link" href="/">
                  <Image
                    alt="taebaek-2406 로고 이미지"
                    width={130}
                    height={76}
                    src="/assets/header-footer/desktop-logo.png"
                    loading="eager"
                  />
                </Link>
                <Link className="logo-link mobile" href="/">
                  <Image
                    alt="taebaek-2406 로고 이미지"
                    width={59}
                    height={35}
                    src="/assets/header-footer/mobile-logo.png"
                  />
                </Link>
              </div>

              <div className="quick-menu-container">
                <div className="quick-menu-box">
                  <div className="header-menu-container">
                    <Link href="/account/login" className="tab-menu-item">
                      <span className="tab-menu-text">로그인</span>
                    </Link>
                    <Link href="/account/register" className="tab-menu-item active">
                      <span className="tab-menu-text">회원가입</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="account-layout-container">
        <div className="account-layout-wrapper">
          <div className="with-appbar-container">
            <div className="with-appbar-wrapper">
              <div className="list-header-container">
                <div className="list-header-textbox">
                  <span className="list-header-title-text">회원가입</span>
                </div>
                <div className="list-header-button"></div>
              </div>
              
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}