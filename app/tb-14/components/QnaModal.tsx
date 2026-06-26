'use client'

import { useState, FormEvent } from 'react'
import Modal from './Modal'

interface QnaModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (title: string, content: string) => void
}

export default function QnaModal({ isOpen, onClose, onSubmit }: QnaModalProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(title, content)
    setTitle('')
    setContent('')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="1:1 문의하기">
      <form onSubmit={handleSubmit} autoComplete="off" className="login-form">
        <div className="login-form-group">
          <label className="textfield-container">
            <span className="input-label-text">
              제목<em>*</em>
            </span>
            <div className="textfield-input-container">
              <div className="textfield-input-textbox">
                <input
                  type="text"
                  id="qna-title"
                  className="textfield-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="textfield-input-bottom-line"></div>
            </div>
          </label>

          <label className="textfield-container">
            <span className="input-label-text">
              내용<em>*</em>
            </span>
            <div className="textfield-input-container">
              <div className="textfield-input-textbox">
                <textarea
                  id="qna-content"
                  className="textfield-input"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={5}
                />
              </div>
              <div className="textfield-input-bottom-line"></div>
            </div>
          </label>
        </div>

        <div className="login-form-buttons-box">
          <button
            type="submit"
            className="fillbutton-container"
          >
            <div className="fillbutton-title">문의 보내기</div>
          </button>
          <button
            type="button"
            className="fillbutton-container"
            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}
            onClick={onClose}
          >
            <div className="fillbutton-title">취소</div>
          </button>
        </div>
      </form>
    </Modal>
  )
}
