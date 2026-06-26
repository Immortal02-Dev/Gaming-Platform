import pool from './config/db';

async function check() {
  try {
    const [rows] = await pool.query("SHOW TABLES");
    console.log('All tables:', (rows as any[]).map((r: any) => Object.values(r)[0]));
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

check();
