const mysql = require('mysql2/promise');
require('dotenv').config();

async function test(host) {
  console.log(`Connecting to: ${host}...`);
  try {
    const connection = await mysql.createConnection({
      host: host,
      user: 'root',
      password: '',
      connectTimeout: 5000
    });
    console.log(`Connected to ${host}!`);
    await connection.end();
    return true;
  } catch (err) {
    console.error(`Failed ${host}: ${err.message}`);
    return false;
  }
}

async function run() {
  await test('localhost');
  await test('127.0.0.1');
  await test('::1');
}

run();
