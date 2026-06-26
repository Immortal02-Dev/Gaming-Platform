// Database schema definitions for TB-14 gaming platform

export interface DatabaseUser {
  id: string
  username: string
  nickname: string
  email?: string
  password_hash: string
  role: 'user' | 'admin'
  bank_code?: string
  bank_account?: string
  bank_depositor?: string
  mobile?: string
  carrier?: string
  birth_date?: string
  registration_code?: string
  is_active: boolean
  email_verified: boolean
  phone_verified: boolean
  created_at: Date
  updated_at: Date
  last_login?: Date
  login_attempts: number
  locked_until?: Date
}

export interface DatabaseSession {
  id: string
  user_id: string
  token_hash: string
  expires_at: Date
  created_at: Date
  ip_address?: string
  user_agent?: string
}

export interface DatabaseLoginAttempt {
  id: string
  username: string
  ip_address: string
  success: boolean
  attempted_at: Date
  user_agent?: string
}

// Bank codes mapping
export const BANK_CODES = {
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
  '052': '모간스탠리은행',
  '054': 'HSBC은행',
  '055': '도이치은행',
  '057': 'JP모간체이스은행',
  '058': '미즈호은행',
  '059': '미쓰비시도쿄UFJ은행',
  '060': 'BOA은행',
  '064': '산림조합중앙회',
  '071': '우체국',
  '081': 'KEB하나은행',
  '088': '신한은행',
  '089': 'K뱅크',
  '090': '카카오뱅크'
} as const

// Carrier codes
export const CARRIER_CODES = {
  'SKT': 'SK텔레콤',
  'KT': 'KT',
  'LG': 'LG유플러스'
} as const

// User creation input
export interface CreateUserInput {
  username: string
  nickname: string
  password: string
  email?: string
  bank_code?: string
  bank_account?: string
  bank_depositor?: string
  mobile?: string
  carrier?: string
  birth_date?: string
  registration_code?: string
}

// User update input
export interface UpdateUserInput {
  nickname?: string
  email?: string
  bank_code?: string
  bank_account?: string
  bank_depositor?: string
  mobile?: string
  carrier?: string
  birth_date?: string
  is_active?: boolean
  email_verified?: boolean
  phone_verified?: boolean
}

// Login credentials
export interface LoginCredentials {
  username: string
  password: string
  ip_address?: string
  user_agent?: string
}
