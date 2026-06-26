'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BANK_CODES, CARRIER_CODES } from '@/lib/database/schema'

interface UserProfile {
  userId: string
  balance: number
  points: number
  level: number
  experience: number
  totalDeposits: number
  totalWithdrawals: number
  totalBets: number
  totalWins: number
  createdAt: Date
  updatedAt: Date
}

interface User {
  id: string
  username: string
  nickname: string
  email?: string
  role?: 'user' | 'admin' // Optional since regular users don't have role field
  bankInfo?: {
    bank: string // Bank code (e.g., '088')
    account: string
    depositor: string
  }
  mobile?: string
  carrier?: 'SKT' | 'KT' | 'LG'
  birthDate?: string
  isActive: boolean
  emailVerified: boolean
  phoneVerified: boolean
  createdAt: Date
  lastLogin?: Date
  profile?: UserProfile
}

interface ApiResponse {
  success: boolean
  user?: User
  error?: string
}

// Format number with Korean currency format
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR').format(Math.floor(amount))
}

// Get bank name from code
function getBankName(bankCode?: string): string {
  if (!bankCode) return ''
  return BANK_CODES[bankCode as keyof typeof BANK_CODES] || bankCode
}

// Get carrier name from code
function getCarrierName(carrier?: string): string {
  if (!carrier) return ''
  return CARRIER_CODES[carrier as keyof typeof CARRIER_CODES] || carrier
}

// Format phone number
function formatPhone(phone?: string): string {
  if (!phone) return ''
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`
  }
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  return phone
}

export default function MyPageContent() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true)
        const response = await fetch('/api/auth/user', {
          credentials: 'include',
        })

        const data: ApiResponse = await response.json()

        if (data.success && data.user) {
          setUser(data.user)
        } else {
          setError(data.error || '사용자 정보를 불러올 수 없습니다.')
        }
      } catch (err) {
        console.error('Failed to fetch user data:', err)
        setError('사용자 정보를 불러오는 중 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) {
    return (
      <div className="user-main">
        <div className="user-container">
          <div className="user-title">
            <p className="user-text">내정보</p>
          </div>
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <p>로딩 중...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="user-main">
        <div className="user-container">
          <div className="user-title">
            <p className="user-text">내정보</p>
          </div>
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <p style={{ color: 'var(--error)' }}>
              {error || '사용자 정보를 불러올 수 없습니다.'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  const profile = user.profile
  const balance = profile?.balance || 0
  const points = profile?.points || 0
  const level = profile?.level || 1
  const totalDeposits = profile?.totalDeposits || 0

  // Calculate game percentages (mock data for now - would come from betting history)
  const gamePercentages = {
    sports: 21,
    live: 3,
    casino: 20,
    slot: 565,
    minigame: 37
  }

  return (
    <div className="user-main">
      <div className="user-container">
        <div className="user-title">
          <p className="user-text">내정보</p>
        </div>

        <div className="user-card-container">
          {/* User Information Card */}
          <div className="card-inner">
            <div className="card-detail">
              <div className="card-detail-inner">
                <div className="card-head">
                  <div className="card-head-title">
                    <span className="card-head-text">회원정보</span>
                    <div className="card-head-value">{user.nickname || user.username}</div>
                  </div>
                </div>
                <div className="card-info">
                  <table className="card-info-table">
                    <tbody>
                      <tr>
                        <th>아이디</th>
                        <td>{user.username}</td>
                      </tr>
                      <tr>
                        <th>회원등급</th>
                        <td>{level}</td>
                      </tr>
                      <tr>
                        <th>휴대폰번호</th>
                        <td>{user.mobile ? formatPhone(user.mobile) : ''}</td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="card-info-table">
                    <tbody>
                      <tr>
                        <th>계좌별명</th>
                        <td>{user.bankInfo?.depositor ? user.bankInfo.depositor : '없음'}</td>
                      </tr>
                      <tr>
                        <th>예금주</th>
                        <td>{user.bankInfo?.depositor || ''}</td>
                      </tr>
                      <tr>
                        <th>은행명</th>
                        <td>{user.bankInfo?.bank ? getBankName(user.bankInfo.bank) : ''}</td>
                      </tr>
                      <tr>
                        <th>계좌번호</th>
                        <td>{user.bankInfo?.account || ''}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="card-button">
              <button type="button" className="card-button-text">
                <span>정보수정</span>
              </button>
            </div>
          </div>

          {/* Balance and Points Card */}
          <div className="card-inner">
            <div className="card-detail">
              <div className="payment-container">
                <div className="payment-detail-inner">
                  <div className="card-head">
                    <div className="card-head-title">
                      <span className="card-head-text">보유머니</span>
                      <div className="card-head-value">{formatCurrency(balance)}원</div>
                    </div>
                  </div>
                  <table className="card-info-table">
                    <tbody>
                      <tr>
                        <th>스포츠</th>
                        <td>{gamePercentages.sports}%</td>
                      </tr>
                      <tr>
                        <th>실시간</th>
                        <td>{gamePercentages.live}%</td>
                      </tr>
                      <tr>
                        <th>카지노</th>
                        <td>{gamePercentages.casino}%</td>
                      </tr>
                      <tr>
                        <th>슬롯</th>
                        <td>{gamePercentages.slot}%</td>
                      </tr>
                      <tr>
                        <th>미니게임</th>
                        <td>{gamePercentages.minigame}%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="payment-detail-inner">
                  <div className="card-head">
                    <div className="card-head-title">
                      <span className="card-head-text">보유포인트</span>
                      <div className="card-head-value">{points > 0 ? formatCurrency(points) : '-'}</div>
                    </div>
                  </div>
                  <table className="card-info-table">
                    <tbody>
                      <tr>
                        <th>마지막입금</th>
                        <td>{totalDeposits > 0 ? `${formatCurrency(totalDeposits)}원` : '-'}</td>
                      </tr>
                      <tr>
                        <th>보너스충전</th>
                        <td>미니게임, 슬롯, 카지노 전용</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="payment-button">
              <Link href="/my/deposit" className="card-button-text">
                <span>입금</span>
              </Link>
              <Link href="/my/withdrawal" className="card-button-text">
                <span>출금</span>
              </Link>
              <Link href="/my/point" className="card-button-text">
                <span>포인트전환</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="unit-container">
          <div className="unit-item">
            <div className="unit-inner">
              <div className="unit-title">쪽지</div>
              <div className="unit-value">0건</div>
            </div>
            <Link href="/my/message">
              <button type="button" className="unit-button">
                <span>바로가기</span>
              </button>
            </Link>
          </div>
          <div className="unit-item">
            <div className="unit-inner">
              <div className="unit-title">베팅내역</div>
              <div className="unit-value">0건</div>
            </div>
            <Link href="/my/bets">
              <button type="button" className="unit-button">
                <span>바로가기</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

