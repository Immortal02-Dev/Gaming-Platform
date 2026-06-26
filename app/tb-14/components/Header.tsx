'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useModal } from '@/lib/hooks/useModal'
import { useAuth } from '@/lib/auth/context'

const Header = () => {
  const { isOpen: isPowerballModalOpen, openModal: openPowerballModal, closeModal: closePowerballModal } = useModal({
    modalId: 'powerball-modal',
    urlParam: 'main=minigame'
  })
  
  const { logout, isAuthenticated, user } = useAuth()

  return (
    <>
      <nav className="navbar">
        <div className="nav-wrap">
          <div className="nav-content">
            {/* Nav Top */}
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
                    src="https://p.staticube.com/common/d118b46e-6ff7-4484-9983-70f5d46d709c.png?1749718138903"
                  />
                </Link>
              </div>
              {isAuthenticated ? (
                <>
                  <div className="quick-menu">
                    {/* User Info */}
                <Link className="user-info" href="/my">
                  <div className="user-level">
                    <Image
                      src="/assets/header-footer/users.webp"
                      alt=""
                      className="user-icon"
                      width={24}
                      height={24}
                    />
                  </div>
                  {user?.username || 'user'}
                </Link>
                
                {/* User Amounts */}
                <div className="user-amounts">
                  <div className="amount-item">
                    <Link title="보유머니" className="amount-link" href="/my/money">
                      <div className="amount-unit">머니</div>
                      <div className="amount-value">881,189원</div>
                    </Link>
                  </div>
                  <div className="amount-item">
                    <Link title="포인트" className="amount-link" href="/my/point">
                      <div className="amount-unit">포인트</div>
                      <div className="amount-value secondary">0</div>
                    </Link>
                    <button title="포인트 전환하기" className="exchange-btn">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 512 512"
                        className="exchange-icon"
                      >
                        <path
                          fill="currentColor"
                          d="M0 168v-16c0-13.255 10.745-24 24-24h360V80c0-21.367 25.899-32.042 40.971-16.971l80 80c9.372 9.373 9.372 24.569 0 33.941l-80 80C409.956 271.982 384 261.456 384 240v-48H24c-13.255 0-24-10.745-24-24zm488 152H128v-48c0-21.314-25.862-32.08-40.971-16.971l-80 80c-9.372 9.373-9.372 24.569 0 33.941l80 80C102.057 463.997 128 453.437 128 432v-48h360c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Menu Box */}
                <div className="menu-box">
                  <div className="menu-inner">
                    <button className="menu-item">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 256 256"
                        className="menu-icon"
                      >
                        <path
                          fill="currentColor"
                          d="m223.16 68.42l-16-32A8 8 0 0 0 200 32H56a8 8 0 0 0-7.16 4.42l-16 32A8.08 8.08 0 0 0 32 72v136a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V72a8.08 8.08 0 0 0-.84-3.58M60.94 48h134.12l8 16H52.94ZM208 208H48V80h160zm-42.34-77.66a8 8 0 0 1-11.32 11.32L136 123.31V184a8 8 0 0 1-16 0v-60.69l-18.34 18.35a8 8 0 0 1-11.32-11.32l32-32a8 8 0 0 1 11.32 0Z"
                        />
                      </svg>
                      <span className="menu-text">입금</span>
                    </button>
                    <button className="menu-item">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        className="menu-icon"
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
                      <span className="menu-text">출금</span>
                    </button>
                  </div>
                  <div className="notif-btn">
                    <button className="menu-item">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        className="menu-icon"
                      >
                        <path
                          fill="currentColor"
                          d="m20 18.667l.4.533a.5.5 0 0 1-.4.8H4a.5.5 0 0 1-.4-.8l.4-.533V10a8 8 0 1 1 16 0v8.667ZM9.5 21h5a2.5 2.5 0 0 1-5 0Z"
                        />
                      </svg>
                      <span className="menu-text">알림</span>
                    </button>
                  </div>
                  <button className="menu-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 14 14"
                      className="menu-icon"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M4.5 1a1 1 0 0 0-2 0v1h-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h11a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 12.5 2h-1V1a1 1 0 1 0-2 0v1h-5zm2.489 4.125a.5.5 0 0 1 .454.27l.002.004l.744 1.498h.003l1.65.25a.5.5 0 0 1 .274.862L8.955 9.112a.25.25 0 0 1 .018.063l.232 1.636a.5.5 0 0 1-.739.529l-1.456-.77a.044.044 0 0 0-.028 0l-1.456.77a.5.5 0 0 1-.738-.533l.276-1.638a.252.252 0 0 1 .006-.026L3.875 7.999l-.005-.005a.5.5 0 0 1 .277-.846h.003l1.653-.243l.001-.002l.743-1.493a.5.5 0 0 1 .442-.285"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="menu-text">출석부</span>
                  </button>
                </div>

                {/* User Profile */}
                <div className="user-profile">
                  <div className="user-profile-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0S112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"
                      />
                    </svg>
                  </div>

                  <ul className="user-dropdown">
                    <li className="user-dropdown-item">
                      <Link className="user-dropdown-link" href="/my">
                        <div className="user-dropdown-menu">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
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
                          <div className="user-dropdown-text">내정보</div>
                        </div>
                      </Link>
                    </li>
                    <li className="user-dropdown-item">
                      <Link className="user-dropdown-link" href="/my/message">
                        <div className="user-dropdown-menu">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            height="19"
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
                          <div className="user-dropdown-text">쪽지</div>
                        </div>
                        <div className="user-dropdown-badge">0</div>
                      </Link>
                    </li>
                    <li className="user-dropdown-item">
                      <Link className="user-dropdown-link" href="/my/bets">
                        <div className="user-dropdown-menu">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
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
                          <div className="user-dropdown-text">베팅내역</div>
                        </div>
                      </Link>
                    </li>
                    <li className="user-dropdown-item">
                      <a
                        target="_blank"
                        className="user-dropdown-link"
                        href="//agency.tb-14.com/account/users"
                        rel="noopener noreferrer"
                      >
                        <div className="user-dropdown-menu">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            height="19"
                            viewBox="0 0 24 24"
                          >
                            <g
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            >
                              <rect
                                width="7"
                                height="5"
                                rx=".6"
                                transform="matrix(0 -1 -1 0 22 21)"
                              />
                              <rect
                                width="7"
                                height="5"
                                rx=".6"
                                transform="matrix(0 -1 -1 0 7 15.5)"
                              />
                              <rect
                                width="7"
                                height="5"
                                rx=".6"
                                transform="matrix(0 -1 -1 0 22 10)"
                              />
                              <path
                                d="M17 17.5h-3.5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2H17M11.5 12H7"
                              />
                            </g>
                          </svg>
                          <div className="user-dropdown-text">파트너페이지</div>
                        </div>
                      </a>
                    </li>
                    <li className="user-dropdown-item">
                      <button 
                        className="user-dropdown-link" 
                        onClick={logout}
                        style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
                      >
                        <div className="user-dropdown-menu">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 717 672"
                          >
                            <path
                              fill="currentColor"
                              d="M0 151v391c0 36 15 68 39 93c24 24 55 37 91 37h196v-81H130c-27 0-48-22-48-49V151c0-27 21-48 48-48h196V21H130c-36 0-67 14-91 38c-24 25-39 56-39 92zm215 118v156c0 18 16 33 34 33h181v123c0 11 6 20 16 25c4 1 8 1 10 1c7 0 13-2 18-7l235-235c11-9 10-27 0-37L474 94c-14-15-44-6-44 18v124H249c-18 0-34 15-34 33z"
                            />
                          </svg>
                          <div className="user-dropdown-text">로그아웃</div>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              </>
              ) : (
                <div className="quick-menu">
                  <div className="user-amounts">
                    <div className="amount-item">
                      <Link className="amount-link" href="/account/login" style={{ padding: '0 15px' }}>
                        <div className="amount-value">로그인</div>
                      </Link>
                    </div>
                    <div className="amount-item">
                      <Link className="amount-link" href="/account/register" style={{ padding: '0 15px' }}>
                        <div className="amount-value secondary">회원가입</div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Main Header */}
            <div className="header-menu">
              <Link href="/sports/pre-match" className="header-menu-item">
                <span className="header-menu-text">스포츠</span>
              </Link>
              <Link href="/sports/live" className="header-menu-item">
                <span className="header-menu-text">인플레이</span>
              </Link>
              <Link href="/casino" className="header-menu-item">
                <span className="header-menu-text">카지노</span>
              </Link>
              <Link href="/slot" className="header-menu-item">
                <span className="header-menu-text">슬롯</span>
              </Link>
              <button
                onClick={openPowerballModal}
                className="header-menu-item"
                id="powerball-menu"
              >
                <span className="header-menu-text">동행파워볼</span>
              </button>
              <Link href="/minigame" className="header-menu-item">
                <span className="header-menu-text">미니게임</span>
              </Link>
              <Link href="/events" className="header-menu-item">
                <span className="header-menu-text">이벤트</span>
              </Link>
              <Link href="/customer" className="header-menu-item">
                <span className="header-menu-text">고객센터</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Powerball Modal */}
      {isPowerballModalOpen && (
        <div className="modal-container" style={{ display: 'flex' }}>
          <div className="modal-wrapper" style={{ zIndex: 11 }}>
            <div className="modal-header">
              <p className="modal-title">동행복권 파워볼</p>
              <button className="modal-close-btn" onClick={closePowerballModal}>
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
                        {/* Modal content will be imported from separate component */}

                        {/* Mini Game Details */}
                    <div className="mini-game-details">
                      {/* Mini Game Frame */}
                      <div className="mini-game-box">
                        <div className="mini-game-frame">
                          <iframe
                            id="gameFrame"
                            src="https://dhpowerball.net/rpowerball/live.php"
                            width="900"
                            height="640"
                            scrolling="no"
                            frameBorder="0"
                            className="mini-frame"
                            style={{ transform: 'scale(0.859375) translateY(0px)' }}
                          />
                        </div>
                      </div>

                      {/* Mini Game Market */}
                      <div className="mini-game-market">
                        <div className="market-container">
                          <div className="market-group-wrapper">
                            <div data-name="파워볼" className="market-group">
                              <div className="market-list-header">
                                <div className="market-list-header-textbox">
                                  <span className="market-list-title">파워볼</span>
                                </div>
                                <div className="market-list-header-btn"></div>
                              </div>
                              <div className="market-row">
                                <button className="odds-button">
                                  <div className="odds-titlebox">
                                    <strong
                                      id="홀"
                                      className="odds-title oddsType-primary"
                                    >
                                      홀
                                    </strong>
                                  </div>
                                  <span className="odds-value">1.95</span>
                                </button>
                                <button className="odds-button">
                                  <div className="odds-titlebox">
                                    <strong
                                      id="짝"
                                      className="odds-title oddsType-danger"
                                    >
                                      짝
                                    </strong>
                                  </div>
                                  <span className="odds-value">1.95</span>
                                </button>
                                <button className="odds-button">
                                  <div className="odds-titlebox">
                                    <strong
                                      id="언더"
                                      className="odds-title oddsType-primary"
                                    >
                                      언더
                                    </strong>
                                  </div>
                                  <span className="odds-value"
                                    >1.95/<em className="odds-special"
                                      >4.5↓</em
                                    ></span
                                  >
                                </button>
                                <button className="odds-button">
                                  <div className="odds-titlebox">
                                    <strong
                                      id="오버"
                                      className="odds-title oddsType-danger"
                                    >
                                      오버
                                    </strong>
                                  </div>
                                  <span className="odds-value"
                                    >1.95/<em className="odds-special"
                                      >4.5↑</em
                                    ></span
                                  >
                                </button>
                              </div>
                            </div>
                            <div data-name="일반볼 합" className="market-group">
                              <div className="market-list-header">
                                <div className="market-list-header-textbox">
                                  <span className="market-list-title"
                                    >일반볼 합</span
                                  >
                                </div>
                                <div className="market-list-header-btn"></div>
                              </div>
                              <div className="market-row">
                                <button className="odds-button">
                                  <div className="odds-titlebox">
                                    <strong
                                      id="홀"
                                      className="odds-title oddsType-primary"
                                    >
                                      홀
                                    </strong>
                                  </div>
                                  <span className="odds-value">1.95</span>
                                </button>
                                <button className="odds-button">
                                  <div className="odds-titlebox">
                                    <strong
                                      id="짝"
                                      className="odds-title oddsType-danger"
                                    >
                                      짝
                                    </strong>
                                  </div>
                                  <span className="odds-value">1.95</span>
                                </button>
                                <button className="odds-button">
                                  <div className="odds-titlebox">
                                    <strong
                                      id="언더"
                                      className="odds-title oddsType-primary"
                                    >
                                      언더
                                    </strong>
                                  </div>
                                  <span className="odds-value"
                                    >1.95/<em className="odds-special"
                                      >72.5↓</em
                                    ></span
                                  >
                                </button>
                                <button className="odds-button">
                                  <div className="odds-titlebox">
                                    <strong
                                      id="오버"
                                      className="odds-title oddsType-danger"
                                    >
                                      오버
                                    </strong>
                                  </div>
                                  <span className="odds-value"
                                    >1.95/<em className="odds-special"
                                      >72.5↑</em
                                    ></span
                                  >
                                </button>
                              </div>
                            </div>
                            <div
                              data-name="파워볼 홀짝 &amp; 언오버"
                              className="market-group"
                            >
                              <div className="market-list-header">
                                <div className="market-list-header-textbox">
                                  <span className="market-list-title"
                                    >파워볼 홀짝 &amp; 언오버</span
                                  >
                                </div>
                                <div className="market-list-header-btn"></div>
                              </div>
                              <div className="market-row">
                                <button className="odds-button">
                                  <div className="odds-titlebox">
                                    <strong
                                          id="홀"
                                      className="odds-title oddsType-primary"
                                    >
                                      홀
                                    </strong>
                                    <strong
                                      id="언더"
                                      className="odds-title oddsType-primary"
                                    >
                                      언더
                                    </strong>
                                  </div>
                                  <span className="odds-value">4.12</span>
                                </button>
                                <button className="odds-button">
                                  <div className="odds-titlebox">
                                    <strong
                                      id="홀"
                                      className="odds-title oddsType-primary"
                                    >
                                      홀
                                    </strong>
                                    <strong
                                      id="오버"
                                      className="odds-title oddsType-danger"
                                    >
                                      오버
                                    </strong>
                                  </div>
                                  <span className="odds-value">3.02</span>
                                </button>
                                <button className="odds-button">
                                  <div className="odds-titlebox">
                                    <strong
                                      id="짝"
                                      className="odds-title oddsType-danger"
                                    >
                                      짝
                                    </strong>
                                    <strong
                                      id="언더"
                                      className="odds-title oddsType-primary"
                                    >
                                      언더
                                    </strong>
                                  </div>
                                  <span className="odds-value">3.02</span>
                                </button>
                                <button className="odds-button">
                                  <div className="odds-titlebox">
                                    <strong
                                      id="짝"
                                      className="odds-title oddsType-danger"
                                    >
                                      짝
                                    </strong>
                                    <strong
                                      id="오버"
                                      className="odds-title oddsType-danger"
                                    >
                                      오버
                                    </strong>
                                  </div>
                                  <span className="odds-value">4.12</span>
                                </button>
                              </div>
                            </div>
                            <div
                              data-name="일반볼 합 홀짝 &amp; 언오버"
                              className="market-group"
                            >
                              <div className="market-list-header">
                                <div className="market-list-header-textbox">
                                  <span className="market-list-title"
                                    >일반볼 합 홀짝 &amp; 언오버</span
                                  >
                                </div>
                                <div className="market-list-header-btn"></div>
                              </div>
                              <div className="market-row">
                                <button className="odds-button">
                                  <div className="odds-titlebox">
                                    <strong
                                      id="홀"
                                      className="odds-title oddsType-primary"
                                    >
                                      홀
                                    </strong>
                                    <strong
                                      id="언더"
                                      className="odds-title oddsType-primary"
                                    >
                                      언더
                                    </strong>
                                  </div>
                                  <span className="odds-value">3.70</span>
                                </button>
                                <button className="odds-button">
                                  <div className="odds-titlebox">
                                    <strong
                                      id="홀"
                                      className="odds-title oddsType-primary"
                                    >
                                      홀
                                    </strong>
                                    <strong
                                      id="오버"
                                      className="odds-title oddsType-danger"
                                    >
                                      오버
                                    </strong>
                                  </div>
                                  <span className="odds-value">3.70</span>
                                </button>
                                <button className="odds-button">
                                  <div className="odds-titlebox">
                                    <strong
                                      id="짝"
                                      className="odds-title oddsType-danger"
                                    >
                                      짝
                                    </strong>
                                    <strong
                                          id="언더"
                                      className="odds-title oddsType-primary"
                                    >
                                      언더
                                    </strong>
                                  </div>
                                  <span className="odds-value">3.70</span>
                                </button>
                                <button className="odds-button">
                                  <div className="odds-titlebox">
                                    <strong
                                      id="짝"
                                      className="odds-title oddsType-danger"
                                    >
                                      짝
                                    </strong>
                                    <strong
                                      id="오버"
                                      className="odds-title oddsType-danger"
                                    >
                                      오버
                                    </strong>
                                  </div>
                                  <span className="odds-value">3.70</span>
                                </button>
                              </div>
                            </div>
                            <div
                              data-name="파워볼 홀짝 &amp; 일반볼 합 홀짝"
                              className="market-group"
                            >
                              <div className="market-list-header">
                                <div className="market-list-header-textbox">
                                  <span className="market-list-title"
                                    >파워볼 홀짝 &amp; 일반볼 합 홀짝</span
                                  >
                                </div>
                                <div className="market-list-header-btn"></div>
                              </div>
                              <div className="market-row">
                                <button className="odds-button">
                                  <div className="odds-titlebox">
                                    <strong
                                      id="홀"
                                      className="odds-title oddsType-primary"
                                    >
                                      홀
                                    </strong>
                                    <strong
                                      id="홀"
                                      className="odds-title oddsType-primary"
                                    >
                                      홀
                                    </strong>
                                  </div>
                                  <span className="odds-value">3.20</span>
                                </button>
                                <button className="odds-button">
                                  <div className="odds-titlebox">
                                    <strong
                                      id="홀"
                                      className="odds-title oddsType-primary"
                                    >
                                      홀
                                    </strong>
                                    <strong
                                      id="짝"
                                      className="odds-title oddsType-danger"
                                    >
                                      짝
                                    </strong>
                                  </div>
                                  <span className="odds-value">3.20</span>
                                </button>
                                <button className="odds-button">
                                  <div className="odds-titlebox">
                                    <strong
                                      id="짝"
                                      className="odds-title oddsType-danger"
                                    >
                                      짝
                                    </strong>
                                    <strong
                                      id="홀"
                                      className="odds-title oddsType-primary"
                                    >
                                      홀
                                    </strong>
                                  </div>
                                  <span className="odds-value">3.20</span>
                                </button>
                                <button className="odds-button">
                                  <div className="odds-titlebox">
                                    <strong
                                      id="짝"
                                      className="odds-title oddsType-danger"
                                    >
                                      짝
                                    </strong>
                                    <strong
                                        id="짝"
                                      className="odds-title oddsType-danger"
                                    >
                                      짝
                                    </strong>
                                  </div>
                                  <span className="odds-value">3.20</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Betting Slip */}  

                        <form className="betslip-container">
                          <div className="betslip-round">
                            <div className="betslip-textbox">
                              <span id="label" className="betslip-label"
                                >197회차 결과추첨</span
                              >
                              <div className="betslip-right">
                                <span id="value" className="betslip-value"
                                  >03:45</span
                                >
                              </div>
                            </div>
                            <div className="betslip-textbox">
                              <span id="label" className="betslip-label"
                                >197회차 베팅마감</span
                              >
                              <div className="betslip-right">
                                <span
                                  id="secondary"
                                  className="betslip-value secondary"
                                  >03:20</span
                                >
                              </div>
                            </div>
                          </div>
                          <div className="betslip-amount">
                            <div className="betslip-textbox" style={{ flex: 'unset' }}>
                              <span id="label" className="betslip-label"
                                >보유머니</span
                              >
                              <div className="betslip-right">
                                <span id="value" className="betslip-value"
                                  >862,389원</span
                                >
                              </div>
                            </div>
                            <div className="betslip-form">
                              <label id="amount" className="betslip-form-input">
                                <div className="betslip-form-label">
                                  <span>베팅금액</span>
                                </div>
                                <div className="betslip-form-inputbox">
                                  <input
                                    id="amount"
                                    autoComplete="off"
                                    inputMode="numeric"
                                    defaultValue="0"
                                  />
                                  <span className="betslip-form-unit">원</span>
                                </div>
                                <button
                                  type="button"
                                  className="betslip-form-clear"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="19"
                                    height="19"
                                    viewBox="0 0 1024 1024"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0zm0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01zm181.008-630.016c-12.496-12.496-32.752-12.496-45.248 0L512 466.752l-135.76-135.76c-12.496-12.496-32.752-12.496-45.264 0c-12.496 12.496-12.496 32.752 0 45.248L466.736 512l-135.76 135.76c-12.496 12.48-12.496 32.769 0 45.249c12.496 12.496 32.752 12.496 45.264 0L512 557.249l135.76 135.76c12.496 12.496 32.752 12.496 45.248 0c12.496-12.48 12.496-32.769 0-45.249L557.248 512l135.76-135.76c12.512-12.512 12.512-32.768 0-45.248z"
                                    />
                                  </svg>
                                </button>
                              </label>
                              <div className="betslip-form-btns">
                                <button type="button" className="betslip-form-btn">
                                  오천
                                </button>
                                <button type="button" className="betslip-form-btn">
                                  일만
                                </button>
                                <button type="button" className="betslip-form-btn">
                                  오만
                                </button>
                                <button type="button" className="betslip-form-btn">
                                  십만
                                </button>
                                <button type="button" className="betslip-form-btn">
                                  백만
                                </button>
                                <button type="button" className="betslip-form-btn">
                                  전액
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="betslip-pickbox">
                            <div className="betslip-pickbox-text">
                              <em>마켓</em><span>-</span>
                            </div>
                            <div className="betslip-pickbox-text">
                              <em>선택픽</em><span>-</span>
                            </div>
                            <div className="betslip-pickbox-text">
                              <em>배당</em><span>-</span>
                            </div>
                            <div className="betslip-pickbox-text">
                              <em>베팅금액</em><span>-</span>
                            </div>
                            <div className="betslip-pickbox-text">
                              <em>당첨예상금액</em><span>-</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            color="primary"
                            disabled
                            className="betslip-submit"
                            style={{ width: '100%' }}
                          >
                            <div className="betslip-submit-title">베팅하기</div>
                          </button>
                        </form>
                      </div>
                    </div>

                    {/* Bet History  */}
                    <div className="bet-history-container">
                      {/* Minig Game List Header */}
                      <div className="bet-history-header">
                        <div className="bet-history-titlebox">
                          <p className="bet-history-title">베팅내역</p>
                        </div>
                        <button
                            id="neutral"
                          className="bet-history-delete-btn"
                        >
                          <div className="bet-history-delete-btn-title">
                            전체삭제
                          </div>
                        </button>
                      </div>
                      <div className="bet-history-list-container">
                        <ul className="bet-history-list">
                          <li className="bet-history-item COMPLETED">
                            <div className="bet-history-item-head">
                              <div className="bet-history-item-head-left">
                                <p className="bet-history-item-status">미적중</p>
                                <p className="bet-history-item-date">
                                  2025-04-19 06:45:06
                                </p>
                              </div>
                              <div className="bet-history-item-head-right">
                                <span className="bet-history-item-head-right-text"
                                  >1.95배</span
                                >
                                <span className="bet-history-item-head-right-text"
                                  >6,000원</span
                                >
                                <button className="bet-history-item-delete-btn">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="19"
                                    height="19"
                                    viewBox="0 0 56 56"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="m44.524 48.66l1.617-34.265h2.343c.961 0 1.735-.797 1.735-1.758s-.774-1.782-1.735-1.782H38.242V7.34c0-3.352-2.273-5.531-5.882-5.531h-8.766c-3.61 0-5.86 2.18-5.86 5.53v3.516H7.54c-.937 0-1.758.82-1.758 1.782c0 .96.82 1.758 1.758 1.758h2.344L11.5 48.684c.164 3.375 2.39 5.507 5.766 5.507h21.492c3.351 0 5.601-2.156 5.765-5.53M21.484 7.574c0-1.336.985-2.273 2.391-2.273h8.227c1.43 0 2.414.937 2.414 2.273v3.281H21.484Zm-3.867 43.102c-1.36 0-2.367-1.032-2.437-2.39l-1.64-33.891h28.85l-1.546 33.89c-.07 1.383-1.055 2.39-2.438 2.39Zm17.344-4.125c.773 0 1.36-.633 1.383-1.524l.703-24.75c.023-.89-.586-1.547-1.383-1.547c-.726 0-1.336.68-1.36 1.524l-.702 24.773c-.024.844.562 1.524 1.359 1.524m-13.898 0c.797 0 1.382-.68 1.359-1.524l-.703-24.773c-.024-.844-.656-1.524-1.383-1.524c-.797 0-1.383.657-1.36 1.547l.727 24.75c.024.891.586 1.524 1.36 1.524m8.367-1.524V20.254c0-.844-.633-1.524-1.407-1.524c-.773 0-1.43.68-1.43 1.524v24.773c0 .844.657 1.524 1.43 1.524c.75 0 1.407-.68 1.407-1.524"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <table className="betting-history-table">
                              <tbody>
                                <tr>
                                  <th>
                                    <div className="bet-history-table-nation">
                                      동행복권
                                    </div>
                                  </th>
                                  <th>동행복권파워볼</th>
                                  <th>2025-04-19 06:49:31</th>
                                  <th>동행복권 파워볼 • 82회차</th>
                                  <td>파워볼 언오버 (4.5)</td>
                                  <td className="bet-history-table-order">오버</td>
                                  <td>1.95</td>
                                  <td className="bet-history-table-status">
                                    미적중
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </li>
                          <li className="bet-history-item COMPLETED">
                            <div className="bet-history-item-head">
                              <div className="bet-history-item-head-left">
                                <p className="bet-history-item-status">적중</p>
                                <p className="bet-history-item-prize">9,750원</p>
                                <p className="bet-history-item-date">
                                  2025-04-19 06:45:03
                                </p>
                              </div>
                              <div className="bet-history-item-head-right">
                                <span className="bet-history-item-head-right-text"
                                  >1.95배</span
                                >
                                <span className="bet-history-item-head-right-text"
                                  >5,000원</span
                                >
                                <button className="bet-history-item-delete-btn">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="19"
                                    height="19"
                                    viewBox="0 0 56 56"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="m44.524 48.66l1.617-34.265h2.343c.961 0 1.735-.797 1.735-1.758s-.774-1.782-1.735-1.782H38.242V7.34c0-3.352-2.273-5.531-5.882-5.531h-8.766c-3.61 0-5.86 2.18-5.86 5.53v3.516H7.54c-.937 0-1.758.82-1.758 1.782c0 .96.82 1.758 1.758 1.758h2.344L11.5 48.684c.164 3.375 2.39 5.507 5.766 5.507h21.492c3.351 0 5.601-2.156 5.765-5.53M21.484 7.574c0-1.336.985-2.273 2.391-2.273h8.227c1.43 0 2.414.937 2.414 2.273v3.281H21.484Zm-3.867 43.102c-1.36 0-2.367-1.032-2.437-2.39l-1.64-33.891h28.85l-1.546 33.89c-.07 1.383-1.055 2.39-2.438 2.39Zm17.344-4.125c.773 0 1.36-.633 1.383-1.524l.703-24.75c.023-.89-.586-1.547-1.383-1.547c-.726 0-1.336.68-1.36 1.524l-.702 24.773c-.024.844.562 1.524 1.359 1.524m-13.898 0c.797 0 1.382-.68 1.359-1.524l-.703-24.773c-.024-.844-.656-1.524-1.383-1.524c-.797 0-1.383.657-1.36 1.547l.727 24.75c.024.891.586 1.524 1.36 1.524m8.367-1.524V20.254c0-.844-.633-1.524-1.407-1.524c-.773 0-1.43.68-1.43 1.524v24.773c0 .844.657 1.524 1.43 1.524c.75 0 1.407-.68 1.407-1.524"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <table className="betting-history-table">
                              <tbody>
                                <tr className="bet-history-table-row HIT">
                                  <th>
                                    <div className="bet-history-table-nation">
                                      동행복권
                                    </div>
                                  </th>
                                  <th>동행복권파워볼</th>
                                  <th>2025-04-19 06:49:31</th>
                                  <th>동행복권 파워볼 • 82회차</th>
                                  <td>파워볼 언오버 (4.5)</td>
                                  <td className="bet-history-table-order">언더</td>
                                  <td>1.95</td>
                                  <td className="bet-history-table-status">적중</td>
                                </tr>
                              </tbody>
                            </table>
                          </li>
                        </ul>
                      </div>
                    </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={closePowerballModal}
            style={{ zIndex: 10 }}
          ></div>
        </div>
      )}
    </>
  )
}

export default Header
