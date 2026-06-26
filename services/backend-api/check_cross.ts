import pool from './config/db';

async function check() {
  try {
    const [rows] = await pool.query("SHOW TABLES LIKE '%cross%'");
    console.log('Tables containing cross:', rows);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

check();
