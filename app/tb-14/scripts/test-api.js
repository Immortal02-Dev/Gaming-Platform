#!/usr/bin/env node

// API Test Runner for TB-14 Authentication System
// Run this script to test all authentication endpoints

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 TB-14 API Test Runner');
console.log('========================');

// Check if server is running
async function checkServer(url = 'http://localhost:3000') {
  try {
    const response = await fetch(`${url}/api/auth/session`);
    return true;
  } catch (error) {
    return false;
  }
}

// Run the test suite
async function runTests() {
  console.log('🔍 Checking if development server is running...');
  
  const isServerRunning = await checkServer();
  
  if (!isServerRunning) {
    console.log('❌ Development server is not running!');
    console.log('💡 Please start the server first:');
    console.log('   npm run dev');
    console.log('   # or');
    console.log('   yarn dev');
    process.exit(1);
  }
  
  console.log('✅ Server is running, starting tests...\n');
  
  // Import and run the test suite
  try {
    // Use dynamic import for ES modules
    const { runFullTestSuite } = await import('../lib/testing/api-test.ts');
    await runFullTestSuite();
  } catch (error) {
    console.error('❌ Test execution failed:', error.message);
    process.exit(1);
  }
}

// Manual test cases for quick verification
const manualTests = [
  {
    name: 'Registration API Test',
    description: 'Test user registration with valid data',
    curl: `curl -X POST http://localhost:3000/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "testuser${Date.now()}",
    "nickname": "테스트유저",
    "password": "password123",
    "confirmPassword": "password123",
    "bank": "004",
    "bankAccount": "1234567890123",
    "bankDepositor": "테스트유저",
    "birthDate": "19900101",
    "mobile": "01012345678",
    "carrier": "SKT"
  }'`
  },
  {
    name: 'Login API Test',
    description: 'Test user login with existing credentials',
    curl: `curl -X POST http://localhost:3000/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "testuser",
    "password": "password123",
    "rememberMe": false
  }'`
  },
  {
    name: 'Session Check Test',
    description: 'Test session validation endpoint',
    curl: `curl -X GET http://localhost:3000/api/auth/session \\
  -H "Content-Type: application/json"`
  },
  {
    name: 'Logout Test',
    description: 'Test user logout',
    curl: `curl -X POST http://localhost:3000/api/auth/logout \\
  -H "Content-Type: application/json"`
  }
];

// Show manual test commands
function showManualTests() {
  console.log('\n📋 Manual Test Commands');
  console.log('========================');
  console.log('You can also run these curl commands manually:\n');
  
  manualTests.forEach((test, index) => {
    console.log(`${index + 1}. ${test.name}`);
    console.log(`   ${test.description}`);
    console.log(`   ${test.curl}\n`);
  });
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log('Usage: node scripts/test-api.js [options]');
    console.log('');
    console.log('Options:');
    console.log('  --help, -h     Show this help message');
    console.log('  --manual, -m   Show manual test commands');
    console.log('  --quick, -q    Run quick tests only');
    console.log('');
    console.log('Examples:');
    console.log('  node scripts/test-api.js           # Run full test suite');
    console.log('  node scripts/test-api.js --manual  # Show manual commands');
    process.exit(0);
  }
  
  if (args.includes('--manual') || args.includes('-m')) {
    showManualTests();
    process.exit(0);
  }
  
  runTests().catch(error => {
    console.error('❌ Test runner failed:', error);
    process.exit(1);
  });
}

module.exports = {
  runTests,
  checkServer,
  manualTests
};
