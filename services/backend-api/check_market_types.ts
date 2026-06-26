import pool from './config/db';

async function check() {
  try {
    const [rows] = await pool.query("SHOW TABLES LIKE '%market%'");
    console.log('Tables containing market:', rows);
    const [allRows] = await pool.query("SHOW TABLES LIKE '%sport%'");
    console.log('Tables containing sport:', allRows);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

check();
