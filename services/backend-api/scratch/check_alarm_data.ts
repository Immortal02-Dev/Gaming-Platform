import pool from '../config/db';

async function check() {
  try {
    const [rows] = await pool.query("SELECT * FROM alarm_settings");
    console.log('Alarm settings:', rows);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

check();
