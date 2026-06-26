// Database connection and operations for TB-14 gaming platform
// This implementation uses an in-memory store for demonstration
// Replace with your preferred database (PostgreSQL, MySQL, MongoDB, etc.)

import { hashPassword, verifyPassword } from '@/lib/auth/password'
import type { 
  DatabaseUser, 
  DatabaseSession, 
  DatabaseLoginAttempt,
  CreateUserInput,
  UpdateUserInput,
  LoginCredentials 
} from './schema'

// In-memory database simulation (replace with real database)
class InMemoryDatabase {
  private users: Map<string, DatabaseUser> = new Map()
  private sessions: Map<string, DatabaseSession> = new Map()
  private loginAttempts: DatabaseLoginAttempt[] = []
  private usersByUsername: Map<string, string> = new Map() // username -> id mapping
  private usersByNickname: Map<string, string> = new Map() // nickname -> id mapping

  constructor() {
    // Initialize with some test data
    this.initializeTestData()
  }

  private initializeTestData() {
    const testUsers: DatabaseUser[] = [
      {
        id: '1',
        username: 'testuser',
        nickname: 'Test User',
        password_hash: hashPassword('password123'),
        role: 'user',
        bank_code: '004',
        bank_account: '1234567890',
        bank_depositor: 'Test User',
        mobile: '01012345678',
        carrier: 'SKT',
        birth_date: '19900101',
        is_active: true,
        email_verified: false,
        phone_verified: false,
        created_at: new Date('2024-01-01'),
        updated_at: new Date('2024-01-01'),
        last_login: new Date(),
        login_attempts: 0
      },
      {
        id: '2',
        username: 'admin',
        nickname: 'Administrator',
        password_hash: hashPassword('admin123'),
        role: 'admin',
        is_active: true,
        email_verified: true,
        phone_verified: true,
        created_at: new Date('2024-01-01'),
        updated_at: new Date('2024-01-01'),
        last_login: new Date(),
        login_attempts: 0
      }
    ]

    testUsers.forEach(user => {
      this.users.set(user.id, user)
      this.usersByUsername.set(user.username, user.id)
      this.usersByNickname.set(user.nickname, user.id)
    })
  }

  // User operations
  async createUser(input: CreateUserInput): Promise<DatabaseUser> {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
    
    // Check if username or nickname already exists
    if (this.usersByUsername.has(input.username)) {
      throw new Error('Username already exists')
    }
    if (this.usersByNickname.has(input.nickname)) {
      throw new Error('Nickname already exists')
    }

    const user: DatabaseUser = {
      id,
      username: input.username,
      nickname: input.nickname,
      password_hash: hashPassword(input.password),
      role: 'user',
      bank_code: input.bank_code,
      bank_account: input.bank_account,
      bank_depositor: input.bank_depositor,
      mobile: input.mobile,
      carrier: input.carrier,
      birth_date: input.birth_date,
      registration_code: input.registration_code,
      is_active: true,
      email_verified: false,
      phone_verified: false,
      created_at: new Date(),
      updated_at: new Date(),
      login_attempts: 0
    }

    this.users.set(id, user)
    this.usersByUsername.set(user.username, id)
    this.usersByNickname.set(user.nickname, id)

    return user
  }

  async getUserById(id: string): Promise<DatabaseUser | null> {
    return this.users.get(id) || null
  }

  async getUserByUsername(username: string): Promise<DatabaseUser | null> {
    const id = this.usersByUsername.get(username)
    return id ? this.users.get(id) || null : null
  }

  async getUserByNickname(nickname: string): Promise<DatabaseUser | null> {
    const id = this.usersByNickname.get(nickname)
    return id ? this.users.get(id) || null : null
  }

  async updateUser(id: string, updates: UpdateUserInput): Promise<DatabaseUser | null> {
    const user = this.users.get(id)
    if (!user) return null

    // Check nickname uniqueness if being updated
    if (updates.nickname && updates.nickname !== user.nickname) {
      if (this.usersByNickname.has(updates.nickname)) {
        throw new Error('Nickname already exists')
      }
      // Update nickname mapping
      this.usersByNickname.delete(user.nickname)
      this.usersByNickname.set(updates.nickname, id)
    }

    const updatedUser: DatabaseUser = {
      ...user,
      ...updates,
      updated_at: new Date()
    }

    this.users.set(id, updatedUser)
    return updatedUser
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = this.users.get(id)
    if (!user) return false

    this.users.delete(id)
    this.usersByUsername.delete(user.username)
    this.usersByNickname.delete(user.nickname)
    
    // Clean up sessions
    const sessionsArray = Array.from(this.sessions.entries())
    for (const [sessionId, session] of sessionsArray) {
      if (session.user_id === id) {
        this.sessions.delete(sessionId)
      }
    }

    return true
  }

  // Authentication operations
  async authenticateUser(credentials: LoginCredentials): Promise<DatabaseUser | null> {
    const user = await this.getUserByUsername(credentials.username)
    if (!user || !user.is_active) {
      await this.recordLoginAttempt(credentials.username, false, credentials.ip_address, credentials.user_agent)
      return null
    }

    // Check if account is locked
    if (user.locked_until && user.locked_until > new Date()) {
      await this.recordLoginAttempt(credentials.username, false, credentials.ip_address, credentials.user_agent)
      return null
    }

    // Verify password
    if (!verifyPassword(credentials.password, user.password_hash)) {
      // Increment login attempts
      user.login_attempts += 1
      
      // Lock account after 5 failed attempts for 30 minutes
      if (user.login_attempts >= 5) {
        user.locked_until = new Date(Date.now() + 30 * 60 * 1000)
      }
      
      user.updated_at = new Date()
      this.users.set(user.id, user)
      
      await this.recordLoginAttempt(credentials.username, false, credentials.ip_address, credentials.user_agent)
      return null
    }

    // Successful login - reset attempts and update last login
    user.login_attempts = 0
    user.locked_until = undefined
    user.last_login = new Date()
    user.updated_at = new Date()
    this.users.set(user.id, user)

    await this.recordLoginAttempt(credentials.username, true, credentials.ip_address, credentials.user_agent)
    return user
  }

