'use client'

import { useEffect, useState } from 'react'
import CustomerLayout from '@/components/CustomerLayout'
import QnaModal from '@/components/QnaModal'

interface QnaItem {
  id: string
  inquiryTime: string
  title: string
  status: '답변대기' | '답변완료'
}



export default function QnaPage() {
  const [qnaItems, setQnaItems] = useState<QnaItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadQnaContent = async () => {
    try {
      const response = await fetch('/api/customer/qna', { method: 'GET' })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setQnaItems(data.qna || [])
    } catch (e) {
      console.error('Failed to load Q&A content:', e)
      setQnaItems([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadQnaContent()
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmitQna = async (title: string, content: string) => {
    try {
      const response = await fetch('/api/customer/qna', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      handleCloseModal()
      loadQnaContent() // Refresh the list
    } catch (e) {
      console.error('Failed to submit Q&A:', e)
    }
  }

  const handleDeleteAllQna = async () => {
    if (window.confirm('정말로 모든 Q&A를 삭제하시겠습니까?')) {
      try {
        const response = await fetch('/api/customer/qna/all', {
          method: 'DELETE',
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        loadQnaContent() // Refresh the list
      } catch (e) {
        console.error('Failed to delete all Q&A:', e)
      }
    }
  }

  const handleDeleteQna = async (id: string) => {
    if (window.confirm('정말로 이 Q&A를 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`/api/customer/qna/${id}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        loadQnaContent() // Refresh the list
      } catch (e) {
        console.error('Failed to delete Q&A:', e)
      }
    }
  }

  return (
    <CustomerLayout>
      <div className="customer-main">
              <div className="customer-inner">
                <div className="customer-header">
                  <div className="customer-title">
                    <p className="customer-text">1:1문의</p>
                  </div>

                  <button type="button" className="delete-btn" onClick={handleDeleteAllQna}>
                    <div className="delete-text">
                      <span>Delete All</span>
                    </div>
                  </button>
                </div>

                <div className="customer-contact">
                  <button
                    type="button"
                    className="contact-btn modal-trigger"
                    onClick={handleOpenModal}
                  >
                    <div className="contact-text">문의하기</div>
                  </button>
                </div>

                {/* Table */}
                <div className="customer-table">
                  <table className="customer-table-inner">
                    <colgroup>
                      <col width="200px" />
                      <col width="auto" />
                      <col width="100px" />
                      <col width="100px" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th className="text-white">문의시간</th>
                        <th className="text-white">제목</th>
                        <th className="text-white">답변상태</th>
                        <th className="text-white">삭제</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan={4} className="customer-empty">
                            <div className="customer-table-empty">
                              <p className="customer-table-desc">로딩 중...</p>
                            </div>
                          </td>
                        </tr>
                      ) : qnaItems.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="customer-empty">
                            <div className="customer-table-empty">
                              <div className="customer-table-icon" >
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
                      ) : (
                        qnaItems.map((item) => (
                          <tr key={item.id}>
                            <td>{item.inquiryTime}</td>
                            <td>{item.title}</td>
                            <td>{item.status}</td>
                            <td>
                              <button
                                type="button"
                                className="delete-btn-sm"
                                onClick={() => handleDeleteQna(item.id)}
                                aria-label="삭제"
                                style={{ cursor: 'pointer', color: '#fff' }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M9 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1l.001 1H19a1 1 0 1 1 0 2h-1v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6H5a1 1 0 1 1 0-2h3zm2 2h2V4h-2zm-2 3a1 1 0 0 0-1 1v9a1 1 0 1 0 2 0V9a1 1 0 0 0-1-1m6 0a1 1 0 0 0-1 1v9a1 1 0 1 0 2 0V9a1 1 0 0 0-1-1"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

      <QnaModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitQna}
      />
    </CustomerLayout>
  )
}
