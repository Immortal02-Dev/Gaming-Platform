import pool from './config/db';

async function check() {
  try {
    const [rows] = await pool.query("SHOW TABLES LIKE '%sum_odds%'");
    console.log('Tables containing sum_odds:', rows);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

check();
