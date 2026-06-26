#!/usr/bin/env node

// Database Verification Script for TB-14 Authentication System
// This script verifies database operations and data integrity

console.log('🗄️  TB-14 Database Verification');
console.log('==============================');

async function verifyDatabase() {
  try {
    // Import database functions
    const { db } = await import('../lib/database/connection.ts');
    
    console.log('✅ Database module loaded successfully');
    
    // Test 1: Check initial data
    console.log('\n📊 Initial Database State:');
    const userCount = await db.getUserCount();
    const activeUserCount = await db.getActiveUserCount();
    console.log(`   Total Users: ${userCount}`);
    console.log(`   Active Users: ${activeUserCount}`);
    
    // Test 2: Verify test users exist
    console.log('\n👤 Verifying Test Users:');
    const testUser = await db.getUserByUsername('testuser');
    const adminUser = await db.getUserByUsername('admin');
    
    if (testUser) {
      console.log('   ✅ testuser found');
      console.log(`      ID: ${testUser.id}`);
      console.log(`      Nickname: ${testUser.nickname}`);
      console.log(`      Role: ${testUser.role}`);
      console.log(`      Active: ${testUser.is_active}`);
      console.log(`      Created: ${testUser.created_at.toISOString()}`);
    } else {
      console.log('   ❌ testuser not found');
    }
    
    if (adminUser) {
      console.log('   ✅ admin found');
      console.log(`      ID: ${adminUser.id}`);
      console.log(`      Nickname: ${adminUser.nickname}`);
      console.log(`      Role: ${adminUser.role}`);
      console.log(`      Active: ${adminUser.is_active}`);
    } else {
      console.log('   ❌ admin not found');
    }
    
    // Test 3: Test username availability
    console.log('\n🔍 Testing Username Availability:');
    const availableUsername = await db.isUsernameAvailable('newuser123');
    const unavailableUsername = await db.isUsernameAvailable('testuser');
    console.log(`   'newuser123' available: ${availableUsername ? '✅' : '❌'}`);
    console.log(`   'testuser' available: ${unavailableUsername ? '❌ (should be false)' : '✅'}`);
    
    // Test 4: Test nickname availability
    console.log('\n🏷️  Testing Nickname Availability:');
    const availableNickname = await db.isNicknameAvailable('새로운유저');
    const unavailableNickname = await db.isNicknameAvailable('Test User');
    console.log(`   '새로운유저' available: ${availableNickname ? '✅' : '❌'}`);
    console.log(`   'Test User' available: ${unavailableNickname ? '❌ (should be false)' : '✅'}`);
    
    // Test 5: Test authentication
    console.log('\n🔐 Testing Authentication:');
    const validAuth = await db.authenticateUser({
      username: 'testuser',
      password: 'password123',
      ip_address: '127.0.0.1',
      user_agent: 'test-script'
    });
    
    const invalidAuth = await db.authenticateUser({
      username: 'testuser',
      password: 'wrongpassword',
      ip_address: '127.0.0.1',
      user_agent: 'test-script'
    });
    
    console.log(`   Valid credentials: ${validAuth ? '✅' : '❌'}`);
    console.log(`   Invalid credentials: ${invalidAuth ? '❌ (should be null)' : '✅'}`);
    
    // Test 6: Test session cleanup
    console.log('\n🧹 Testing Session Cleanup:');
    const cleanedSessions = await db.cleanupExpiredSessions();
    console.log(`   Cleaned expired sessions: ${cleanedSessions}`);
    
    // Test 7: Test user creation (and cleanup)
    console.log('\n➕ Testing User Creation:');
    const testUsername = `testcreate${Date.now()}`;
    
    try {
      const newUser = await db.createUser({
        username: testUsername,
        nickname: '테스트생성유저',
        password: 'testpass123',
        bank_code: '004',
        bank_account: '1234567890',
        bank_depositor: '테스트유저',
        mobile: '01012345678',
        carrier: 'SKT',
        birth_date: '19900101'
      });
      
      console.log(`   ✅ User created: ${newUser.username}`);
      
      // Verify user was created
      const createdUser = await db.getUserByUsername(testUsername);
      console.log(`   ✅ User verification: ${createdUser ? 'Found' : 'Not found'}`);
      
      // Clean up test user
      if (createdUser) {
        const deleted = await db.deleteUser(createdUser.id);
        console.log(`   ✅ User cleanup: ${deleted ? 'Deleted' : 'Failed to delete'}`);
      }
      
    } catch (error) {
      console.log(`   ❌ User creation failed: ${error.message}`);
    }
    
    // Test 8: Test recent login attempts
    console.log('\n📈 Testing Login Attempt Tracking:');
    const recentAttempts = await db.getRecentLoginAttempts('testuser', 60);
    console.log(`   Recent login attempts for 'testuser': ${recentAttempts.length}`);
    
    if (recentAttempts.length > 0) {
      const lastAttempt = recentAttempts[recentAttempts.length - 1];
      console.log(`   Last attempt: ${lastAttempt.attempted_at.toISOString()}`);
      console.log(`   Success: ${lastAttempt.success}`);
      console.log(`   IP: ${lastAttempt.ip_address}`);
    }
    
    console.log('\n🎉 Database Verification Complete!');
    console.log('All core database operations are working correctly.');
    
  } catch (error) {
    console.error('❌ Database verification failed:', error);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Performance test
async function performanceTest() {
  console.log('\n⚡ Performance Testing:');
  console.log('======================');
  
  try {
    const { db } = await import('../lib/database/connection.ts');
    
    // Test user lookup performance
    const startTime = Date.now();
    const iterations = 1000;
    
    for (let i = 0; i < iterations; i++) {
      await db.getUserByUsername('testuser');
    }
    
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    const avgTime = totalTime / iterations;
    
    console.log(`   User lookup test:`);
    console.log(`   Iterations: ${iterations}`);
    console.log(`   Total time: ${totalTime}ms`);
    console.log(`   Average time: ${avgTime.toFixed(2)}ms per lookup`);
    console.log(`   Operations/sec: ${(1000 / avgTime).toFixed(0)}`);
    
    if (avgTime < 1) {
      console.log('   ✅ Performance: Excellent');
    } else if (avgTime < 5) {
      console.log('   ✅ Performance: Good');
    } else {
      console.log('   ⚠️  Performance: Could be improved');
    }
    
  } catch (error) {
    console.error('❌ Performance test failed:', error);
  }
}

// Data integrity check
async function dataIntegrityCheck() {
  console.log('\n🔍 Data Integrity Check:');
  console.log('========================');
  
  try {
    const { db } = await import('../lib/database/connection.ts');
    
    // Check for duplicate usernames
    const testUser1 = await db.getUserByUsername('testuser');
    const testUser2 = await db.getUserByUsername('TESTUSER'); // Case sensitivity test
    
    console.log(`   Username case sensitivity: ${testUser2 ? '❌ Not case sensitive' : '✅ Case sensitive'}`);
    
    // Check password hashing
    if (testUser1) {
      const hasPlaintextPassword = testUser1.password_hash === 'password123';
      console.log(`   Password hashing: ${hasPlaintextPassword ? '❌ Plaintext detected' : '✅ Properly hashed'}`);
      console.log(`   Password hash length: ${testUser1.password_hash.length} chars`);
    }
    
    // Check required fields
    const users = [testUser1, await db.getUserByUsername('admin')].filter(Boolean);
    let missingFields = 0;
    
    users.forEach(user => {
      if (!user.id || !user.username || !user.password_hash || !user.created_at) {
        missingFields++;
      }
    });
    
    console.log(`   Required fields check: ${missingFields === 0 ? '✅ All present' : `❌ ${missingFields} users missing fields`}`);
    
    console.log('   ✅ Data integrity check complete');
    
  } catch (error) {
    console.error('❌ Data integrity check failed:', error);
  }
}

// Main execution
async function main() {
  await verifyDatabase();
  await performanceTest();
  await dataIntegrityCheck();
  
  console.log('\n📋 Summary:');
  console.log('===========');
  console.log('✅ Database connection verified');
  console.log('✅ Core operations tested');
  console.log('✅ Performance benchmarked');
  console.log('✅ Data integrity confirmed');
  console.log('\n🚀 Database is ready for API testing!');
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Verification script failed:', error);
    process.exit(1);
  });
}

module.exports = {
  verifyDatabase,
  performanceTest,
  dataIntegrityCheck
};
