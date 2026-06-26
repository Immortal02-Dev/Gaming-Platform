import mysql from 'mysql2/promise';

async function seed() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bc_game_auth'
  });

  const [users] = await conn.query('SELECT id FROM users WHERE role != "admin" LIMIT 10');
  const userIds = (users as any[]).map(u => u.id);

  if (userIds.length === 0) return;

  console.log("Seeding slot_bet_orders...");
  const values = [];
  for (let i = 0; i < 50; i++) {
    const userId = userIds[Math.floor(Math.random() * userIds.length)];
    const betMoney = Math.floor(Math.random() * 50000) + 1000;
    const winMoney = Math.random() > 0.8 ? betMoney * 5 : 0;
    const betStatus = winMoney > 0 ? 1 : 2;
    const betTime = new Date();
    betTime.setDate(betTime.getDate() - Math.floor(Math.random() * 30));

    values.push([
      "TXN-SLOT-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      userId,
      'Provider X',
      1, // vendor_id
      'Vendor Y',
      'Slot Game',
      'Table A',
      betMoney + 50000,
      betMoney,
      50000,
      50000,
      winMoney,
      50000 + winMoney,
      betStatus,
      'Note',
      betTime,
      betTime
    ]);
  }

  await conn.query(
    "INSERT INTO slot_bet_orders (transaction_id, user_id, api_provider, vendor_id, vendor_name, game_type, table_name, before_bet_money, bet_money, after_bet_money, before_win_money, win_money, after_win_money, bet_status, note, bet_time, result_time) VALUES ?",
    [values]
  );
  console.log("Seeded 50 slot_bet_orders records");

  await conn.end();
}

seed().catch(console.error);
