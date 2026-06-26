'use client'

import { useState, useEffect } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import CustomerLayout from '@/components/CustomerLayout'
import CustomerModal, { ModalItem } from '@/components/CustomerModal'
import { useTabs } from '@/lib/hooks/useTabs'

export default function NoticesPage() {
  const { activeTab, switchTab, isActive } = useTabs({ 
    defaultTab: 0, 
    totalTabs: 7 
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')

  const tabs = ['전체', '입금/출금', '계정', '스포츠', '카지노', '슬롯', '미니게임']

  const [notices, setNotices] = useState<ModalItem[]>([])

  const loadNotices = async () => {
    try {
      const response = await fetch('/api/customer/notices', { method: 'GET' })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setNotices(data.items || [])
    } catch (e) {
      console.error("Failed to load notices:", e)
      setNotices([])
    }
  }

  useEffect(() => {

    loadNotices()
  }, [])

  const getFilteredNotices = (category: string) => {
    let filtered = notices
    if (category !== '전체') {
      filtered = filtered.filter(notice => notice.category === category)
    }
    if (searchTerm) {
      filtered = filtered.filter(notice => 
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    return filtered
  }

  const handleOpenModal = (notice: ModalItem) => {
    const filteredNotices = getFilteredNotices(tabs[activeTab])
    const index = filteredNotices.findIndex(n => n.id === notice.id)
    setCurrentIndex(index)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleNavigate = (direction: 'prev' | 'next') => {
    const filteredNotices = getFilteredNotices(tabs[activeTab])
    if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else if (direction === 'next' && currentIndex < filteredNotices.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const emptyState = (
    <tr>
      <td colSpan={3} className="customer-empty">
        <div className="customer-table-empty">
          <div className="customer-table-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="45"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M19.59 15.86L12.007 1.924C11.515 1.011 10.779.5 9.989.5c-.79 0-1.515.521-2.016 1.434L.409 15.861c-.49.901-.544 1.825-.138 2.53c.405.707 1.216 1.109 2.219 1.109h15.02c1.003 0 1.814-.402 2.22-1.108c.405-.706.351-1.619-.14-2.531ZM10 4.857c.395 0 .715.326.715.728v6.583c0 .402-.32.728-.715.728a.721.721 0 0 1-.715-.728V5.584c0-.391.32-.728.715-.728Zm0 11.624c-.619 0-1.11-.51-1.11-1.14c0-.63.502-1.141 1.11-1.141c.619 0 1.11.51 1.11 1.14c0 .63-.502 1.141-1.11 1.141Z"
              />
            </svg>
          </div>
          <p className="customer-table-desc">
            현재 등록된 글이 없습니다.
          </p>
        </div>
      </td>
    </tr>
  )

  return (
    <CustomerLayout>
      <div className="customer-main">
        <div className="customer-inner">
          <div className="customer-header">
            <div className="customer-title">
              <p className="customer-text">공지사항</p>
            </div>
          </div>

          {/* Search Form */}
          <form className="search-form" onSubmit={(e) => {
            e.preventDefault()
            // The actual filtering happens in getFilteredNotices, which reacts to searchTerm changes
          }}>
            <div className="search-inner">
              <label className="search-input">
                <div className="search-box">
                  <input
                    type="text"
                    name="searchValue"
                    placeholder="검색어 입력"
                    autoComplete="off"
                    spellCheck="false"
                    className="search-field"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </label>
            </div>
            <button type="submit" className="search-button">
              <div className="search-text">검색</div>
            </button>
          </form>

          {/* Tab Container */}
          <div className="customer-tab">
            <div className="customer-tab-scroll">
              <div className="customer-tab-area">
                <div className="customer-tab-inner">
                  {tabs.map((tab, index) => (
                    <button 
                      key={index}
                      className={`customer-tab-item ${isActive(index) ? 'active' : ''}`}
                      onClick={() => switchTab(index)}
                    >
                      <span className="customer-tab-text">{tab}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="customer-table">
            <table className="customer-table-inner">
              <colgroup>
                <col width="90px" />
                <col width="90px" />
                <col width="auto" />
              </colgroup>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>카테고리</th>
                  <th>제목</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredNotices(tabs[activeTab]).length > 0 ? (
                  getFilteredNotices(tabs[activeTab]).map((notice) => (
                    <tr key={notice.id} onClick={() => handleOpenModal(notice)} style={{ cursor: 'pointer' }}>
                      <td>{notice.id}</td>
                      <td>{notice.category}</td>
                      <td>{notice.title}</td>
                    </tr>
                  ))
                ) : (
                  emptyState
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CustomerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        items={getFilteredNotices(tabs[activeTab])}
        currentIndex={currentIndex}
        onNavigate={handleNavigate}
      />
    </CustomerLayout>
  )
}