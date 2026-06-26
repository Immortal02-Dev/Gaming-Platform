import pool from './config/db';

async function check() {
  try {
    const [rows] = await pool.query("DESCRIBE match_odds");
    console.log(rows);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

check();
