import type { Metadata } from 'next'
import Layout from '@/components/Layout'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'TB-14 - Home | Gaming Platform',
  description: 'Welcome to TB-14 gaming platform with sports betting, casino, slots, and mini-games',
}

export default function HomePage() {
  return (
    <Layout>
      <div className="home-container">
        <section className="home-wrapper">
          {/* Banner */}
          <div className="home-banner">
            <div className="banner-img">
              <Image 
                src="/assets/main/banner.png" 
                alt="banner" 
                width={1200}
                height={400}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="home-content">
            <div className="home-content-item">
              <Image 
                src="/assets/main/sub-content1.png" 
                alt="Sub content 1" 
                width={600}
                height={300}
                style={{ width: '100%', height: 'auto' }}
              />

              <div className="home-overlay">
                <div className="home-overlay-img">
                  <Link href="/sports/pre-match" className="home-overlay-logo">
                    <Image
                      alt="taebaek-2406 로고 이미지"
                      src="/assets/header-footer/desktop-logo.png"
                      width={130}
                      height={76}
                      loading="eager"
                    />
                  </Link>
                  <Link href="/sports/pre-match" className="home-overlay-logo mobile-size">
                    <Image
                      alt="taebaek-2406 로고 이미지"
                      src="/assets/header-footer/mobile-logo.png"
                      width={59}
                      height={35}
                    />
                  </Link>
                </div>

                <button className="home-content-btn">
                  <div className="home-content-btn-text">베팅하러가기</div>
                </button>
              </div>
            </div>

            <div className="home-content-item">
              <Image 
                src="/assets/main/sub-content2.png" 
                alt="Sub content 2" 
                width={600}
                height={300}
                style={{ width: '100%', height: 'auto' }}
              />

              <div className="home-overlay">
                <div className="home-overlay-img">
                  <Link href="/sports/live" className="home-overlay-logo">
                    <Image
                      alt="taebaek-2406 로고 이미지"
                      src="/assets/header-footer/desktop-logo.png"
                      width={130}
                      height={76}
                      loading="eager"
                    />
                  </Link>
                  <Link href="/sports/live" className="home-overlay-logo mobile-size">
                    <Image
                      alt="taebaek-2406 로고 이미지"
                      src="/assets/header-footer/mobile-logo.png"
                      width={59}
                      height={35}
                    />
                  </Link>
                </div>

                <button className="home-content-btn">
                  <div className="home-content-btn-text">베팅하러가기</div>
                </button>
              </div>
            </div>

            <div className="home-content-item">
              <Image 
                src="/assets/main/sub-content3.png" 
                alt="Sub content 3" 
                width={600}
                height={300}
                style={{ width: '100%', height: 'auto' }}
              />

              <div className="home-overlay">
                <div className="home-overlay-img">
                  <Link href="/casino" className="home-overlay-logo">
                    <Image
                      alt="taebaek-2406 로고 이미지"
                      src="/assets/header-footer/desktop-logo.png"
                      width={130}
                      height={76}
                      loading="eager"
                    />
                  </Link>
                  <Link href="/casino" className="home-overlay-logo mobile-size">
                    <Image
                      alt="taebaek-2406 로고 이미지"
                      src="/assets/header-footer/mobile-logo.png"
                      width={59}
                      height={35}
                    />
                  </Link>
                </div>

                <button className="home-content-btn">
                  <div className="home-content-btn-text">베팅하러가기</div>
                </button>
              </div>
            </div>

            <div className="home-content-item">
              <Image 
                src="/assets/main/sub-content4.png" 
                alt="Sub content 4" 
                width={600}
                height={300}
                style={{ width: '100%', height: 'auto' }}
              />

              <div className="home-overlay">
                <div className="home-overlay-img">
                  <Link href="/slot" className="home-overlay-logo">
                    <Image
                      alt="taebaek-2406 로고 이미지"
                      src="/assets/header-footer/desktop-logo.png"
                      width={130}
                      height={76}
                      loading="eager"
                    />
                  </Link>
                  <Link href="/slot" className="home-overlay-logo mobile-size">
                    <Image
                      alt="taebaek-2406 로고 이미지"
                      src="/assets/header-footer/mobile-logo.png"
                      width={59}
                      height={35}
                    />
                  </Link>
                </div>

                <button className="home-content-btn">
                  <div className="home-content-btn-text">베팅하러가기</div>
                </button>
              </div>
            </div>

            <div className="home-content-item">
              <Image 
                src="/assets/main/sub-content5.png" 
                alt="Sub content 5" 
                width={600}
                height={300}
                style={{ width: '100%', height: 'auto' }}
              />

              <div className="home-overlay">
                <div className="home-overlay-img">
                  <Link href="/powerball" className="home-overlay-logo">
                    <Image
                      alt="taebaek-2406 로고 이미지"
                      src="/assets/header-footer/desktop-logo.png"
                      width={130}
                      height={76}
                      loading="eager"
                    />
                  </Link>
                  <Link href="/powerball" className="home-overlay-logo mobile-size">
                    <Image
                      alt="taebaek-2406 로고 이미지"
                      src="/assets/header-footer/mobile-logo.png"
                      width={59}
                      height={35}
                    />
                  </Link>
                </div>

                <button className="home-content-btn">
                  <div className="home-content-btn-text">베팅하러가기</div>
                </button>
              </div>
            </div>
          </div>

          {/* Article Board */}
          <div className="home-article">
            <div className="article-container">
              <button className="article-head">
                <div className="article-title">
                  <span className="article-title-text"> 공지사항 </span>
                </div>
                <div className="article-btn-icon">
                  <span>전체보기</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m19.164 12l-6.207-6.207l-1.414 1.414L16.336 12l-4.793 4.793l1.414 1.414L19.164 12Zm-5.65 0L7.307 5.793L5.893 7.207L10.686 12l-4.793 4.793l1.414 1.414L13.514 12Z"
                    />
                  </svg>
                </div>
              </button>
              <div className="article-board">
                <button className="article-board-btn">
                  <div className="article-board-text">
                    <em>입금/출금</em>
                    <p>필히 입금 전 계좌문의 후 입금부탁드립니다.</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
