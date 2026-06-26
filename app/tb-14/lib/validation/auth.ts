// Validation utilities for authentication forms

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export interface LoginFormData {
  username: string
  password: string
  rememberMe?: boolean
}

export interface RegisterFormData {
  username: string
  nickname: string
  password: string
  confirmPassword: string
  bank: string
  bankAccount: string
  bankDepositor: string
  birthDate: string
  mobile: string
  carrier: string
  registrationCode?: string
}

/**
 * Validate username
 */
export function validateUsername(username: string): ValidationResult {
  const errors: string[] = []

  if (!username) {
    errors.push('아이디를 입력해주세요.')
  } else {
    if (username.length < 4) {
      errors.push('아이디는 4자 이상이어야 합니다.')
    }
    if (username.length > 16) {
      errors.push('아이디는 16자 이하여야 합니다.')
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      errors.push('아이디는 영문, 숫자, 언더스코어(_)만 사용할 수 있습니다.')
    }
    if (/^[0-9]/.test(username)) {
      errors.push('아이디는 숫자로 시작할 수 없습니다.')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate nickname
 */
export function validateNickname(nickname: string): ValidationResult {
  const errors: string[] = []

  if (!nickname) {
    errors.push('닉네임을 입력해주세요.')
  } else {
    if (nickname.length < 2) {
      errors.push('닉네임은 2자 이상이어야 합니다.')
    }
    if (nickname.length > 16) {
      errors.push('닉네임은 16자 이하여야 합니다.')
    }
    // Check for Korean consonants/vowels only (ㄱ-ㅎㅏ-ㅣ)
    if (/[ㄱ-ㅎㅏ-ㅣ]/.test(nickname)) {
      errors.push('닉네임에 자음이나 모음만 단독으로 사용할 수 없습니다.')
    }
    // Must contain at least one Korean character or English letter
    if (!/[가-힣a-zA-Z]/.test(nickname)) {
      errors.push('닉네임은 한글 또는 영문을 포함해야 합니다.')
    }
    // Check for prohibited characters
    if (/[<>'"&]/.test(nickname)) {
      errors.push('닉네임에 특수문자 <, >, \', ", &는 사용할 수 없습니다.')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate password
 */
export function validatePassword(password: string): ValidationResult {
  const errors: string[] = []

  if (!password) {
    errors.push('비밀번호를 입력해주세요.')
  } else {
    if (password.length < 4) {
      errors.push('비밀번호는 4자 이상이어야 합니다.')
    }
    if (password.length > 18) {
      errors.push('비밀번호는 18자 이하여야 합니다.')
    }
    // Check for common weak passwords
    const weakPasswords = ['1234', '0000', 'password', 'admin', 'qwerty']
    if (weakPasswords.includes(password.toLowerCase())) {
      errors.push('너무 간단한 비밀번호입니다.')
    }
    // Check for whitespace
    if (/\s/.test(password)) {
      errors.push('비밀번호에 공백을 포함할 수 없습니다.')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate password confirmation
 */
export function validatePasswordConfirmation(password: string, confirmPassword: string): ValidationResult {
  const errors: string[] = []

  if (!confirmPassword) {
    errors.push('비밀번호 확인을 입력해주세요.')
  } else if (password !== confirmPassword) {
    errors.push('비밀번호가 일치하지 않습니다.')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate bank account number
 */
export function validateBankAccount(bankAccount: string): ValidationResult {
  const errors: string[] = []

  if (!bankAccount) {
    errors.push('계좌번호를 입력해주세요.')
  } else {
    // Remove any non-digit characters for validation
    const cleanAccount = bankAccount.replace(/\D/g, '')
    
    if (cleanAccount.length < 10) {
      errors.push('계좌번호는 10자리 이상이어야 합니다.')
    }
    if (cleanAccount.length > 20) {
      errors.push('계좌번호는 20자리 이하여야 합니다.')
    }
    if (!/^\d+$/.test(cleanAccount)) {
      errors.push('계좌번호는 숫자만 입력해주세요.')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate depositor name
 */
export function validateDepositor(depositor: string): ValidationResult {
  const errors: string[] = []

  if (!depositor) {
    errors.push('예금주명을 입력해주세요.')
  } else {
    if (depositor.length < 2) {
      errors.push('예금주명은 2자 이상이어야 합니다.')
    }
    if (depositor.length > 20) {
      errors.push('예금주명은 20자 이하여야 합니다.')
    }
    // Must be Korean or English only
    if (!/^[가-힣a-zA-Z\s]+$/.test(depositor)) {
      errors.push('예금주명은 한글 또는 영문만 입력해주세요.')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate birth date
 */
export function validateBirthDate(birthDate: string): ValidationResult {
  const errors: string[] = []

  if (!birthDate) {
    errors.push('생년월일을 입력해주세요.')
  } else {
    // Remove any non-digit characters
    const cleanDate = birthDate.replace(/\D/g, '')
    
    if (cleanDate.length !== 8) {
      errors.push('생년월일은 8자리 숫자로 입력해주세요. (예: 19901225)')
    } else {
      const year = parseInt(cleanDate.substring(0, 4))
      const month = parseInt(cleanDate.substring(4, 6))
      const day = parseInt(cleanDate.substring(6, 8))
      
      const currentYear = new Date().getFullYear()
      
      if (year < 1900 || year > currentYear) {
        errors.push('올바른 연도를 입력해주세요.')
      }
      if (month < 1 || month > 12) {
        errors.push('올바른 월을 입력해주세요.')
      }
      if (day < 1 || day > 31) {
        errors.push('올바른 일을 입력해주세요.')
      }
      
      // Check if date is valid
      const date = new Date(year, month - 1, day)
      if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        errors.push('존재하지 않는 날짜입니다.')
      }
      
      // Check age (must be at least 18)
      const age = currentYear - year
      if (age < 18) {
        errors.push('만 18세 이상만 가입할 수 있습니다.')
      }
      if (age > 100) {
        errors.push('올바른 생년월일을 입력해주세요.')
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate mobile phone number
 */
export function validateMobile(mobile: string): ValidationResult {
  const errors: string[] = []

  if (!mobile) {
    errors.push('휴대폰번호를 입력해주세요.')
  } else {
    // Remove any non-digit characters
    const cleanMobile = mobile.replace(/\D/g, '')
    
    if (!/^01[0-9]/.test(cleanMobile)) {
      errors.push('올바른 휴대폰번호 형식이 아닙니다.')
    }
    if (cleanMobile.length < 10 || cleanMobile.length > 11) {
      errors.push('휴대폰번호는 10-11자리여야 합니다.')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate carrier selection
 */
export function validateCarrier(carrier: string): ValidationResult {
  const errors: string[] = []
  const validCarriers = ['SKT', 'KT', 'LG']

  if (!carrier) {
    errors.push('통신사를 선택해주세요.')
  } else if (!validCarriers.includes(carrier)) {
    errors.push('올바른 통신사를 선택해주세요.')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate bank selection
 */
export function validateBank(bank: string): ValidationResult {
  const errors: string[] = []
  const validBanks = [
    '002', '003', '004', '007', '011', '020', '023', '027', '031', '032',
    '034', '035', '037', '039', '045', '048', '050', '052', '054', '055',
    '057', '058', '059', '060', '064', '071', '081', '088', '089', '090'
  ]

  if (!bank) {
    errors.push('출금은행을 선택해주세요.')
  } else if (!validBanks.includes(bank)) {
    errors.push('올바른 은행을 선택해주세요.')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate registration code (optional)
 */
export function validateRegistrationCode(code?: string): ValidationResult {
  const errors: string[] = []

  if (code && code.trim()) {
    if (code.length < 4) {
      errors.push('추천코드는 4자 이상이어야 합니다.')
    }
    if (code.length > 20) {
      errors.push('추천코드는 20자 이하여야 합니다.')
    }
    if (!/^[a-zA-Z0-9]+$/.test(code)) {
      errors.push('추천코드는 영문과 숫자만 사용할 수 있습니다.')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate complete login form
 */
export function validateLoginForm(data: LoginFormData): ValidationResult {
  const errors: string[] = []

  const usernameValidation = validateUsername(data.username)
  const passwordValidation = validatePassword(data.password)

  errors.push(...usernameValidation.errors)
  errors.push(...passwordValidation.errors)

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate complete registration form
 */
export function validateRegisterForm(data: RegisterFormData): ValidationResult {
  const errors: string[] = []

  const usernameValidation = validateUsername(data.username)
  const nicknameValidation = validateNickname(data.nickname)
  const passwordValidation = validatePassword(data.password)
  const passwordConfirmValidation = validatePasswordConfirmation(data.password, data.confirmPassword)
  const bankValidation = validateBank(data.bank)
  const bankAccountValidation = validateBankAccount(data.bankAccount)
  const depositorValidation = validateDepositor(data.bankDepositor)
  const birthDateValidation = validateBirthDate(data.birthDate)
  const mobileValidation = validateMobile(data.mobile)
  const carrierValidation = validateCarrier(data.carrier)
  const registrationCodeValidation = validateRegistrationCode(data.registrationCode)

  errors.push(...usernameValidation.errors)
  errors.push(...nicknameValidation.errors)
  errors.push(...passwordValidation.errors)
  errors.push(...passwordConfirmValidation.errors)
  errors.push(...bankValidation.errors)
  errors.push(...bankAccountValidation.errors)
  errors.push(...depositorValidation.errors)
  errors.push(...birthDateValidation.errors)
  errors.push(...mobileValidation.errors)
  errors.push(...carrierValidation.errors)
  errors.push(...registrationCodeValidation.errors)

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Sanitize input to prevent XSS and injection attacks
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>'"&]/g, '') // Remove potentially dangerous characters
    .substring(0, 1000) // Limit length to prevent DoS
}

/**
 * Check if username is available (placeholder for database check)
 */
export async function checkUsernameAvailability(username: string): Promise<boolean> {
  // This will be implemented with database integration
  // For now, return true (available)
  return true
}

/**
 * Check if nickname is available (placeholder for database check)
 */
export async function checkNicknameAvailability(nickname: string): Promise<boolean> {
  // This will be implemented with database integration
  // For now, return true (available)
  return true
}
