'use client'

import { useEffect, useState } from 'react'
import type { Metadata } from 'next'
import CustomerLayout from '@/components/CustomerLayout'
import CustomerModal, { ModalItem } from '@/components/CustomerModal'

export default function CustomerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [modalItems, setModalItems] = useState<ModalItem[]>([])
  const [noticeItem, setNoticeItem] = useState<ModalItem | null>(null)
  const [faqItems, setFaqItems] = useState<ModalItem[]>([])
  const [displayedNotices, setDisplayedNotices] = useState<ModalItem[]>([])

  const loadCustomerContent = async () => {
    try {
      const response = await fetch('/api/customer/combined', { method: 'GET' })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      let faqs: ModalItem[] = []
      let notices: ModalItem[] = []

      faqs = (data.faqs || []).map((it: any) => ({
        id: it.id,
        category: it.category || '자주하는 질문',
        title: it.title,
        content: it.content,
      }))

      notices = (data.notices || []).map((it: any) => ({
        id: it.id,
        category: '입금/출금',
        title: it.title,
        content: it.content,
      }))

      // Store all notices and FAQs for the modal
      setModalItems([...notices, ...faqs])

      // Store up to 10 notices and FAQs for initial display
      setNoticeItem(notices[0] || null)
      setFaqItems(faqs.slice(0, 10))
      setDisplayedNotices(notices.slice(0, 10))
    } catch (e) {
      console.error("Failed to load customer content:", e)
      setNoticeItem(null)
      setFaqItems([])
      setModalItems([])
    }
  }

  useEffect(() => {
    loadCustomerContent()
  }, [])

  const handleOpenModal = (index: number) => {
    setCurrentIndex(index)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else if (direction === 'next' && currentIndex < modalItems.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <CustomerLayout>
      <div className="customer-main">
        <div className="customer-inner">
          <div className="customer-header">
            <div className="customer-title">
              <p className="customer-text">고객센터 홈</p>
            </div>
          </div>

          <div className="customer-content">
            <div className="customer-innerRow">
              <div className="customer-board">
                <div className="customer-boardHeader">
                  <div className="customer-boardTitle">
                    <span className="customer-boardText">공지사항</span>
                  </div>
                </div>
                <div className="customer-boardItem">
                  {displayedNotices.map((item, idx) => (
                    <button
                      key={item.id}
                      className="customer-btnModal modal-trigger"
                      onClick={() => handleOpenModal(modalItems.indexOf(item))}
                    >
                      <div className="customer-btnText">
                        <em className="customer-btnArticle">{item.category || '입금/출금'}</em>
                        <p className="customer-btnTitle">
                          {item.title}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="customer-board">
                <div className="customer-boardHeader">
                  <div className="customer-boardTitle">
                    <span className="customer-boardText">자주하는 질문</span>
                  </div>
                </div>
                <div className="customer-boardItem">
                  {faqItems.map((item, idx) => (
                    <button
                      key={item.id}
                      className="customer-btnModal modal-trigger"
                      onClick={() => handleOpenModal(modalItems.indexOf(item))}
                    >
                      <div className="customer-btnText">
                        <em className="customer-btnArticle">{item.category || '자주하는 질문'}</em>
                        <p className="customer-btnTitle">
                          {item.title}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        items={modalItems}
        currentIndex={currentIndex}
        onNavigate={handleNavigate}
      />
    </CustomerLayout>
  )
}