  // Session operations
  async createSession(userId: string, tokenHash: string, expiresAt: Date, ipAddress?: string, userAgent?: string): Promise<DatabaseSession> {
    const session: DatabaseSession = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      user_id: userId,
      token_hash: tokenHash,
      expires_at: expiresAt,
      created_at: new Date(),
      ip_address: ipAddress,
      user_agent: userAgent
    }

    this.sessions.set(session.id, session)
    return session
  }

  async getSessionByTokenHash(tokenHash: string): Promise<DatabaseSession | null> {
    const sessionsArray = Array.from(this.sessions.values())
    for (const session of sessionsArray) {
      if (session.token_hash === tokenHash && session.expires_at > new Date()) {
        return session
      }
    }
    return null
  }

  async deleteSession(tokenHash: string): Promise<boolean> {
    const sessionsArray = Array.from(this.sessions.entries())
    for (const [id, session] of sessionsArray) {
      if (session.token_hash === tokenHash) {
        this.sessions.delete(id)
        return true
      }
    }
    return false
  }

  async deleteUserSessions(userId: string): Promise<number> {
    let deletedCount = 0
    const sessionsArray = Array.from(this.sessions.entries())
    for (const [id, session] of sessionsArray) {
      if (session.user_id === userId) {
        this.sessions.delete(id)
        deletedCount++
      }
    }
    return deletedCount
  }

  async cleanupExpiredSessions(): Promise<number> {
    let deletedCount = 0
    const now = new Date()
    const sessionsArray = Array.from(this.sessions.entries())
    
    for (const [id, session] of sessionsArray) {
      if (session.expires_at <= now) {
        this.sessions.delete(id)
        deletedCount++
      }
    }
    
    return deletedCount
  }

  // Login attempt tracking
  async recordLoginAttempt(username: string, success: boolean, ipAddress?: string, userAgent?: string): Promise<void> {
    const attempt: DatabaseLoginAttempt = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      username,
      ip_address: ipAddress || 'unknown',
      success,
      attempted_at: new Date(),
      user_agent: userAgent
    }

    this.loginAttempts.push(attempt)

    // Keep only last 1000 attempts to prevent memory issues
    if (this.loginAttempts.length > 1000) {
      this.loginAttempts = this.loginAttempts.slice(-1000)
    }
  }

  async getRecentLoginAttempts(username: string, minutes: number = 15): Promise<DatabaseLoginAttempt[]> {
    const since = new Date(Date.now() - minutes * 60 * 1000)
    return this.loginAttempts.filter(
      attempt => attempt.username === username && attempt.attempted_at >= since
    )
  }

  // Utility methods
  async isUsernameAvailable(username: string): Promise<boolean> {
    return !this.usersByUsername.has(username)
  }

  async isNicknameAvailable(nickname: string): Promise<boolean> {
    return !this.usersByNickname.has(nickname)
  }

  async getUserCount(): Promise<number> {
    return this.users.size
  }

  async getActiveUserCount(): Promise<number> {
    let count = 0
    const usersArray = Array.from(this.users.values())
    for (const user of usersArray) {
      if (user.is_active) count++
    }
    return count
  }
}

// Singleton database instance
let dbInstance: InMemoryDatabase | null = null

export function getDatabase(): InMemoryDatabase {
  if (!dbInstance) {
    dbInstance = new InMemoryDatabase()
  }
  return dbInstance
}

// Export database operations
export const db = {
  // User operations
  createUser: (input: CreateUserInput) => getDatabase().createUser(input),
  getUserById: (id: string) => getDatabase().getUserById(id),
  getUserByUsername: (username: string) => getDatabase().getUserByUsername(username),
  getUserByNickname: (nickname: string) => getDatabase().getUserByNickname(nickname),
  updateUser: (id: string, updates: UpdateUserInput) => getDatabase().updateUser(id, updates),
  deleteUser: (id: string) => getDatabase().deleteUser(id),
  
  // Authentication
  authenticateUser: (credentials: LoginCredentials) => getDatabase().authenticateUser(credentials),
  
  // Sessions
  createSession: (userId: string, tokenHash: string, expiresAt: Date, ipAddress?: string, userAgent?: string) => 
    getDatabase().createSession(userId, tokenHash, expiresAt, ipAddress, userAgent),
  getSessionByTokenHash: (tokenHash: string) => getDatabase().getSessionByTokenHash(tokenHash),
  deleteSession: (tokenHash: string) => getDatabase().deleteSession(tokenHash),
  deleteUserSessions: (userId: string) => getDatabase().deleteUserSessions(userId),
  cleanupExpiredSessions: () => getDatabase().cleanupExpiredSessions(),
  
  // Login attempts
  recordLoginAttempt: (username: string, success: boolean, ipAddress?: string, userAgent?: string) =>
    getDatabase().recordLoginAttempt(username, success, ipAddress, userAgent),
  getRecentLoginAttempts: (username: string, minutes?: number) => 
    getDatabase().getRecentLoginAttempts(username, minutes),
  
  // Utilities
  isUsernameAvailable: (username: string) => getDatabase().isUsernameAvailable(username),
  isNicknameAvailable: (nickname: string) => getDatabase().isNicknameAvailable(nickname),
  getUserCount: () => getDatabase().getUserCount(),
  getActiveUserCount: () => getDatabase().getActiveUserCount()
}
