'use client'

import { useState, useEffect } from 'react'
import type { Metadata } from 'next'
import CustomerLayout from '@/components/CustomerLayout'
import CustomerModal, { ModalItem } from '@/components/CustomerModal'
import { useTabs } from '@/lib/hooks/useTabs'

export default function FaqPage() {
  const { activeTab, switchTab, isActive } = useTabs({ 
    defaultTab: 0, 
    totalTabs: 2 
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [allFaqs, setAllFaqs] = useState<ModalItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const getFilteredFaqs = (category: string) => {
    let filtered = allFaqs
    if (category !== '전체') {
      filtered = filtered.filter(faq => faq.category === category)
    }
    if (searchTerm) {
      filtered = filtered.filter(faq => 
        faq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    return filtered
  }

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch('/api/customer/faqs')
        if (res.ok) {
          const data = await res.json()
          setAllFaqs((data.items || []).map((it: any) => ({
            id: it.id,
            category: it.category || '자주하는 질문',
            title: it.title,
            content: it.content
          })))
        }
      } catch (e) {
        console.error('Failed to fetch FAQs:', e)
      }
    }
    fetchFaqs()
  }, [])

  const tabs = ['전체', '자주하는 질문']

  const handleOpenModal = (faq: ModalItem) => {
    const filteredFaqs = getFilteredFaqs(tabs[activeTab])
    const index = filteredFaqs.findIndex(f => f.id === faq.id)
    setCurrentIndex(index)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleNavigate = (direction: 'prev' | 'next') => {
    const filteredFaqs = getFilteredFaqs(tabs[activeTab])
    if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else if (direction === 'next' && currentIndex < filteredFaqs.length - 1) {
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
              <p className="customer-text">자주하는 질문</p>
            </div>
          </div>

          {/* Search Form */}
          <form className="search-form" onSubmit={(e) => {
            e.preventDefault()
            // The actual filtering happens in getFilteredFaqs, which reacts to searchTerm changes
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

          {/* Tab Content */}
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
                {getFilteredFaqs(tabs[activeTab]).length > 0 ? (
                  getFilteredFaqs(tabs[activeTab]).map((faq) => (
                    <tr key={faq.id} onClick={() => handleOpenModal(faq)} style={{ cursor: 'pointer' }}>
                      <td>{faq.id}</td>
                      <td>{faq.category}</td>
                      <td>{faq.title}</td>
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
        items={getFilteredFaqs(tabs[activeTab])}
        currentIndex={currentIndex}
        onNavigate={handleNavigate}
        modalTitle="자주하는 질문 글보기"
      />
    </CustomerLayout>
  )
}