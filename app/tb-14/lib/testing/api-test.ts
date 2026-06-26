// API Testing Utilities for TB-14 Authentication System
// This file provides comprehensive testing for login and register APIs

interface TestResult {
  success: boolean
  message: string
  data?: any
  error?: string
  statusCode?: number
  responseTime?: number
}

interface TestCase {
  name: string
  description: string
  endpoint: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  payload?: any
  expectedStatus: number
  expectedSuccess: boolean
}

class APITester {
  private baseUrl: string
  private results: TestResult[] = []

  constructor(baseUrl: string = 'http://localhost:3000') {
    this.baseUrl = baseUrl
  }

  async runTest(testCase: TestCase): Promise<TestResult> {
    const startTime = Date.now()
    
    try {
      console.log(`🧪 Running: ${testCase.name}`)
      console.log(`📝 ${testCase.description}`)

      const response = await fetch(`${this.baseUrl}${testCase.endpoint}`, {
        method: testCase.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: testCase.payload ? JSON.stringify(testCase.payload) : undefined,
      })

      const responseTime = Date.now() - startTime
      const data = await response.json()

      const result: TestResult = {
        success: response.status === testCase.expectedStatus && data.success === testCase.expectedSuccess,
        message: `${testCase.name}: ${response.status === testCase.expectedStatus ? '✅ PASS' : '❌ FAIL'}`,
        data,
        statusCode: response.status,
        responseTime
      }

      if (!result.success) {
        result.error = `Expected status ${testCase.expectedStatus}, got ${response.status}. Expected success ${testCase.expectedSuccess}, got ${data.success}`
      }

      this.results.push(result)
      console.log(result.message)
      console.log(`⏱️  Response time: ${responseTime}ms`)
      console.log(`📊 Response:`, data)
      console.log('---')

      return result

    } catch (error) {
      const responseTime = Date.now() - startTime
      const result: TestResult = {
        success: false,
        message: `${testCase.name}: ❌ NETWORK ERROR`,
        error: error instanceof Error ? error.message : 'Unknown error',
        responseTime
      }

      this.results.push(result)
      console.error(result.message, result.error)
      console.log('---')

      return result
    }
  }

