'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DatePicker from 'react-datepicker'
import { 
  validateUsername, 
  validateNickname, 
  validatePassword, 
  validatePasswordConfirmation,
  validateBank,
  validateBankAccount,
  validateDepositor,
  validateBirthDate,
  validateMobile,
  validateCarrier,
  validateRegistrationCode,
  validateRegisterForm,
  sanitizeInput,
  type RegisterFormData 
} from '@/lib/validation/auth'

interface FormErrors {
  [key: string]: string[]
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    bank: '',
    bankAccount: '',
    bankDepositor: '',
    birthDate: '',
    mobile: '',
    carrier: '',
    registrationCode: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [serverErrors, setServerErrors] = useState<FormErrors>({}) // Separate state for server errors
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())

  const router = useRouter()

  // Real-time validation
  useEffect(() => {
    const newErrors: FormErrors = {}

    if (touchedFields.has('username')) {
      const usernameValidation = validateUsername(formData.username)
      if (!usernameValidation.isValid) {
        newErrors.username = usernameValidation.errors
      }
    }

    if (touchedFields.has('nickname')) {
      const nicknameValidation = validateNickname(formData.nickname)
      if (!nicknameValidation.isValid) {
        newErrors.nickname = nicknameValidation.errors
      }
    }

    if (touchedFields.has('password')) {
      const passwordValidation = validatePassword(formData.password)
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.errors
      }
    }

    if (touchedFields.has('confirmPassword')) {
      const confirmValidation = validatePasswordConfirmation(formData.password, formData.confirmPassword)
      if (!confirmValidation.isValid) {
        newErrors.confirmPassword = confirmValidation.errors
      }
    }

    if (touchedFields.has('bank')) {
      const bankValidation = validateBank(formData.bank)
      if (!bankValidation.isValid) {
        newErrors.bank = bankValidation.errors
      }
    }

    if (touchedFields.has('bankAccount')) {
      const accountValidation = validateBankAccount(formData.bankAccount)
      if (!accountValidation.isValid) {
        newErrors.bankAccount = accountValidation.errors
      }
    }

    if (touchedFields.has('bankDepositor')) {
      const depositorValidation = validateDepositor(formData.bankDepositor)
      if (!depositorValidation.isValid) {
        newErrors.bankDepositor = depositorValidation.errors
      }
    }

    if (touchedFields.has('birthDate')) {
      const birthValidation = validateBirthDate(formData.birthDate)
      if (!birthValidation.isValid) {
        newErrors.birthDate = birthValidation.errors
      }
    }

    if (touchedFields.has('mobile')) {
      const mobileValidation = validateMobile(formData.mobile)
      if (!mobileValidation.isValid) {
        newErrors.mobile = mobileValidation.errors
      }
    }

    if (touchedFields.has('carrier')) {
      const carrierValidation = validateCarrier(formData.carrier)
      if (!carrierValidation.isValid) {
        newErrors.carrier = carrierValidation.errors
      }
    }

    if (touchedFields.has('registrationCode') && formData.registrationCode) {
      const codeValidation = validateRegistrationCode(formData.registrationCode)
      if (!codeValidation.isValid) {
        newErrors.registrationCode = codeValidation.errors
      }
    }

    // Merge validation errors with server errors (server errors take precedence)
    setErrors({
      ...newErrors,
      ...serverErrors
    })
  }, [formData, touchedFields, serverErrors])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const sanitizedValue = sanitizeInput(value)
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }))

    // Mark field as touched
    setTouchedFields(prev => new Set(prev).add(name))
    
    // Clear server error for this field when user starts typing
    setServerErrors(prev => {
      const newServerErrors = { ...prev }
      delete newServerErrors[name]
      return newServerErrors
    })
    
    // Clear submit error when user starts typing
    if (submitError) {
      setSubmitError('')
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target
    setTouchedFields(prev => new Set(prev).add(name))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mark all fields as touched for validation
    const allFields = Object.keys(formData)
    setTouchedFields(new Set(allFields))

    // Validate entire form
    const formValidation = validateRegisterForm(formData)
    
    if (!formValidation.isValid) {
      setSubmitError('입력 정보를 확인해주세요.')
      return
    }

    setIsLoading(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      // Get response text first to handle both JSON and non-JSON responses
      const responseText = await response.text()
      const responseLength = responseText?.length || 0
      const contentType = response.headers.get('content-type') || ''
      
      // Silent - don't log expected errors (409 conflicts, 429 rate limits)
      // Only log unexpected server errors
      if (process.env.NODE_ENV === 'development' && response.status >= 500) {
        console.error(`[Registration] Server Error ${response.status}:`, responseText.substring(0, 200))
      }
      
      let data: any = null
      
      if (responseText && responseText.trim()) {
        try {
          const parsed = JSON.parse(responseText)
          // Check if parsed result is an empty object or has no meaningful data
          if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
            data = parsed
          } else if (parsed && typeof parsed === 'object' && Object.keys(parsed).length === 0) {
            // Empty object - treat as error
            console.warn('Parsed empty object from response:', {
              responseText,
              status: response.status
            })
            data = {
              success: false,
              error: `서버 응답이 비어있습니다. (Status: ${response.status})`,
              details: 'Server returned an empty JSON object.'
            }
          } else {
            data = parsed
          }
        } catch (parseError: any) {
          console.error('Failed to parse response as JSON:', {
            parseError: parseError?.message || parseError,
            responseText: responseText.substring(0, 500),
            status: response.status
          })
          // If response is not JSON, use the raw text as error
          data = { 
            success: false,
            error: responseText || '서버 응답을 처리할 수 없습니다.',
            details: `Status: ${response.status} ${response.statusText}. Response is not valid JSON.`
          }
        }
      } else {
        // Empty response
        console.error('Empty response from server', {
          status: response.status,
          statusText: response.statusText,
          contentType,
          responseLength
        })
        data = {
          success: false,
          error: `서버가 응답하지 않았습니다. (Status: ${response.status})`,
          details: 'The server returned an empty response. Check backend logs for errors.'
        }
      }

      // Ensure data has required structure
      if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        console.error('Data is null, undefined, or empty object:', {
          data,
          responseText: responseText?.substring(0, 200),
          status: response.status
        })
        data = {
          success: false,
          error: `서버 응답을 처리할 수 없습니다. (Status: ${response.status})`,
          details: 'Response data is null, undefined, or empty object.'
        }
      }

      // Removed verbose debugging logs - errors are handled and displayed to user

      if (response.ok && data.success) {
        // Registration successful, redirect to login
        router.push('/account/login?message=registration-success')
      } else {
        // Show detailed error message
        const errorMessage = data?.error || `회원가입에 실패했습니다. (Status: ${response.status})`
        const details = data?.details ? `\n\nDetails: ${data.details}` : ''
        
        // Don't log expected errors (409, 429) - they're handled and shown to user
        // Only log unexpected errors
        if (process.env.NODE_ENV === 'development' && response.status !== 409 && response.status !== 429 && response.status >= 400) {
          console.error(`[Registration Failed] ${response.status}:`, errorMessage)
        }
        
        // Handle field-specific errors (409 conflicts)
        if (response.status === 409 && data?.error) {
          if (data.error.includes('아이디')) {
            // Username conflict
            setServerErrors(prev => ({
              ...prev,
              username: ['이미 사용 중인 아이디입니다.']
            }))
            setTouchedFields(prev => new Set(prev).add('username'))
          } else if (data.error.includes('닉네임')) {
            // Nickname conflict
            setServerErrors(prev => ({
              ...prev,
              nickname: ['이미 사용 중인 닉네임입니다.']
            }))
            setTouchedFields(prev => new Set(prev).add('nickname'))
          }
        }
        
        // Handle rate limit errors (429)
        if (response.status === 429 && data?.retryAfter) {
          const minutes = Math.ceil(data.retryAfter / 60)
          const hours = Math.floor(minutes / 60)
          const remainingMinutes = minutes % 60
          
          let timeMessage = ''
          if (hours > 0) {
            timeMessage = remainingMinutes > 0 
              ? `${hours}시간 ${remainingMinutes}분` 
              : `${hours}시간`
          } else {
            timeMessage = `${minutes}분`
          }
          
          setSubmitError(`${errorMessage}\n\n약 ${timeMessage} 후에 다시 시도해주세요.`)
        } else {
          setSubmitError(errorMessage + details)
        }
      }
    } catch (err: any) {
      console.error('Registration network error:', err)
      setSubmitError(`네트워크 오류가 발생했습니다: ${err.message || 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword(!showPassword)
    } else {
      setShowConfirmPassword(!showConfirmPassword)
    }
  }

  const getFieldError = (fieldName: string): string | null => {
    return errors[fieldName] && errors[fieldName].length > 0 ? errors[fieldName][0] : null
  }

  const hasFieldError = (fieldName: string): boolean => {
    return errors[fieldName] && errors[fieldName].length > 0
  }

  const getBankName = (bankCode: string): string => {
    const bankNames: { [key: string]: string } = {
      '002': 'KDB산업은행',
      '003': 'IBK기업은행',
      '004': 'KB국민은행',
      '007': 'Sh수협은행',
      '011': 'NH농협은행',
      '020': '우리은행',
      '023': 'SC제일은행',
      '027': '한국씨티은행',
      '031': '대구은행',
      '032': '부산은행',
      '034': '광주은행',
      '035': '제주은행',
      '037': '전북은행',
      '039': '경남은행',
      '045': '새마을금고',
      '048': '신협',
      '050': '상호저축은행',
      '052': '모건스탠리',
      '054': 'HSBC',
      '055': '도이치은행',
      '057': '제이피모간체이스',
      '058': '미즈호은행',
      '059': 'UFJ',
      '060': 'BOA',
      '064': '산림조합',
      '071': '우체국',
      '081': '하나은행',
      '088': '신한은행',
      '089': 'K 뱅크',
      '090': '카카오뱅크'
    }
    return bankNames[bankCode] || '선택된 은행'
  }

  const formatMobile = (value: string): string => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 3) return cleaned
    if (cleaned.length <= 7) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`
  }

  const formatBirthDate = (value: string): string => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 4) return cleaned
    if (cleaned.length <= 6) return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 6)}-${cleaned.slice(6, 8)}`
  }

  // Convert YYYYMMDD string to Date object
  const stringToDate = (dateString: string): Date | null => {
    if (!dateString || dateString.length !== 8) return null
    try {
      const year = parseInt(dateString.substring(0, 4))
      const month = parseInt(dateString.substring(4, 6)) - 1
      const day = parseInt(dateString.substring(6, 8))
      const date = new Date(year, month, day)
      // Validate the date
      if (isNaN(date.getTime())) return null
      if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
        return null
      }
      return date
    } catch (error) {
      return null
    }
  }

  // Convert Date object to YYYYMMDD string
  const dateToString = (date: Date | null): string => {
    if (!date) return ''
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}${month}${day}`
  }

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const formatted = formatMobile(value)
    const cleaned = formatted.replace(/\D/g, '')
    
    setFormData(prev => ({
      ...prev,
      mobile: cleaned
    }))
    
    setTouchedFields(prev => new Set(prev).add('mobile'))
    
    // Clear server error for mobile
    setServerErrors(prev => {
      const newServerErrors = { ...prev }
      delete newServerErrors.mobile
      return newServerErrors
    })
    
    if (submitError) setSubmitError('')
  }

  const handleBirthDateChange = (date: Date | null) => {
    const dateString = dateToString(date)
    
    setFormData(prev => ({
      ...prev,
      birthDate: dateString
    }))
    
    setTouchedFields(prev => new Set(prev).add('birthDate'))
    
    // Clear server error for birthDate
    setServerErrors(prev => {
      const newServerErrors = { ...prev }
      delete newServerErrors.birthDate
      return newServerErrors
    })
    
    if (submitError) setSubmitError('')
  }

  const handleBirthDateBlur = () => {
    setTouchedFields(prev => new Set(prev).add('birthDate'))
  }

  // Calculate min and max dates (18+ years old, max 100 years old)
  const getMinDate = (): Date => {
    const date = new Date()
    date.setFullYear(date.getFullYear() - 100)
    date.setMonth(0, 1)
    date.setHours(0, 0, 0, 0)
    return date
  }

  const getMaxDate = (): Date => {
    const date = new Date()
    date.setFullYear(date.getFullYear() - 18)
    date.setMonth(11, 31)
    date.setHours(23, 59, 59, 999)
    return date
  }

  // Get a reasonable default date to open the calendar (30 years ago)
  const getDefaultOpenDate = (): Date => {
    const date = new Date()
    date.setFullYear(date.getFullYear() - 30)
    date.setMonth(0, 1)
    date.setHours(0, 0, 0, 0)
    return date
  }

  return (
    <form onSubmit={handleSubmit} className="register-form">
      {submitError && (
        <div className="register-error-message">
          <span>{submitError}</span>
        </div>
      )}

      <div className="register-form-group">
        <label className="textfield-container">
          <span className="input-label-text">아이디<em>*</em></span>
          <div className={`textfield-input-container ${hasFieldError('username') ? 'error' : ''}`}>
            <div className="textfield-input-textbox">
              <input
                required
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
            {hasFieldError('username') && (
              <div className="textfield-input-error-icon">
                <svg width="19" height="19" className="spriteicon-container">
                  <use href="#icon_Warning"></use>
                </svg>
              </div>
            )}
            <div className="textfield-input-bottom-line"></div>
          </div>
          <div className="input-helper-text-container">
            <div className="input-helper-text">
              {getFieldError('username') || '아이디는 4~16자를 사용하세요.'}
            </div>
          </div>
        </label>
        
        <label className="textfield-container">
          <span className="input-label-text">닉네임<em>*</em></span>
          <div className={`textfield-input-container ${hasFieldError('nickname') ? 'error' : ''}`}>
            <div className="textfield-input-textbox">
              <input
                required
                autoComplete="off"
                spellCheck="false"
                className="textfield-input"
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
                onBlur={handleBlur}
                disabled={isLoading}
              />
            </div>
            {hasFieldError('nickname') && (
              <div className="textfield-input-error-icon">
                <svg width="19" height="19" className="spriteicon-container">
                  <use href="#icon_Warning"></use>
                </svg>
              </div>
            )}
            <div className="textfield-input-bottom-line"></div>
          </div>
          <div className="input-helper-text-container">
            <div className="input-helper-text">
              {getFieldError('nickname') || '닉네임은 2~16자를 사용하세요.'}
            </div>
          </div>
        </label>
        
        <label className="textfield-container">
          <span className="input-label-text">비밀번호<em>*</em></span>
          <div className={`textfield-input-container ${hasFieldError('password') ? 'error' : ''}`}>
            <div className="textfield-input-textbox">
              <input
                required
                autoComplete="new-password"
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
                onClick={() => togglePasswordVisibility('password')}
              >
                <div className="iconbutton-iconbox">
                  <svg width="19" height="19" className="spriteicon-container">
                    <use href={showPassword ? "#icon_eye" : "#icon_eye-crossed"}></use>
                  </svg>
                </div>
              </button>
            </div>
            {hasFieldError('password') && (
              <div className="textfield-input-error-icon">
                <svg width="19" height="19" className="spriteicon-container">
                  <use href="#icon_Warning"></use>
                </svg>
              </div>
            )}
            <div className="textfield-input-bottom-line"></div>
          </div>
          <div className="input-helper-text-container">
            <div className="input-helper-text">
              {getFieldError('password') || '4자 이상 - 18자 이하'}
            </div>
          </div>
        </label>
        
        <label className="textfield-container">
          <span className="input-label-text">비밀번호확인<em>*</em></span>
          <div className={`textfield-input-container ${hasFieldError('confirmPassword') ? 'error' : ''}`}>
            <div className="textfield-input-textbox">
              <input
                required
                autoComplete="new-password"
                spellCheck="false"
                className="textfield-input"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
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
                onClick={() => togglePasswordVisibility('confirmPassword')}
              >
                <div className="iconbutton-iconbox">
                  <svg width="19" height="19" className="spriteicon-container">
                    <use href={showConfirmPassword ? "#icon_eye" : "#icon_eye-crossed"}></use>
                  </svg>
                </div>
              </button>
            </div>
            {hasFieldError('confirmPassword') && (
              <div className="textfield-input-error-icon">
                <svg width="19" height="19" className="spriteicon-container">
                  <use href="#icon_Warning"></use>
                </svg>
              </div>
            )}
            <div className="textfield-input-bottom-line"></div>
          </div>
          <div className="input-helper-text-container">
            <div className="input-helper-text">
              {getFieldError('confirmPassword') || '비밀번호를 한번 더 입력하세요'}
            </div>
          </div>
        </label>
      </div>
      
      <div className="register-form-group">
        <div className="selectbox-container">
          <span className="input-label-text">출금은행<em>*</em></span>
          <label tabIndex={0} className={`selectbox-wrapper ${hasFieldError('bank') ? 'error' : ''}`}>
            <div className="selectbox-valuebox">
              {!formData.bank ? (
                <span className="selectbox-placeholder">
                  <span>선택하기</span>
                </span>
              ) : (
                <div className="selectbox-value-text">
                  {getBankName(formData.bank)}
                </div>
              )}
            </div>
            <select 
              className="selectbox-select"
              name="bank"
              value={formData.bank}
              onChange={handleInputChange}
              onBlur={handleBlur}
              disabled={isLoading}
            >
              <option value="">선택하기</option>
              <option value="002">KDB산업은행</option>
              <option value="003">IBK기업은행</option>
              <option value="004">KB국민은행</option>
              <option value="007">Sh수협은행</option>
              <option value="011">NH농협은행</option>
              <option value="020">우리은행</option>
              <option value="023">SC제일은행</option>
              <option value="027">한국씨티은행</option>
              <option value="031">대구은행</option>
              <option value="032">부산은행</option>
              <option value="034">광주은행</option>
              <option value="035">제주은행</option>
              <option value="037">전북은행</option>
              <option value="039">경남은행</option>
              <option value="045">새마을금고</option>
              <option value="048">신협</option>
              <option value="050">상호저축은행</option>
              <option value="052">모건스탠리</option>
              <option value="054">HSBC</option>
              <option value="055">도이치은행</option>
              <option value="057">제이피모간체이스</option>
              <option value="058">미즈호은행</option>
              <option value="059">UFJ</option>
              <option value="060">BOA</option>
              <option value="064">산림조합</option>
              <option value="071">우체국</option>
              <option value="081">하나은행</option>
              <option value="088">신한은행</option>
              <option value="089">K 뱅크</option>
              <option value="090">카카오뱅크</option>
            </select>
            <div className="selectbox-arrowiconbox">
              <svg width="19" height="19" className="spriteicon-container">
                <use href="#icon_arrow_down_thin"></use>
              </svg>
            </div>
          </label>
          {hasFieldError('bank') && (
            <div className="input-helper-text-container">
              <div className="input-helper-text error">
                {getFieldError('bank')}
              </div>
            </div>
          )}
        </div>
        
        <label className="textfield-container">
          <span className="input-label-text">계좌번호<em>*</em></span>
          <div className={`textfield-input-container ${hasFieldError('bankAccount') ? 'error' : ''}`}>
            <div className="textfield-input-textbox">
              <input
                required
                autoComplete="off"
                spellCheck="false"
                className="textfield-input"
                type="text"
                name="bankAccount"
                value={formData.bankAccount}
                onChange={handleInputChange}
                onBlur={handleBlur}
                disabled={isLoading}
                placeholder="계좌번호를 입력하세요"
              />
            </div>
            {hasFieldError('bankAccount') && (
              <div className="textfield-input-error-icon">
                <svg width="19" height="19" className="spriteicon-container">
                  <use href="#icon_Warning"></use>
                </svg>
              </div>
            )}
            <div className="textfield-input-bottom-line"></div>
          </div>
          <div className="input-helper-text-container">
            <div className="input-helper-text">
              {getFieldError('bankAccount') || '계좌번호를 입력해주세요. (10-20자리)'}
            </div>
          </div>
        </label>
        
        <label className="textfield-container">
          <span className="input-label-text">예금주명<em>*</em></span>
          <div className={`textfield-input-container ${hasFieldError('bankDepositor') ? 'error' : ''}`}>
            <div className="textfield-input-textbox">
              <input
                required
                autoComplete="off"
                spellCheck="false"
                className="textfield-input"
                type="text"
                name="bankDepositor"
                value={formData.bankDepositor}
                onChange={handleInputChange}
                onBlur={handleBlur}
                disabled={isLoading}
                placeholder="예금주명을 입력하세요"
              />
            </div>
            {hasFieldError('bankDepositor') && (
              <div className="textfield-input-error-icon">
                <svg width="19" height="19" className="spriteicon-container">
                  <use href="#icon_Warning"></use>
                </svg>
              </div>
            )}
            <div className="textfield-input-bottom-line"></div>
          </div>
          <div className="input-helper-text-container">
            <div className="input-helper-text">
              {getFieldError('bankDepositor') || '예금주명을 입력해주세요. (2-20자)'}
            </div>
          </div>
        </label>
      </div>

      <div className="register-form-group">
        <div className="textfield-container">
          <span className="input-label-text">생년월일<em>*</em></span>
          <div className={`textfield-input-container ${hasFieldError('birthDate') ? 'error' : ''}`}>
            <div className="textfield-input-textbox" style={{ flex: 1, padding: 0, position: 'relative', zIndex: 1 }}>
              <DatePicker
                selected={formData.birthDate ? stringToDate(formData.birthDate) : null}
                onChange={handleBirthDateChange}
                onCalendarClose={handleBirthDateBlur}
                disabled={isLoading}
                placeholderText="YYYY-MM-DD"
                dateFormat="yyyy-MM-dd"
                minDate={getMinDate()}
                maxDate={getMaxDate()}
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                yearDropdownItemNumber={120}
                scrollableYearDropdown
                openToDate={getDefaultOpenDate()}
                startOpen={false}
                className="textfield-input datepicker-input"
                wrapperClassName="datepicker-wrapper"
                required
                autoComplete="bday"
                isClearable={false}
                popperClassName="react-datepicker-popper"
                withPortal
                popperPlacement="bottom-start"
              />
            </div>
            {hasFieldError('birthDate') && (
              <div className="textfield-input-error-icon">
                <svg width="19" height="19" className="spriteicon-container">
                  <use href="#icon_Warning"></use>
                </svg>
              </div>
            )}
            <div className="textfield-input-bottom-line"></div>
          </div>
          <div className="input-helper-text-container">
            <div className="input-helper-text">
              {getFieldError('birthDate') || '만 18세 이상만 가입 가능합니다. (예: 1990-12-25)'}
            </div>
          </div>
        </div>
        
        <label className="textfield-container">
          <span className="input-label-text">휴대폰번호<em>*</em></span>
          <div className={`textfield-input-container ${hasFieldError('mobile') ? 'error' : ''}`}>
            <div className="textfield-input-textbox">
              <input
                required
                autoComplete="tel"
                spellCheck="false"
                className="textfield-input"
                type="text"
                name="mobile"
                value={formData.mobile ? formatMobile(formData.mobile) : ''}
                onChange={handleMobileChange}
                onBlur={handleBlur}
                disabled={isLoading}
                placeholder="010-1234-5678"
                maxLength={13}
              />
            </div>
            {hasFieldError('mobile') && (
              <div className="textfield-input-error-icon">
                <svg width="19" height="19" className="spriteicon-container">
                  <use href="#icon_Warning"></use>
                </svg>
              </div>
            )}
            <div className="textfield-input-bottom-line"></div>
          </div>
          <div className="input-helper-text-container">
            <div className="input-helper-text">
              {getFieldError('mobile') || '휴대폰번호를 입력해주세요. (예: 010-1234-5678)'}
            </div>
          </div>
        </label>
        
        <div className="selectbox-container">
          <span className="input-label-text">통신사<em>*</em></span>
          <label tabIndex={0} className={`selectbox-wrapper ${hasFieldError('carrier') ? 'error' : ''}`}>
            <div className="selectbox-valuebox">
              {!formData.carrier ? (
                <span className="selectbox-placeholder">
                  <span>선택하기</span>
                </span>
              ) : (
                <div className="selectbox-value-text">
                  {formData.carrier === 'SKT' ? 'SKT' : 
                   formData.carrier === 'KT' ? 'KT' : 
                   formData.carrier === 'LG' ? 'LG U+' : '선택된 통신사'}
                </div>
              )}
            </div>
            <select 
              className="selectbox-select"
              name="carrier"
              value={formData.carrier}
              onChange={handleInputChange}
              onBlur={handleBlur}
              disabled={isLoading}
            >
              <option value="">선택하기</option>
              <option value="SKT">SKT</option>
              <option value="KT">KT</option>
              <option value="LG">LG U+</option>
            </select>
            <div className="selectbox-arrowiconbox">
              <svg width="19" height="19" className="spriteicon-container">
                <use href="#icon_arrow_down_thin"></use>
              </svg>
            </div>
          </label>
          {hasFieldError('carrier') && (
            <div className="input-helper-text-container">
              <div className="input-helper-text error">
                {getFieldError('carrier')}
              </div>
            </div>
          )}
        </div>
        
        <label className="textfield-container">
          <span className="input-label-text">추천코드</span>
          <div className={`textfield-input-container ${hasFieldError('registrationCode') ? 'error' : ''}`}>
            <div className="textfield-input-textbox">
              <input
                autoComplete="off"
                spellCheck="false"
                className="textfield-input"
                type="text"
                name="registrationCode"
                value={formData.registrationCode}
                onChange={handleInputChange}
                onBlur={handleBlur}
                disabled={isLoading}
                placeholder="추천코드를 입력하세요 (선택사항)"
              />
            </div>
            {hasFieldError('registrationCode') && (
              <div className="textfield-input-error-icon">
                <svg width="19" height="19" className="spriteicon-container">
                  <use href="#icon_Warning"></use>
                </svg>
              </div>
            )}
            <div className="textfield-input-bottom-line"></div>
          </div>
          <div className="input-helper-text-container">
            <div className="input-helper-text">
              {getFieldError('registrationCode') || '추천코드를 입력해주세요. (선택사항)'}
            </div>
          </div>
        </label>
      </div>

      <div className="register-form-group">
        <div className="register-guide-box">
          <ul>
            <li>회원가입 시 입력하신 정보는 안전하게 보호됩니다.</li>
            <li>모든 항목은 필수 입력 사항입니다. (추천코드 제외)</li>
            <li>만 18세 이상만 가입 가능합니다.</li>
            <li>입력하신 정보는 출금 시 본인 확인에 사용됩니다.</li>
          </ul>
        </div>
        
        <div className="register-buttons-box">
          <button
            type="submit"
            color="primary"
            className="fillbutton-container"
            disabled={isLoading}
          >
            <div className="fillbutton-title">
              {isLoading ? '가입 중...' : '가입하기'}
            </div>
          </button>
        </div>
      </div>
    </form>
  )
}
