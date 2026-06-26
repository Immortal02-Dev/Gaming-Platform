'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/lib/auth/context'
import { validateLoginForm, sanitizeInput, type LoginFormData } from '@/lib/validation/auth'

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())

  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Check for registration success message
  useEffect(() => {
    const message = searchParams.get('message')
    if (message === 'registration-success') {
      // Show success message briefly
      setError('')
    }
  }, [searchParams])

  // Real-time validation
  useEffect(() => {
    if (touchedFields.size > 0) {
      const validation = validateLoginForm(formData)
      setValidationErrors(validation.errors)
    }
  }, [formData, touchedFields])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    const sanitizedValue = type === 'checkbox' ? checked : sanitizeInput(value)
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }))
    
    // Mark field as touched
    setTouchedFields(prev => new Set(prev).add(name))
    
    // Clear errors when user starts typing
    if (error) {
      setError('')
    }
    if (validationErrors.length > 0) {
      setValidationErrors([])
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    setTouchedFields(prev => new Set(prev).add(name))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mark all fields as touched for validation
    setTouchedFields(new Set(['username', 'password']))
    
    // Validate form
    const validation = validateLoginForm(formData)
    if (!validation.isValid) {
      setValidationErrors(validation.errors)
      setError('입력 정보를 확인해주세요.')
      return
    }

    setIsLoading(true)
    setError('')
    setValidationErrors([])

    try {
      const result = await login({
        username: formData.username,
        password: formData.password,
        rememberMe: formData.rememberMe
      })

      if (result.success) {
        // Use window.location.href for full page reload to ensure cookie is properly set
        const redirectTo = searchParams.get('redirect') || '/my'
        window.location.href = redirectTo
      } else {
        setError(result.error || '로그인에 실패했습니다.')
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="login-form">
      <div className="login-form-group">
        {searchParams.get('message') === 'registration-success' && (
          <div className="login-success-message">
            <span>회원가입이 완료되었습니다. 로그인해주세요.</span>
          </div>
        )}
        
        {error && (
          <div className="login-error-message">
            <span>{error}</span>
          </div>
        )}
        
        {validationErrors.length > 0 && (
          <div className="login-validation-errors">
            {validationErrors.map((err, index) => (
              <div key={index} className="validation-error">
                <span>{err}</span>
              </div>
            ))}
          </div>
        )}
        
        <label className="textfield-container">
          <div className="textfield-input-container">
            <div className="textfield-input-textbox">
              <input
                placeholder="아이디"
                autoComplete="username"
                spellCheck="false"
                className="textfield-input"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                onBlur={handleBlur}
                disabled={isLoading}
              />
            </div>
            <div className="textfield-input-error-icon">
              <svg
                width="19"
                height="19"
                className="spriteicon-container"
              >
                <use href="#icon_Warning"></use>
              </svg>
            </div>
            <div className="textfield-input-bottom-line"></div>
          </div>
        </label>
        
        <label className="textfield-container">
          <div className="textfield-input-container">
            <div className="textfield-input-textbox">
              <input
                placeholder="비밀번호"
                autoComplete="current-password"
                spellCheck="false"
                className="textfield-input"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                disabled={isLoading}
              />
            </div>
            <div className="textfield-visible-button-box">
              <button
                type="button"
                className="iconbutton-container"
                style={{ background: 'transparent' }}
                onClick={togglePasswordVisibility}
              >
                <div className="iconbutton-iconbox">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                  >
                    {showPassword ? (
                      <>
                        <path
                          fill="currentColor"
                          d="M8 11c-1.65 0-3-1.35-3-3s1.35-3 3-3s3 1.35 3 3s-1.35 3-3 3Zm0-5c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2Z"
                        />
                        <path
                          fill="currentColor"
                          d="M8 13c-3.19 0-5.99-1.94-6.97-4.84a.442.442 0 0 1 0-.32C2.01 4.95 4.82 3 8 3s5.99 1.94 6.97 4.84c.04.1.04.22 0 .32C13.99 11.05 11.18 13 8 13ZM2.03 8c.89 2.4 3.27 4 5.97 4s5.07-1.6 5.97-4C13.08 5.6 10.7 4 8 4S2.93 5.6 2.03 8Z"
                        />
                      </>
                    ) : (
                      <>
                        <path
                          fill="currentColor"
                          d="M8 11c-1.65 0-3-1.35-3-3s1.35-3 3-3s3 1.35 3 3s-1.35 3-3 3Zm0-5c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2Z"
                        />
                        <path
                          fill="currentColor"
                          d="M8 13c-3.19 0-5.99-1.94-6.97-4.84a.442.442 0 0 1 0-.32C2.01 4.95 4.82 3 8 3s5.99 1.94 6.97 4.84c.04.1.04.22 0 .32C13.99 11.05 11.18 13 8 13ZM2.03 8c.89 2.4 3.27 4 5.97 4s5.07-1.6 5.97-4C13.08 5.6 10.7 4 8 4S2.93 5.6 2.03 8Z"
                        />
                        <path
                          fill="currentColor"
                          d="M14 14.5a.47.47 0 0 1-.35-.15l-12-12c-.2-.2-.2-.51 0-.71c.2-.2.51-.2.71 0l11.99 12.01c.2.2.2.51 0 .71c-.1.1-.23.15-.35.15Z"
                        />
                      </>
                    )}
                  </svg>
                </div>
              </button>
            </div>
            <div className="textfield-input-error-icon">
              <svg
                width="19"
                height="19"
                className="spriteicon-container"
              >
                <use href="#icon_Warning"></use>
              </svg>
            </div>
            <div className="textfield-input-bottom-line"></div>
          </div>
        </label>

        <div className="login-remember-me">
          <label className="checkbox-container">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <span className="checkbox-text">로그인 상태 유지</span>
          </label>
        </div>
      </div>
      
      <div className="login-form-buttons-box">
        <button
          type="submit"
          color="primary"
          className="fillbutton-container"
          disabled={isLoading}
        >
          <div className="fillbutton-title">
            {isLoading ? '로그인 중...' : '로그인'}
          </div>
        </button>
        
        <div className="login-form-join-link-container">
          <div className="login-form-join-guide-text">
            <span>간단한 회원가입으로 이용하실 수 있습니다.</span>
          </div>
          <div className="login-form-join-link-row">
            <a
              href="/account/register"
              className="login-form-join-link-button"
            >
              회원가입 바로가기
            </a>
          </div>
        </div>
      </div>
      
      <div className="account-banner-banners-container"></div>
    </form>
  )
}