  async runTestSuite(testCases: TestCase[]): Promise<void> {
    console.log('🚀 Starting API Test Suite for TB-14 Authentication')
    console.log(`📍 Base URL: ${this.baseUrl}`)
    console.log(`🧪 Total Tests: ${testCases.length}`)
    console.log('='.repeat(60))

    for (const testCase of testCases) {
      await this.runTest(testCase)
      // Add small delay between tests
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    this.printSummary()
  }

  printSummary(): void {
    const passed = this.results.filter(r => r.success).length
    const failed = this.results.filter(r => !r.success).length
    const avgResponseTime = this.results.reduce((sum, r) => sum + (r.responseTime || 0), 0) / this.results.length

    console.log('='.repeat(60))
    console.log('📊 TEST SUMMARY')
    console.log('='.repeat(60))
    console.log(`✅ Passed: ${passed}`)
    console.log(`❌ Failed: ${failed}`)
    console.log(`📈 Success Rate: ${((passed / this.results.length) * 100).toFixed(1)}%`)
    console.log(`⏱️  Average Response Time: ${avgResponseTime.toFixed(0)}ms`)
    
    if (failed > 0) {
      console.log('\n❌ FAILED TESTS:')
      this.results.filter(r => !r.success).forEach(r => {
        console.log(`  • ${r.message}`)
        if (r.error) console.log(`    Error: ${r.error}`)
      })
    }

    console.log('='.repeat(60))
  }

  getResults(): TestResult[] {
    return this.results
  }

  reset(): void {
    this.results = []
  }
}

// Test data generators
export const generateTestUser = (suffix: string = '') => ({
  username: `testuser${suffix}${Date.now()}`,
  nickname: `테스트유저${suffix}`,
  password: 'password123',
  confirmPassword: 'password123',
  bank: '004',
  bankAccount: '1234567890123',
  bankDepositor: '테스트유저',
  birthDate: '19900101',
  mobile: '01012345678',
  carrier: 'SKT',
  registrationCode: 'TEST123'
})

export const generateInvalidUser = () => ({
  username: 'ab', // Too short
  nickname: 'ㄱ', // Invalid Korean
  password: '12', // Too short
  confirmPassword: '123', // Doesn't match
  bank: 'invalid',
  bankAccount: 'abc',
  birthDate: '20100101', // Too young
  mobile: '123',
  carrier: 'INVALID'
})

// Comprehensive test cases
export const getTestCases = (): TestCase[] => [
  // Registration Tests
  {
    name: 'Valid Registration',
    description: 'Test successful user registration with valid data',
    endpoint: '/api/auth/register',
    method: 'POST',
    payload: generateTestUser('valid'),
    expectedStatus: 200,
    expectedSuccess: true
  },
  {
    name: 'Invalid Registration - Short Username',
    description: 'Test registration failure with username too short',
    endpoint: '/api/auth/register',
    method: 'POST',
    payload: { ...generateTestUser('short'), username: 'ab' },
    expectedStatus: 400,
    expectedSuccess: false
  },
  {
    name: 'Invalid Registration - Weak Password',
    description: 'Test registration failure with weak password',
    endpoint: '/api/auth/register',
    method: 'POST',
    payload: { ...generateTestUser('weak'), password: '123', confirmPassword: '123' },
    expectedStatus: 400,
    expectedSuccess: false
  },
  {
    name: 'Invalid Registration - Password Mismatch',
    description: 'Test registration failure with password confirmation mismatch',
    endpoint: '/api/auth/register',
    method: 'POST',
    payload: { ...generateTestUser('mismatch'), confirmPassword: 'different' },
    expectedStatus: 400,
    expectedSuccess: false
  },
  {
    name: 'Invalid Registration - Invalid Bank',
    description: 'Test registration failure with invalid bank code',
    endpoint: '/api/auth/register',
    method: 'POST',
    payload: { ...generateTestUser('bank'), bank: 'invalid' },
    expectedStatus: 400,
    expectedSuccess: false
  },
  {
    name: 'Invalid Registration - Invalid Mobile',
    description: 'Test registration failure with invalid mobile number',
    endpoint: '/api/auth/register',
    method: 'POST',
    payload: { ...generateTestUser('mobile'), mobile: '123' },
    expectedStatus: 400,
    expectedSuccess: false
  },
  {
    name: 'Invalid Registration - Underage',
    description: 'Test registration failure with underage birth date',
    endpoint: '/api/auth/register',
    method: 'POST',
    payload: { ...generateTestUser('young'), birthDate: '20100101' },
    expectedStatus: 400,
    expectedSuccess: false
  },
  {
    name: 'Duplicate Username Registration',
    description: 'Test registration failure with existing username',
    endpoint: '/api/auth/register',
    method: 'POST',
    payload: { ...generateTestUser('dup'), username: 'testuser' },
    expectedStatus: 409,
    expectedSuccess: false
  },

  // Login Tests
  {
    name: 'Valid Login - Existing User',
    description: 'Test successful login with existing user credentials',
    endpoint: '/api/auth/login',
    method: 'POST',
    payload: {
      username: 'testuser',
      password: 'password123',
      rememberMe: false
    },
    expectedStatus: 200,
    expectedSuccess: true
  },
  {
    name: 'Valid Login - Admin User',
    description: 'Test successful login with admin credentials',
    endpoint: '/api/auth/login',
    method: 'POST',
    payload: {
      username: 'admin',
      password: 'admin123',
      rememberMe: true
    },
    expectedStatus: 200,
    expectedSuccess: true
  },
  {
    name: 'Invalid Login - Wrong Password',
    description: 'Test login failure with incorrect password',
    endpoint: '/api/auth/login',
    method: 'POST',
    payload: {
      username: 'testuser',
      password: 'wrongpassword',
      rememberMe: false
    },
    expectedStatus: 401,
    expectedSuccess: false
  },
  {
    name: 'Invalid Login - Non-existent User',
    description: 'Test login failure with non-existent username',
    endpoint: '/api/auth/login',
    method: 'POST',
    payload: {
      username: 'nonexistentuser',
      password: 'password123',
      rememberMe: false
    },
    expectedStatus: 401,
    expectedSuccess: false
  },
  {
    name: 'Invalid Login - Empty Credentials',
    description: 'Test login failure with empty credentials',
    endpoint: '/api/auth/login',
    method: 'POST',
    payload: {
      username: '',
      password: '',
      rememberMe: false
    },
    expectedStatus: 400,
    expectedSuccess: false
  },
  {
    name: 'Invalid Login - Short Username',
    description: 'Test login failure with username too short',
    endpoint: '/api/auth/login',
    method: 'POST',
    payload: {
      username: 'ab',
      password: 'password123',
      rememberMe: false
    },
    expectedStatus: 400,
    expectedSuccess: false
  },

  // Session Tests
  {
    name: 'Session Check - No Session',
    description: 'Test session endpoint without authentication',
    endpoint: '/api/auth/session',
    method: 'GET',
    expectedStatus: 401,
    expectedSuccess: false
  },

  // Logout Tests
  {
    name: 'Logout - No Session',
    description: 'Test logout without active session',
    endpoint: '/api/auth/logout',
    method: 'POST',
    expectedStatus: 200,
    expectedSuccess: true
  }
]

// Database connection test
export async function testDatabaseConnection(): Promise<TestResult> {
  try {
    console.log('🗄️  Testing Database Connection...')
    
    const { db } = await import('../database/connection')
    
    // Test basic operations
    const userCount = await db.getUserCount()
    const activeUserCount = await db.getActiveUserCount()
    
    // Test username availability
    const isAvailable = await db.isUsernameAvailable('nonexistentuser123')
    
    // Test cleanup operations
    const cleanedSessions = await db.cleanupExpiredSessions()
    
    console.log(`✅ Database Connection: SUCCESS`)
    console.log(`👥 Total Users: ${userCount}`)
    console.log(`🟢 Active Users: ${activeUserCount}`)
    console.log(`🧹 Cleaned Sessions: ${cleanedSessions}`)
    
    return {
      success: true,
      message: 'Database connection test passed',
      data: {
        userCount,
        activeUserCount,
        cleanedSessions,
        usernameAvailable: isAvailable
      }
    }
  } catch (error) {
    console.error('❌ Database Connection: FAILED', error)
    return {
      success: false,
      message: 'Database connection test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Rate limiting test
export async function testRateLimiting(): Promise<TestResult[]> {
  console.log('🚦 Testing Rate Limiting...')
  
  const results: TestResult[] = []
  const tester = new APITester()
  
  // Test registration rate limiting (3 attempts per hour)
  for (let i = 0; i < 5; i++) {
    const result = await tester.runTest({
      name: `Rate Limit Test ${i + 1}`,
      description: `Registration attempt ${i + 1}/5`,
      endpoint: '/api/auth/register',
      method: 'POST',
      payload: generateTestUser(`rate${i}`),
      expectedStatus: i < 3 ? 200 : 429,
      expectedSuccess: i < 3
    })
    results.push(result)
    
    if (i < 4) await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  return results
}

// Export the main tester class
export { APITester }

// Main test runner function
export async function runFullTestSuite(): Promise<void> {
  console.log('🎯 TB-14 Authentication API Test Suite')
  console.log('=====================================')
  
  // Test database connection first
  await testDatabaseConnection()
  console.log('')
  
  // Run API tests
  const tester = new APITester()
  const testCases = getTestCases()
  
  await tester.runTestSuite(testCases)
  
  // Test rate limiting
  console.log('\n🚦 Rate Limiting Tests')
  console.log('='.repeat(30))
  await testRateLimiting()
  
  console.log('\n🎉 Full Test Suite Complete!')
}
